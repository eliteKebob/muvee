import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'
import SingleMovie from './pages/SingleMovie'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/movie/:id' element={<SingleMovie />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
