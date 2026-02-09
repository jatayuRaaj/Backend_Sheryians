import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreatePost from '../pages/CreatePost'
import Feed from '../pages/Feed'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello world</h1>} />
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/feed" element={<Feed/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
