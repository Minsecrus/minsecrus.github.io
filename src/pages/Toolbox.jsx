import { motion } from 'motion/react'
import { useState } from 'react'
import './list.css'  // 引入通用样式
import { calculateCardSize } from '../utils/cardUtils'
import { filterItems } from '../utils/filterUtils'
import { data } from '../data/tools'

export function Toolbox() {
    const [filter, setFilter] = useState('')

    const initialTools = data

    const tools = useMemo(() =>
        initialTools.map(tool => ({
            ...tool,
            size: calculateCardSize(tool)
        })),
        [initialTools]
    );

    const filteredTools = filterItems(tools, filter)

    const categories = useMemo(() =>
        [...new Set(initialTools.map(tool => tool.category))],
        [initialTools]
    );

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
