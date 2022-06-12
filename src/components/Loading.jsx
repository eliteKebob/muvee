import styles from '../styles/Landing.module.css'
import loading from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className={styles.loadingSection}>
      <img src={loading} alt='' />
      <p>Loading</p>
    </div>
  )
}
export default Loading
