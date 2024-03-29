import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  searchResults: [],
  trendMovies: [],
  trendMoviesList: [],
  watchList: [],
  singleMovie: {},
  genres: null,
  loading: false,
  error: '',
  prevPosition: 0,
}

const apiKey = process.env.REACT_APP_TMDB_API_KEY

export const searchMovies = createAsyncThunk('searchMovies', async (q) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${q}`
  )

  return response.data
})

export const fetchGenres = createAsyncThunk('fetchGenres', async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  )

  return response.data
})

export const fetchSingleMovie = createAsyncThunk(
  'fetchSingleMovie',
  async (id) => {
    const response = await axios.get(
      `
    https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    )

    return response.data
  }
)

export const fetchTrendMovies = createAsyncThunk(
  'fetchTrendMovies',
  async (page) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${page}`
    )

    return response.data
  }
)

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addToWatchList: (state, action) => {
      state.watchList.push(action.payload)
      const localWatchList = JSON.parse(localStorage.getItem('localWatchList'))
      if (localWatchList) {
        let newArr = [...localWatchList, action.payload]
        localStorage.setItem('localWatchList', JSON.stringify(newArr))
      } else {
        let newArr = [...state.watchList]
        localStorage.setItem('localWatchList', JSON.stringify(newArr))
      }
    },
    removeFromWatchList: (state, action) => {
      // state.watchList.splice(action.payload, 1)
      let newArr = [...state.watchList]
      let newArr2 = newArr.filter((m) => m.id !== action.payload.id)
      state.watchList = [...newArr2]
      const localWatchList = JSON.parse(localStorage.getItem('localWatchList'))
      if (localWatchList) {
        let newArr = [...localWatchList]
        let newArr2 = newArr.filter((m) => m.id !== action.payload.id)
        localStorage.setItem('localWatchList', JSON.stringify(newArr2))
      }
    },
    setPrevPos: (state, action) => {
      state.prevPosition = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchMovies.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.searchResults = action.payload
      state.loading = false
    })
    builder.addCase(searchMovies.rejected, (state, action) => {
      state.loading = false
      state.error = 'Error fetching movie data'
    })
    builder.addCase(fetchGenres.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload
      state.loading = false
    })
    builder.addCase(fetchGenres.rejected, (state, action) => {
      state.loading = false
      state.error = 'Error fetching movie genres'
    })
    builder.addCase(fetchSingleMovie.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchSingleMovie.fulfilled, (state, action) => {
      state.singleMovie = action.payload
      state.loading = false
    })
    builder.addCase(fetchSingleMovie.rejected, (state, action) => {
      state.loading = false
      state.error = 'Error fetching single movie data'
    })
    builder.addCase(fetchTrendMovies.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchTrendMovies.fulfilled, (state, action) => {
      if (state.trendMovies.length > 0) {
        if (state.trendMovies.length + 1 === action.payload.page) {
          state.trendMovies = [...state.trendMovies, action.payload]
          state.loading = false
          let newArr = state.trendMoviesList.concat(action.payload.results)
          state.trendMoviesList = [...newArr]
        } else {
          return
        }
      } else {
        state.trendMovies = [...state.trendMovies, action.payload]
        state.loading = false
        let newArr = state.trendMoviesList.concat(action.payload.results)
        state.trendMoviesList = [...newArr]
      }
    })
    builder.addCase(fetchTrendMovies.rejected, (state, action) => {
      state.loading = false
      state.error = 'Error fetching trend movies'
    })
  },
})

export default movieSlice.reducer
export const { addToWatchList, removeFromWatchList, setPrevPos } =
  movieSlice.actions
