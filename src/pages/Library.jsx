import { motion } from 'motion/react'
import { useState } from 'react'
import styles from './Library.module.css'
import './list.css'  // 引入通用样式

function getStringLength(str) {
    return Array.from(str).reduce((len, char) => {
        return len + (/[\u4e00-\u9fa5]/.test(char) ? 1.5 : 1);
    }, 0);
}

function calculateCardSize(book) {
    const nameLength = getStringLength(book.name);
    const descLength = getStringLength(book.description);

    if (nameLength > 16) return 'wider';
    if (nameLength > 8.5) return 'wide';
    if (descLength > 30) return 'wide';
    return 'normal';
}

export function Library() {
    const [filter, setFilter] = useState('')

    const books = [
        { name: "深入理解计算机系统", category: "计算机基础", description: "计算机系统底层原理详解" },
        { name: "算法导论", category: "算法与数据结构", description: "经典算法教材" },
        { name: "JavaScript 高级程序设计", category: "前端开发", description: "JavaScript 圣经" },
        { name: "你不知道的 JavaScript", category: "前端开发", description: "深入 JavaScript 语言核心机制" },
        { name: "CSS 揭秘", category: "前端开发", description: "CSS 技巧与诀窍大全" },
        { name: "深入理解 Java 虚拟机", category: "后端开发", description: "JVM 原理与调优指南" },
        { name: "Spring实战", category: "后端开发", description: "Spring 框架实践指南" },
        { name: "Python 编程：从入门到实践", category: "编程语言", description: "Python 入门经典教材" },
        { name: "Go 语言实战", category: "编程语言", description: "Go 语言开发实践指南" },
        { name: "SQL 必知必会", category: "数据库", description: "SQL 基础入门指南" },
        { name: "MongoDB 权威指南", category: "数据库", description: "MongoDB 完整参考手册" },
        { name: "CPP Reference", category: "编程语言", description: "C++ 标准库完整参考", link: "https://zh.cppreference.com" },
        { name: "MDN Web Docs", category: "前端开发", description: "Web 技术权威文档", link: "https://developer.mozilla.org" },
        { name: "Rust 程序设计语言", category: "编程语言", description: "Rust 官方中文文档", link: "https://rustwiki.org/zh-CN/book" },
        { name: "Python 文档", category: "编程语言", description: "Python 官方中文文档", link: "https://docs.python.org/zh-cn" },
        { name: "Go 语言之旅", category: "编程语言", description: "Go 语言在线教程", link: "https://tour.go-zh.org" },
        { name: "TypeScript 手册", category: "前端开发", description: "TypeScript 中文文档", link: "https://typescript.bootcss.com" },
        { name: "React 中文文档", category: "前端开发", description: "React 官方中文文档", link: "https://zh-hans.react.dev" },
        { name: "Linux 手册页", category: "计算机基础", description: "Linux 命令手册", link: "https://man7.org/linux/man-pages" },
        { name: "Docker 实战", category: "DevOps", description: "Docker 容器化实践" },
        { name: "Kubernetes 权威指南", category: "DevOps", description: "K8s 集群管理与应用部署" },
        { name: "重构：改善既有代码的设计", category: "软件设计", description: "代码重构经典指南" },
        { name: "代码整洁之道", category: "软件设计", description: "编写清晰代码的实践指南" },
        { name: "编程珠玑", category: "算法与数据结构", description: "程序设计经典案例赏析" },
        { name: "HTTP 权威指南", category: "网络编程", description: "HTTP 协议详解" },
        { name: "图解 TCP/IP", category: "网络编程", description: "TCP/IP 协议图解" },
        { name: "Unix网络编程", category: "网络编程", description: "网络编程经典著作" },
    ].map(book => ({
        ...book,
        size: calculateCardSize(book)
    }))

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(filter.toLowerCase()) ||
        book.category.toLowerCase().includes(filter.toLowerCase()) ||
        book.description.toLowerCase().includes(filter.toLowerCase())
    )

    const categories = [...new Set(books.map(book => book.category))]

    return (
        <div className="list-container">
            <div className="list-content">
                <main className="list-main">
                    <h2 className="subtitle interact">我的资料库 ~</h2>

                    <motion.section
                        className={styles.booksSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="items-grid">
                            {filteredBooks.map((book, index) => (
                                <motion.div
                                    className={`item-card ${book.link ? 'cursor-pointer' : ''}`}
                                    data-category={book.category}
                                    data-size={calculateCardSize(book)}
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
                                    key={book.name}
                                >
                                    <h3 className="interact">
                                        {book.link ? (
                                            <a href={book.link} target="_blank" rel="noopener noreferrer" className="no-color-link">{book.name}</a>
                                        ) : (
                                            book.name
                                        )}</h3>
                                    <p className="item-desc text">{book.description}</p>
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