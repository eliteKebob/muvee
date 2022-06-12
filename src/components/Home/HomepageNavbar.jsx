import styles from '../../styles/HomepageNavbar.module.css'
import { useDispatch } from 'react-redux'
import { setPrevPos } from '../../features/movie/movieSlice'

const HomepageNavbar = ({ currentTab, setCurrentTab, sortBy, setSortBy }) => {
  const dispatch = useDispatch()

  const handleTab = () => {
    let pos = window.pageYOffset
    dispatch(setPrevPos(pos))
    setCurrentTab(1)
  }

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
        onClick={handleTab}
      >
        +Watch List
      </p>
      {currentTab === 0 && (
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='smart'>Smart Order</option>
          <option value='descending'>Popularity Descending</option>
        </select>
      )}
    </div>
  )
}
export default HomepageNavbar
