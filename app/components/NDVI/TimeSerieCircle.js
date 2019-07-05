import React from 'react';
import PropTypes from 'prop-types';

const TimeSerieCircle = props => {
  console.log('properties of circles');
  console.log(props);
  // let bgStyle = {
  //   backgroundImage: `linear-gradient(to right, ${colors[0]} 0%, ${colors[1]} 100%)`
  // }

  return (
    <div
      className={props.gradientName ? `circle ${props.gradientName}` : 'circle'}
      onClick={() => {
        props.onClick(props);
      }}
      // style={bgStyle}
    >
      .
    </div>
  );
};

export default TimeSerieCircle;

TimeSerieCircle.propTypes = {
  gradientName: PropTypes.string,
  onClick: PropTypes.func
};
