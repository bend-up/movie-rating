import {createSlice} from 'redux-starter-kit';
import axios from 'axios';

const {actions, reducer} = createSlice({
    slice : 'Home',
    initialState : {
        moviesLoading: false,
        movies: [],
    },
    reducers : {
        getMoviesLaunched(state, action) {
            state.moviesLoading = true;
        },
        getMoviesSuccess(state, action) {
            state.movies = action.payload;
            state.moviesLoading = false;
        },
        getMoviesFailure(state, action) {
            state.moviesLoading = false;
        }
    }
});

export const {
    getMoviesLaunched,
    getMoviesSuccess,
    getMoviesFailure,
} = actions;

export const getMovies = () => async (dispatch, getState) => {
    try {
        dispatch(getMoviesLaunched());
        const response = await axios.get('http://localhost:8080/movies');

        dispatch(getMoviesSuccess(response.data));
    } catch(error) {
        dispatch(getMoviesFailure(error));
    }

}

export default reducer;

