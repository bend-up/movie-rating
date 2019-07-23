import {
  getMovies,
  rateMovie,
  getMoviesLaunched,
  getMoviesSuccess,
  getMoviesFailure
} from './home';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('home state', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: []
    });
  });

  it('get movies', async () => {
    const mockMovie = { movieId: 1, title: 'test movie' };
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [mockMovie] })
    );

    await store.dispatch(getMovies());

    const resultActions = store.getActions();
    expect(resultActions.length).toEqual(2);
    expect(resultActions[0].type).toEqual(getMoviesLaunched().type);
    expect(resultActions[1].type).toEqual(getMoviesSuccess().type);
    expect(resultActions[1].payload).toEqual([mockMovie]);
  });

  it('get movies error', async () => {
    const mockError = { error: 'Error' };
    axios.get.mockImplementationOnce(() => Promise.reject(mockError));

    await store.dispatch(getMovies());

    const resultActions = store.getActions();
    expect(resultActions.length).toEqual(2);
    expect(resultActions[0].type).toEqual(getMoviesLaunched().type);
    expect(resultActions[1].type).toEqual(getMoviesFailure().type);
    expect(resultActions[1].payload).toEqual(mockError);
  });
});
