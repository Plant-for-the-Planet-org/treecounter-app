import React from 'react';
import TimeSerie from './TimeSerie';

const TimeSeries = props => {
  return (
    <div className="time-series-component">
      <TimeSerie year={2019} />
      <TimeSerie year={2018} />
      <TimeSerie year={2017} />
    </div>
  );
};

export default TimeSeries;
