import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './pages.css'

const BASE = import.meta.env.BASE_URL || '/'

export default function DocView() {
  const { id } = useParams()
  const [doc, setDoc] = useState(null)
  const [md, setMd] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(false)
    fetch(`${BASE}data/docs.json`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => {
        const item = (data.items || []).find((d) => d.id === id)
        if (!item || !item.file) {
          setDoc(null)
          setMd('')
          setLoading(false)
          return
        }
        setDoc(item)
        return fetch(`${BASE}${item.file}`)
          .then((r) => (r.ok ? r.text() : ''))
          .then(setMd)
          .catch(() => setError(true))
          .finally(() => setLoading(false))
      })
      .catch(() => {
        setDoc(null)
        setLoading(false)
        setError(true)
      })
  }, [id])

  if (loading) {
    return (
      <section className="page-docs page-doc-view">
        <div className="doc-article-wrap">
          <p className="muted">加载中…</p>
        </div>
      </section>
    )
  }

  if (error || !doc) {
    return (
      <section className="page-docs page-doc-view">
        <div className="doc-article-wrap">
          <p className="muted">未找到该文档或加载失败。</p>
          <p><Link to="/docs">← 返回文档列表</Link></p>
        </div>
      </section>
    )
  }

  return (
    <section className="page-docs page-doc-view">
      <article className="doc-article-wrap">
        <header className="doc-article-header">
          <Link to="/docs" className="doc-back">← 返回文档列表</Link>
          <h1 className="doc-article-title">{doc.title || doc.id}</h1>
          {doc.category && (
            <span className="doc-article-tag">{doc.category}</span>
          )}
          {doc.date && (
            <time className="doc-article-date">{doc.date}</time>
          )}
        </header>
        <div className="doc-article-body markdown">
          <ReactMarkdown>{md}</ReactMarkdown>
        </div>
      </article>
    </section>
  )
}
