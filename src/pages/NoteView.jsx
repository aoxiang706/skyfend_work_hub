import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './pages.css'

const BASE = import.meta.env.BASE_URL || '/'

export default function NoteView() {
  const { id } = useParams()
  const [note, setNote] = useState(null)
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
    fetch(`${BASE}content/notes/index.json`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => {
        const item = (data.items || []).find((n) => n.id === id)
        if (!item || !item.file) {
          setNote(null)
          setMd('')
          setLoading(false)
          return
        }
        setNote(item)
        return fetch(`${BASE}content/notes/${item.file}`)
          .then((r) => (r.ok ? r.text() : ''))
          .then(setMd)
          .catch(() => setError(true))
          .finally(() => setLoading(false))
      })
      .catch(() => {
        setNote(null)
        setLoading(false)
        setError(true)
      })
  }, [id])

  if (loading) {
    return (
      <section className="page-notes page-note-view">
        <div className="note-article-wrap">
          <p className="muted">加载中…</p>
        </div>
      </section>
    )
  }

  if (error || !note) {
    return (
      <section className="page-notes page-note-view">
        <div className="note-article-wrap">
          <p className="muted">未找到该笔记或加载失败。</p>
          <p><Link to="/notes">← 返回笔记列表</Link></p>
        </div>
      </section>
    )
  }

  return (
    <section className="page-notes page-note-view">
      <article className="note-article-wrap">
        <header className="note-article-header">
          <Link to="/notes" className="note-back">← 返回笔记列表</Link>
          <h1 className="note-article-title">{note.title || note.id}</h1>
          {note.category && (
            <span className="note-article-tag">{note.category}</span>
          )}
          {note.date && (
            <time className="note-article-date">{note.date}</time>
          )}
        </header>
        <div className="note-article-body markdown">
          <ReactMarkdown>{md}</ReactMarkdown>
        </div>
      </article>
    </section>
  )
}
