import { motion } from 'motion/react'
import { useState } from 'react'
import styles from './Toolbox.module.css'
import './list.css'  // 引入通用样式

export function Toolbox() {
    const [filter, setFilter] = useState('')

    const tools = [
        { name: "React", category: "前端开发", description: "用于构建用户界面的 JavaScript 库", link: "https://react.dev/" },
        { name: "VS Code", category: "开发环境", description: "轻量级代码编辑器", link: "https://code.visualstudio.com/" },
        { name: "Node.js", category: "后端开发", description: "基于 Chrome V8 引擎的 JavaScript 运行环境", link: "https://nodejs.org/" },
        { name: "Figma", category: "设计与创意", description: "协作设计工具", link: "https://www.figma.com/" },
        { name: "MongoDB", category: "数据库", description: "流行的 NoSQL 数据库系统", link: "https://www.mongodb.com/" },
        { name: "Notion", category: "生产力与组织", description: "一体化工作空间，笔记、数据库、看板等", link: "https://www.notion.so/" },
        { name: "Git", category: "开发环境", description: "分布式版本控制系统", link: "https://git-scm.com/" },
        { name: "Vue", category: "前端开发", description: "渐进式 JavaScript 框架", link: "https://vuejs.org/" },
        { name: "Slack", category: "通讯与协作", description: "团队沟通与协作平台", link: "https://slack.com/" },
        { name: "Docker", category: "DevOps 与部署", description: "容器化平台", link: "https://www.docker.com/" },
        { name: "TypeScript", category: "前端开发", description: "JavaScript 的超集，添加了类型系统", link: "https://www.typescriptlang.org/" },
        { name: "PostgreSQL", category: "数据库", description: "强大的开源关系型数据库", link: "https://www.postgresql.org/" },
        { name: "Google Docs", category: "写作与编辑", description: "在线协作文档编辑器", link: "https://docs.google.com/" },
        { name: "LeetCode", category: "学习与知识", description: "编程题库和学习平台", link: "https://leetcode.com/" },
        { name: "Django", category: "后端开发", description: "Python Web 框架", link: "https://www.djangoproject.com/" },
        { name: "TailwindCSS", category: "前端开发", description: "实用优先的 CSS 框架", link: "https://tailwindcss.com/" },
        { name: "Zoom", category: "通讯与协作", description: "视频会议和在线会议解决方案", link: "https://zoom.us/" },
        { name: "Photoshop", category: "设计与创意", description: "图像编辑软件", link: "https://www.adobe.com/products/photoshop.html" },
        { name: "Webpack", category: "构建与测试", description: "现代 JavaScript 应用的静态模块打包工具", link: "https://webpack.js.org/" },
        { name: "Trello", category: "生产力与组织", description: "看板式项目管理工具", link: "https://trello.com/" },
        { name: "MySQL", category: "数据库", description: "最流行的开源关系型数据库", link: "https://www.mysql.com/" },
        { name: "Jest", category: "构建与测试", description: "JavaScript 测试框架", link: "https://jestjs.io/" },
        { name: "FreeCodeCamp", category: "学习与知识", description: "免费的编程学习平台", link: "https://www.freecodecamp.org/" },
        { name: "Express", category: "后端开发", description: "Node.js Web 应用框架", link: "https://expressjs.com/" },
        { name: "Kubernetes", category: "DevOps 与部署", description: "容器编排系统", link: "https://kubernetes.io/" },
        { name: "Google Calendar", category: "生产力与组织", description: "在线日历，管理日程安排", link: "https://calendar.google.com/" },
        { name: "Angular", category: "前端开发", description: "Google 的 Web 应用框架", link: "https://angular.io/" },
        { name: "1Password", category: "系统与安全", description: "密码管理器，生成和存储强密码", link: "https://1password.com/" },
        { name: "Redis", category: "数据库", description: "高性能的键值对数据库", link: "https://redis.io/" },
        { name: "Canva", category: "设计与创意", description: "在线平面设计工具，模板丰富", link: "https://www.canva.com/" },
        { name: "Spring Boot", category: "后端开发", description: "简化 Spring 应用开发的框架", link: "https://spring.io/projects/spring-boot" },
        { name: "IntelliJ IDEA", category: "开发环境", description: "Java 集成开发环境", link: "https://www.jetbrains.com/idea/" },
        { name: "Cypress", category: "构建与测试", description: "现代化的端到端测试框架", link: "https://www.cypress.io/" },
        { name: "Spotify", category: "媒体与娱乐", description: "流媒体音乐服务", link: "https://www.spotify.com/" },
        { name: "Todoist", category: "生产力与组织", description: "跨平台任务管理应用", link: "https://todoist.com/" },
        { name: "Next.js", category: "前端开发", description: "React 服务端渲染框架", link: "https://nextjs.org/" },
        { name: "Jenkins", category: "DevOps 与部署", description: "开源的持续集成工具", link: "https://www.jenkins.io/" },
        { name: "Microsoft Teams", category: "通讯与协作", description: "微软的团队协作中心", link: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software" },
        { name: "Anki", category: "学习与知识", description: "基于间隔重复的智能闪卡记忆软件", link: "https://apps.ankiweb.net/" },
        { name: "FastAPI", category: "后端开发", description: "现代、快速的 Python Web 框架", link: "https://fastapi.tiangolo.com/" },
        { name: "Google Drive", category: "系统与安全", description: "云存储与文件同步服务", link: "https://drive.google.com/" }, // Note: Category might be better as 'Cloud Storage'
        { name: "Svelte", category: "前端开发", description: "创新的前端编译框架", link: "https://svelte.dev/" },
        { name: "Prometheus", category: "DevOps 与部署", description: "开源的监控告警系统", link: "https://prometheus.io/" },
        { name: "Blender", category: "设计与创意", description: "3D 创作套件", link: "https://www.blender.org/" },
        { name: "GraphQL", category: "后端开发", description: "API 查询语言和运行时", link: "https://graphql.org/" },
        { name: "Vite", category: "构建与测试", description: "下一代前端构建工具", link: "https://vitejs.dev/" },
        { name: "Duolingo", category: "学习与知识", description: "游戏化的语言学习应用", link: "https://www.duolingo.com/" },
        { name: "Headspace", category: "健康与生活", description: "冥想与放松指导应用", link: "https://www.headspace.com/" },
        { name: "Sass", category: "前端开发", description: "CSS 预处理器", link: "https://sass-lang.com/" },
        { name: "GitLab", category: "DevOps 与部署", description: "完整的 DevOps 平台", link: "https://about.gitlab.com/" },
        { name: "Microsoft Word", category: "写作与编辑", description: "Classical 文字处理软件", link: "https://www.microsoft.com/en-us/microsoft-365/word" },
        { name: "SQLite", category: "数据库", description: "轻量级关系型数据库", link: "https://www.sqlite.org/" },
        { name: "Procreate", category: "设计与创意", description: "iPad 绘画应用", link: "https://procreate.art/" },
        { name: "Axios", category: "前端开发", description: "基于 Promise 的 HTTP 客户端", link: "https://axios-http.com/" },
        { name: "Terraform", category: "DevOps 与部署", description: "基础设施即代码工具", link: "https://www.terraform.io/" },
        { name: "Evernote", category: "生产力与组织", description: "Classical 笔记和信息收集应用", link: "https://evernote.com/" },
        { name: "Netflix", category: "媒体与娱乐", description: "流媒体视频平台", link: "https://www.netflix.com/" },
        { name: "Flask", category: "后端开发", description: "轻量级 Python Web 框架", link: "https://flask.palletsprojects.com/" },
        { name: "WebStorm", category: "开发环境", description: "专业的 JavaScript IDE", link: "https://www.jetbrains.com/webstorm/" },
        { name: "Grammarly", category: "写作与编辑", description: "语法检查与写作辅助工具", link: "https://www.grammarly.com/" },
        { name: "Coursera", category: "学习与知识", description: "全球化在线教育平台", link: "https://www.coursera.org/" },
        { name: "D3.js", category: "前端开发", description: "数据可视化库", link: "https://d3js.org/" },
        { name: "RabbitMQ", category: "后端开发", description: "消息队列中间件", link: "https://www.rabbitmq.com/" },
        { name: "Elasticsearch", category: "数据库", description: "分布式搜索和分析引擎", link: "https://www.elastic.co/elasticsearch/" },
        { name: "Miro", category: "设计与创意", description: "在线协作白板", link: "https://miro.com/" },
        { name: "Mocha", category: "构建与测试", description: "JavaScript测试框架", link: "https://mochajs.org/" },
        { name: "Discord", category: "通讯与协作", description: "社区沟通与语音聊天平台", link: "https://discord.com/" },
        { name: "MyFitnessPal", category: "健康与生活", description: "食物热量与营养追踪应用", link: "https://www.myfitnesspal.com/" },
        { name: "Ant Design", category: "前端开发", description: "企业级 UI 设计语言和组件库", link: "https://ant.design/" },
        { name: "CircleCI", category: "DevOps 与部署", description: "持续集成和交付平台", link: "https://circleci.com/" },
        { name: "Sublime Text", category: "开发环境", description: "快速的文本编辑器", link: "https://www.sublimetext.com/" },
        { name: "Audible", category: "媒体与娱乐", description: "有声书平台", link: "https://www.audible.com/" },
        { name: "Laravel", category: "后端开发", description: "PHP Web 应用框架", link: "https://laravel.com/" },
        { name: "Sketch", category: "设计与创意", description: "macOS 专业设计工具", link: "https://www.sketch.com/" },
        { name: "ESLint", category: "构建与测试", description: "JavaScript 代码检查工具", link: "https://eslint.org/" },
        { name: "Khan Academy", category: "学习与知识", description: "免费的在线课程和练习", link: "https://www.khanacademy.org/" },
        { name: "Material-UI", category: "前端开发", description: "React UI 框架", link: "https://mui.com/" }, // Now MUI
        { name: "Gmail", category: "通讯与协作", description: "Google 邮件服务", link: "https://mail.google.com/" },
        { name: "Prisma", category: "后端开发", description: "下一代 ORM", link: "https://www.prisma.io/" },
        { name: "Grafana", category: "DevOps 与部署", description: "数据可视化和监控平台", link: "https://grafana.com/" },
        { name: "Babel", category: "前端开发", description: "JavaScript 编译器", link: "https://babeljs.io/" },
        { name: "Postman", category: "构建与测试", description: "API 开发和测试工具", link: "https://www.postman.com/" },
        { name: "Obsidian", category: "生产力与组织", description: "强大的本地知识库和笔记工具", link: "https://obsidian.md/" },
        { name: "MariaDB", category: "数据库", description: "MySQL的开源分支", link: "https://mariadb.org/" },
        { name: "InVision", category: "设计与创意", description: "设计协作平台", link: "https://www.invisionapp.com/" },
        { name: "HackerRank", category: "学习与知识", description: "编程挑战平台", link: "https://www.hackerrank.com/" },
        { name: "NestJS", category: "后端开发", description: "渐进式 Node.js 框架", link: "https://nestjs.com/" },
        { name: "Vim", category: "开发环境", description: "文本编辑器", link: "https://www.vim.org/" },
        { name: "Typora", category: "写作与编辑", description: "简洁美观的 Markdown 编辑器", link: "https://typora.io/" },
        { name: "Three.js", category: "前端开发", description: "3D 图形库", link: "https://threejs.org/" },
        { name: "Ansible", category: "DevOps 与部署", description: "自动化配置管理工具", link: "https://www.ansible.com/" },
        { name: "Strava", category: "健康与生活", description: "运动追踪与社交分享 (跑步、骑行)", link: "https://www.strava.com/" },
        { name: "Nuxt.js", category: "前端开发", description: "Vue.js 服务端渲染框架", link: "https://nuxtjs.org/" },
        { name: "Kafka", category: "后端开发", description: "分布式流平台", link: "https://kafka.apache.org/" },
        { name: "CodePen", category: "学习与知识", description: "前端代码分享平台", link: "https://codepen.io/" },
        { name: "Adobe Premiere", category: "设计与创意", description: "视频编辑软件", link: "https://www.adobe.com/products/premiere.html" },
        { name: "Prettier", category: "构建与测试", description: "代码格式化工具", link: "https://prettier.io/" },
        { name: "Asana", category: "生产力与组织", description: "团队项目与任务管理平台", link: "https://asana.com/" },
        { name: "Cassandra", category: "数据库", description: "分布式NoSQL数据库", link: "https://cassandra.apache.org/" },
        { name: "Motion", category: "前端开发", description: "React 动画库", link: "https://motion.dev/" }, // Framer Motion
        { name: "SonarQube", category: "DevOps 与部署", description: "代码质量管理平台", link: "https://www.sonarqube.org/" },
        { name: "Zotero", category: "学习与知识", description: "文献管理与引用工具", link: "https://www.zotero.org/" },
        { name: "Koa", category: "后端开发", description: "新一代 Web 框架", link: "https://koajs.com/" },
        { name: "PyCharm", category: "开发环境", description: "Python IDE", link: "https://www.jetbrains.com/pycharm/" },
        { name: "Google Sheets", category: "财务管理", description: "电子表格，可用于记账和预算规划", link: "https://sheets.google.com/" },
        { name: "Chart.js", category: "前端开发", description: "简单 yet 灵活的图表库", link: "https://www.chartjs.org/" },
        { name: "Helm", category: "DevOps 与部署", description: "Kubernetes 包管理器", link: "https://helm.sh/" },
        { name: "Goodreads", category: "学习与知识", description: "图书推荐与阅读社区", link: "https://www.goodreads.com/" },
        { name: "Adobe XD", category: "设计与创意", description: "用户体验设计工具", link: "https://www.adobe.com/products/xd.html" },
        { name: "React Router", category: "前端开发", description: "React 路由库", link: "https://reactrouter.com/" },
        { name: "Telegram", category: "通讯与协作", description: "注重安全和速度的即时通讯应用", link: "https://telegram.org/" },
        { name: "Neo4j", category: "数据库", description: "图形数据库", link: "https://neo4j.com/" },
        { name: "Selenium", category: "构建与测试", description: "自动化测试工具", link: "https://www.selenium.dev/" },
        { name: "TickTick", category: "生产力与组织", description: "结合任务、日历、习惯打卡的管理应用", link: "https://ticktick.com/" },
        { name: "Ruby on Rails", category: "后端开发", description: "Ruby Web 应用框架", link: "https://rubyonrails.org/" },
        { name: "Android Studio", category: "开发环境", description: "Android 开发 IDE", link: "https://developer.android.com/studio" },
        { name: "Pocket", category: "学习与知识", description: "稍后阅读服务，保存文章和网页", link: "https://getpocket.com/" },
        { name: "Chakra UI", category: "前端开发", description: "简单、模块化的组件库", link: "https://chakra-ui.com/" },
        { name: "OBS Studio", category: "系统与安全", description: "免费开源的视频录制和直播软件", link: "https://obsproject.com/" }, // Category might be 'Media' or 'System Tools'
        { name: "YNAB", category: "财务管理", description: "零基预算方法的预算软件", link: "https://www.youneedabudget.com/" },
        { name: "Illustrator", category: "设计与创意", description: "矢量图形设计软件", link: "https://www.adobe.com/products/illustrator.html" },
        { name: "Redux", category: "前端开发", description: "状态管理库", link: "https://redux.js.org/" },
        { name: "GitHub Learning Lab", category: "学习与知识", description: "交互式学习平台", link: "https://lab.github.com/" }, // Deprecated, suggest GitHub Skills
        { name: "Harbor", category: "DevOps 与部署", description: "容器镜像仓库", link: "https://goharbor.io/" },
        { name: "Pinia", category: "前端开发", description: "Vue 状态管理库", link: "https://pinia.vuejs.org/" },
        { name: "Sequelize", category: "后端开发", description: "Node.js ORM", link: "https://sequelize.org/" },
        { name: "VLC Media Player", category: "系统与安全", description: "强大的跨平台多媒体播放器", link: "https://www.videolan.org/vlc/" }, // Category might be 'Media'
        { name: "Framer", category: "设计与创意", description: "交互原型设计", link: "https://www.framer.com/" },
        { name: "Jasmine", category: "构建与测试", description: "行为驱动的测试框架", link: "https://jasmine.github.io/" },
        { name: "Google Meet", category: "通讯与协作", description: "Google 的视频会议服务", link: "https://meet.google.com/" },
        { name: "Memcached", category: "数据库", description: "分布式内存对象缓存系统", link: "https://memcached.org/" },
        { name: "Frontend Masters", category: "学习与知识", description: "前端进阶教程", link: "https://frontendmasters.com/" },
        { name: "Socket.IO", category: "前端开发", description: "实时双向通信库", link: "https://socket.io/" },
        { name: "Rancher", category: "DevOps 与部署", description: "容器管理平台", link: "https://www.rancher.com/" },
        { name: "iA Writer", category: "写作与编辑", description: "专注写作的 Markdown 编辑器", link: "https://ia.net/writer" },
        { name: "Hibernate", category: "后端开发", description: "ORM 框架", link: "https://hibernate.org/" },
        { name: "Eclipse", category: "开发环境", description: "集成开发环境", link: "https://www.eclipse.org/" },
        { name: "Sleep Cycle", category: "健康与生活", description: "智能睡眠追踪与闹钟应用", link: "https://www.sleepcycle.com/" },
        { name: "React Query", category: "前端开发", description: "数据获取和缓存库", link: "https://tanstack.com/query/latest" }, // Now TanStack Query
        { name: "Maven", category: "构建与测试", description: "项目管理工具", link: "https://maven.apache.org/" },
        { name: "Zeplin", category: "设计与创意", description: "设计交付协作平台", link: "https://zeplin.io/" },
        { name: "CodeWars", category: "学习与知识", description: "编程练习平台", link: "https://www.codewars.com/" },
        { name: "gRPC", category: "后端开发", description: "高性能RPC框架", link: "https://grpc.io/" },
        { name: "Atom", category: "开发环境", description: "GitHub 开发的文本编辑器", link: "https://atom.io/" }, // Sunsetted
        { name: "Mint", category: "财务管理", description: "个人财务管理和预算追踪应用", link: "https://mint.intuit.com/" },
        { name: "Less", category: "前端开发", description: "动态样式语言", link: "https://lesscss.org/" },
        { name: "Istio", category: "DevOps 与部署", description: "服务网格", link: "https://istio.io/" },
        { name: "Principle", category: "设计与创意", description: "交互动画设计", link: "https://principleformac.com/" },
        { name: "Vuex", category: "前端开发", description: "Vue.js 的状态管理模式", link: "https://vuex.vuejs.org/" }, // Recommend Pinia for new projects
        { name: "MyBatis", category: "后端开发", description: "持久层框架", link: "https://mybatis.org/mybatis-3/" },
        { name: "Udacity", category: "学习与知识", description: "在线技术教育", link: "https://www.udacity.com/" },
        { name: "SWR", category: "前端开发", description: "用于数据获取的 React Hooks 库", link: "https://swr.vercel.app/" },
        { name: "Nexus", category: "DevOps 与部署", description: "仓库管理器", link: "https://www.sonatype.com/products/nexus-repository" }, // Sonatype Nexus Repository
        { name: "Waterllama", category: "健康与生活", description: "提醒按时喝水的应用", link: "https://waterllama.com/" },
        { name: "MobX", category: "前端开发", description: "简单、可扩展的状态管理", link: "https://mobx.js.org/" },
        { name: "Swagger", category: "构建与测试", description: "API 文档和设计工具", link: "https://swagger.io/" },
        { name: "Xcode", category: "开发环境", description: "苹果开发环境", link: "https://developer.apple.com/xcode/" },
        { name: "Lightroom", category: "设计与创意", description: "照片编辑与管理软件", link: "https://www.adobe.com/products/photoshop-lightroom.html" },
        { name: "PyTest", category: "构建与测试", description: "Python测试框架", link: "https://docs.pytest.org/" },
        { name: "WhatsApp", category: "通讯与协作", description: "流行的跨平台即时通讯应用", link: "https://www.whatsapp.com/" },
        { name: "InfluxDB", category: "数据库", description: "时序数据库", link: "https://www.influxdata.com/" },
        { name: "Forest App", category: "生产力与组织", description: "通过种树保持专注的应用", link: "https://www.forestapp.cc/" },
        { name: "ASP.NET Core", category: "后端开发", description: "跨平台 .NET Web 框架", link: "https://dotnet.microsoft.com/apps/aspnet" },
        { name: "GeeksforGeeks", category: "学习与知识", description: "计算机科学学习平台", link: "https://www.geeksforgeeks.org/" },
        { name: "Webpack Dev Server", category: "前端开发", description: "开发服务器", link: "https://webpack.js.org/configuration/dev-server/" },
        { name: "Puppet", category: "DevOps 与部署", description: "配置管理工具", link: "https://www.puppet.com/" },
        { name: "DaVinci Resolve", category: "设计与创意", description: "免费且强大的专业视频编辑软件", link: "https://www.blackmagicdesign.com/products/davinciresolve/" },
        { name: "Rollup", category: "构建与测试", description: "JavaScript 模块打包器", link: "https://rollupjs.org/" },
        { name: "Microsoft To Do", category: "生产力与组织", description: "微软的任务管理应用", link: "https://todo.microsoft.com/" },
        { name: "Thrift", category: "后端开发", description: "可伸缩的跨语言服务框架", link: "https://thrift.apache.org/" },
        { name: "CodeSandbox", category: "开发环境", description: "在线代码编辑器", link: "https://codesandbox.io/" },
        { name: "Paprika Recipe Manager", category: "健康与生活", description: "食谱管理与购物清单应用", link: "https://www.paprikaapp.com/" },
        { name: "Gradle", category: "构建与测试", description: "项目自动化构建工具", link: "https://gradle.org/" },
        { name: "Kibana", category: "DevOps 与部署", description: "数据可视化和分析平台", link: "https://www.elastic.co/kibana/" },
        { name: "JSFiddle", category: "学习与知识", description: "在线代码演示", link: "https://jsfiddle.net/" },
        { name: "Cinema 4D", category: "设计与创意", description: "3D 动画软件", link: "https://www.maxon.net/en/cinema-4d" },
        { name: "Emacs", category: "开发环境", description: "可扩展编辑器", link: "https://www.gnu.org/software/emacs/" },
        { name: "Scrivener", category: "写作与编辑", description: "强大的长文写作与管理工具", link: "https://www.literatureandlatte.com/scrivener/overview" },
        { name: "Gin", category: "后端开发", description: "Go Web 框架", link: "https://gin-gonic.com/" },
        { name: "Feedly", category: "学习与知识", description: "RSS 新闻聚合阅读器", link: "https://feedly.com/" },
        { name: "Parcel", category: "构建与测试", description: "零配置构建工具", link: "https://parceljs.org/" },
        { name: "Adobe After Effects", category: "设计与创意", description: "视频特效和动画制作", link: "https://www.adobe.com/products/aftereffects.html" },
        { name: "Freedom", category: "生产力与组织", description: "屏蔽网站和应用的干扰，专注工作", link: "https://freedom.to/" },
        { name: "CouchDB", category: "数据库", description: "文档数据库", link: "https://couchdb.apache.org/" },
        { name: "TeamCity", category: "DevOps 与部署", description: "持续集成工具", link: "https://www.jetbrains.com/teamcity/" },
        { name: "Mealime", category: "健康与生活", description: "快速简单的健康食谱计划应用", link: "https://www.mealime.com/" },
        { name: "Echo", category: "后端开发", description: "高性能 Go Web 框架", link: "https://echo.labstack.com/" },
        { name: "Replit", category: "开发环境", description: "在线 IDE", link: "https://replit.com/" },
        { name: "Ulysses", category: "写作与编辑", description: "Markdown 写作应用 (Apple 平台)", link: "https://ulysses.app/" },
        { name: "esbuild", category: "构建与测试", description: "极速 JavaScript 打包器", link: "https://esbuild.github.io/" },
        { name: "PluralSight", category: "学习与知识", description: "技能发展平台", link: "https://www.pluralsight.com/" },
        { name: "Spring Cloud", category: "后端开发", description: "分布式系统解决方案", link: "https://spring.io/projects/spring-cloud" },
        { name: "Google Keep", category: "生产力与组织", description: "轻量级笔记和提醒工具", link: "https://keep.google.com/" },
        { name: "Axure", category: "设计与创意", description: "专业的原型设计工具", link: "https://www.axure.com/" },
        { name: "JUnit", category: "构建与测试", description: "Java 单元测试框架", link: "https://junit.org/junit5/" },
        { name: "Gitpod", category: "开发环境", description: "云开发环境", link: "https://www.gitpod.io/" },
        { name: "Wikipedia", category: "学习与知识", description: "自由、开放内容的多语言网络百科全书", link: "https://www.wikipedia.org/" },
        { name: "Workflowy", category: "生产力与组织", description: "无限层级的列表式笔记工具", link: "https://workflowy.com/" },
        { name: "Chef", category: "DevOps 与部署", description: "系统集成框架", link: "https://www.chef.io/" },
        { name: "Kindle", category: "媒体与娱乐", description: "电子书阅读器或应用", link: "https://www.amazon.com/kindle-dbs/storefront" },
        { name: "Artillery", category: "构建与测试", description: "负载测试工具", link: "https://www.artillery.io/" },
        { name: "BandLab", category: "设计与创意", description: "在线协作音乐创作平台", link: "https://www.bandlab.com/" },
        { name: "Outlook", category: "通讯与协作", description: "微软邮件与日历客户端", link: "https://outlook.live.com/" },
        { name: "Dev.to", category: "学习与知识", description: "程序员社区和博客平台", link: "https://dev.to/" },
        { name: "GarageBand", category: "设计与创意", description: "苹果平台的音乐创作入门软件", link: "https://www.apple.com/mac/garageband/" },
        { name: "JMeter", category: "构建与测试", description: "性能测试工具", link: "https://jmeter.apache.org/" },
        { name: "DataGrip", category: "开发环境", description: "数据库IDE", link: "https://www.jetbrains.com/datagrip/" },
        { name: "Pocket Casts", category: "媒体与娱乐", description: "播客（Podcast）收听应用", link: "https://pocketcasts.com/" },
        { name: "PHPUnit", category: "构建与测试", description: "PHP测试框架", link: "https://phpunit.de/" },
        { name: "Bamboo", category: "DevOps 与部署", description: "持续集成和部署工具", link: "https://www.atlassian.com/software/bamboo" },
        { name: "egghead", category: "学习与知识", description: "专业开发教程", link: "https://egghead.io/" },
        { name: "Calibre", category: "系统与安全", description: "电子书管理软件", link: "https://calibre-ebook.com/" },
        { name: "Pomodoro Technique", category: "生产力与组织", description: "番茄工作法，提升专注度的时间管理方法", link: "https://francescocirillo.com/pages/pomodoro-technique" }, // Link to the official technique page
        { name: "MindNode", category: "生产力与组织", description: "思维导图软件，整理思路与创意", link: "https://mindnode.com/" },
        { name: "Transmission", category: "系统与安全", description: "开源的 BitTorrent 客户端", link: "https://transmissionbt.com/" },
        { name: "Raindrop.io", category: "生产力与组织", description: "跨平台的书签管理工具", link: "https://raindrop.io/" },
        { name: "IFTTT", category: "系统与安全", description: "连接不同 App 和服务的自动化平台", link: "https://ifttt.com/" }, // Category might be 'Automation'
        { name: "uBlock Origin", category: "系统与安全", description: "开源的广告拦截浏览器扩展", link: "https://github.com/gorhill/uBlock#ublock-origin" },
        { name: "CleanMyMac", category: "系统与安全", description: "系统清理与优化工具", link: "https://macpaw.com/cleanmymac" },
        { name: "Alfred", category: "系统与安全", description: "高效的启动器与效率工具", link: "https://www.alfredapp.com/" },
        { name: "ShareX", category: "系统与安全", description: "强大的截图与屏幕录制工具", link: "https://getsharex.com/" },
        { name: "7-Zip", category: "系统与安全", description: "文件压缩与解压缩工具", link: "https://www.7-zip.org/" },
        { name: "IrfanView", category: "系统与安全", description: "轻量级快速图片查看器", link: "https://www.irfanview.com/" },
        { name: "HandBrake", category: "系统与安全", description: "开源的视频转码工具", link: "https://handbrake.fr/" },
        { name: "ImageOptim", category: "系统与安全", description: "图片无损或有损压缩工具", link: "https://imageoptim.com/mac" },
        { name: "Carbon", category: "设计与创意", description: "生成漂亮的代码截图分享工具", link: "https://carbon.now.sh/" },
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
        <div className="list-container">
            <div className="list-content">
                <main className="list-main">
                    <h2 className="subtitle interact">我的开发工具与实用工具 ~</h2>

                    <motion.section
                        className={styles.toolsSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="items-grid">
                            {filteredTools.map((tool, index) => (
                                <motion.div
                                    className={`item-card ${tool.link ? 'cursor-pointer' : ''}`}
                                    data-category={tool.category}
                                    data-size={tool.size}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{
                                        scale: 1.02,
                                        y: -2,
                                        transition: {
                                            duration: 0.2,
                                            ease: "easeOut"
                                        }
                                    }}
                                    transition={{
                                        opacity: {
                                            delay: Math.min(index * 0.02, 0.8),
                                            duration: 0.2
                                        }
                                    }}
                                    key={tool.name}
                                >
                                    <h3 className="interact">
                                        {tool.link ? (
                                            <a href={tool.link} target="_blank" rel="noopener noreferrer" className="no-color-link">{tool.name}</a>
                                        ) : (
                                            tool.name
                                        )}</h3>
                                    <p className="item-desc text">{tool.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </main>
            </div>

            <div className="filter-sidebar">
                <div className="filter-container">
                    {/* 添加搜索框 */}
                    <input
                        type="text"
                        placeholder="搜索..."
                        className="search-input"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <div className="category-filters">
                        <div className="category-buttons">
                            <button
                                className={`category-btn ${filter === '' ? 'active' : ''}`}
                                onClick={() => setFilter('')}
                            >
                                全部
                            </button>
                            {categories.map(category => (
                                <button
                                    className={`category-btn ${filter === category ? 'active' : ''}`}
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
