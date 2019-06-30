import React, { Component } from 'react';
//components
import Info from './Info';
import Legend from './Legend';
import GradientProgressbar from './GradientProgressbar';
import TimeSeries from './TimeSeries';
//style
import '../styles/ndvi-container.scss';

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
