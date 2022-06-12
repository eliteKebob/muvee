import styles from '../styles/Landing.module.css'
import { useSelector, useDispatch } from 'react-redux'
import SingleMovieCard from './SingleMovieCard'
import Loading from '../assets/loading.gif'
import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchTrendMovies } from '../features/movie/movieSlice'

const Movies = ({ currentTab, page, setPage }) => {
  const [currMovies, setCurrMovies] = useState([])

  const loader = useRef(null)

  const dispatch = useDispatch()

  const movies = useSelector((state) => state.movie.trendMovies)

  useEffect(() => {
    // setCurrMovies([])
    for (let i = 0; i < movies.length; i++) {
      setCurrMovies(currMovies.concat(movies[i].results))
    }
    // eslint-disable-next-line
  }, [movies])

  const handleObserver = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  }, [handleObserver])

  return (
    <>
      <div
        className={
          currentTab === 'allMovies'
            ? styles.listWrapper
            : styles.disabledWrapper
        }
      >
        {currMovies?.map((movie, idx) => (
          <SingleMovieCard key={idx} movie={movie} />
        ))}

        <div className={styles.loadingSection}>
          <img src={Loading} alt='' />
          <p>Loading</p>
        </div>
        {movies?.length > 0 && <div ref={loader}></div>}
      </div>
    </>
  )
}
export default Movies
