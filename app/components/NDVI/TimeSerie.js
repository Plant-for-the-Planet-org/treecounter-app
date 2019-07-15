import React from 'react';
import Circle from './Circle';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TimeSerie = props => {
  return (
    <div className="time-serie-component">
      <div className="row">
        <div className="flex-2">
          <p className="date">{props.year}</p>
        </div>
        {props.dataPoints.map((dataPoint, index) => {
          if (!_.isEmpty(dataPoint)) {
            return (
              <div key={index} className="flex-1">
                <Circle
                  getColorForNDVI={props.getColorForNDVI}
                  onClick={() => {
                    props.onClick(dataPoint.monthUid);
                  }}
                  {...dataPoint}
                />
              </div>
            );
          } else {
            return (
              <div key={index} className="flex-1" key={index}>
                <Circle
                  gradientName="not-found"
                  getColorForNDVI={props.getColorForNDVI}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TimeSerie;

TimeSerie.propTypes = {
  year: PropTypes.number,
  dataPoints: PropTypes.array,
  dataPoint: PropTypes.object,
  onClick: PropTypes.func,
  getColorForNDVI: PropTypes.func
};
