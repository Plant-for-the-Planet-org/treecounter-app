import React, { Component } from 'react';
import Info from './Info';
import Legend from './Legend';
import GradientProgressbar from './GradientProgressbar';
import TimeSeries from './TimeSeries';

export default class NDVIContainer extends Component {
  render() {
    return (
      <div className="ndvi-container">
        <TimeSeries />
        <Legend />
        <GradientProgressbar />
        <Info />
      </div>
    );
  }
}
