import { useState, useEffect, useRef } from 'react'
import './NavBar.css'

const projectGroups = [
    {
        title: '教程和分享',
        items: [
            { name: 'FrontFrontier', href: 'https://minsecrus.github.io/FrontFrontier/' },
        ],
    },
    {
        title: '微项目',
        items: [
            { name: 'HistoryAxis', href: 'https://minsecrus.github.io/HistoryAxis/' },
            { name: 'GeneGraph', href: 'https://minsecrus.github.io/GeneGraph/' },
            { name: 'ProConSheet', href: 'https://minsecrus.github.io/ProConSheet/' },
            { name: 'CalliGrid', href: 'https://minsecrus.github.io/CalliGrid/' },
            { name: 'NameKura', href: 'https://minsecrus.github.io/NameKura/' },
            { name: 'CssTellation', href: 'https://minsecrus.github.io/CssTellation/' },
            { name: 'ZenResume', href: 'https://minsecrus.github.io/ZenResume-Generator/' },
        ],
    },
]

export function NavBar({ currentPage, navigateTo }) {
    const [visible, setVisible] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)


    const prevScrollPos = useRef(window.scrollY)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY
            setVisible(prevScrollPos.current > currentScrollPos || currentScrollPos < 10)
            prevScrollPos.current = currentScrollPos
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuOpen])

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen)
    }

    const handleLinkClick = (page) => {
        navigateTo(page)
        setMenuOpen(false)
    }

    return (
        <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            <span className="text" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Minsecrus</span>
            <div className="nav-actions">
                <div className="links">
                    <button
                        type="button"
                        className={`nav-link-btn interact desktop-primary ${currentPage === 'abbr' ? 'active' : ''}`}
                        onClick={() => navigateTo('abbr')}
                    >
                        Abbr
                    </button>
                    <button
                        type="button"
                        className={`nav-link-btn interact desktop-primary ${currentPage === 'about' ? 'active' : ''}`}
                        onClick={() => navigateTo('about')}
                    >
                        About
                    </button>
                </div>
                <div className="menu-container" ref={menuRef}>
                    <button
                        type="button"
                        className="menu-button"
                        onClick={handleMenuClick}
                        aria-label="打开导航菜单"
                        aria-expanded={menuOpen}
                    >
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </button>
                    {menuOpen && (
                        <div className="dropdown-menu mobile-links">
                            {projectGroups.map((group) => (
                                <section
                                    className={`dropdown-group ${group.items.length === 1 ? 'is-single' : ''}`}
                                    key={group.title}
                                >
                                    <p className="dropdown-group-title">{group.title}</p>
                                    <div className="dropdown-group-items">
                                        {group.items.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="dropdown-item interact"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </section>
                            ))}
                            <div className="dropdown-group mobile-page-group">
                                <p className="dropdown-group-title">本站页面</p>
                                <div className="dropdown-group-items">
                                    <button
                                        type="button"
                                        className={`dropdown-item dropdown-item-btn interact mobile-menu-item ${currentPage === 'abbr' ? 'active' : ''}`}
                                        onClick={() => handleLinkClick('abbr')}
                                    >
                                        Abbr
                                    </button>
                                    <button
                                        type="button"
                                        className={`dropdown-item dropdown-item-btn interact mobile-menu-item ${currentPage === 'about' ? 'active' : ''}`}
                                        onClick={() => handleLinkClick('about')}
                                    >
                                        About
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
