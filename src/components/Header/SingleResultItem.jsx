import styles from '../../styles/Header.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { filterGenres } from '../../utils/filterGenres'
import { setPrevPos } from '../../features/movie/movieSlice'

const SingleResultItem = ({ movie, setShowResults, setQuery }) => {
  const [movieGenres, setMovieGenres] = useState([])

  const genres = useSelector((state) => state.movie.genres.genres)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNavigate = () => {
    let pos = window.pageYOffset
    dispatch(setPrevPos(pos))
    setQuery('')
    setShowResults(false)
    navigate(`/movie/${movie?.id}`)
  }

  useEffect(() => {
    filterGenres(movie, setMovieGenres, genres)
    // eslint-disable-next-line
  }, [movie])

  return (
    <div className={styles.itemWrapper} onClick={handleNavigate}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        alt='poster'
      />
      <div className={styles.itemInfo}>
        <p>{movie?.original_title}</p>
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
      <p className={styles.itemDate}>{movie?.release_date?.split('-')[0]}</p>
    </div>
  )
}
export default SingleResultItem
