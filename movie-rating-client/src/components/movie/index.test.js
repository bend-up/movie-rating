import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureStore([thunk]);
import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import Movie from './';
import genres from '../../domain/genres';

describe('Movie Component', () => {
  let store;
  const testMovie = {
    movieId: 1,
    title: 'Test movie',
    genre: 'action',
    released: '2004-02-12T15:19:21+00:00'
  };
  const testMovieWithRatings = {
    ...testMovie,
    reviews: [{ rating: 7.77777 }, { rating: 8.8888 }]
  };
  beforeEach(() => {
    store = mockStore({});
  });

  it('renders movie without ratings', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Movie {...testMovie} />
      </Provider>
    );

    expect(getByTestId('movie-title')).toHaveTextContent(testMovie.title);
    expect(getByTestId('movie-genre-icon')).toHaveTextContent(
      genres[testMovie.genre].icon
    );
    expect(getByTestId('movie-released')).toHaveTextContent(
      'Released: 12-02-2004'
    );
    expect(getByTestId('movie-current-rating')).toHaveTextContent('No ratings');
  });

  it('renders movie with ratings', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Movie {...testMovieWithRatings} />
      </Provider>
    );

    expect(getByTestId('movie-current-rating')).toHaveTextContent(
      'Rating: 8.33'
    );
  });

  it('click on title should show rating component', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Movie {...testMovieWithRatings} />
      </Provider>
    );

    fireEvent.click(getByText(testMovie.title));

    expect(getByTestId('movie-rating')).toBeDefined();
  });
});
