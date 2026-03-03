import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Docs from './pages/Docs'
import Notes from './pages/Notes'

import AddNote from './pages/AddNote'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:projectId" element={<Docs />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/add-note" element={<AddNote />} />
      </Routes>
    </Layout>
  )
}
