import React from 'react';
import Circle from './Circle';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TimeSerie = props => {
  return (
    <div className="time-serie-component">
      <div className="row">
        <ul>
          <li className="date">{props.year}</li>
          <li className="circles">
            <ul>
              {props.dataPoints.map((dataPoint, index) => {
                if (!_.isEmpty(dataPoint)) {
                  return (
                    <li key={index}>
                      <Circle
                        onClick={() => {
                          props.onClick(dataPoint.monthUid);
                        }}
                        {...dataPoint}
                      />
                    </li>
                  );
                } else {
                  return (
                    <li key={index}>
                      <Circle gradientName="not-found" />
                    </li>
                  );
                }
              })}
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
  dataPoint: PropTypes.object,
  onClick: PropTypes.func
};
