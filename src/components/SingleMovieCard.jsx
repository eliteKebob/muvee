import styles from '../styles/SingleMovieCard.module.css'
import { filterGenres } from '../utils/filterGenres'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addToWatchList,
  removeFromWatchList,
} from '../features/movie/movieSlice'

const SingleMovieCard = ({ movie }) => {
  const [movieGenres, setMovieGenres] = useState([])

  const genres = useSelector((state) => state.movie.genres?.genres)
  const list = useSelector((state) => state.movie.watchList)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    filterGenres(movie, setMovieGenres, genres)
    // eslint-disable-next-line
  }, [movie])

  const handleClick = () => {
    if (list?.includes(movie)) {
      dispatch(removeFromWatchList(movie))
      alert(`${movie?.original_title} has been removed from your watch list!`)
    } else {
      dispatch(addToWatchList(movie))
      alert(`${movie?.original_title} has been added to your watch list!`)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.head}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt='poster'
            onClick={() => navigate(`/movie/${movie?.id}`)}
          />
          <p className={styles.headRating}>{movie?.vote_average}</p>
          <p className={styles.headDate}>
            {movie?.release_date?.split('-')[0]}
          </p>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyText}>
            <p
              className={styles.btTitle}
              onClick={() => navigate(`/movie/${movie?.id}`)}
            >
              {movie?.original_title}
            </p>
            <div className={styles.itemGenres}>
              {movieGenres.length > 0
                ? movieGenres.map((g, idx) => (
                    <p key={idx}>
                      {g}
                      {movieGenres?.length - 1 > idx ? ',' : ''}
                    </p>
                  ))
                : ''}
            </div>
          </div>
          <div className={styles.control}>
            {list?.includes(movie) ? (
              <p onClick={handleClick} className={styles.removeIcon}>
                [-]
              </p>
            ) : (
              <p onClick={handleClick} className={styles.addIcon}>
                [+]
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleMovieCard
