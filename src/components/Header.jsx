import styles from '../styles/Header.module.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovies, fetchGenres } from '../features/movie/movieSlice'
import SearchResults from './SearchResults'

const Header = () => {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const movieGenres = useSelector((state) => state.movie.genres)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    if (movieGenres === null) {
      dispatch(fetchGenres())
    }
    dispatch(searchMovies(query))
  }

  useEffect(() => {
    if (query.length > 2) {
      if (movieGenres === null) {
        dispatch(fetchGenres())
      }
      dispatch(searchMovies(query))
      setShowResults(true)
    } else {
      if (movieGenres === null) {
        dispatch(fetchGenres())
      }
      setShowResults(false)
    }
    // eslint-disable-next-line
  }, [query])

  return (
    <>
      <div className={styles.wrapper}>
        <h1 onClick={() => navigate('/')}>MuVee</h1>
        <div className={styles.searchBar}>
          <input
            type='text'
            placeholder='Movie title'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {showResults ? (
        <SearchResults setShowResults={setShowResults} setQuery={setQuery} />
      ) : (
        ''
      )}
    </>
  )
}
export default Header
