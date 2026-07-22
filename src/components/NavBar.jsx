import { useState, useEffect, useRef } from 'react'
import { githubPageProjectGroups } from '../data/githubProjects'
import './NavBar.css'

const blogHref = 'https://minsecrus.github.io/minsecrus-blog/'

const sitePages = [
    { name: '工具箱', page: 'toolbox', href: '/toolbox' },
    { name: '资料库', page: 'library', href: '/library' },
    { name: 'Abbr', page: 'abbr', href: '/abbr' },
    { name: 'Blog', href: blogHref },
    { name: 'About', page: 'about', href: '/about' },
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
                        href={blogHref}
                        className="nav-link-btn interact desktop-primary"
                    >
                        Blog
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
                            {githubPageProjectGroups.map((group) => (
                                <section
                                    className={`dropdown-group ${group.items.length === 1 ? 'is-single' : ''}`}
                                    key={group.title}
                                >
                                    <p className="dropdown-group-title">{group.title}</p>
                                    <div className="dropdown-group-items">
                                        {group.items.map((item) => (
                                            <a
                                                key={item.id}
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
                                    {sitePages.map((item) => (
                                        <a
                                            key={item.page ?? item.href}
                                            href={item.href}
                                            className={`dropdown-item dropdown-item-btn interact mobile-menu-item ${item.page && currentPage === item.page ? 'active' : ''}`}
                                            onClick={item.page ? (event) => handleNavClick(event, item.page) : undefined}
                                            aria-current={item.page && currentPage === item.page ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
