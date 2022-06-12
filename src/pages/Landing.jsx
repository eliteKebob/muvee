import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchTrendMovies } from '../features/movie/movieSlice'
import styles from '../styles/Landing.module.css'
import HomepageNavbar from '../components/Home/HomepageNavbar'
import Movies from '../components/Home/Movies'
import WatchList from '../components/Home/WatchList'

const Landing = () => {
  const [page, setPage] = useState(1)
  const [currentTab, setCurrentTab] = useState(0)
  const [sortBy, setSortBy] = useState('smart')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTrendMovies(page))
    // eslint-disable-next-line
  }, [page])

  return (
    <div className={styles.wrapper}>
      <HomepageNavbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {currentTab === 0 && (
        <Movies
          currentTab={currentTab}
          page={page}
          setPage={setPage}
          sortBy={sortBy}
        />
      )}
      {currentTab === 1 && <WatchList currentTab={currentTab} />}
    </div>
  )
}
export default Landing
