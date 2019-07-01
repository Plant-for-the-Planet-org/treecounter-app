import React from 'react';

const TimeSerie = props => {
  return (
    <div className="time-serie-component">
      <div className="row">
        <ul>
          <li className="date">2019</li>
          <li className="circles">
            <ul>
              <li>
                <Circle gradientName="water" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TimeSerie;
