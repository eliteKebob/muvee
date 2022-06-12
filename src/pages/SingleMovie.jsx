import styles from '../styles/SingleMovie.module.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleMovieListItem from '../components/Movie/SingleMovieListItem'
import SingleMovieNavbar from '../components/MoviePage/SingleMovieNavbar'
import {
  fetchSingleMovie,
  addToWatchList,
  removeFromWatchList,
} from '../features/movie/movieSlice'

const SingleMovie = () => {
  const movie = useSelector((state) => state.movie.singleMovie)
  const list = useSelector((state) => state.movie.watchList)

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleMovie(params.id))
    // eslint-disable-next-line
  }, [params.id])

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
        <SingleMovieNavbar movie={movie} />
        <div className={styles.movieContent}>
          <div className={styles.image}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt='poster'
            />
          </div>
          <div className={styles.info}>
            <p className={styles.movieTitle}>{movie?.original_title}</p>
            <div className={styles.listItem}>
              <p className={styles.liTitle}>Genre</p>
              <div className={styles.liItems}>
                {movie?.genres?.map((genre, idx) => (
                  <p key={idx}>
                    {genre.name}
                    {movie?.genres?.length - 1 > idx ? ',' : ''}{' '}
                  </p>
                ))}
              </div>
            </div>
            <SingleMovieListItem
              title='Release Date'
              text={movie?.release_date?.split('-')[0]}
            />
            <div className={styles.listItem}>
              <p className={styles.liTitle}>Language</p>
              <div className={styles.liItems}>
                {movie?.spoken_languages?.map((language, idx) => (
                  <p key={idx}>
                    {language?.english_name}
                    {movie?.spoken_languages?.length - 1 > idx ? ',' : ''}{' '}
                  </p>
                ))}
              </div>
            </div>
            <SingleMovieListItem title='Overview' text={movie?.overview} />
            <div className={styles.control}>
              {list?.includes(movie) ? (
                <p onClick={handleClick} className={styles.removeIcon}>
                  [-] Remove from watch list
                </p>
              ) : (
                <p onClick={handleClick} className={styles.addIcon}>
                  [+] Add to watch list
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleMovie
