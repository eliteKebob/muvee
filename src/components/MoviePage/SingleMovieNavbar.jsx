import styles from '../../styles/SingleMovie.module.css'
import { useNavigate } from 'react-router-dom'

const SingleMovieNavbar = ({ movie }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.navbar}>
      <p className={styles.nbSymbol}>&#60;</p>
      <p onClick={() => navigate('/')}> Back to List</p>
      <div className={styles.nbLinks}>
        <p>Home </p>
        <p className={styles.nbSymbol}>&#62; </p>
        <p>{movie?.release_date?.split('-')[0]} </p>
        <p className={styles.nbSymbol}>&#62; </p>
        <p>{movie?.original_title}</p>
      </div>
    </div>
  )
}
export default SingleMovieNavbar
