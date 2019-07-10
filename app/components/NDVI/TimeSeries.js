import React from 'react';
import TimeSerie from './TimeSerie';
import PropTypes from 'prop-types';

const TimeSeries = props => {
  const onClick = data => {
    props.onClickCircle(data);
  };

  return (
    <div className="time-series-component">
      <TimeSerie onClick={onClick} year={2019} dataPoints={props.dataPoints} />
    </div>
  );
};

export default TimeSeries;

TimeSeries.propTypes = {
  map: PropTypes.array,
  dataPoints: PropTypes.array,
  year: PropTypes.number,
  monthUid: PropTypes.number,
  month: PropTypes.number,
  carbon: PropTypes.number,
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  avg: PropTypes.number,
  max: PropTypes.number,
  onClickCircle: PropTypes.func
};
