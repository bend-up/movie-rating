import { createSlice } from 'redux-starter-kit';
import axios from 'axios';

const { actions, reducer } = createSlice({
  slice: 'Home',
  initialState: {
    moviesLoading: false,
    movies: []
  },
  reducers: {
    getMoviesLaunched(state, action) {
      state.moviesLoading = true;
    },
    getMoviesSuccess(state, action) {
      state.movies = action.payload;
      state.moviesLoading = false;
    },
    getMoviesFailure(state, action) {
      state.moviesLoading = false;
    },
    rateMovieLaunched(state, action) {
      state.moviesLoading = true;
    },
    rateMovieSuccess(state, action) {
      const updatedMovie = action.payload;
      state.movies = state.movies.map(movie => {
        if (movie.movieId === updatedMovie.movieId) {
          return updatedMovie;
        }
        return movie;
      });
      state.moviesLoading = false;
      console.log(state.movies);
    },
    rateMovieFailure(state, action) {
      state.moviesLoading = false;
    }
  }
});

export const {
  rateMovieLaunched,
  rateMovieSuccess,
  rateMovieFailure,
  getMoviesLaunched,
  getMoviesSuccess,
  getMoviesFailure
} = actions;

export const getMovies = () => async (dispatch, getState) => {
  try {
    dispatch(getMoviesLaunched());
    const response = await axios.get('http://localhost:8080/movies');

    dispatch(getMoviesSuccess(response.data));
  } catch (error) {
    dispatch(getMoviesFailure(error));
  }
};

export const rateMovie = (movieId, rating) => async (dispatch, getState) => {
  try {
    dispatch(rateMovieLaunched());
    const response = await axios.post(
      `http://localhost:8080/movies/${movieId}/reviews`,
      { rating: rating }
    );

    dispatch(rateMovieSuccess(response.data));
  } catch (error) {
    dispatch(rateMovieFailure(error));
  }
};

export default reducer;
