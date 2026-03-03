import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './pages.css'

const BASE = import.meta.env.BASE_URL || '/'

export default function Projects() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${BASE}data/projects.json`)
      .then((r) => r.ok ? r.json() : [])
      .then(setList)
      .catch(() => setList([]))
  }, [])

  return (
    <section className="page-projects">
      <h1>项目</h1>
      <p className="muted">代码仓路径与在线查看链接。</p>
      <ul className="project-list">
        {list.map((p) => (
          <li key={p.id} className="project-card">
            <div className="project-head">
              <h2>{p.name}</h2>
              {p.repoUrl && (
                <a href={p.repoUrl} target="_blank" rel="noreferrer" className="btn">
                  在线查看
                </a>
              )}
            </div>
            <p className="summary">{p.summary}</p>
            {p.path && <p className="path">路径：{p.path}</p>}
            <Link to={`/docs/view/${p.id}`} className="link-docs">查看文档 →</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
