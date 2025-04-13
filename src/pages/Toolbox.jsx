import { motion } from 'motion/react'
import { useState } from 'react'
import styles from './Toolbox.module.css'

// 然后在组件中使用这些样式类
// 例如: <div className={styles.toolboxContainer}>

export function Toolbox() {
    const [filter, setFilter] = useState('')

    const tools = [
        { name: "React", category: "前端开发", description: "用于构建用户界面的 JavaScript 库", size: "wide" },
        { name: "VS Code", category: "开发环境", description: "轻量级代码编辑器" },
        { name: "Node.js", category: "后端开发", description: "基于 Chrome V8 引擎的 JavaScript 运行环境", size: "tall" },
        { name: "Figma", category: "设计与创意", description: "协作设计工具" },
        { name: "MongoDB", category: "数据库", description: "流行的 NoSQL 数据库系统" },
        { name: "Notion", category: "生产力与组织", description: "一体化工作空间，笔记、数据库、看板等" },
        { name: "Git", category: "开发环境", description: "分布式版本控制系统" },
        { name: "Vue", category: "前端开发", description: "渐进式 JavaScript 框架" },
        { name: "Slack", category: "通讯与协作", description: "团队沟通与协作平台" },
        { name: "Docker", category: "DevOps 与部署", description: "容器化平台" },
        { name: "TypeScript", category: "前端开发", description: "JavaScript 的超集，添加了类型系统" },
        { name: "PostgreSQL", category: "数据库", description: "强大的开源关系型数据库" },
        { name: "Google Docs", category: "写作与编辑", description: "在线协作文档编辑器" },
        { name: "LeetCode", category: "学习与知识", description: "编程题库和学习平台" },
        { name: "Django", category: "后端开发", description: "Python Web 框架" },
        { name: "TailwindCSS", category: "前端开发", description: "实用优先的 CSS 框架" },
        { name: "Zoom", category: "通讯与协作", description: "视频会议和在线会议解决方案" },
        { name: "Photoshop", category: "设计与创意", description: "图像编辑软件" },
        { name: "Webpack", category: "构建与测试", description: "现代 JavaScript 应用的静态模块打包工具" },
        { name: "Trello", category: "生产力与组织", description: "看板式项目管理工具" },
        { name: "MySQL", category: "数据库", description: "最流行的开源关系型数据库" },
        { name: "Jest", category: "构建与测试", description: "JavaScript 测试框架" },
        { name: "FreeCodeCamp", category: "学习与知识", description: "免费的编程学习平台" },
        { name: "Express", category: "后端开发", description: "Node.js Web 应用框架" },
        { name: "Kubernetes", category: "DevOps 与部署", description: "容器编排系统" },
        { name: "Google Calendar", category: "生产力与组织", description: "在线日历，管理日程安排" },
        { name: "Angular", category: "前端开发", description: "Google 的 Web 应用框架" },
        { name: "1Password", category: "系统与安全", description: "密码管理器，生成和存储强密码" },
        { name: "Redis", category: "数据库", description: "高性能的键值对数据库" },
        { name: "Canva", category: "设计与创意", description: "在线平面设计工具，模板丰富" },
        { name: "Spring Boot", category: "后端开发", description: "简化 Spring 应用开发的框架" },
        { name: "IntelliJ IDEA", category: "开发环境", description: "Java 集成开发环境" },
        { name: "Cypress", category: "构建与测试", description: "现代化的端到端测试框架" },
        { name: "Spotify", category: "媒体与娱乐", description: "流媒体音乐服务" },
        { name: "Todoist", category: "生产力与组织", description: "跨平台任务管理应用" },
        { name: "Next.js", category: "前端开发", description: "React 服务端渲染框架" },
        { name: "Jenkins", category: "DevOps 与部署", description: "开源的持续集成工具" },
        { name: "Microsoft Teams", category: "通讯与协作", description: "微软的团队协作中心" },
        { name: "Anki", category: "学习与知识", description: "基于间隔重复的智能闪卡记忆软件" },
        { name: "FastAPI", category: "后端开发", description: "现代、快速的 Python Web 框架" },
        { name: "Google Drive", category: "系统与安全", description: "云存储与文件同步服务" },
        { name: "Svelte", category: "前端开发", description: "创新的前端编译框架" },
        { name: "Prometheus", category: "DevOps 与部署", description: "开源的监控告警系统" },
        { name: "Blender", category: "设计与创意", description: "3D创作套件" },
        { name: "GraphQL", category: "后端开发", description: "API 查询语言和运行时" },
        { name: "Vite", category: "构建与测试", description: "下一代前端构建工具" },
        { name: "Duolingo", category: "学习与知识", description: "游戏化的语言学习应用" },
        { name: "Headspace", category: "健康与生活", description: "冥想与放松指导应用" },
        { name: "Sass", category: "前端开发", description: "CSS 预处理器" },
        { name: "GitLab", category: "DevOps 与部署", description: "完整的 DevOps 平台" },
        { name: "Microsoft Word", category: "写作与编辑", description: "经典的文字处理软件" },
        { name: "SQLite", category: "数据库", description: "轻量级关系型数据库" },
        { name: "Procreate", category: "设计与创意", description: "iPad 绘画应用" },
        { name: "Axios", category: "前端开发", description: "基于 Promise 的 HTTP 客户端" },
        { name: "Terraform", category: "DevOps 与部署", description: "基础设施即代码工具" },
        { name: "Evernote", category: "生产力与组织", description: "经典的笔记和信息收集应用" },
        { name: "Netflix", category: "媒体与娱乐", description: "流媒体视频平台" },
        { name: "Flask", category: "后端开发", description: "轻量级 Python Web 框架" },
        { name: "WebStorm", category: "开发环境", description: "专业的 JavaScript IDE" },
        { name: "Grammarly", category: "写作与编辑", description: "语法检查与写作辅助工具" },
        { name: "Coursera", category: "学习与知识", description: "全球化在线教育平台" },
        { name: "D3.js", category: "前端开发", description: "数据可视化库" },
        { name: "RabbitMQ", category: "后端开发", description: "消息队列中间件" },
        { name: "Elasticsearch", category: "数据库", description: "分布式搜索和分析引擎" },
        { name: "Miro", category: "设计与创意", description: "在线协作白板" },
        { name: "Mocha", category: "构建与测试", description: "JavaScript测试框架" },
        { name: "Discord", category: "通讯与协作", description: "社区沟通与语音聊天平台" },
        { name: "MyFitnessPal", category: "健康与生活", description: "食物热量与营养追踪应用" },
        { name: "Ant Design", category: "前端开发", description: "企业级 UI 设计语言和组件库" },
        { name: "CircleCI", category: "DevOps 与部署", description: "持续集成和交付平台" },
        { name: "Sublime Text", category: "开发环境", description: "快速的文本编辑器" },
        { name: "Audible", category: "媒体与娱乐", description: "有声书平台" },
        { name: "Laravel", category: "后端开发", description: "PHP Web 应用框架" },
        { name: "Sketch", category: "设计与创意", description: "macOS 专业设计工具" },
        { name: "ESLint", category: "构建与测试", description: "JavaScript 代码检查工具" },
        { name: "Khan Academy", category: "学习与知识", description: "免费的在线课程和练习" },
        { name: "Material-UI", category: "前端开发", description: "React UI 框架" },
        { name: "Gmail", category: "通讯与协作", description: "Google 邮件服务" },
        { name: "Prisma", category: "后端开发", description: "下一代 ORM" },
        { name: "Grafana", category: "DevOps 与部署", description: "数据可视化和监控平台" },
        { name: "Keep", category: "健康与生活", description: "家庭健身课程与指导应用" },
        { name: "Babel", category: "前端开发", description: "JavaScript 编译器" },
        { name: "Postman", category: "构建与测试", description: "API 开发和测试工具" },
        { name: "Obsidian", category: "生产力与组织", description: "强大的本地知识库和笔记工具" },
        { name: "MariaDB", category: "数据库", description: "MySQL的开源分支" },
        { name: "InVision", category: "设计与创意", description: "设计协作平台" },
        { name: "HackerRank", category: "学习与知识", description: "编程挑战平台" },
        { name: "NestJS", category: "后端开发", description: "渐进式 Node.js 框架" },
        { name: "Vim", category: "开发环境", description: "文本编辑器" },
        { name: "Typora", category: "写作与编辑", description: "简洁美观的 Markdown 编辑器" },
        { name: "Three.js", category: "前端开发", description: "3D 图形库" },
        { name: "Ansible", category: "DevOps 与部署", description: "自动化配置管理工具" },
        { name: "Strava", category: "健康与生活", description: "运动追踪与社交分享 (跑步、骑行)" },
        { name: "Nuxt.js", category: "前端开发", description: "Vue.js 服务端渲染框架" },
        { name: "Kafka", category: "后端开发", description: "分布式流平台" },
        { name: "CodePen", category: "学习与知识", description: "前端代码分享平台" },
        { name: "Adobe Premiere", category: "设计与创意", description: "视频编辑软件" },
        { name: "Prettier", category: "构建与测试", description: "代码格式化工具" },
        { name: "Asana", category: "生产力与组织", description: "团队项目与任务管理平台" },
        { name: "Cassandra", category: "数据库", description: "分布式NoSQL数据库" },
        { name: "Motion", category: "前端开发", description: "React 动画库" },
        { name: "SonarQube", category: "DevOps 与部署", description: "代码质量管理平台" },
        { name: "Zotero", category: "学习与知识", description: "文献管理与引用工具" },
        { name: "Koa", category: "后端开发", description: "新一代 Web 框架" },
        { name: "PyCharm", category: "开发环境", description: "Python IDE" },
        { name: "Google Sheets", category: "财务管理", description: "电子表格，可用于记账和预算规划" },
        { name: "Chart.js", category: "前端开发", description: "简单yet灵活的图表库" },
        { name: "Helm", category: "DevOps 与部署", description: "Kubernetes包管理器" },
        { name: "Goodreads", category: "学习与知识", description: "图书推荐与阅读社区" },
        { name: "Adobe XD", category: "设计与创意", description: "用户体验设计工具" },
        { name: "React Router", category: "前端开发", description: "React 路由库" },
        { name: "Telegram", category: "通讯与协作", description: "注重安全和速度的即时通讯应用" },
        { name: "Neo4j", category: "数据库", description: "图形数据库" },
        { name: "Selenium", category: "构建与测试", description: "自动化测试工具" },
        { name: "TickTick", category: "生产力与组织", description: "结合任务、日历、习惯打卡的管理应用" },
        { name: "Ruby on Rails", category: "后端开发", description: "Ruby Web 应用框架" },
        { name: "Android Studio", category: "开发环境", description: "Android 开发 IDE" },
        { name: "Pocket", category: "学习与知识", description: "稍后阅读服务，保存文章和网页" },
        { name: "Chakra UI", category: "前端开发", description: "简单、模块化的组件库" },
        { name: "OBS Studio", category: "系统与安全", description: "免费开源的视频录制和直播软件" },
        { name: "YNAB", category: "财务管理", description: "零基预算方法的预算软件" },
        { name: "Illustrator", category: "设计与创意", description: "矢量图形设计软件" },
        { name: "Redux", category: "前端开发", description: "状态管理库" },
        { name: "GitHub Learning Lab", category: "学习与知识", description: "交互式学习平台" },
        { name: "Harbor", category: "DevOps 与部署", description: "容器镜像仓库" },
        { name: "Pinia", category: "前端开发", description: "Vue 状态管理库" },
        { name: "Sequelize", category: "后端开发", description: "Node.js ORM" },
        { name: "VLC Media Player", category: "系统与安全", description: "强大的跨平台多媒体播放器" },
        { name: "Framer", category: "设计与创意", description: "交互原型设计" },
        { name: "Jasmine", category: "构建与测试", description: "行为驱动的测试框架" },
        { name: "Google Meet", category: "通讯与协作", description: "Google 的视频会议服务" },
        { name: "Memcached", category: "数据库", description: "分布式内存对象缓存系统" },
        { name: "Frontend Masters", category: "学习与知识", description: "前端进阶教程" },
        { name: "Socket.IO", category: "前端开发", description: "实时双向通信库" },
        { name: "Rancher", category: "DevOps 与部署", description: "容器管理平台" },
        { name: "iA Writer", category: "写作与编辑", description: "专注写作的 Markdown 编辑器" },
        { name: "Hibernate", category: "后端开发", description: "ORM 框架" },
        { name: "Eclipse", category: "开发环境", description: "集成开发环境" },
        { name: "Sleep Cycle", category: "健康与生活", description: "智能睡眠追踪与闹钟应用" },
        { name: "React Query", category: "前端开发", description: "数据获取和缓存库" },
        { name: "Maven", category: "构建与测试", description: "项目管理工具" },
        { name: "Zeplin", category: "设计与创意", description: "设计交付协作平台" },
        { name: "CodeWars", category: "学习与知识", description: "编程练习平台" },
        { name: "gRPC", category: "后端开发", description: "高性能RPC框架" },
        { name: "Atom", category: "开发环境", description: "GitHub 开发的文本编辑器" },
        { name: "Mint", category: "财务管理", description: "个人财务管理和预算追踪应用" },
        { name: "Less", category: "前端开发", description: "动态样式语言" },
        { name: "Istio", category: "DevOps 与部署", description: "服务网格" },
        { name: "Principle", category: "设计与创意", description: "交互动画设计" },
        { name: "Vuex", category: "前端开发", description: "Vue.js 的状态管理模式" },
        { name: "MyBatis", category: "后端开发", description: "持久层框架" },
        { name: "Udacity", category: "学习与知识", description: "在线技术教育" },
        { name: "SWR", category: "前端开发", description: "用于数据获取的 React Hooks 库" },
        { name: "Nexus", category: "DevOps 与部署", description: "仓库管理器" },
        { name: "Waterllama", category: "健康与生活", description: "提醒按时喝水的应用" },
        { name: "MobX", category: "前端开发", description: "简单、可扩展的状态管理" },
        { name: "Swagger", category: "构建与测试", description: "API 文档和设计工具" },
        { name: "Xcode", category: "开发环境", description: "苹果开发环境" },
        { name: "Lightroom", category: "设计与创意", description: "照片编辑与管理软件" },
        { name: "PyTest", category: "构建与测试", description: "Python测试框架" },
        { name: "WhatsApp", category: "通讯与协作", description: "流行的跨平台即时通讯应用" },
        { name: "InfluxDB", category: "数据库", description: "时序数据库" },
        { name: "Forest App", category: "生产力与组织", description: "通过种树保持专注的应用" },
        { name: "ASP.NET Core", category: "后端开发", description: "跨平台 .NET Web 框架" },
        { name: "GeeksforGeeks", category: "学习与知识", description: "计算机科学学习平台" },
        { name: "Webpack Dev Server", category: "前端开发", description: "开发服务器" },
        { name: "Puppet", category: "DevOps 与部署", description: "配置管理工具" },
        { name: "DaVinci Resolve", category: "设计与创意", description: "免费且强大的专业视频编辑软件" },
        { name: "Rollup", category: "构建与测试", description: "JavaScript 模块打包器" },
        { name: "Microsoft To Do", category: "生产力与组织", description: "微软的任务管理应用" },
        { name: "Thrift", category: "后端开发", description: "可伸缩的跨语言服务框架" },
        { name: "CodeSandbox", category: "开发环境", description: "在线代码编辑器" },
        { name: "Paprika Recipe Manager", category: "健康与生活", description: "食谱管理与购物清单应用" },
        { name: "Gradle", category: "构建与测试", description: "项目自动化构建工具" },
        { name: "Kibana", category: "DevOps 与部署", description: "数据可视化和分析平台" },
        { name: "JSFiddle", category: "学习与知识", description: "在线代码演示" },
        { name: "Cinema 4D", category: "设计与创意", description: "3D动画软件" },
        { name: "Emacs", category: "开发环境", description: "可扩展编辑器" },
        { name: "Scrivener", category: "写作与编辑", description: "强大的长文写作与管理工具" },
        { name: "Gin", category: "后端开发", description: "Go Web 框架" },
        { name: "Feedly", category: "学习与知识", description: "RSS 新闻聚合阅读器" },
        { name: "Parcel", category: "构建与测试", description: "零配置构建工具" },
        { name: "Adobe After Effects", category: "设计与创意", description: "视频特效和动画制作" },
        { name: "Freedom", category: "生产力与组织", description: "屏蔽网站和应用的干扰，专注工作" },
        { name: "CouchDB", category: "数据库", description: "文档数据库" },
        { name: "TeamCity", category: "DevOps 与部署", description: "持续集成工具" },
        { name: "Mealime", category: "健康与生活", description: "快速简单的健康食谱计划应用" },
        { name: "Echo", category: "后端开发", description: "高性能 Go Web 框架" },
        { name: "Replit", category: "开发环境", description: "在线IDE" },
        { name: "Ulysses", category: "写作与编辑", description: "Markdown 写作应用 (Apple 平台)" },
        { name: "esbuild", category: "构建与测试", description: "极速JavaScript打包器" },
        { name: "PluralSight", category: "学习与知识", description: "技能发展平台" },
        { name: "Spring Cloud", category: "后端开发", description: "分布式系统解决方案" },
        { name: "Google Keep", category: "生产力与组织", description: "轻量级笔记和提醒工具" },
        { name: "Axure", category: "设计与创意", description: "专业的原型设计工具" },
        { name: "JUnit", category: "构建与测试", description: "Java单元测试框架" },
        { name: "Gitpod", category: "开发环境", description: "云开发环境" },
        { name: "Wikipedia", category: "学习与知识", description: "自由、开放内容的多语言网络百科全书" },
        { name: "Workflowy", category: "生产力与组织", description: "无限层级的列表式笔记工具" },
        { name: "Chef", category: "DevOps 与部署", description: "系统集成框架" },
        { name: "Kindle", category: "媒体与娱乐", description: "电子书阅读器或应用" },
        { name: "Artillery", category: "构建与测试", description: "负载测试工具" },
        { name: "BandLab", category: "设计与创意", description: "在线协作音乐创作平台" },
        { name: "Outlook", category: "通讯与协作", description: "微软邮件与日历客户端" },
        { name: "Dev.to", category: "学习与知识", description: "程序员社区和博客平台" },
        { name: "GarageBand", category: "设计与创意", description: "苹果平台的音乐创作入门软件" },
        { name: "JMeter", category: "构建与测试", description: "性能测试工具" },
        { name: "DataGrip", category: "开发环境", description: "数据库IDE" },
        { name: "Pocket Casts", category: "媒体与娱乐", description: "播客（Podcast）收听应用" },
        { name: "PHPUnit", category: "构建与测试", description: "PHP测试框架" },
        { name: "Bamboo", category: "DevOps 与部署", description: "持续集成和部署工具" },
        { name: "egghead", category: "学习与知识", description: "专业开发教程" },
        { name: "Calibre", category: "系统与安全", description: "电子书管理软件" },
        { name: "Pomodoro Technique", category: "生产力与组织", description: "番茄工作法，提升专注度的时间管理方法" },
        { name: "MindNode", category: "生产力与组织", description: "思维导图软件，整理思路与创意" },
        { name: "Transmission", category: "系统与安全", description: "开源的 BitTorrent 客户端" },
        { name: "Raindrop.io", category: "生产力与组织", description: "跨平台的书签管理工具" },
        { name: "IFTTT", category: "系统与安全", description: "连接不同 App 和服务的自动化平台" },
        { name: "uBlock Origin", category: "系统与安全", description: "开源的广告拦截浏览器扩展" },
        { name: "CleanMyMac", category: "系统与安全", description: "系统清理与优化工具" },
        { name: "Alfred", category: "系统与安全", description: "高效的启动器与效率工具" },
        { name: "ShareX", category: "系统与安全", description: "强大的截图与屏幕录制工具" },
        { name: "7-Zip", category: "系统与安全", description: "文件压缩与解压缩工具" },
        { name: "IrfanView", category: "系统与安全", description: "轻量级快速图片查看器" },
        { name: "HandBrake", category: "系统与安全", description: "开源的视频转码工具" },
        { name: "ImageOptim", category: "系统与安全", description: "图片无损或有损压缩工具" },
        { name: "Carbon", category: "设计与创意", description: "生成漂亮的代码截图分享工具" },
    ].map(tool => ({
        ...tool,
        size: tool.name.length > 17 ? 'wider' : tool.name.length > 9 ? 'wide' :
            tool.description.length > 20 ? 'wide' : 'normal'
    }))

    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(filter.toLowerCase()) ||
        tool.category.toLowerCase().includes(filter.toLowerCase()) ||
        tool.description.toLowerCase().includes(filter.toLowerCase())
    )

    const categories = [...new Set(tools.map(tool => tool.category))]

    return (
        <div className={styles.toolboxContainer}>
            <div className={styles.toolboxContent}>
                <main className={styles.toolboxMain}>
                    <h2 className="subtitle interact">我的开发工具与实用工具 ~</h2>

                    <motion.section
                        className={styles.toolsSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.toolsGrid}>
                            {filteredTools.map((tool, index) => (
                                <motion.div
                                    className={styles.toolCard}
                                    data-category={tool.category}
                                    data-size={tool.size}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: Math.min(index * 0.02, 0.8),
                                        duration: 0.2
                                    }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    key={tool.name}
                                >
                                    <h3 className="interact">{tool.name}</h3>
                                    <p className={`${styles.toolDesc} text`}>{tool.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </main>
            </div>

            <div className={styles.filterSidebar}>
                <div className={styles.filterContainer}>
                    <div className={styles.categoryFilters}>
                        <div className={styles.categoryButtons}>
                            <button
                                className={`${styles.categoryBtn} ${filter === '' ? styles.active : ''}`}
                                onClick={() => setFilter('')}
                            >
                                全部
                            </button>
                            {categories.map(category => (
                                <button
                                    className={`${styles.categoryBtn} ${filter === category ? styles.active : ''}`}
                                    onClick={() => setFilter(category)}
                                    key={category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}