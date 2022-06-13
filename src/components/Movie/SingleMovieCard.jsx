import styles from '../../styles/SingleMovieCard.module.css'
import { filterGenres } from '../../utils/filterGenres'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addToWatchList,
  removeFromWatchList,
  setPrevPos,
} from '../../features/movie/movieSlice'

const SingleMovieCard = ({ movie, movies, setMovies, currentTab }) => {
  const [movieGenres, setMovieGenres] = useState([])
  const [isSavedMovie, setIsSavedMovie] = useState(false)

  const genres = useSelector((state) => state.movie.genres?.genres)
  const list = JSON.parse(localStorage.getItem('localWatchList'))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = () => {
    checkIfSaved()

    if (!isSavedMovie) {
      dispatch(addToWatchList(movie))
      alert(`${movie?.original_title} has been added to your watch list!`)
      setIsSavedMovie(true)
    } else {
      if (currentTab === 1) {
        let newArr = [...movies]
        console.log(newArr)
        let newArr2 = newArr.filter((m) => m.id !== movie.id)
        setMovies([...newArr2])
      }
      dispatch(removeFromWatchList(movie))
      alert(`${movie?.original_title} has been removed from your watch list!`)
      setIsSavedMovie(false)
    }
  }

  const handleNavigate = () => {
    let pos = window.pageYOffset
    dispatch(setPrevPos(pos))
    navigate(`/movie/${movie?.id}`)
  }

  const checkIfSaved = () => {
    if (list) {
      let newArr = list.filter((m) => m.id === movie.id)

      if (newArr.length > 0) {
        setIsSavedMovie(true)
      } else {
        setIsSavedMovie(false)
      }
    } else {
      setIsSavedMovie(false)
    }
  }

  useEffect(() => {
    filterGenres(movie, setMovieGenres, genres)
    setTimeout(checkIfSaved, 100)
    // eslint-disable-next-line
  }, [movie])

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.head}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt='poster'
            onClick={handleNavigate}
          />
          <p className={styles.headRating}>{movie?.vote_average}</p>
          <p className={styles.headDate}>
            {movie?.release_date?.split('-')[0]}
          </p>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyText}>
            <p className={styles.btTitle} onClick={handleNavigate}>
              {movie?.original_title}
            </p>
            <div className={styles.itemGenres}>
              {movieGenres?.length > 0
                ? movieGenres.map((g, idx) => (
                    <p key={idx}>
                      {g}
                      {movieGenres?.length - 1 > idx ? ',' : ''}
                    </p>
                  ))
                : movie?.genres?.map((g, idx) => (
                    <p key={idx}>
                      {g.name}
                      {movie?.genres?.length - 1 > idx ? ',' : ''}
                    </p>
                  ))}
            </div>
          </div>
          <div className={styles.control}>
            {isSavedMovie ? (
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
