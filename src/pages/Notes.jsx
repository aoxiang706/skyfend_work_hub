import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './pages.css'

const BASE = import.meta.env.BASE_URL || '/'

export default function Notes() {
  const [list, setList] = useState([])
  const [activeCategory, setActiveCategory] = useState('全部')

  useEffect(() => {
    fetch(`${BASE}content/notes/index.json`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => setList(data.items || []))
      .catch(() => setList([]))
  }, [])

  const categories = ['全部', ...new Set(list.map((n) => n.category).filter(Boolean))]
  const filtered =
    activeCategory === '全部'
      ? list
      : list.filter((n) => n.category === activeCategory)

  return (
    <section className="page-notes page-notes-list">
      <aside className="notes-sidebar">
        <h2 className="notes-sidebar-title">分类</h2>
        <nav className="notes-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`notes-nav-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
        <p className="notes-sidebar-hint">
          将 .md 放入 <code>content/notes/</code>，在 index.json 中按分类添加即可展示。
        </p>
      </aside>

      <div className="notes-main">
        <header className="notes-header">
          <h1>笔记资料</h1>
          <p className="muted">按分类浏览，点击卡片在站内阅读，无需跳转 GitHub。</p>
        </header>

        {filtered.length === 0 ? (
          <div className="notes-empty">
            <p>暂无笔记。</p>
            <p className="muted">
              在 <code>public/content/notes/index.json</code> 的 <code>items</code> 中添加条目，格式：
            </p>
            <pre>{`{ "id": "xxx", "title": "标题", "file": "xxx.md", "category": "分类名", "date": "2026-03-03", "excerpt": "摘要" }`}</pre>
          </div>
        ) : (
          <ul className="notes-card-list">
            {filtered.map((n) => (
              <li key={n.id} className="notes-card-wrap">
                <Link to={`/notes/view/${n.id}`} className="notes-card">
                  <div className="notes-card-head">
                    <h3 className="notes-card-title">{n.title || n.id}</h3>
                    {n.category && (
                      <span className="notes-card-tag">{n.category}</span>
                    )}
                  </div>
                  {n.excerpt && (
                    <p className="notes-card-excerpt">{n.excerpt}</p>
                  )}
                  {n.date && (
                    <span className="notes-card-date">{n.date}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
