import React, { Component } from 'react';
//components
import Info from '../../../../../app/components/NDVI/Info';
import Legend from '../../../../../app/components/NDVI/Legend';
import GradientProgressbar from '../../../../../app/components/NDVI/GradientProgressbar';
import TimeSeries from '../../../../../app/components/NDVI/TimeSeries';

export default class NDVIContainer extends Component {
  render() {
    return (
      <div className="ndvi-container">
        <div className="row month-keyword">
          <p>J</p>
          <p>F</p>
          <p>M</p>
          <p>A</p>
          <p>M</p>
          <p>J</p>
          <p>J</p>
          <p>A</p>
          <p>S</p>
          <p>O</p>
          <p>N</p>
          <p>D</p>
        </div>
        <TimeSeries />
        <Legend />
        <GradientProgressbar />
        <Info />
      </div>
    );
  }
}
