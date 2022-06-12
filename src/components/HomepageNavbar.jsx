import styles from '../styles/HomepageNavbar.module.css'

const HomepageNavbar = ({ currentTab, setCurrentTab, sortBy, setSortBy }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={currentTab === 0 ? styles.activeTab : styles.defaultTab}
        onClick={() => setCurrentTab(0)}
      >
        All Movies
      </p>
      <p
        className={currentTab === 1 ? styles.activeTab : styles.defaultTab}
        onClick={() => setCurrentTab(1)}
      >
        +Watch List
      </p>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value='smart'>Smart Order</option>
        <option value='descending'>Popularity Descending</option>
      </select>
    </div>
  )
}
export default HomepageNavbar
