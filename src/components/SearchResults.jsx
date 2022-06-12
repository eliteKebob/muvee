import styles from '../styles/Header.module.css'
import { useSelector } from 'react-redux'
import SingleResultItem from './SingleResultItem'

const SearchResults = ({ setShowResults, setQuery }) => {
  const movieResults = useSelector((state) => state.movie.searchResults.results)

  return (
    <div className={styles.srWrapper}>
      <div className={styles.srContent}>
        {movieResults?.length > 0
          ? movieResults
              ?.slice(0, 5)
              ?.map((movie, idx) => (
                <SingleResultItem
                  movie={movie}
                  key={idx}
                  setShowResults={setShowResults}
                  setQuery={setQuery}
                />
              ))
          : ''}
      </div>
    </div>
  )
}
export default SearchResults
