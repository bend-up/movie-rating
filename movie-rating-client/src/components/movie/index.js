import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rateMovie } from '../../state/home';
import Rating from '../rating';
import { dates } from '../../utils';
import genres from '../../domain/genres';
import { MovieTitle } from '../../styles/home';

const Movie = props => {

  const dispatch = useDispatch();
  const [ratingVisible, setRatingVisible] = useState(false);
  const { movieId, title, genre, released, reviews } = props;
  const averageRating =
    reviews.map(review => review.rating).reduce((a, b) => a + b) /
    reviews.length;

  const Title = () => {
    return (
      <MovieTitle onClick={toggleRating}>
         <span title={genres[genre].description}>{genres[genre].icon}</span>
         {' ' + title}
      </MovieTitle>
    );
  }

  const CurrentRating = () => averageRating ? 'Rating: ' + Math.round(averageRating * 100) / 100 : 'No ratings';
  const ReleaseDate = () => <p>Released: {dates.getFormattedDate(released)}</p>;
  const RatingRow = () => {
    return ratingVisible ? (<p>
            <Rating onClick={submittedRating => dispatch(rateMovie(movieId, submittedRating * 2))}/>
          </p>) : <div/>;
  }

  const toggleRating = () => {
    setRatingVisible(!ratingVisible);
  };

  return (
    <>
      <Title/>
      <ReleaseDate/>
      <CurrentRating/>
      <RatingRow/>
    </>
  );
};

export default Movie;
