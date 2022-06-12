import styles from '../styles/SingleMovie.module.css'

const SingleMovieListItem = ({ title, text }) => {
  return (
    <div className={styles.listItem}>
      <p className={styles.liTitle}>{title}</p>
      <p>{text}</p>
    </div>
  )
}
export default SingleMovieListItem
