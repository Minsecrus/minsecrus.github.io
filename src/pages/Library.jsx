import { motion } from 'motion/react'
import { useState } from 'react'
import styles from './Library.module.css'

export function Library() {
    const [filter, setFilter] = useState('')

    const books = [
        { name: "深入理解计算机系统", category: "计算机基础", description: "计算机系统底层原理详解", size: "wide" },
        { name: "算法导论", category: "算法与数据结构", description: "经典算法教材" },
        { name: "设计模式", category: "软件设计", description: "Gang of Four的23种设计模式", size: "wide" },
        { name: "JavaScript高级程序设计", category: "前端开发", description: "JavaScript圣经" },
        { name: "你不知道的JavaScript", category: "前端开发", description: "深入JavaScript语言核心机制" },
        { name: "CSS揭秘", category: "前端开发", description: "CSS技巧与诀窍大全" },
        { name: "深入理解Java虚拟机", category: "后端开发", description: "JVM原理与调优指南" },
        { name: "Spring实战", category: "后端开发", description: "Spring框架实践指南" },
        { name: "Python编程：从入门到实践", category: "编程语言", description: "Python入门经典教材" },
        { name: "Go语言实战", category: "编程语言", description: "Go语言开发实践指南" },
        { name: "SQL必知必会", category: "数据库", description: "SQL基础入门指南" },
        { name: "MongoDB权威指南", category: "数据库", description: "MongoDB完整参考手册" },
        { name: "Docker实战", category: "DevOps", description: "Docker容器化实践" },
        { name: "Kubernetes权威指南", category: "DevOps", description: "K8s集群管理与应用部署" },
        { name: "重构：改善既有代码的设计", category: "软件设计", description: "代码重构经典指南" },
        { name: "代码整洁之道", category: "软件设计", description: "编写清晰代码的实践指南" },
        { name: "编程珠玑", category: "算法与数据结构", description: "程序设计经典案例赏析" },
        { name: "HTTP权威指南", category: "网络编程", description: "HTTP协议详解" },
        { name: "图解TCP/IP", category: "网络编程", description: "TCP/IP协议图解" },
        { name: "Unix网络编程", category: "网络编程", description: "网络编程经典著作" },
        // ... 更多书籍
    ].map(book => ({
        ...book,
        size: book.name.length > 17 ? 'wider' : book.name.length > 9 ? 'wide' :
            book.description.length > 20 ? 'wide' : 'normal'
    }))

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(filter.toLowerCase()) ||
        book.category.toLowerCase().includes(filter.toLowerCase()) ||
        book.description.toLowerCase().includes(filter.toLowerCase())
    )

    const categories = [...new Set(books.map(book => book.category))]

    return (
        <div className={styles.libraryContainer}>
            <div className={styles.libraryContent}>
                <main className={styles.libraryMain}>
                    <h2 className="subtitle interact">我的技术书籍与学习资源 ~</h2>

                    <motion.section
                        className={styles.booksSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.booksGrid}>
                            {filteredBooks.map((book, index) => (
                                <motion.div
                                    className={styles.bookCard}
                                    data-category={book.category}
                                    data-size={book.size}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: Math.min(index * 0.02, 0.8),
                                        duration: 0.2
                                    }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    key={book.name}
                                >
                                    <h3 className="interact">{book.name}</h3>
                                    <p className={`${styles.bookDesc} text`}>{book.description}</p>
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