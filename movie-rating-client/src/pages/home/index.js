import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { App, Button, Title } from '../../styles/home';
import { getMovies } from '../../state/home';
import Movie from '../../components/movie';

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, moviesLoading } = useSelector(state => state.Home);

  const Movies = props =>
    props.movies.map(movie => (
      <Button key={movie.movieId} loading={moviesLoading}>
        <Movie {...movie} />
      </Button>
    ));

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const fetchMovies = () => dispatch(getMovies());

  return (
    <App>
      <Title onClick={fetchMovies}>
        <span role="img" aria-label="movie-icon">
          🎥
        </span>{' '}
        Movie Ratings{' '}
        <span role="img" aria-label="movie-icon">
          🎥
        </span>
      </Title>
      <Movies movies={movies} />
    </App>
  );
};

export default HomePage;
