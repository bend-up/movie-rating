import React, {useEffect}  from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  App, Button, Title
} from '../../style/home';
import { getMovies } from './homePage';
import Movie from '../../components/Movie';

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, moviesLoading } = useSelector(state => state.Home, shallowEqual);

  const Movies = props => props.movies.map(movie => <Button key={movie.movieId}  loading={moviesLoading}><Movie {...movie}/></Button>);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const fetchMovies = () => dispatch(getMovies());

  return (
    <App>
      <Title onClick={fetchMovies}><span role="img" aria-label="movie-icon">🎥</span> Movie Ratings <span role="img" aria-label="movie-icon">🎥</span></Title>
      <Movies movies={movies}/>
    </App>
  );
};

export default HomePage;
