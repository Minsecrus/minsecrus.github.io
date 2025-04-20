import { motion } from 'motion/react'
import { useState } from 'react'
import './list.css'  // 引入通用样式
import { calculateCardSize } from '../utils/cardUtils'
import { li, link } from 'motion/react-client'

export function Toolbox() {
    const [filter, setFilter] = useState('')

    const tools = [
        { name: "VS Code", category: "开发工具", description: "轻量级代码编辑器", link: "https://code.visualstudio.com/" },
        { name: "React", category: "前端开发", description: "用于构建用户界面的 JavaScript 库", link: "https://react.dev/" },
        { name: "Git", category: "DevOps", description: "分布式版本控制系统", link: "https://git-scm.com/" },
        { name: "Node.js", category: "后端开发", description: "基于 Chrome V8 引擎的 JavaScript 运行环境", link: "https://nodejs.org/" },
        { name: "Docker", category: "DevOps", description: "容器化平台", link: "https://www.docker.com/" },
        { name: "Figma", category: "设计与制作", description: "协作设计工具", link: "https://www.figma.com/" },
        { name: "Python", category: "编程语言", description: "通用高级编程语言", link: "https://www.python.org/" }, // Assuming Python is implicitly popular via Django/Flask etc.
        { name: "Google Search", category: "资源库", description: "全球最流行的网络搜索引擎", link: "https://www.google.com/" },
        { name: "TypeScript", category: "编程语言", description: "JavaScript 的超集，添加了类型系统", link: "https://www.typescriptlang.org/" },
        { name: "BiliBili", category: "内容平台", description: "弹幕视频平台", link: "https://www.bilibili.com/" },
        { name: "PostgreSQL", category: "数据库", description: "强大的开源关系型数据库", link: "https://www.postgresql.org/" },
        { name: "MySQL", category: "数据库", description: "最流行的开源关系型数据库", link: "https://www.mysql.com/" },
        { name: "Vue", category: "前端开发", description: "广泛使用的渐进式 JavaScript 框架", link: "https://vuejs.org/" },
        { name: "Kubernetes", category: "DevOps", description: "容器编排系统", link: "https://kubernetes.io/" },
        { name: "IntelliJ IDEA", category: "开发工具", description: "JetBrains 出品的 Java 集成开发环境", link: "https://www.jetbrains.com/idea/" },
        { name: "Notion", category: "生产力与组织", description: "一体化工作空间，笔记、数据库、看板等", link: "https://www.notion.so/" },
        { name: "Slack", category: "通讯与协作", description: "团队沟通与协作平台", link: "https://slack.com/" },
        { name: "Webpack", category: "DevOps", description: "现代 JavaScript 应用的静态模块打包工具", link: "https://webpack.js.org/" },
        { name: "Photoshop", category: "设计与制作", description: "图像编辑软件", link: "https://www.adobe.com/products/photoshop.html" },
        { name: "TensorFlow", category: "机器学习", description: "开源的机器学习框架", link: "https://www.tensorflow.org/" },
        { name: "Django", category: "后端开发", description: "Python Web 框架", link: "https://www.djangoproject.com/" },
        { name: "HeroUI", category: "前端开发", description: "美观，快捷，现代的 React UI 库", link: "https://www.heroui.com/" },
        { name: "Zoom", category: "通讯与协作", description: "视频会议和在线会议解决方案", link: "https://zoom.us/" },
        { name: "Spring Boot", category: "后端开发", description: "简化 Spring 应用开发的框架", link: "https://spring.io/projects/spring-boot" },
        { name: "Angular", category: "前端开发", description: "Google 的 Web 应用框架", link: "https://angular.io/" },
        { name: "Redis", category: "数据库", description: "高性能的键值对数据库", link: "https://redis.io/" },
        { name: "TailwindCSS", category: "前端开发", description: "实用优先的 CSS 框架", link: "https://tailwindcss.com/" },
        { name: "Next.js", category: "全栈开发", description: "React 服务端渲染框架", link: "https://nextjs.org/" },
        { name: "Jest", category: "DevOps", description: "JavaScript 测试框架", link: "https://jestjs.io/" },
        { name: "MongoDB", category: "数据库", description: "流行的 NoSQL 数据库系统", link: "https://www.mongodb.com/" },
        { name: "Express", category: "后端开发", description: "Node.js Web 应用框架", link: "https://expressjs.com/" },
        { name: "知乎", category: "内容平台", description: "全球最大的中文互联网问答社区", link: "https://zhihu.com/" },
        { name: "Astro", category: "全栈开发", description: "内容驱动的 Web 框架", link: "https://astro.build/" },
        { name: "GraphQL", category: "后端开发", description: "API 查询语言和运行时", link: "https://graphql.org/" },
        { name: "Flutter", category: "跨平台开发", description: "Google 的 UI 工具包，用于从单个代码库构建多平台应用", link: "https://flutter.dev/" },
        { name: "LeetCode", category: "资源库", description: "编程题库和学习平台", link: "https://leetcode.com/" },
        { name: "Canva", category: "设计与制作", description: "在线平面设计工具，模板丰富", link: "https://www.canva.com/" },
        { name: "Electron", category: "跨平台开发", description: "使用 JavaScript, HTML 和 CSS 构建跨平台桌面应用的框架", link: "https://www.electronjs.org/" },
        { name: "即梦", category: "AI 助手", description: "字节跳动出品的 AI 画图工具", link: "https://jimeng.jianying.com/" },
        { name: "Vim", category: "编辑工具", description: "文本编辑器", link: "https://www.vim.org/" },
        { name: "WebStorm", category: "开发工具", description: "JetBrains 出品的专业 JavaScript IDE", link: "https://www.jetbrains.com/webstorm/" },
        { name: "Wikipedia", category: "资源库", description: "自由、开放内容的多语言网络百科全书", link: "https://www.wikipedia.org/" },
        { name: "Sublime Text", category: "编辑工具", description: "快速的文本编辑器", link: "https://www.sublimetext.com/" },
        { name: "GitHub Copilot", category: "AI 助手", description: "AI 驱动的代码助手", link: "https://copilot.github.com/" },
        { name: "Flask", category: "后端开发", description: "轻量级 Python Web 框架", link: "https://flask.palletsprojects.com/" },
        { name: "Vite", category: "DevOps", description: "下一代前端构建工具", link: "https://vitejs.dev/" },
        { name: "RustRover", category: "开发工具", description: "JetBrains 出品的 Rust IDE", link: "https://www.jetbrains.com/rust/" },
        { name: "Cypress", category: "DevOps", description: "现代化的端到端测试框架", link: "https://www.cypress.io/" },
        { name: "OBS Studio", category: "设计与制作", description: "免费开源的视频录制和直播软件", link: "https://obsproject.com/" },
        { name: "Jenkins", category: "DevOps", description: "开源的持续集成工具", link: "https://www.jenkins.io/" },
        { name: "Ant Design", category: "前端开发", description: "企业级 UI 设计语言和组件库", link: "https://ant.design/" },
        { name: "Axios", category: "前端开发", description: "基于 Promise 的 HTTP 客户端", link: "https://axios-http.com/" },
        { name: "GeoGebra", category: "数学", description: "交互式数学软件，用于几何、代数、统计和微积分", link: "https://www.geogebra.org/" },
        { name: "Material-UI", category: "前端开发", description: "React UI 框架", link: "https://mui.com/" },
        { name: "Rider", category: "开发工具", description: "JetBrains 出品的跨平台 .NET IDE", link: "https://www.jetbrains.com/rider/" },
        { name: "Trello", category: "生产力与组织", description: "看板式项目管理工具", link: "https://trello.com/" },
        { name: "Sass", category: "前端开发", description: "CSS 预处理器", link: "https://sass-lang.com/" },
        { name: "Prometheus", category: "DevOps", description: "开源的监控告警系统", link: "https://prometheus.io/" },
        { name: "SQLite", category: "数据库", description: "轻量级关系型数据库", link: "https://www.sqlite.org/" },
        { name: "Pinia", category: "前端开发", description: "Vue 状态管理库", link: "https://pinia.vuejs.org/" },
        { name: "Elasticsearch", category: "数据库", description: "分布式搜索和分析引擎", link: "https://www.elastic.co/elasticsearch/" },
        { name: "Prisma", category: "后端开发", description: "下一代 ORM", link: "https://www.prisma.io/" },
        { name: "PyCharm", category: "开发工具", description: "JetBrains 出品的 Python IDE", link: "https://www.jetbrains.com/pycharm/" },
        { name: "Manim", category: "数学", description: "用于创建数学动画的 Python 库", link: "https://www.manim.community/" },
        { name: "CodePen", category: "资源库", description: "前端代码分享平台", link: "https://codepen.io/" },
        { name: "RabbitMQ", category: "后端开发", description: "消息队列中间件", link: "https://www.rabbitmq.com/" },
        { name: "FastAPI", category: "后端开发", description: "现代、快速的 Python Web 框架", link: "https://fastapi.tiangolo.com/" },
        { name: "Svelte", category: "前端开发", description: "创新的前端编译框架", link: "https://svelte.dev/" },
        { name: "NestJS", category: "后端开发", description: "渐进式 Node.js 框架", link: "https://nestjs.com/" },
        { name: "MariaDB", category: "数据库", description: "MySQL的开源分支", link: "https://mariadb.org/" },
        { name: "Eclipse", category: "开发工具", description: "集成开发环境", link: "https://www.eclipse.org/" },
        { name: "Blender", category: "设计与制作", description: "3D 创作套件", link: "https://www.blender.org/" },
        { name: "FCL Launcher", category: "娱乐工具", description: "可以在手机上运行 Java 版 Minecraft 的启动器", link: "https://fcl-team.github.io/index.html" },
        { name: "React Router", category: "前端开发", description: "React 路由库", link: "https://reactrouter.com/" },
        { name: "GitLab", category: "DevOps", description: "完整的 DevOps 平台", link: "https://about.gitlab.com/" },
        { name: "D3.js", category: "前端开发", description: "数据可视化库", link: "https://d3js.org/" },
        { name: "GitHub Learning Lab", category: "资源库", description: "交互式学习平台", link: "https://lab.github.com/" },
        { name: "Three.js", category: "前端开发", description: "3D 图形库", link: "https://threejs.org/" },
        { name: "FreeCodeCamp", category: "资源库", description: "免费的编程学习平台", link: "https://www.freecodecamp.org/" },
        { name: "Google AI Studio", category: "机器学习", description: "基于 Web 的工具，用于原型设计和运行生成式 AI 模型", link: "https://aistudio.google.com/" },
        { name: "Sequelize", category: "后端开发", description: "Node.js ORM", link: "https://sequelize.org/" },
        { name: "OpenRouter", category: "机器学习", description: "访问多种 AI 模型 API 的统一接口", link: "https://openrouter.ai/" },
        { name: "Prettier", category: "DevOps", description: "代码格式化工具", link: "https://prettier.io/" },
        { name: "Terraform", category: "DevOps", description: "基础设施即代码工具", link: "https://www.terraform.io/" },
        { name: "Nuxt.js", category: "全栈开发", description: "Vue.js 服务端渲染框架", link: "https://nuxtjs.org/" },
        { name: "Illustrator", category: "设计与制作", description: "矢量图形设计软件", link: "https://www.adobe.com/products/illustrator.html" },
        { name: "Motion", category: "前端开发", description: "React 动画库", link: "https://motion.dev/" },
        { name: "Chart.js", category: "前端开发", description: "简单 yet 灵活的图表库", link: "https://www.chartjs.org/" },
        { name: "Redux", category: "前端开发", description: "状态管理库", link: "https://redux.js.org/" },
        { name: "Chakra UI", category: "前端开发", description: "简单、模块化的组件库", link: "https://chakra-ui.com/" },
        { name: "Ruby on Rails", category: "后端开发", description: "Ruby Web 应用框架", link: "https://rubyonrails.org/" },
        { name: "1Password", category: "系统与安全", description: "密码管理器，生成和存储强密码", link: "https://1password.com/" },
        { name: "Microsoft Teams", category: "通讯与协作", description: "微软的团队协作中心", link: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software" },
        { name: "Koa", category: "后端开发", description: "新一代 Web 框架", link: "https://koajs.com/" },
        { name: "Atom", category: "编辑工具", description: "GitHub 开发的文本编辑器", link: "https://atom.io/" },
        { name: "Coursera", category: "资源库", description: "全球化在线教育平台", link: "https://www.coursera.org/" },
        { name: "Kafka", category: "后端开发", description: "分布式流平台", link: "https://kafka.apache.org/" },
        { name: "Laravel", category: "后端开发", description: "PHP Web 应用框架", link: "https://laravel.com/" },
        { name: "Socket.IO", category: "前端开发", description: "实时双向通信库", link: "https://socket.io/" },
        { name: "Remix", category: "全栈开发", description: "聚焦 Web 标准的全栈 Web 框架", link: "https://remix.run/" },
        { name: "Babel", category: "DevOps", description: "JavaScript 编译器", link: "https://babeljs.io/" },
        { name: "Mocha", category: "DevOps", description: "JavaScript测试框架", link: "https://mochajs.org/" },
        { name: "React Query", category: "前端开发", description: "数据获取和缓存库", link: "https://tanstack.com/query/latest" },
        { name: "ESLint", category: "DevOps", description: "JavaScript 代码检查工具", link: "https://eslint.org/" },
        { name: "Less", category: "前端开发", description: "动态样式语言", link: "https://lesscss.org/" },
        { name: "Vuex", category: "前端开发", description: "Vue.js 的状态管理模式", link: "https://vuex.vuejs.org/" },
        { name: "Postman", category: "DevOps", description: "API 开发和测试工具", link: "https://www.postman.com/" },
        { name: "SWR", category: "前端开发", description: "用于数据获取的 React Hooks 库", link: "https://swr.vercel.app/" },
        { name: "Grafana", category: "DevOps", description: "数据可视化和监控平台", link: "https://grafana.com/" },
        { name: "Todoist", category: "生产力与组织", description: "跨平台任务管理应用", link: "https://todoist.com/" },
        { name: "MobX", category: "前端开发", description: "简单、可扩展的状态管理", link: "https://mobx.js.org/" },
        { name: "RxJS", category: "前端开发", description: "使用 Observables 进行异步和基于事件的编程的库", link: "https://rxjs.dev/" },
        { name: "CircleCI", category: "DevOps", description: "持续集成和交付平台", link: "https://circleci.com/" },
        { name: "Ansible", category: "DevOps", description: "自动化配置管理工具", link: "https://www.ansible.com/" },
        { name: "Blazor", category: "前端开发", description: "使用 .NET 构建交互式 Web UI 的框架", link: "https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor" },
        { name: "Mantine UI", category: "前端开发", description: "功能齐全的 React 组件库", link: "https://mantine.dev/" },
        { name: "Hibernate", category: "后端开发", description: "ORM 框架", link: "https://hibernate.org/" },
        { name: "gRPC", category: "后端开发", description: "高性能RPC框架", link: "https://grpc.io/" },
        { name: "MyBatis", category: "后端开发", description: "持久层框架", link: "https://mybatis.org/mybatis-3/" },
        { name: "SonarQube", category: "DevOps", description: "代码质量管理平台", link: "https://www.sonarqube.org/" },
        { name: "ASP.NET Core", category: "后端开发", description: "跨平台 .NET Web 框架", link: "https://dotnet.microsoft.com/apps/aspnet" },
        { name: "Helm", category: "DevOps", description: "Kubernetes 包管理器", link: "https://helm.sh/" },
        { name: "Thrift", category: "后端开发", description: "可伸缩的跨语言服务框架", link: "https://thrift.apache.org/" },
        { name: "Gin", category: "后端开发", description: "Go Web 框架", link: "https://gin-gonic.com/" },
        { name: "Echo", category: "后端开发", description: "高性能 Go Web 框架", link: "https://echo.labstack.com/" },
        { name: "Spring Cloud", category: "后端开发", description: "分布式系统解决方案", link: "https://spring.io/projects/spring-cloud" },
        { name: "Swagger", category: "后端开发", description: "API 文档和设计工具", link: "https://swagger.io/" },
        { name: "Selenium", category: "DevOps", description: "自动化测试工具", link: "https://www.selenium.dev/" },
        { name: "Keil", category: "开发工具", description: "嵌入式开发工具", link: "https://www.keil.com/" },
        { name: "Harbor", category: "DevOps", description: "容器镜像仓库", link: "https://goharbor.io/" },
        { name: "Trae", category: "开发工具", description: "字节出品的免费 AI IDE", link: "https://www.trae.ai/" },
        { name: "Jasmine", category: "DevOps", description: "行为驱动的测试框架", link: "https://jasmine.github.io/" },
        { name: "Cassandra", category: "数据库", description: "分布式NoSQL数据库", link: "https://cassandra.apache.org/" },
        { name: "Neo4j", category: "数据库", description: "图形数据库", link: "https://neo4j.com/" },
        { name: "Rancher", category: "DevOps", description: "容器管理平台", link: "https://www.rancher.com/" },
        { name: "Maven", category: "DevOps", description: "项目管理工具", link: "https://maven.apache.org/" },
        { name: "Istio", category: "DevOps", description: "服务网格", link: "https://istio.io/" },
        { name: "Memcached", category: "数据库", description: "分布式内存对象缓存系统", link: "https://memcached.org/" },
        { name: "Nexus", category: "DevOps", description: "仓库管理器", link: "https://www.sonatype.com/products/nexus-repository" },
        { name: "InfluxDB", category: "数据库", description: "时序数据库", link: "https://www.influxdata.com/" },
        { name: "PyTest", category: "DevOps", description: "Python测试框架", link: "https://docs.pytest.org/" },
        { name: "Webpack Dev Server", category: "DevOps", description: "开发服务器", link: "https://webpack.js.org/configuration/dev-server/" },
        { name: "CouchDB", category: "数据库", description: "文档数据库", link: "https://couchdb.apache.org/" },
        { name: "Puppet", category: "DevOps", description: "配置管理工具", link: "https://www.puppet.com/" },
        { name: "Rollup", category: "DevOps", description: "JavaScript 模块打包器", link: "https://rollupjs.org/" },
        { name: "Windsurf", category: "开发工具", description: "代理式 AI IDE", link: "https://windsurf.com/" },
        { name: "Gradle", category: "DevOps", description: "项目自动化构建工具", link: "https://gradle.org/" },
        { name: "Kibana", category: "DevOps", description: "数据可视化和分析平台", link: "https://www.elastic.co/kibana/" },
        { name: "Parcel", category: "DevOps", description: "零配置构建工具", link: "https://parceljs.org/" },
        { name: "TeamCity", category: "DevOps", description: "持续集成工具", link: "https://www.jetbrains.com/teamcity/" },
        { name: "esbuild", category: "DevOps", description: "极速 JavaScript 打包器", link: "https://esbuild.github.io/" },
        { name: "JUnit", category: "DevOps", description: "Java 单元测试框架", link: "https://junit.org/junit5/" },
        { name: "Chef", category: "DevOps", description: "系统集成框架", link: "https://www.chef.io/" },
        { name: "Artillery", category: "DevOps", description: "负载测试工具", link: "https://www.artillery.io/" },
        { name: "JMeter", category: "DevOps", description: "性能测试工具", link: "https://jmeter.apache.org/" },
        { name: "PHPUnit", category: "DevOps", description: "PHP测试框架", link: "https://phpunit.de/" },
        { name: "Bamboo", category: "DevOps", description: "持续集成和部署工具", link: "https://www.atlassian.com/software/bamboo" },
        { name: "ImageOptim", category: "DevOps", description: "图片无损或有损压缩工具", link: "https://imageoptim.com/mac" },
        { name: "CodeSandbox", category: "编辑工具", description: "在线代码编辑器", link: "https://codesandbox.io/" },
        { name: "Emacs", category: "编辑工具", description: "可扩展编辑器", link: "https://www.gnu.org/software/emacs/" },
        { name: "Replit", category: "开发工具", description: "在线 AI IDE", link: "https://replit.com/" },
        { name: "Gitpod", category: "开发工具", description: "云开发环境", link: "https://www.gitpod.io/" },
        { name: "DataGrip", category: "开发工具", description: "JetBrains 出品的数据库 IDE", link: "https://www.jetbrains.com/datagrip/" },
        { name: "Cursor", category: "开发工具", description: "AI 优先的代码编辑器", link: "https://cursor.sh/" },
        { name: "Fleet", category: "开发工具", description: "JetBrains 的下一代轻量级 IDE", link: "https://www.jetbrains.com/fleet/" },
        { name: "CLion", category: "开发工具", description: "JetBrains 出品的 C/C++ IDE", link: "https://www.jetbrains.com/clion/" },
        { name: "Google Docs", category: "编辑工具", description: "在线协作文档编辑器", link: "https://docs.google.com/" },
        { name: "Microsoft Word", category: "编辑工具", description: "Classical 文字处理软件", link: "https://www.microsoft.com/en-us/microsoft-365/word" },
        { name: "Grammarly", category: "编辑工具", description: "语法检查与写作辅助工具", link: "https://www.grammarly.com/" },
        { name: "Typora", category: "编辑工具", description: "简洁美观的 Markdown 编辑器", link: "https://typora.io/" },
        { name: "iA Writer", category: "编辑工具", description: "专注写作的 Markdown 编辑器", link: "https://ia.net/writer" },
        { name: "Scrivener", category: "编辑工具", description: "强大的长文写作与管理工具", link: "https://www.literatureandlatte.com/scrivener/overview" },
        { name: "Ulysses", category: "编辑工具", description: "Markdown 写作应用 (Apple 平台)", link: "https://ulysses.app/" },
        { name: "SimpleTex", category: "编辑工具", description: "LaTeX 公式 OCR 工具", link: "https://simpletex.cn/" },
        { name: "Procreate", category: "设计与制作", description: "iPad 绘画应用", link: "https://procreate.art/" },
        { name: "Sketch", category: "设计与制作", description: "macOS 专业设计工具", link: "https://www.sketch.com/" },
        { name: "InVision", category: "设计与制作", description: "设计协作平台", link: "https://www.invisionapp.com/" },
        { name: "Adobe Premiere", category: "设计与制作", description: "视频编辑软件", link: "https://www.adobe.com/products/premiere.html" },
        { name: "Adobe XD", category: "设计与制作", description: "用户体验设计工具", link: "https://www.adobe.com/products/xd.html" },
        { name: "Framer", category: "设计与制作", description: "交互原型设计", link: "https://www.framer.com/" },
        { name: "Zeplin", category: "设计与制作", description: "设计交付协作平台", link: "https://zeplin.io/" },
        { name: "Principle", category: "设计与制作", description: "交互动画设计", link: "https://principleformac.com/" },
        { name: "Lightroom", category: "设计与制作", description: "照片编辑与管理软件", link: "https://www.adobe.com/products/photoshop-lightroom.html" },
        { name: "DaVinci Resolve", category: "设计与制作", description: "免费且强大的专业视频编辑软件", link: "https://www.blackmagicdesign.com/products/davinciresolve/" },
        { name: "Cinema 4D", category: "设计与制作", description: "3D 动画软件", link: "https://www.maxon.net/en/cinema-4d" },
        { name: "Adobe After Effects", category: "设计与制作", description: "视频特效和动画制作", link: "https://www.adobe.com/products/aftereffects.html" },
        { name: "Axure", category: "设计与制作", description: "专业的原型设计工具", link: "https://www.axure.com/" },
        { name: "BandLab", category: "设计与制作", description: "在线协作音乐创作平台", link: "https://www.bandlab.com/" },
        { name: "GarageBand", category: "设计与制作", description: "苹果平台的音乐创作入门软件", link: "https://www.apple.com/mac/garageband/" },
        { name: "Carbon", category: "设计与制作", description: "生成漂亮的代码截图分享工具", link: "https://carbon.now.sh/" },
        { name: "HandBrake", category: "设计与制作", description: "开源的视频转码工具", link: "https://handbrake.fr/" },
        { name: "Heroicons", category: "设计与制作", description: "Tailwind CSS 团队制作的 SVG 图标集", link: "https://heroicons.com/" },
        { name: "Material Design", category: "设计与制作", description: "Google 开发的设计语言和系统", link: "https://m3.material.io/" },
        { name: "Khan Academy", category: "资源库", description: "免费的在线课程和练习", link: "https://www.khanacademy.org/" },
        { name: "HackerRank", category: "资源库", description: "编程挑战平台", link: "https://www.hackerrank.com/" },
        { name: "Frontend Masters", category: "资源库", description: "前端进阶教程", link: "https://frontendmasters.com/" },
        { name: "CodeWars", category: "资源库", description: "编程练习平台", link: "https://www.codewars.com/" },
        { name: "Udacity", category: "资源库", description: "在线技术教育", link: "https://www.udacity.com/" },
        { name: "GeeksforGeeks", category: "资源库", description: "计算机科学学习平台", link: "https://www.geeksforgeeks.org/" },
        { name: "JSFiddle", category: "资源库", description: "在线代码演示", link: "https://jsfiddle.net/" },
        { name: "PluralSight", category: "资源库", description: "技能发展平台", link: "https://www.pluralsight.com/" },
        { name: "Dev.to", category: "资源库", description: "程序员社区和博客平台", link: "https://dev.to/" },
        { name: "egghead", category: "资源库", description: "专业开发教程", link: "https://egghead.io/" },
        { name: "ArXiv", category: "资源库", description: "物理学、数学、计算机科学等领域的预印本存档库", link: "https://arxiv.org/" },
        { name: "C++ Insights", category: "资源库", description: "查看 C++ 编译器背后代码转换的工具", link: "https://cppinsights.io/" },
        { name: "Bing", category: "资源库", description: "微软的网络搜索引擎", link: "https://www.bing.com/" },
        { name: "You.com", category: "资源库", description: "注重隐私和 AI 功能的搜索引擎", link: "https://you.com/" },
        { name: "DuckDuckGo", category: "资源库", description: "注重隐私保护的搜索引擎", link: "https://duckduckgo.com/" },
        { name: "Grok", category: "AI 助手", description: "xAI 开发的对话式人工智能模型", link: "https://grok.x.ai/" },
        { name: "Claude", category: "AI 助手", description: "Anthropic 开发的 AI 助手", link: "https://claude.ai/" },
        { name: "DeepSeek", category: "AI 助手", description: "国产开源大语言模型", link: "https://chat.deepseek.com/" },
        { name: "Desmos", category: "数学", description: "在线图形计算器和数学工具", link: "https://www.desmos.com/" },
        { name: "Wolfram Alpha", category: "数学", description: "计算知识引擎，回答事实性查询", link: "https://www.wolframalpha.com/" },
        { name: "Matlab", category: "数据处理", description: "数值计算环境和编程语言", link: "https://www.mathworks.com/products/matlab.html" },
        { name: "Unity", category: "游戏开发", description: "跨平台游戏引擎", link: "https://unity.com/" },
        { name: "Cocos2d", category: "游戏开发", description: "开源的 2D 游戏开发框架 (如 Cocos2d-x)", link: "https://www.cocos.com/en/" },
        { name: "Box2D", category: "游戏开发", description: "2D 物理引擎库", link: "https://box2d.org/" },
        { name: "Pygame", category: "游戏开发", description: "用于编写视频游戏的 Python 模块集", link: "https://www.pygame.org/" },
        { name: "ROS (Robot Operating System)", category: "嵌入式开发", description: "用于机器人软件开发的框架和工具集", link: "https://www.ros.org/" },
        { name: "Raspberry Pi", category: "嵌入式开发", description: "低成本、信用卡大小的单板计算机", link: "https://www.raspberrypi.org/" },
        { name: "Arduino", category: "嵌入式开发", description: "开源电子原型平台", link: "https://www.arduino.cc/" },
        { name: "Keil MDK", category: "嵌入式开发", description: "面向 ARM Cortex-M 微控制器的软件开发环境", link: "https://www2.keil.com/mdk5/" },
        { name: "Android Studio", category: "特定平台开发", description: "Android 开发 IDE", link: "https://developer.android.com/studio" },
        { name: "Xcode", category: "特定平台开发", description: "苹果开发环境", link: "https://developer.apple.com/xcode/" },
        { name: "Apkpure", category: "资源库", description: "Android 应用商店", link: "https://apkpure.com/cn/" },
        { name: "DevEco Studio", category: "特定平台开发", description: "华为面向全场景多设备的应用开发 IDE", link: "https://developer.harmonyos.com/en/develop/deveco-studio/" },
        { name: "WPF (Windows Presentation Foundation)", category: "特定平台开发", description: "用于构建 Windows 桌面应用程序的 UI 框架", link: "https://docs.microsoft.com/en-us/dotnet/desktop/wpf/" },
        { name: "UWP (Universal Windows Platform)", category: "特定平台开发", description: "用于创建可在 Windows 设备上运行的应用的平台", link: "https://docs.microsoft.com/en-us/windows/uwp/" },
        { name: "Tauri", category: "跨平台开发", description: "使用 Web 前端构建桌面应用程序的框架", link: "https://tauri.app/" },
        { name: "WebAssembly (Wasm)", category: "跨平台开发", description: "可移植、体积小、加载快并且兼容 Web 的全新格式", link: "https://webassembly.org/" },
        { name: "Evernote", category: "生产力与组织", description: "Classical 笔记和信息收集应用", link: "https://evernote.com/" },
        { name: "Miro", category: "生产力与组织", description: "在线协作白板", link: "https://miro.com/" },
        { name: "Obsidian", category: "生产力与组织", description: "强大的本地知识库和笔记工具", link: "https://obsidian.md/" },
        { name: "Asana", category: "生产力与组织", description: "团队项目与任务管理平台", link: "https://asana.com/" },
        { name: "TickTick", category: "生产力与组织", description: "结合任务、日历、习惯打卡的管理应用", link: "https://ticktick.com/" },
        { name: "Forest App", category: "生产力与组织", description: "通过种树保持专注的应用", link: "https://www.forestapp.cc/" },
        { name: "Microsoft To Do", category: "生产力与组织", description: "微软的任务管理应用", link: "https://todo.microsoft.com/" },
        { name: "Freedom", category: "生产力与组织", description: "屏蔽网站和应用的干扰，专注工作", link: "https://freedom.to/" },
        { name: "Google Keep", category: "生产力与组织", description: "轻量级笔记和提醒工具", link: "https://keep.google.com/" },
        { name: "Workflowy", category: "生产力与组织", description: "无限层级的列表式笔记工具", link: "https://workflowy.com/" },
        { name: "Pomodoro Technique", category: "生产力与组织", description: "番茄工作法，提升专注度的时间管理方法", link: "https://francescocirillo.com/pages/pomodoro-technique" },
        { name: "MindNode", category: "生产力与组织", description: "思维导图软件，整理思路与创意", link: "https://mindnode.com/" },
        { name: "Raindrop.io", category: "生产力与组织", description: "跨平台的书签管理工具", link: "https://raindrop.io/" },
        { name: "Discord", category: "通讯与协作", description: "社区沟通与语音聊天平台", link: "https://discord.com/" },
        { name: "Gmail", category: "通讯与协作", description: "Google 邮件服务", link: "https://mail.google.com/" },
        { name: "Telegram", category: "通讯与协作", description: "注重安全和速度的即时通讯应用", link: "https://telegram.org/" },
        { name: "Google Meet", category: "通讯与协作", description: "Google 的视频会议服务", link: "https://meet.google.com/" },
        { name: "WhatsApp", category: "通讯与协作", description: "流行的跨平台即时通讯应用", link: "https://www.whatsapp.com/" },
        { name: "Outlook", category: "通讯与协作", description: "微软邮件与日历客户端", link: "https://outlook.live.com/" },
        { name: "Google Drive", category: "通讯与协作", description: "云存储与文件同步服务", link: "https://drive.google.com/" },
        { name: "Transmission", category: "系统与安全", description: "开源的 BitTorrent 客户端", link: "https://transmissionbt.com/" },
        { name: "IFTTT", category: "系统与安全", description: "连接不同 App 和服务的自动化平台", link: "https://ifttt.com/" },
        { name: "uBlock Origin", category: "系统与安全", description: "开源的广告拦截浏览器扩展", link: "https://github.com/gorhill/uBlock#ublock-origin" },
        { name: "CleanMyMac", category: "系统与安全", description: "系统清理与优化工具", link: "https://macpaw.com/cleanmymac" },
        { name: "Alfred", category: "系统与安全", description: "高效的启动器与效率工具", link: "https://www.alfredapp.com/" },
        { name: "ShareX", category: "系统与安全", description: "强大的截图与屏幕录制工具", link: "https://getsharex.com/" },
        { name: "7-Zip", category: "系统与安全", description: "文件压缩与解压缩工具", link: "https://www.7-zip.org/" },
        { name: "IrfanView", category: "系统与安全", description: "轻量级快速图片查看器", link: "https://www.irfanview.com/" },
        { name: "Bandizip", category: "系统与安全", description: "文件压缩和解压缩软件", link: "https://www.bandisoft.com/bandizip/" },
        { name: "Headspace", category: "健康与生活", description: "冥想与放松指导应用", link: "https://www.headspace.com/" },
        { name: "MyFitnessPal", category: "健康与生活", description: "食物热量与营养追踪应用", link: "https://www.myfitnesspal.com/" },
        { name: "Strava", category: "健康与生活", description: "运动追踪与社交分享 (跑步、骑行)", link: "https://www.strava.com/" },
        { name: "Sleep Cycle", category: "健康与生活", description: "智能睡眠追踪与闹钟应用", link: "https://www.sleepcycle.com/" },
        { name: "Waterllama", category: "健康与生活", description: "提醒按时喝水的应用", link: "https://waterllama.com/" },
        { name: "Paprika Recipe Manager", category: "健康与生活", description: "食谱管理与购物清单应用", link: "https://www.paprikaapp.com/" },
        { name: "Mealime", category: "健康与生活", description: "快速简单的健康食谱计划应用", link: "https://www.mealime.com/" },
        { name: "YNAB", category: "财务管理", description: "零基预算方法的预算软件", link: "https://www.youneedabudget.com/" },
        { name: "Mint", category: "财务管理", description: "个人财务管理和预算追踪应用", link: "https://mint.intuit.com/" },
        { name: "Google Sheets", category: "财务管理", description: "电子表格，可用于记账和预算规划", link: "https://sheets.google.com/" },
        { name: "Anki", category: "学习与知识", description: "基于间隔重复的智能闪卡记忆软件", link: "https://apps.ankiweb.net/" },
        { name: "Duolingo", category: "学习与知识", description: "游戏化的语言学习应用", link: "https://www.duolingo.com/" },
        { name: "Zotero", category: "学习与知识", description: "文献管理与引用工具", link: "https://www.zotero.org/" },
        { name: "Pocket", category: "学习与知识", description: "稍后阅读服务，保存文章和网页", link: "https://getpocket.com/" },
        { name: "Goodreads", category: "学习与知识", description: "图书推荐与阅读社区", link: "https://www.goodreads.com/" },
        { name: "Feedly", category: "学习与知识", description: "RSS 新闻聚合阅读器", link: "https://feedly.com/" },
        { name: "Calibre", category: "学习与知识", description: "电子书管理软件", link: "https://calibre-ebook.com/" },
        { name: "Spotify", category: "娱乐工具", description: "流媒体音乐服务", link: "https://www.spotify.com/" },
        { name: "Netflix", category: "内容平台", description: "流媒体视频平台", link: "https://www.netflix.com/" },
        { name: "Audible", category: "娱乐工具", description: "有声书平台", link: "https://www.audible.com/" },
        { name: "VLC Media Player", category: "娱乐工具", description: "强大的跨平台多媒体播放器", link: "https://www.videolan.org/vlc/" },
        { name: "Kindle", category: "娱乐工具", description: "电子书阅读器或应用", link: "https://www.amazon.com/kindle-dbs/storefront" },
        { name: "Pocket Casts", category: "娱乐工具", description: "播客（Podcast）收听应用", link: "https://pocketcasts.com/" },
        { name: "WakaTime", category: "生产力与组织", description: "自动记录编程时间的插件和仪表盘", link: "https://wakatime.com/" },
        { name: "Google Calendar", category: "生产力与组织", description: "在线日历，管理日程安排", link: "https://calendar.google.com/" }
    ]
        .map(tool => ({
            ...tool,
            size: calculateCardSize(tool)
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="items-grid">
                            {filteredTools.map((tool, index) => (
                                <motion.div
                                    className={`item-card`}
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
