import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import Info from './Info';
import Legend from './Legend';
import GradientProgressbar from './GradientResultLine';
import TimeSeries from './TimeSeries';

export default class NDVIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const dataPoints = this.props.dataPoints;
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
        <TimeSeries dataPoints={dataPoints} />
        <Legend />
        <GradientProgressbar />
        <Info {...dataPoints[0]} />
      </div>
    );
  }
}

NDVIContainer.propTypes = {
  dataPoints: PropTypes.array
};
