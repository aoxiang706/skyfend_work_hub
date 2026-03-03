import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const nav = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/docs', label: '文档' },
  { to: '/notes', label: '笔记资料' },
  { to: '/add-note', label: '添加笔记' },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">Work Hub</Link>
        <nav className="nav">
          {nav.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={location.pathname === to || (to !== '/' && location.pathname.startsWith(to)) ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className={`main ${(location.pathname.startsWith('/notes') || location.pathname.startsWith('/docs')) ? 'main-wide' : ''}`}>
        {children}
      </main>
      <footer className="footer">
        <a href="https://github.com/aoxiang706" target="_blank" rel="noreferrer">GitHub @aoxiang706</a>
      </footer>
    </div>
  )
}
