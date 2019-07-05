import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import Info from './Info';
import Legend from './Legend';
import GradientResultLine from './GradientResultLine';
import TimeSeries from './TimeSeries';

export default class NDVIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDataPoint: {} };
  }

  onClickCircle = circleMonthuid => {
    this.setState({ selectedDataPoint: this.findDataPoint(circleMonthuid) });
  };

  findDataPoint(monthUid) {
    //will be deprecated just for testing
    let result = {};
    for (let i = 0; i < this.props.dataPoints.length; i++) {
      if (this.props.dataPoints[i].monthUid === monthUid) {
        result = this.props.dataPoints[i];
        break;
      }
    }

    return result;
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
        <TimeSeries
          dataPoints={dataPoints}
          onClickCircle={this.onClickCircle}
        />

        <Legend />
        <GradientResultLine {...this.state.selectedDataPoint.ndviAggregate} />
        <Info {...this.state.selectedDataPoint} />
      </div>
    );
  }
}

NDVIContainer.propTypes = {
  dataPoints: PropTypes.array
};
