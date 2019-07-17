import {createSlice} from 'redux-starter-kit';
import axios from 'axios';

const {actions, reducer} = createSlice({
    slice : 'Home',
    initialState : {
        counter: 0,
        resetLoading: false,
        moviesLoading: false,
        movies: [],
    },
    reducers : {
        incrementCounter(state, action) {
            state.counter = action.payload + 1;
        },
        decrementCounter(state, action) {
            state.counter = action.payload - 1;
        },
        resetCounterLaunched(state, action) {
            state.resetLoading = true;
        },
        resetCounterSuccess(state, action) {
            state.counter = 0;
            state.resetLoading = false;
        },
        resetCounterFailure(state, action) {
            state.resetLoading = false;
        },
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
    incrementCounter,
    decrementCounter,
    resetCounterLaunched,
    resetCounterSuccess,
    resetCounterFailure,
    getMoviesLaunched,
    getMoviesSuccess,
    getMoviesFailure,
} = actions;


export const resetCounter = () => async (dispatch, getState) => {
    try {
        dispatch(resetCounterLaunched());
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });

        dispatch(resetCounterSuccess());
    } catch(error) {
        dispatch(resetCounterFailure());
    }
}

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

