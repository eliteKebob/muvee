import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchTrendMovies } from '../features/movie/movieSlice'
import styles from '../styles/Landing.module.css'
import HomepageNavbar from '../components/HomepageNavbar'
import Movies from '../components/Movies'
import WatchList from '../components/WatchList'

const Landing = () => {
  const [page, setPage] = useState(1)
  const [currentTab, setCurrentTab] = useState('allMovies')

  const movies = useSelector((state) => state.movie.trendMovies)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTrendMovies(page))
    // eslint-disable-next-line
  }, [page])

  return (
    <div className={styles.wrapper}>
      <HomepageNavbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 'allMovies' ? (
        <Movies currentTab={currentTab} page={page} setPage={setPage} />
      ) : (
        ''
      )}
      {currentTab === 'watchList' ? <WatchList currentTab={currentTab} /> : ''}
    </div>
  )
}
export default Landing
