import { motion } from 'motion/react'
import { useState, useMemo } from 'react'
import '../pages/list.css'
import { filterItems } from '../utils/filterUtils'

export function ListPage({ title, searchLabel = '搜索...', items = [] }) {
    const [filter, setFilter] = useState('')

    const filteredItems = useMemo(
        () => filterItems(items, filter),
        [items, filter]
    )

    const categories = useMemo(
        () => [...new Set(items.map(item => item.category))],
        [items]
    )

    return (
        <div className="list-container">
            <div className="list-content">
                <main className="list-main">
                    <h2 className="subtitle interact">{title}</h2>

                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="items-grid">
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    className="item-card"
                                    data-category={item.category}
                                    data-size={item.size}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{
                                        scale: 1.02,
                                        y: -2,
                                        transition: {
                                            duration: 0.2,
                                            ease: 'easeOut'
                                        }
                                    }}
                                    transition={{
                                        opacity: {
                                            delay: Math.min(index * 0.02, 0.8),
                                            duration: 0.2
                                        }
                                    }}
                                    key={item.name}
                                >
                                    <h3 className="interact">
                                        {item.link ? (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="no-color-link"
                                            >
                                                {item.displayName || item.name}
                                            </a>
                                        ) : (
                                            item.displayName || item.name
                                        )}
                                    </h3>
                                    <p className="item-desc text">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </main>
            </div>

            <aside className="filter-sidebar">
                <div className="filter-container">
                    <input
                        type="text"
                        aria-label={searchLabel}
                        placeholder="搜索..."
                        className="search-input"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <div className="category-filters">
                        <div className="category-buttons">
                            <button
                                type="button"
                                className={`category-btn ${filter === '' ? 'active' : ''}`}
                                onClick={() => setFilter('')}
                                aria-pressed={filter === ''}
                            >
                                全部
                            </button>
                            {categories.map((category) => (
                                <button
                                    type="button"
                                    className={`category-btn ${filter === category ? 'active' : ''}`}
                                    onClick={() => setFilter(category)}
                                    aria-pressed={filter === category}
                                    key={category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}
