import styles from '../styles/Landing.module.css'
import { useSelector } from 'react-redux'
import SingleMovieCard from './SingleMovieCard'
import { useEffect } from 'react'

const WatchList = ({ currentTab }) => {
  const movies = useSelector((state) => state.movie.watchList)

  useEffect(() => {
    if (currentTab === 1) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [currentTab])

  return (
    <div
      className={currentTab === 1 ? styles.listWrapper : styles.disabledWrapper}
    >
      {movies?.length > 0
        ? movies?.map((movie, idx) => (
            <SingleMovieCard key={idx} movie={movie} />
          ))
        : 'You have not added anything to your watch list.'}
    </div>
  )
}
export default WatchList
