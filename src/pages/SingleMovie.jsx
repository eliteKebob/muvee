import styles from '../styles/SingleMovie.module.css'
import { useParams } from 'react-router-dom'
import { fetchSingleMovie } from '../features/movie/movieSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleMovieListItem from '../components/SingleMovieListItem'
import SingleMovieNavbar from '../components/SingleMovieNavbar'

const SingleMovie = () => {
  const movie = useSelector((state) => state.movie.singleMovie)

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleMovie(params.id))
    // eslint-disable-next-line
  }, [params.id])

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
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleMovie
