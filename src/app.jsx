import './app.css'
import { NavBar } from './components/NavBar'
import { animate, motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { Toolbox } from './pages/Toolbox'
import { Library } from './pages/Library'
import { Footer } from './components/Footer'
import { About } from './pages/About'

export function App() {
  const [currentPage, setCurrentPage] = useState('home')

  // 处理导航
  const navigateTo = (page) => {
    setCurrentPage(page)
    window.history.pushState(null, '', page === 'home' ? '/' : `/${page}`)
  }

  // 处理浏览器前进后退
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/' || path === '') {
        setCurrentPage('home')
      } else if (path === '/about') {
        setCurrentPage('about')
      } else if (path === '/toolbox') {
        setCurrentPage('toolbox')
      } else if (path === '/library') {
        setCurrentPage('library')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // 根据URL初始化页面
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/about') {
      setCurrentPage('about')
    } else if (path === '/toolbox') {
      setCurrentPage('toolbox')
    } else if (path === '/library') {
      setCurrentPage('library')
    }
  }, [])


  // 渲染当前页面
  const renderPage = () => {
    switch (currentPage) {
      case 'toolbox':
        useEffect(() => {
          document.title = 'Minsecrus - 工具箱';
        })
        return <Toolbox />
      case 'library':
        useEffect(() => {
          document.title = 'Minsecrus - 资料库';
        })
        return <Library />
      case 'about':
        useEffect(() => {
          document.title = 'Minsecrus - 关于本网站';
        })
        return <About />
      default:
        useEffect(() => {
          document.title = 'Minsecrus - 遇见更好的自己';
        })
        return (
          <main className="main-content">
            <h2 className="pretitle text">Hi, I'm</h2>
            <h1 className="main-title text">Minsecrus.</h1>
            <h2 className="subtitle interact">- 践行博弈与拟合，倾听愿望与呐喊 -</h2>
            <div className="button-bar">
              <button className="primary-btn interact" onClick={() => navigateTo('toolbox')}>我的工具箱</button>
              <button className="secondary-btn interact" onClick={() => navigateTo('library')}>我的资料库</button>
            </div>

            {/* 技能展示区 */}
            <motion.section
              className="skills-section"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title interact">喜欢的事</h2>
              <div className="skills-grid">
                <motion.div
                  className="skill-card"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                  whileHover={{ scale: 1.05, transition: { delay: 0 } }}
                >
                  <h3 className="interact">读书，读诗</h3>
                  <p className="skill-desc text">茅盾，老舍，巴金，沈从文；Victor Hugo，Albert Camus，J.K.Rowling；王勃，白居易，李贺，柳永，贺铸</p>
                </motion.div>

                <motion.div
                  className="skill-card"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                  whileHover={{ scale: 1.05, transition: { delay: 0 } }}
                >
                  <h3 className="interact">沉迷于 Maths 无法自拔</h3>
                  <p className="skill-desc text">微分几何，泛函分析，范畴论</p>
                </motion.div>

                <motion.div
                  className="skill-card"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                  whileHover={{ scale: 1.05, transition: { delay: 0 } }}
                >
                  <h3 className="interact">计算机科学真奇妙</h3>
                  <p className="skill-desc text">PLT，Web 前后端，Linux，数据结构与算法，计算机网络</p>
                </motion.div>

                <motion.div
                  className="skill-card"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
                  whileHover={{ scale: 1.05, transition: { delay: 0 } }}
                >
                  <h3 className="interact">Games ~</h3>
                  <p className="skill-desc text">原神，Minecraft</p>
                </motion.div>
              </div>
            </motion.section>

            {/* 项目展示区 */}
            <motion.section
              className="projects-section"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title interact">我的 Github</h2>
              <div className="project-grid">
                {/* 项目 1: Minsecrus.github.io */}
                <motion.div
                  className="project-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                  whileHover={{ y: -10, transition: { delay: 0 } }}
                  onClick={() => window.open('https://github.com/Minsecrus/Minsecrus.github.io', '_blank', 'noopener,noreferrer')}
                >
                  <div className="project-content">
                    <h3 className="interact">Minsecrus.github.io</h3>
                    <p className="text">个人主页项目，使用 Preact 和 Motion 构建的现代化网站</p>
                  </div>
                </motion.div>

                {/* 项目 2: Mdr-C-Tutorial */}
                <motion.div
                  className="project-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                  whileHover={{ y: -10, transition: { delay: 0 } }}
                  onClick={() => window.open('https://github.com/Mdr-C-Tutorial/C', '_blank', 'noopener,noreferrer')}
                >
                  <div className="project-content">
                    <h3 className="interact">Mdr-C-Tutorial</h3>
                    <p className="text">完全开源免费的全套 C 语言教程，涉及从基础语法到项目开发的广大领域</p>
                  </div>
                </motion.div>

                {/* 项目 3: 操作系统 CPOS */}
                <motion.div
                  className="project-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.6 } }}
                  whileHover={{ y: -10, transition: { delay: 0 } }}
                  onClick={() => window.open('https://github.com/PLOS-clan/CoolPotOS', '_blank', 'noopener,noreferrer')} /* 替换为实际链接 */
                >
                  <div className="project-content">
                    <h3 className="interact">操作系统 CPOS</h3>
                    <p className="text">自制操作系统内核，在 Bilibili 有几十万播放量</p>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* 联系方式区域 */}
            <motion.section
              className="contact-section"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title interact">加个联系方式吧</h2>
              <div className="contact-list">
                <motion.p
                  className="contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="interact">微信：</span>
                  <a className="interact">Minsecrus_dreamers</a>
                </motion.p>
                <motion.p
                  className="contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="interact">QQ：</span>
                  <a className="interact">2972853299</a>
                </motion.p>
                <motion.p
                  className="contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="interact">编程交流群：</span>
                  <a className="interact">885719573</a>
                </motion.p>
                <motion.p
                  className="contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="interact">知识脱贫群：</span>
                  <a className="interact">1019721429</a>
                </motion.p>
              </div>
            </motion.section>
          </main>
        )
    }
  }

  return (
    <>
      <NavBar currentPage={currentPage} navigateTo={navigateTo} />
      {renderPage()}
      <Footer />
    </>
  )
}
