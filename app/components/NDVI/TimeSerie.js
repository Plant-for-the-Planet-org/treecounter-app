import React from 'react';
import PropTypes from 'prop-types';

const TimeSerie = props => {
  //Temporary array, just for testing UI
  const staticCircles = [
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' },
    { gradientName: 'water' }
  ];
  return (
    <div className="time-serie-component">
      <div className="row">
        <ul>
          <li className="date">{props.year}</li>
          <li className="circles">
            <ul>
              {staticCircles.map((circle, index) => (
                <li key={index}>
                  <Circle gradientName={circle.gradientName} />
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
  year: PropTypes.number
};
