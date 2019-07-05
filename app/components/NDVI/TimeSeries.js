import React from 'react';
// import TimeSerie from './TimeSerie';
import PropTypes from 'prop-types';
import Circle from './TimeSerieCircle';

const TimeSeries = props => {
  return (
    <div className="time-series-component">
      {props.dataPoints &&
        props.dataPoints.map((dataPoint, index) => {
          return (
            <Circle
              onClick={() => {
                props.onClickCircle(dataPoint.monthUid);
              }}
              {...dataPoint}
              key={index}
            />
          );
        })}
      {/* {props.dataPoints &&
          props.dataPoints.map(dataPoint => (
            <TimeSerie key={dataPoint.monthUid} year={dataPoint.year} />
          ))} */}
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
