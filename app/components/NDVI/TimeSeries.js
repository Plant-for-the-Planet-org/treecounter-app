import React from 'react';
import TimeSerie from './TimeSerie';
import PropTypes from 'prop-types';

const TimeSeries = props => {
  console.log('-------TimeSeries---------');
  console.log(props);
  return (
    <div className="time-series-component">
      {props.dataPoints &&
        props.dataPoints.map(dataPoint => (
          <TimeSerie key={dataPoint.monthUid} year={dataPoint.year} />
        ))}
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
  max: PropTypes.number
};

// const dummyDataPoints = [
//   {
//     monthUid: 201907,
//     month: 7,
//     year: 2019,
//     carbon: 3716,
//     ndviAggregate: {
//       min: -0.24662007507553332,
//       max: 0.7517624439222388,
//       avg: 0.3811577383449884
//     }
//   },
//   {
//     monthUid: 1254,
//     month: 8,
//     year: 2018,
//     carbon: 3716,
//     ndviAggregate: {
//       min: -2.24662007507553332,
//       max: 2.7517624439222388,
//       avg: 1.3811577383449884
//     }
//   }
// ];
