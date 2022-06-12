import styles from '../../styles/Header.module.css'
import { useSelector } from 'react-redux'
import SingleResultItem from './SingleResultItem'

const SearchResults = ({ setShowResults, setQuery, query }) => {
  const movieResults = useSelector((state) => state.movie.searchResults.results)

  window.addEventListener('click', function (e) {
    // let div = document.getElementById('searchResultsDiv')

    if (e.target.id !== 'queryInput') {
      setShowResults(false)
    } else {
      if (query.length > 2) {
        setShowResults(true)
      } else {
        setShowResults(false)
      }
    }
  })

  return (
    <div className={styles.srWrapper} id='searchResultsDiv'>
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
