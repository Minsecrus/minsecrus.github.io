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

    const handleNavClick = (event, page) => {
        event.preventDefault()
        navigateTo(page)
        setMenuOpen(false)
    }

    return (
        <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            <a
                href="/"
                className="brand-link text"
                onClick={(event) => handleNavClick(event, 'home')}
                aria-current={currentPage === 'home' ? 'page' : undefined}
            >
                Minsecrus
            </a>
            <div className="nav-actions">
                <div className="links">
                    <a
                        href="/abbr"
                        className={`nav-link-btn interact desktop-primary ${currentPage === 'abbr' ? 'active' : ''}`}
                        onClick={(event) => handleNavClick(event, 'abbr')}
                        aria-current={currentPage === 'abbr' ? 'page' : undefined}
                    >
                        Abbr
                    </a>
                    <a
                        href="/about"
                        className={`nav-link-btn interact desktop-primary ${currentPage === 'about' ? 'active' : ''}`}
                        onClick={(event) => handleNavClick(event, 'about')}
                        aria-current={currentPage === 'about' ? 'page' : undefined}
                    >
                        About
                    </a>
                </div>
                <div className="menu-container" ref={menuRef}>
                    <button
                        type="button"
                        className="menu-button"
                        onClick={handleMenuClick}
                        aria-label="打开导航菜单"
                        aria-expanded={menuOpen}
                        aria-controls="site-navigation-menu"
                    >
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </button>
                    {menuOpen && (
                        <div className="dropdown-menu mobile-links" id="site-navigation-menu">
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
                                    <a
                                        href="/abbr"
                                        className={`dropdown-item dropdown-item-btn interact mobile-menu-item ${currentPage === 'abbr' ? 'active' : ''}`}
                                        onClick={(event) => handleNavClick(event, 'abbr')}
                                        aria-current={currentPage === 'abbr' ? 'page' : undefined}
                                    >
                                        Abbr
                                    </a>
                                    <a
                                        href="/about"
                                        className={`dropdown-item dropdown-item-btn interact mobile-menu-item ${currentPage === 'about' ? 'active' : ''}`}
                                        onClick={(event) => handleNavClick(event, 'about')}
                                        aria-current={currentPage === 'about' ? 'page' : undefined}
                                    >
                                        About
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
