import styles from '../../styles/Landing.module.css'
import { useSelector } from 'react-redux'
import SingleMovieCard from '../Movie/SingleMovieCard'
import Loading from '../../assets/loading.gif'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPrevPos } from '../../features/movie/movieSlice'

const Movies = ({ currentTab, setPage, sortBy }) => {
  const [currMovies, setCurrMovies] = useState([])

  const loader = useRef(null)
  const dispatch = useDispatch()

  const movies = useSelector((state) => state.movie.trendMoviesList)
  const lastPosition = useSelector((state) => state.movie.prevPosition)

  const scrollToLastPosition = () => {
    if (currentTab === 0) {
      if (lastPosition !== 0) {
        window.scrollTo({
          top: lastPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  const sortMovies = () => {
    if (sortBy === 'descending') {
      let newArr = [...currMovies]
      newArr.sort((a, b) => b.popularity - a.popularity)
      setCurrMovies([...newArr])
    } else {
      setCurrMovies([...movies])
    }
  }

  useEffect(() => {
    if (sortBy === 'smart') {
      setCurrMovies([...movies])
      setTimeout(scrollToLastPosition, 100)
    } else {
      let newArr = [...movies]
      newArr.sort((a, b) => b.popularity - a.popularity)
      setCurrMovies([...newArr])
      setTimeout(scrollToLastPosition, 100)
    }
    // eslint-disable-next-line
  }, [movies])

  useEffect(() => {
    sortMovies()
    // eslint-disable-next-line
  }, [sortBy])

  const handleObserver = useCallback((entries) => {
    const target = entries[0]

    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
      let pos = window.pageYOffset
      dispatch(setPrevPos(pos))
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '1px',
      threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  }, [handleObserver])

  return (
    <>
      <div
        className={
          currentTab === 0 ? styles.listWrapper : styles.disabledWrapper
        }
      >
        {currMovies?.map((movie, idx) => (
          <SingleMovieCard key={idx} movie={movie} currentTab={currentTab} />
        ))}
        <div className={styles.loadingSection}>
          <img src={Loading} alt='' />
          <p>Loading</p>
        </div>
        <div ref={loader}></div>
      </div>
    </>
  )
}
export default Movies
