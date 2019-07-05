import React from 'react';
import PropTypes from 'prop-types';

const LegendCircle = props => {
  return (
    <div
      className={props.gradientName ? `circle ${props.gradientName}` : 'circle'}
    >
      .
    </div>
  );
};

export default LegendCircle;

LegendCircle.propTypes = {
  gradientName: PropTypes.string
};
