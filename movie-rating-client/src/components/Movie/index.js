import React from 'react';

const Movie = (props) => {
  const genres = {
    comedy: {
      icon: '😂',
      description: 'Comedy',
    },
    action: {
      icon: '⚔️',
      description: 'Action',
    },

  }
  const { title, genre, released, reviews } = props;
  const averageRating = reviews.map(review => review.rating).reduce((a, b) => a + b ) / reviews.length;

  return (
    <div>
      <p><span title={genres[genre].description}>{genres[genre].icon}</span> {title}</p>
      <p>{released}</p>
      <p>{averageRating ? Math.round(averageRating * 100) / 100 : 'No ratings'}</p>
      <p></p>
    </div>
  );
};

export default Movie;
