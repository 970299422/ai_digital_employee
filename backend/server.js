const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// 中间件
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 限流
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP最多100次请求
  message: {
    error: '请求过于频繁，请稍后再试'
  }
});
app.use('/api/', limiter);

// 静态文件服务
app.use('/uploads', express.static('uploads'));

// 数据库连接
const { sequelize } = require('./src/config/database');
const redis = require('./src/config/redis');

// 测试数据库连接
async function testConnections() {
  try {
    await sequelize.authenticate();
    console.log('MySQL数据库连接成功');
    
    await redis.ping();
    console.log('Redis连接成功');
    
    // 同步数据库模型
    await sequelize.sync({ alter: true });
    console.log('数据库模型同步成功');
  } catch (error) {
    console.error('数据库连接失败:', error);
    process.exit(1);
  }
}

// 路由
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/user'));
app.use('/api/departments', require('./src/routes/department'));
app.use('/api/messages', require('./src/routes/message'));
app.use('/api/chat', require('./src/routes/chat'));

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    error: '接口不存在',
    message: `无法找到 ${req.method} ${req.url}`
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : '请联系管理员'
  });
});

// WebSocket连接处理
const websocketService = require('./src/services/websocketService');
websocketService.initialize(io);

// 启动服务器
const PORT = process.env.PORT || 3001;

async function startServer() {
  await testConnections();
  
  server.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
    console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
  });
}

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('收到SIGTERM信号，开始优雅关闭');
  
  try {
    await sequelize.close();
    await redis.disconnect();
    server.close(() => {
      console.log('服务器已关闭');
      process.exit(0);
    });
  } catch (error) {
    console.error('关闭过程中出错:', error);
    process.exit(1);
  }
});

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
  process.exit(1);
});

// 启动应用
if (require.main === module) {
  startServer();
}

module.exports = { app, server, io };