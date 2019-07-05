import React from 'react';
import TimeSerieCircle from './TimeSerieCircle';
import PropTypes from 'prop-types';

const TimeSerie = props => {
  return (
    <div className="time-serie-component">
      <div className="row">
        <ul>
          <li className="date">{props.year}</li>
          <li className="circles">
            <ul>
              {props.dataPoints &&
                props.dataPoints.map((dataPoint, index) => (
                  <li key={index}>
                    <TimeSerieCircle
                      onClick={() => {
                        props.onClick(dataPoint.monthUid);
                      }}
                      {...dataPoint}
                    />
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TimeSerie;

TimeSerie.propTypes = {
  year: PropTypes.number,
  dataPoints: PropTypes.array,
  onClick: PropTypes.func
};
