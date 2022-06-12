import styles from '../styles/Landing.module.css'

const Loading = () => {
  return (
    <div className={styles.loadingSection}>
      <img src={Loading} alt='' />
      <p>Loading</p>
    </div>
  )
}
export default Loading
