import { calculateCardSize } from '../utils/cardUtils'

export const libraryBooks = [
    { name: "深入理解计算机系统", category: "计算机基础", description: "计算机系统底层原理详解" },
    { name: "计算机程序设计艺术", category: "计算机科学", description: "计算科学的经典之作" },
    { name: "算法导论", category: "算法与数据结构", description: "经典算法教材" },
    { name: "Vibe Vibe", category: "人工智能", description: "全民 AI 学习第一课，首个系统化 Vibe Coding 开源教程", link: "https://vibevibe.cn/" },
    { name: "JavaScript 高级程序设计", category: "前端开发", description: "JavaScript 圣经" },
    { name: "你不知道的 JavaScript", category: "前端开发", description: "深入 JavaScript 语言核心机制" },
    { name: "深入理解 Java 虚拟机", category: "后端开发", description: "JVM 原理与调优指南" },
    { name: "计算机程序的构造和解释", category: "编程语言", description: "又名 SICP，编程语言理论的经典之作" },
    { name: "CPP Reference", category: "编程语言", description: "C++ 标准库完整参考", link: "https://zh.cppreference.com" },
    { name: "MDN Web Docs", category: "前端开发", description: "Web 技术权威文档", link: "https://developer.mozilla.org" },
    { name: "Rust 程序设计语言", category: "编程语言", description: "Rust 官方中文文档", link: "https://rustwiki.org/zh-CN/book" },
    { name: "Python 文档", category: "编程语言", description: "Python 官方中文文档", link: "https://docs.python.org/zh-cn" },
    { name: "Go 语言之旅", category: "编程语言", description: "Go 语言在线教程", link: "https://tour.go-zh.org" },
    { name: "TypeScript 手册", category: "前端开发", description: "TypeScript 中文文档", link: "https://typescript.bootcss.com" },
    { name: "React 中文文档", category: "前端开发", description: "React 官方中文文档", link: "https://zh-hans.react.dev" },
    { name: "Linux 手册页", category: "计算机基础", description: "Linux 命令手册", link: "https://www.kernel.org/doc/man-pages/" },
].map(book => ({
    ...book,
    displayName: book.link ? book.name : `《${book.name}》`,
    size: calculateCardSize(book, Boolean(book.link)),
}))
