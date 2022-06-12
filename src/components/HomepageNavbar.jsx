import styles from '../styles/HomepageNavbar.module.css'

const HomepageNavbar = ({ currentTab, setCurrentTab }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={
          currentTab === 'allMovies' ? styles.activeTab : styles.defaultTab
        }
        onClick={() => setCurrentTab('allMovies')}
      >
        All Movies
      </p>
      <p
        className={
          currentTab === 'watchList' ? styles.activeTab : styles.defaultTab
        }
        onClick={() => setCurrentTab('watchList')}
      >
        +Watch List
      </p>
    </div>
  )
}
export default HomepageNavbar
