import { Link } from 'react-router-dom'
import './pages.css'

export default function Home() {
  return (
    <section className="page-home">
      <h1>工作内容整理</h1>
      <p className="muted">
        项目介绍、文档、代码仓与笔记资料统一入口。换电脑只需打开本页即可访问。
      </p>
      <div className="cards">
        <Link to="/projects" className="card">
          <h2>项目</h2>
          <p>查看项目列表与代码仓路径，跳转 GitHub / GitLab 在线查看。</p>
        </Link>
        <Link to="/docs" className="card">
          <h2>文档</h2>
          <p>项目工程介绍与项目资料、README 等文档。</p>
        </Link>
        <Link to="/notes" className="card">
          <h2>笔记资料</h2>
          <p>OneNote 等笔记导出内容，按笔记本或分区浏览。</p>
        </Link>
        <Link to="/add-note" className="card">
          <h2>添加笔记</h2>
          <p>可视化编写 Markdown 笔记，下载后入库，支持个人总结与 Cursor 阶段性补充。</p>
        </Link>
      </div>
    </section>
  )
}
