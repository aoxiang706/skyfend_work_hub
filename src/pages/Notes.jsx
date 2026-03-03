import { useState, useEffect } from 'react'
import './pages.css'

const BASE = import.meta.env.BASE_URL || '/'

export default function Notes() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${BASE}content/notes/index.json`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => setList(data.items || []))
      .catch(() => setList([]))
  }, [])

  return (
    <section className="page-notes">
      <h1>笔记资料</h1>
      <p className="muted">
        来自 OneNote（192.168.3.105）等导出的笔记，按笔记本/分区整理。请将导出文件放入 <code>public/content/notes/</code>，并维护 <code>index.json</code> 列表。
      </p>
      {list.length === 0 ? (
        <div className="empty">
          <p>暂无笔记条目。</p>
          <p className="muted">
            在 192.168.3.105 上导出 OneNote 为 Markdown/HTML 后，将文件放到 <code>public/content/notes/</code>，并在此目录下创建 <code>index.json</code>，格式示例：
          </p>
          <pre>{`{
  "items": [
    { "id": "notebook1", "title": "笔记本名称", "file": "notebook1/index.md" }
  ]
}`}</pre>
        </div>
      ) : (
        <ul className="notes-list">
          {list.map((n) => (
            <li key={n.id}>
              {n.file ? (
                <a href={`${BASE}content/notes/${n.file}`} target="_blank" rel="noreferrer">
                  {n.title || n.id}
                </a>
              ) : (
                <span>{n.title || n.id}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
