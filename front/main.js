// AI数字员工问答应用 - 主要逻辑
class AIDigitalEmployee {
    constructor() {
        this.currentDepartment = 'hr';
        this.messageCount = 0;
        this.responseTimes = [];
        this.isTyping = false;
        this.particleApp = null;
        
        // 部门配置
        this.departments = {
            hr: {
                name: '人事部 AI 助手',
                status: '在线 | 随时为您服务',
                avatar: 'resources/avatar-hr.png',
                welcome: '您好！我是人事部AI助手，很高兴为您服务。我可以帮您解答关于考勤制度、请假流程、薪资福利等方面的问题。请问有什么可以帮助您的吗？',
                quickQuestions: ['公司考勤制度', '如何申请年假', '薪资发放时间', '加班政策', '员工福利']
            },
            finance: {
                name: '财务部 AI 助手',
                status: '在线 | 财务咨询专家',
                avatar: 'resources/avatar-finance.png',
                welcome: '您好！我是财务部AI助手，专注于财务报销、预算申请、发票处理等业务。请问您在财务方面有什么需要咨询的吗？',
                quickQuestions: ['差旅费报销', '发票要求', '预算申请流程', '费用标准', '付款周期']
            },
            market: {
                name: '市场部 AI 助手',
                status: '在线 | 营销顾问',
                avatar: 'resources/avatar-market.png',
                welcome: '您好！我是市场部AI助手，可以为您提供品牌规范、活动策划、广告投放等专业建议。有什么市场营销方面的问题吗？',
                quickQuestions: ['品牌规范', '活动策划流程', '广告投放', '市场调研', '竞品分析']
            },
            tech: {
                name: '技术部 AI 助手',
                status: '在线 | 技术支持',
                avatar: 'resources/avatar-tech.png',
                welcome: '您好！我是技术部AI助手，负责解答开发规范、系统部署、技术文档等问题。遇到什么技术难题了吗？',
                quickQuestions: ['开发规范', '部署流程', 'API文档', '技术架构', '问题排查']
            }
        };
        
        // 知识库
        this.knowledgeBase = {
            hr: {
                '考勤制度': '公司考勤制度规定：上班时间为9:00-18:00，弹性半小时。迟到15分钟内不扣款，超过15分钟按半小时事假计算。每月有2次补签机会。加班需提前申请，按国家规定支付加班费。',
                '年假申请': '申请年假需提前3天在OA系统提交申请，经直属领导审批即可。年假天数根据工作年限计算：1-10年5天，10-20年10天，20年以上15天。年假需在当年内休完，不可跨年。',
                '薪资发放': '薪资每月15日发放，如遇节假日提前。薪资包括基本工资、绩效奖金、津贴等。工资条可在OA系统查看，如有疑问可联系人事部。薪资保密，请勿相互询问。',
                '加班政策': '工作日加班按1.5倍工资计算，周末加班按2倍，法定节假日按3倍。加班需提前申请，经部门负责人审批。每月加班不超过36小时，保障员工休息权益。',
                '员工福利': '公司福利包括：五险一金、年终奖、节日礼品、生日蛋糕、团建活动、健康体检、带薪年假等。另有员工食堂、健身房、图书馆等便民设施。'
            },
            finance: {
                '差旅费报销': '差旅费报销需提供：交通费发票、住宿费发票、出差申请单。交通费按实际报销，住宿费标准：一线城市500元/晚，二线城市300元/晚。餐补按出差天数计算，每天150元。',
                '发票要求': '报销发票需为正规发票，抬头为公司全称，税号正确。发票内容需与实际业务相符，金额清晰。电子发票需打印，增值税专用发票需认证。发票有效期为开票日起30天内。',
                '预算申请': '预算申请需填写《预算申请表》，说明用途、金额、时间等。1万元以下由部门负责人审批，1-5万元由分管副总审批，5万元以上由总经理审批。预算执行率将作为考核指标。',
                '费用标准': '业务招待费标准：重要客户500元/人，一般客户300元/人。办公用品采购需比价三家，单价超过1000元需申请。通讯费补贴：管理层300元/月，普通员工150元/月。',
                '付款周期': '供应商付款周期为30天，特殊情况可申请加急。员工报销审核通过后7个工作日内付款。工资每月15日发放，年终奖春节前发放。所有付款均通过银行转账。'
            },
            market: {
                '品牌规范': '公司品牌色为蓝色(#1e3a8a)和白色，字体使用Noto Sans SC。Logo最小尺寸不小于24px，周围需留白。宣传材料需统一风格，体现专业、创新、可靠的品牌形象。',
                '活动策划流程': '活动策划需提前1个月提交方案，包括：活动目标、预算、时间表、人员分工等。方案审批通过后执行，活动结束后需提交总结报告。大型活动需成立专项小组。',
                '广告投放': '广告投放需制定详细计划，包括：目标受众、投放渠道、预算分配、预期效果等。投放前需小范围测试，根据效果调整策略。每月分析投放数据，优化ROI。',
                '市场调研': '市场调研分为定量调研和定性调研。定量调研通过问卷收集数据，样本量不少于300份。定性调研通过深度访谈获取洞察，访谈对象需具代表性。调研报告需包含数据分析和建议。',
                '竞品分析': '竞品分析从以下维度展开：产品功能、价格策略、市场表现、营销手段、用户评价等。每月更新竞品动态，每季度形成分析报告。分析结果用于产品优化和策略调整。'
            },
            tech: {
                '开发规范': '前端使用Vue3+TypeScript，后端使用Spring Boot。代码需遵循ESLint规范，提交前需通过code review。Git提交信息需规范，功能开发需创建feature分支。',
                '部署流程': '代码提交后自动触发CI/CD流程。测试环境通过后方可部署生产环境。部署时间窗口为工作日晚8点后，重大版本升级需提前通知。回滚预案需准备就绪。',
                'API文档': 'API文档使用Swagger自动生成，包含接口说明、参数定义、返回值等。所有接口需有详细注释，示例代码需完整。文档更新需与代码同步。',
                '技术架构': '系统采用微服务架构，前端SPA，后端RESTful API。数据库使用MySQL主从复制，缓存使用Redis。消息队列使用RabbitMQ，文件存储使用OSS。',
                '问题排查': '问题排查遵循以下步骤：1)复现问题 2)查看日志 3)分析代码 4)定位原因 5)制定解决方案。重大问题需在2小时内响应，24小时内解决。'
            }
        };
        
        this.init();
    }
    
    init() {
        this.initParticleBackground();
        this.bindEvents();
        this.updateQuickQuestions();
        this.animateStats();
        
        // 添加欢迎动画
        setTimeout(() => {
            this.animateWelcomeMessage();
        }, 500);
    }
    
    // 初始化粒子背景
    initParticleBackground() {
        const canvas = document.getElementById('particles-canvas');
        const app = new PIXI.Application({
            view: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000000,
            backgroundAlpha: 0,
            antialias: true
        });
        
        this.particleApp = app;
        
        // 创建粒子容器
        const particleContainer = new PIXI.Container();
        app.stage.addChild(particleContainer);
        
        // 粒子数组
        const particles = [];
        const particleCount = 50;
        
        // 创建粒子
        for (let i = 0; i < particleCount; i++) {
            const particle = new PIXI.Graphics();
            particle.beginFill(0x3b82f6, 0.3);
            particle.drawCircle(0, 0, Math.random() * 3 + 1);
            particle.endFill();
            
            particle.x = Math.random() * window.innerWidth;
            particle.y = Math.random() * window.innerHeight;
            particle.vx = (Math.random() - 0.5) * 0.5;
            particle.vy = (Math.random() - 0.5) * 0.5;
            
            particles.push(particle);
            particleContainer.addChild(particle);
        }
        
        // 动画循环
        app.ticker.add(() => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // 边界检测
                if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
                if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
                
                // 保持在画布内
                particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
                particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            });
        });
        
        // 窗口大小调整
        window.addEventListener('resize', () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
        });
    }
    
    // 绑定事件
    bindEvents() {
        // 部门切换
        document.querySelectorAll('.department-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const department = e.currentTarget.dataset.department;
                this.switchDepartment(department);
            });
        });
        
        // 发送消息
        const sendButton = document.getElementById('send-button');
        const messageInput = document.getElementById('message-input');
        
        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // 输入字符计数
        messageInput.addEventListener('input', (e) => {
            const count = e.target.value.length;
            document.getElementById('char-count').textContent = `${count}/500`;
        });
        
        // 快速问题
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-question')) {
                const question = e.target.textContent;
                document.getElementById('message-input').value = question;
                this.sendMessage();
            }
        });
    }
    
    // 切换部门
    switchDepartment(department) {
        if (department === this.currentDepartment) return;
        
        // 更新选中状态
        document.querySelectorAll('.department-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-department="${department}"]`).classList.add('active');
        
        // 更新当前部门
        this.currentDepartment = department;
        const deptInfo = this.departments[department];
        
        // 更新头部信息
        document.getElementById('current-avatar').src = deptInfo.avatar;
        document.getElementById('current-name').textContent = deptInfo.name;
        document.getElementById('current-status').textContent = deptInfo.status;
        
        // 清空对话并显示欢迎消息
        this.clearConversation();
        setTimeout(() => {
            this.addAIMessage(deptInfo.welcome, deptInfo.avatar);
            this.updateQuickQuestions();
        }, 300);
    }
    
    // 发送消息
    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;
        
        // 清空输入框
        input.value = '';
        document.getElementById('char-count').textContent = '0/500';
        
        // 添加用户消息
        this.addUserMessage(message);
        
        // 显示AI输入状态
        this.showTypingIndicator();
        
        // 模拟AI响应
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateAIResponse(message);
        }, 1000 + Math.random() * 1000);
        
        // 更新统计
        this.messageCount++;
        this.updateStats();
    }
    
    // 添加用户消息
    addUserMessage(message) {
        const container = document.getElementById('messages-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-bubble mb-6';
        messageDiv.innerHTML = `
            <div class="flex items-end justify-end space-x-3">
                <div class="bg-blue-500 rounded-2xl px-4 py-3 max-w-2xl">
                    <p class="text-white">${this.escapeHtml(message)}</p>
                </div>
                <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
            </div>
        `;
        container.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    // 添加AI消息（打字机效果）
    addAIMessage(message, avatar) {
        const container = document.getElementById('messages-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-bubble mb-6';
        messageDiv.innerHTML = `
            <div class="flex items-start space-x-3">
                <img src="${avatar}" alt="AI" class="w-8 h-8 rounded-full object-cover">
                <div class="bg-white/10 rounded-2xl px-4 py-3 max-w-2xl">
                    <p class="text-white" id="typing-text"></p>
                </div>
            </div>
        `;
        container.appendChild(messageDiv);
        this.scrollToBottom();
        
        // 打字机效果
        this.typeMessage(message, messageDiv.querySelector('#typing-text'));
    }
    
    // 打字机效果
    typeMessage(message, element) {
        this.isTyping = true;
        let index = 0;
        const speed = 30; // 打字速度（毫秒）
        
        const typeInterval = setInterval(() => {
            if (index < message.length) {
                element.textContent += message.charAt(index);
                index++;
                this.scrollToBottom();
            } else {
                clearInterval(typeInterval);
                this.isTyping = false;
                
                // 添加反馈按钮
                this.addFeedbackButtons(element.parentElement);
            }
        }, speed);
    }
    
    // 添加反馈按钮
    addFeedbackButtons(messageElement) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'mt-3 flex space-x-2';
        feedbackDiv.innerHTML = `
            <button class="feedback-btn text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors" data-type="useful">
                👍 有用
            </button>
            <button class="feedback-btn text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors" data-type="useless">
                👎 无用
            </button>
            <button class="feedback-btn text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors" data-type="regenerate">
                🔄 重新生成
            </button>
        `;
        messageElement.appendChild(feedbackDiv);
        
        // 绑定反馈事件
        feedbackDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('feedback-btn')) {
                const type = e.target.dataset.type;
                this.handleFeedback(type, e.target);
            }
        });
    }
    
    // 处理反馈
    handleFeedback(type, button) {
        const feedbackTexts = {
            useful: '感谢您的反馈！',
            useless: '感谢您的反馈，我们会继续改进！',
            regenerate: '正在重新生成回答...'
        };
        
        button.textContent = feedbackTexts[type];
        button.disabled = true;
        button.classList.add('opacity-50');
        
        if (type === 'regenerate') {
            setTimeout(() => {
                const messageElement = button.closest('.message-bubble');
                const message = messageElement.querySelector('#typing-text');
                message.textContent = '';
                this.typeMessage('根据您的反馈，我重新整理了答案...', message);
            }, 1000);
        }
    }
    
    // 显示输入指示器
    showTypingIndicator() {
        const container = document.getElementById('messages-container');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'message-bubble mb-6';
        typingDiv.innerHTML = `
            <div class="flex items-start space-x-3">
                <img src="${this.departments[this.currentDepartment].avatar}" alt="AI" class="w-8 h-8 rounded-full object-cover">
                <div class="bg-white/10 rounded-2xl px-4 py-3">
                    <div class="flex space-x-1">
                        <div class="typing-indicator"></div>
                        <div class="typing-indicator"></div>
                        <div class="typing-indicator"></div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    // 隐藏输入指示器
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // 生成AI响应
    generateAIResponse(userMessage) {
        const deptKnowledge = this.knowledgeBase[this.currentDepartment];
        let response = '';
        
        // 简单的关键词匹配
        const message = userMessage.toLowerCase();
        let found = false;
        
        for (const [key, value] of Object.entries(deptKnowledge)) {
            if (message.includes(key) || key.includes(message)) {
                response = value;
                found = true;
                break;
            }
        }
        
        // 如果没找到匹配，给出通用回复
        if (!found) {
            response = this.generateGenericResponse(message);
        }
        
        // 记录响应时间
        const responseTime = 1 + Math.random() * 2;
        this.responseTimes.push(responseTime);
        
        // 添加AI消息
        this.addAIMessage(response, this.departments[this.currentDepartment].avatar);
    }
    
    // 生成通用回复
    generateGenericResponse(message) {
        const genericResponses = [
            '感谢您的问题！让我为您详细解答...',
            '这是一个很好的问题，我来帮您分析一下...',
            '根据公司相关政策，我来为您说明...',
            '我理解您的需求，让我为您提供准确的信息...',
            '关于这个问题，我来为您详细介绍...'
        ];
        
        const randomResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
        
        const deptSpecific = {
            hr: '如果您需要了解具体的考勤制度、请假流程或薪资福利，请告诉我具体的问题。',
            finance: '如果您需要了解报销流程、发票要求或预算申请，请提供更详细的信息。',
            market: '如果您需要了解品牌规范、活动策划或广告投放，请告诉我具体需求。',
            tech: '如果您需要了解开发规范、部署流程或技术文档，请提供具体的技术问题。'
        };
        
        return `${randomResponse}\n\n${deptSpecific[this.currentDepartment]}\n\n如果您的问题比较复杂，建议您：\n1. 提供更详细的背景信息\n2. 说明具体的需求场景\n3. 告知期望的解决方案`;
    }
    
    // 更新快速问题
    updateQuickQuestions() {
        const container = document.getElementById('quick-questions');
        const questions = this.departments[this.currentDepartment].quickQuestions;
        
        container.innerHTML = questions.map(question => 
            `<button class="quick-question px-3 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-colors">
                ${question}
            </button>`
        ).join('');
    }
    
    // 清空对话
    clearConversation() {
        const container = document.getElementById('messages-container');
        container.innerHTML = '';
    }
    
    // 滚动到底部
    scrollToBottom() {
        const container = document.getElementById('messages-container');
        container.scrollTop = container.scrollHeight;
    }
    
    // 更新统计
    updateStats() {
        document.getElementById('today-messages').textContent = this.messageCount;
        
        if (this.responseTimes.length > 0) {
            const avgTime = this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;
            document.getElementById('avg-response').textContent = avgTime.toFixed(1) + 's';
        }
    }
    
    // 统计动画
    animateStats() {
        anime({
            targets: '#today-messages',
            innerHTML: [0, 23],
            duration: 2000,
            round: 1,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '#avg-response',
            innerHTML: [0, 1.5],
            duration: 2000,
            round: 1,
            easing: 'easeOutExpo',
            update: function(anim) {
                document.getElementById('avg-response').innerHTML = anim.animatables[0].target.innerHTML + 's';
            }
        });
    }
    
    // 欢迎消息动画
    animateWelcomeMessage() {
        anime({
            targets: '.message-bubble:first-child',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
    
    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new AIDigitalEmployee();
});

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时的处理
        console.log('应用重新激活');
    }
});