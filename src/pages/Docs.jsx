import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import './pages.css'

const DOCS = {
  ptz100_agx: {
    title: 'ptz100_agx',
    file: '/docs/ptz100_agx.md',
  },
  me_git_lab: {
    title: 'me_git_lab',
    file: '/docs/me_git_lab.md',
  },
}

export default function Docs() {
  const { projectId } = useParams()
  const [md, setMd] = useState('')
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/data/projects.json')
      .then((r) => (r.ok ? r.json() : []))
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  useEffect(() => {
    if (!projectId) {
      setLoading(false)
      setMd('')
      return
    }
    const doc = DOCS[projectId]
    if (!doc) {
      setLoading(false)
      setMd('')
      return
    }
    setLoading(true)
    fetch(doc.file)
      .then((r) => (r.ok ? r.text() : ''))
      .then(setMd)
      .catch(() => setMd(''))
      .finally(() => setLoading(false))
  }, [projectId])

  return (
    <section className="page-docs">
      <h1>文档</h1>
      <p className="muted">项目介绍与资料文档。</p>

      {!projectId && (
        <ul className="doc-list">
          {projects.map((p) => (
            <li key={p.id}>
              <Link to={`/docs/${p.id}`}>{p.name}</Link>
              {p.summary && <span className="muted"> — {p.summary}</span>}
            </li>
          ))}
        </ul>
      )}

      {projectId && (
        <div className="doc-content">
          {loading && <p>加载中…</p>}
          {!loading && md && (
            <div className="markdown">
              <ReactMarkdown>{md}</ReactMarkdown>
            </div>
          )}
          {!loading && !md && (
            <p className="muted">
              暂无该项目的 Markdown 文档。请将文档放入 <code>public/docs/{projectId}.md</code> 或修改 <code>src/pages/Docs.jsx</code> 中的 DOCS 配置。
            </p>
          )}
          <p><Link to="/docs">← 返回文档列表</Link></p>
        </div>
      )}
    </section>
  )
}
