import React from 'react';
import PropTypes from 'prop-types';

const Circle = props => {
  return (
    <div
      className={props.gradientName ? `circle ${props.gradientName}` : 'circle'}
    >
      .
    </div>
  );
};

export default Circle;

Circle.propTypes = {
  gradientName: PropTypes.string
};
