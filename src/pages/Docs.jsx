import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './pages.css'

const BASE = import.meta.env.BASE_URL || '/'

export default function Docs() {
  const [list, setList] = useState([])
  const [activeCategory, setActiveCategory] = useState('全部')

  useEffect(() => {
    fetch(`${BASE}data/docs.json`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => setList(data.items || []))
      .catch(() => setList([]))
  }, [])

  const categories = ['全部', ...new Set(list.map((d) => d.category).filter(Boolean))]
  const filtered =
    activeCategory === '全部'
      ? list
      : list.filter((d) => d.category === activeCategory)

  return (
    <section className="page-docs page-docs-list">
      <aside className="docs-sidebar">
        <h2 className="docs-sidebar-title">文档分类</h2>
        <nav className="docs-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`docs-nav-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
        <p className="docs-sidebar-hint">
          将 .md 放入 <code>public/docs/</code>，在 <code>data/docs.json</code> 中按分类添加即可展示。
        </p>
      </aside>

      <div className="docs-main">
        <header className="docs-header">
          <h1>文档</h1>
          <p className="muted">项目介绍与资料文档，按分类浏览，点击卡片在站内阅读。</p>
        </header>

        {filtered.length === 0 ? (
          <div className="docs-empty">
            <p>暂无文档。</p>
            <p className="muted">
              在 <code>public/data/docs.json</code> 的 <code>items</code> 中添加条目，格式：
            </p>
            <pre>{`{ "id": "xxx", "title": "标题", "file": "docs/xxx.md", "category": "分类名", "date": "2026-03-03", "excerpt": "摘要" }`}</pre>
          </div>
        ) : (
          <ul className="docs-card-list">
            {filtered.map((d) => (
              <li key={d.id} className="docs-card-wrap">
                <Link to={`/docs/view/${d.id}`} className="docs-card">
                  <div className="docs-card-head">
                    <h3 className="docs-card-title">{d.title || d.id}</h3>
                    {d.category && (
                      <span className="docs-card-tag">{d.category}</span>
                    )}
                  </div>
                  {d.excerpt && (
                    <p className="docs-card-excerpt">{d.excerpt}</p>
                  )}
                  {d.date && (
                    <span className="docs-card-date">{d.date}</span>
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
