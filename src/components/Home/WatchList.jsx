import styles from '../../styles/Landing.module.css'
import SingleMovieCard from '../Movie/SingleMovieCard'
import { useEffect, useState } from 'react'

const WatchList = ({ currentTab }) => {
  const [movies, setMovies] = useState([])

  const localMovies = JSON.parse(localStorage.getItem('localWatchList'))

  useEffect(() => {
    if (currentTab === 1) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [currentTab])

  useEffect(() => {
    if (localMovies) {
      setMovies([...localMovies])
    } else {
      setMovies([])
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div
      className={currentTab === 1 ? styles.listWrapper : styles.disabledWrapper}
    >
      {movies?.length > 0
        ? movies?.map((movie, idx) => (
            <SingleMovieCard
              key={idx}
              movie={movie}
              movies={movies}
              setMovies={setMovies}
              currentTab={currentTab}
            />
          ))
        : 'You have not added anything to your watch list.'}
    </div>
  )
}
export default WatchList
