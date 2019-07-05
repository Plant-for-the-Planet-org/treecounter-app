import React from 'react';
import PropTypes from 'prop-types';
import getGradiantPosition from './NDVIfunctions/getGradientPosition';
import colors from './circle-colors';

const TimeSerieCircle = props => {
  let bgStyle = {};
  if (props.ndviAggregate.min && props.ndviAggregate.max) {
    bgStyle = {
      backgroundImage: `linear-gradient(to right,
         ${colors[getGradiantPosition(props.ndviAggregate.min)].color} 0%,
          ${colors[getGradiantPosition(props.ndviAggregate.max)].color} 100%)`
    };
  } else {
    bgStyle = { background: 'green' };
  }

  const onClick = () => {
    //notify parent that circle is clicked
    props.onClick();
  };

  return (
    <div className="circle" onClick={onClick} style={bgStyle}>
      .
    </div>
  );
};

export default TimeSerieCircle;

TimeSerieCircle.propTypes = {
  gradientName: PropTypes.string,
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  gradientName: PropTypes.string,

  onClick: PropTypes.func
};
