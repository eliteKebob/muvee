import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Landing from './pages/Landing'
import SingleMovie from './pages/SingleMovie'
import { useSelector } from 'react-redux'
import Loading from './components/Loading'

function App() {
  const isLoading = useSelector((state) => state.movie.loading)

  return (
    <>
      <Router>
        <Header />
        {isLoading && <Loading />}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/movie/:id' element={<SingleMovie />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
