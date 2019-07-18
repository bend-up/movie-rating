import React from 'react';
import Rate from 'react-rating';

const Rating = props => {

  return (
    <Rate fractions={2} onClick={props.onClick}/>
  );
}

export default Rating;