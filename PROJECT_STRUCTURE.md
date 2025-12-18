# AI数字员工问答应用 - 完整项目目录结构

## 项目概述
一个完整的企业级AI数字员工问答应用，包含前端界面、后端服务、数据库和部署配置。

## 项目根目录
```
ai-digital-employee/
├── frontend/                     # 前端应用
├── backend/                      # 后端服务
├── database/                     # 数据库相关
├── deployment/                   # 部署配置
├── docs/                        # 项目文档
├── shared/                      # 共享资源
└── README.md                    # 项目说明
```

## 详细目录结构

### 1. 前端应用 (frontend/)
```
frontend/
├── public/                      # 静态资源
│   ├── index.html              # 主页面
│   └── resources/              # 图片资源
│       ├── avatar-hr.png       # 人事部头像
│       ├── avatar-finance.png  # 财务部头像
│       ├── avatar-market.png   # 市场部头像
│       ├── avatar-tech.png     # 技术部头像
│       └── bg.jpg             # 背景图片
├── src/                       # 源代码
│   ├── assets/               # 静态资产
│   │   ├── css/             # 样式文件
│   │   │   ├── main.css     # 主样式
│   │   │   └── components.css # 组件样式
│   │   └── images/          # 图片资源
│   ├── components/          # Vue组件
│   │   ├── ChatWindow.vue   # 对话窗口
│   │   ├── DepartmentCard.vue # 部门卡片
│   │   ├── MessageBubble.vue # 消息气泡
│   │   ├── QuickQuestions.vue # 快速问题
│   │   └── TypingIndicator.vue # 输入指示器
│   ├── composables/         # 组合式API
│   │   ├── useChat.js      # 聊天逻辑
│   │   ├── useWebSocket.js # WebSocket
│   │   └── useParticles.js # 粒子效果
│   ├── router/             # 路由配置
│   │   └── index.js       # 路由定义
│   ├── store/              # 状态管理
│   │   ├── index.js       # Store入口
│   │   ├── modules/chat.js # 聊天状态
│   │   └── modules/user.js # 用户状态
│   ├── utils/              # 工具函数
│   │   ├── api.js         # API封装
│   │   ├── constants.js   # 常量定义
│   │   ├── storage.js     # 本地存储
│   │   └── validators.js  # 验证函数
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── tests/                   # 测试文件
│   ├── unit/               # 单元测试
│   └── e2e/               # 端到端测试
├── package.json            # 包配置
├── vite.config.js         # Vite配置
└── tailwind.config.js     # Tailwind配置
```

### 2. 后端服务 (backend/)
```
backend/
├── src/                    # 源代码
│   ├── config/           # 配置文件
│   │   ├── database.js   # 数据库配置
│   │   ├── redis.js      # Redis配置
│   │   ├── websocket.js  # WebSocket配置
│   │   └── app.js        # 应用配置
│   ├── controllers/      # 控制器
│   │   ├── authController.js    # 认证控制
│   │   ├── chatController.js    # 聊天控制
│   │   ├── departmentController.js # 部门控制
│   │   ├── messageController.js  # 消息控制
│   │   └── userController.js     # 用户控制
│   ├── middleware/       # 中间件
│   │   ├── auth.js       # 认证中间件
│   │   ├── errorHandler.js # 错误处理
│   │   ├── logger.js     # 日志中间件
│   │   ├── rateLimiter.js # 限流中间件
│   │   └── validator.js  # 验证中间件
│   ├── models/           # 数据模型
│   │   ├── User.js       # 用户模型
│   │   ├── Message.js    # 消息模型
│   │   ├── Department.js # 部门模型
│   │   ├── Conversation.js # 对话模型
│   │   └── Knowledge.js  # 知识库模型
│   ├── routes/           # 路由
│   │   ├── auth.js       # 认证路由
│   │   ├── chat.js       # 聊天路由
│   │   ├── department.js # 部门路由
│   │   ├── message.js    # 消息路由
│   │   └── user.js       # 用户路由
│   ├── services/         # 业务逻辑
│   │   ├── aiService.js  # AI服务
│   │   ├── chatService.js # 聊天服务
│   │   ├── departmentService.js # 部门服务
│   │   ├── messageService.js # 消息服务
│   │   ├── userService.js # 用户服务
│   │   └── websocketService.js # WebSocket服务
│   ├── utils/            # 工具函数
│   │   ├── crypto.js     # 加密工具
│   │   ├── jwt.js        # JWT工具
│   │   ├── logger.js     # 日志工具
│   │   ├── response.js   # 响应工具
│   │   └── validators.js # 验证工具
│   └── app.js           # 应用入口
├── tests/                 # 测试文件
│   ├── unit/             # 单元测试
│   └── integration/      # 集成测试
├── logs/                  # 日志文件
│   ├── error.log         # 错误日志
│   ├── combined.log      # 综合日志
│   └── access.log        # 访问日志
├── uploads/               # 上传文件
│   ├── avatars/          # 头像文件
│   └── documents/        # 文档文件
├── package.json          # 包配置
├── ecosystem.config.js   # PM2配置
└── server.js            # 服务器入口
```

### 3. 数据库 (database/)
```
database/
├── migrations/           # 数据库迁移
│   ├── 001_create_users_table.js
│   ├── 002_create_departments_table.js
│   ├── 003_create_messages_table.js
│   ├── 004_create_conversations_table.js
│   ├── 005_create_knowledge_table.js
│   └── 006_create_permissions_table.js
├── seeds/               # 种子数据
│   ├── department_seeds.js
│   ├── user_seeds.js
│   └── knowledge_seeds.js
├── schemas/             # 数据库模式
│   ├── user_schema.sql
│   ├── message_schema.sql
│   └── conversation_schema.sql
├── procedures/          # 存储过程
│   ├── get_user_stats.sql
│   └── clean_old_data.sql
└── config/              # 数据库配置
    ├── mysql.conf.js
    ├── redis.conf.js
    └── mongodb.conf.js
```

### 4. 部署配置 (deployment/)
```
deployment/
├── docker/              # Docker配置
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   ├── docker-compose.yml
│   └── docker-compose.prod.yml
├── kubernetes/          # K8s配置
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── configmap.yaml
├── nginx/               # Nginx配置
│   ├── nginx.conf
│   ├── ssl.conf
│   └── upstream.conf
├── scripts/             # 部署脚本
│   ├── deploy.sh
│   ├── backup.sh
│   └── restore.sh
├── environments/        # 环境配置
│   ├── dev.env
│   ├── test.env
│   └── prod.env
└── monitoring/          # 监控配置
    ├── prometheus.yml
    ├── grafana.json
    └── alertmanager.yml
```

### 5. 项目文档 (docs/)
```
docs/
├── api/                 # API文档
│   ├── authentication.md
│   ├── chat.md
│   ├── department.md
│   └── websocket.md
├── architecture/        # 架构文档
│   ├── system_design.md
│   ├── database_design.md
│   └── deployment.md
├── development/         # 开发文档
│   ├── setup.md
│   ├── coding_standards.md
│   └── testing_guide.md
├── user_guide/          # 用户手册
│   ├── user_manual.md
│   ├── admin_guide.md
│   └── troubleshooting.md
└── images/              # 文档图片
    ├── architecture.png
    ├── flowchart.png
    └── screenshots/
```

### 6. 共享资源 (shared/)
```
shared/
├── types/               # 类型定义
│   ├── user.types.ts
│   ├── message.types.ts
│   └── department.types.ts
├── constants/           # 共享常量
│   ├── error_codes.js
│   ├── permissions.js
│   └── api_endpoints.js
├── utils/               # 共享工具
│   ├── date_utils.js
│   ├── string_utils.js
│   └── validation_utils.js
└── config/              # 共享配置
    ├── app_config.js
    └── environment.js
```

## 技术栈

### 前端技术栈
- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **UI框架**: Tailwind CSS
- **动画**: Anime.js, Pixi.js
- **HTTP客户端**: Axios
- **WebSocket**: Socket.io-client

### 后端技术栈
- **运行时**: Node.js + Express
- **数据库**: MySQL + Redis
- **ORM**: Sequelize
- **认证**: JWT + Passport
- **WebSocket**: Socket.io
- **日志**: Winston
- **测试**: Jest + Supertest
- **进程管理**: PM2

### 基础设施
- **容器化**: Docker + Docker Compose
- **编排**: Kubernetes (可选)
- **反向代理**: Nginx
- **监控**: Prometheus + Grafana
- **CI/CD**: GitHub Actions (可选)

## 核心功能模块

### 1. 用户认证模块
- 用户注册/登录
- JWT令牌管理
- 权限控制
- 密码加密

### 2. 实时聊天模块
- WebSocket连接
- 消息实时推送
- 打字机效果
- 消息状态同步

### 3. AI问答模块
- 知识库管理
- 智能问答匹配
- 多部门切换
- 反馈收集

### 4. 数据管理模块
- 用户管理
- 消息记录
- 统计分析
- 数据备份

## 部署架构

### 开发环境
```
Frontend (Vite) -> Backend (Express) -> MySQL/Redis
```

### 生产环境
```
Client -> Nginx -> Frontend -> Backend -> Database
              -> Load Balancer -> Multiple Instances
```

## 开发工作流

1. **本地开发**: 使用Docker Compose启动完整环境
2. **代码提交**: Git + 代码规范检查
3. **自动化测试**: 单元测试 + 集成测试
4. **构建部署**: CI/CD流水线自动部署
5. **监控告警**: 实时监控应用状态

这个项目结构提供了完整的企业级AI问答应用实现方案，包含了从前端到后端、从开发到部署的全流程管理。