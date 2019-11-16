import React, { Component, lazy } from 'react';
const TimeSerie = lazy(() => import('./TimeSerie'));

import PropTypes from 'prop-types';
import filterDataPoints from './NDVIfunctions/filterDataPointForTimeSeries';

class TimeSeries extends Component {
  state = {
    filteredData: []
  };

  onClick = data => {
    this.props.onClickCircle(data);
  };

  componentDidMount() {
    if (!this.props.dataPoints) return;

    this.mountFilteredData(this.props.dataPoints);
  }

  mountFilteredData = dataPoints => {
    this.setState({ filteredData: filterDataPoints(dataPoints) });
  };

  render() {
    return (
      <div className="time-series-component">
        {this.state.filteredData &&
          this.state.filteredData.length > 1 &&
          this.state.filteredData.map((data, index) => (
            <TimeSerie
              getColorForNDVI={this.props.getColorForNDVI}
              key={index}
              onClick={this.onClick}
              year={data.year}
              dataPoints={data.dataPoints}
            />
          ))}
      </div>
    );
  }
}

export default TimeSeries;

TimeSeries.propTypes = {
  map: PropTypes.array,
  dataPoints: PropTypes.array,
  year: PropTypes.number,
  monthUid: PropTypes.number,
  month: PropTypes.number,
  carbon: PropTypes.number,
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  avg: PropTypes.number,
  max: PropTypes.number,
  onClickCircle: PropTypes.func,
  getColorForNDVI: PropTypes.func
};
