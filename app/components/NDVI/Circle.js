import React from 'react';
import PropTypes from 'prop-types';

const Circle = props => {
  let bgStyle = {};
  if (props.ndviAggregate) {
    if (props.ndviAggregate.min && props.ndviAggregate.max) {
      bgStyle = {
        backgroundImage: `linear-gradient(to right,
           ${props.getColorForNDVI(props.ndviAggregate.min)} 0%,
           ${props.getColorForNDVI(props.ndviAggregate.avg)} 50%,
            ${props.getColorForNDVI(props.ndviAggregate.max)} 100%)`
      };
    } else {
      bgStyle = { background: 'green' };
    }
  }

  const onClick = () => {
    props.onClick();
  };

  return (
    <React.Fragment>
      {props.gradientName && <div className={`circle ${props.gradientName}`} />}
      {props.ndviAggregate && (
        <div className="circle" onClick={onClick} style={bgStyle} />
      )}
    </React.Fragment>
  );
};

export default Circle;

Circle.propTypes = {
  gradientName: PropTypes.string,
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  gradientName: PropTypes.string,
  getColorForNDVI: PropTypes.func,
  onClick: PropTypes.func
};
