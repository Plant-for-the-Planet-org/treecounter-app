import React, { lazy } from 'react';

const TimeSerie = lazy(() => import('./TimeSerie'));

import PropTypes from 'prop-types';
import { View } from 'react-native';
import filterDataPoints from './NDVIfunctions/filterDataPointForTimeSeries';

class TimeSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filteredData: [] };
  }
  onClick = data => {
    this.props.onClickCircle(data);
  };

  componentDidMount() {
    if (!this.props.dataPoints) return;

    this.setState({ filteredData: filterDataPoints(this.props.dataPoints) });
  }

  render() {
    return (
      <View style={{ marginTop: 7 }}>
        {this.state.filteredData &&
          this.state.filteredData.length > 0 &&
          this.state.filteredData.map((data, index) => (
            <TimeSerie
              getColorForNDVI={this.props.getColorForNDVI}
              key={index}
              onClick={this.onClick}
              year={data.year}
              dataPoints={data.dataPoints}
            />
          ))}
      </View>
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
  max: PropTypes.number
};
