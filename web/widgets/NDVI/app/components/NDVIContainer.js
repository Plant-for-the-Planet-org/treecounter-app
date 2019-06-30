import React, { Component } from 'react';
//components
import Info from '../../../../../app/components/NDVI/Info';
import Legend from '../../../../../app/components/NDVI/Legend';
import GradientProgressbar from '../../../../../app/components/NDVI/GradientProgressbar';
import TimeSeries from '../../../../../app/components/NDVI/TimeSeries';
//style
import '../../../../../app/styles/NDVI/ndvi-container.scss';

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
