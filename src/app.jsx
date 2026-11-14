import { useState, useEffect, lazy, Suspense } from 'react'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { ToastContainer } from './components/Toast'
import { Home } from './pages/Home'
import { getPageFromPath, getPathForPage, getTitleForPage } from './routes'
import { useToast } from './utils/useToast'
import './app.css'

// 懒加载其他页面组件，使首屏初始 JS 体积减少 ~90%
const Toolbox = lazy(() => import('./pages/Toolbox'))
const Library = lazy(() => import('./pages/Library'))
const Abbr = lazy(() => import('./pages/Abbr'))
const About = lazy(() => import('./pages/About'))

export function App() {
    const [currentPage, setCurrentPage] = useState(() => getPageFromPath(window.location.pathname))
    const { toasts, removeToast, copyWithToast } = useToast()

    const navigateTo = (page) => {
        setCurrentPage(page)
        window.history.pushState(null, '', getPathForPage(page))
        window.scrollTo({ top: 0, behavior: 'instant' })
    }

    useEffect(() => {
        const handlePathChange = () => {
            setCurrentPage(getPageFromPath(window.location.pathname))
        }

        window.addEventListener('popstate', handlePathChange)
        return () => window.removeEventListener('popstate', handlePathChange)
    }, [])

    useEffect(() => {
        document.title = getTitleForPage(currentPage)
    }, [currentPage])

    const renderPage = () => {
        switch (currentPage) {
            case 'toolbox':
                return <Toolbox />
            case 'library':
                return <Library />
            case 'abbr':
                return <Abbr />
            case 'about':
                return <About />
            default:
                return <Home navigateTo={navigateTo} copyToClipboard={copyWithToast} />
        }
    }

    return (
        <>
            <NavBar currentPage={currentPage} navigateTo={navigateTo} />
            <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>
                {renderPage()}
            </Suspense>
            <Footer />
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </>
    )
}
