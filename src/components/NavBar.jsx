import { useState, useEffect, useRef } from 'react'
import './NavBar.css'

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
                    <button type="button" className="menu-button" onClick={handleMenuClick}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </button>
                    {menuOpen && (
                        <div className="dropdown-menu mobile-links">
                            <a href="https://minsecrus.github.io/HistoryAxis/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact"
                            >
                                HistoryAxis
                            </a>
                            <a href="https://minsecrus.github.io/GeneGraph/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact"
                            >
                                GeneGraph
                            </a>
                            <a href="https://minsecrus.github.io/ProConSheet/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact"
                            >
                                ProConSheet
                            </a>
                            <a href="https://minsecrus.github.io/CalliGrid/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact"
                            >
                                CalliGrid
                            </a>
                            <a href="https://minsecrus.github.io/NameKura/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact"
                            >
                                NameKura
                            </a>
                            <a href="https://minsecrus.github.io/Frontend-Guide/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact"
                            >
                                Frontend Guide
                            </a>
                            <a href="https://minsecrus.github.io/CssTellation/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact"
                            >
                                CssTellation
                            </a>
                            <a href="https://minsecrus.github.io/ZenResume-Generator/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact">
                                ZenResume
                            </a>
                            <a href="https://minsecrus.github.io/mini-vue/" target="_blank" rel="noopener noreferrer" className="dropdown-item interact">
                                Mini Vue
                            </a>
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
                    )}
                </div>
            </div>
        </nav>
    )
}
