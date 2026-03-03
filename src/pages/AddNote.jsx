import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './pages.css'

function downloadMd(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'note.md'
  a.click()
  URL.revokeObjectURL(url)
}

export default function AddNote() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  const filename = category
    ? `${category}-${title.replace(/\s+/g, '-') || 'untitled'}.md`
    : `${title.replace(/\s+/g, '-') || 'untitled'}.md`
  const mdContent = `# ${title || '无标题'}\n\n${body}`

  return (
    <section className="page-add-note">
      <h1>添加笔记</h1>
      <p className="muted">
        填写标题与 Markdown 内容，可预览并下载 .md 文件，将文件放入 <code>public/content/notes/</code> 并更新 <code>index.json</code> 后 push 到仓库，即可在「笔记资料」页展示。也可作为个人工作总结信息库，配合 Cursor 阶段性总结自动补充。
      </p>

      <div className="form-group">
        <label>标题</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="笔记标题"
        />
      </div>
      <div className="form-group">
        <label>分类（可选，用于文件名前缀）</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="如：工作总结、Cursor 任务"
        />
      </div>
      <div className="form-group">
        <label>内容（Markdown）</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="支持 **粗体**、列表、代码块等 Markdown 语法"
          rows={12}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => downloadMd(filename.replace(/\.md$/, '') ? filename : 'note.md', mdContent)}
        >
          下载 .md 文件
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => navigator.clipboard?.writeText(mdContent)}
        >
          复制内容
        </button>
      </div>

      <div className="preview-block">
        <h3>预览</h3>
        <div className="markdown preview">
          <ReactMarkdown>{mdContent || '*暂无内容*'}</ReactMarkdown>
        </div>
      </div>

      <div className="muted instruction">
        <strong>入库步骤：</strong> 下载的 .md 放入 <code>public/content/notes/</code>，在 <code>public/content/notes/index.json</code> 的 <code>items</code> 中增加一条，如：<code>{`{"id": "xxx", "title": "标题", "file": "文件名.md"}`}</code>，然后 commit 并 push，网站更新后即可在「笔记资料」中看到。
      </div>
    </section>
  )
}
