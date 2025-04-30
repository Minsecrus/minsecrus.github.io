import { motion } from 'motion/react'
import { useState } from 'react'
import './list.css'  // 引入通用样式
import { calculateCardSize } from '../utils/cardUtils'

export function Library() {
    const [filter, setFilter] = useState('')

    const books = [
        { name: "深入理解计算机系统", category: "计算机基础", description: "计算机系统底层原理详解" },
        { name: "计算机程序设计艺术", category: "计算机科学", description: "计算科学的经典之作" },
        { name: "算法导论", category: "算法与数据结构", description: "经典算法教材" },
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
        name: book.link ? book.name : `《${book.name}》`,
        size: calculateCardSize(book, book.link ? true : false),
    }))

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().replace(/\s/g, "").includes(filter.toLowerCase().replace(/\s/g, "")) ||
        book.category.toLowerCase().replace(/\s/g, "").includes(filter.toLowerCase().replace(/\s/g, "")) ||
        book.description.toLowerCase().replace(/\s/g, "").includes(filter.toLowerCase().replace(/\s/g, ""))
    )

    const categories = [...new Set(books.map(book => book.category))]

    return (
        <div className="list-container">
            <div className="list-content">
                <main className="list-main">
                    <h2 className="subtitle interact">我的图书馆和资料库 ~</h2>

                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="items-grid">
                            {filteredBooks.map((book, index) => (
                                <motion.div
                                    className={`item-card`}
                                    data-category={book.category}
                                    data-size={book.size}
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