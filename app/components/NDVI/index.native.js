import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import Info from './Info';
import Legend from './Legend';
import GradientResultLine from './GradientResultLine';
import TimeSeries from './TimeSeries';
import { View, Text } from 'react-native';
import CardLayout from '../Common/Card';
export default class NDVIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const dataPoints = this.props.dataPoints;
    return (
      <CardLayout>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>J</Text>
          <Text>F</Text>
          <Text>M</Text>
          <Text>A</Text>
          <Text>M</Text>
          <Text>J</Text>
          <Text>J</Text>
          <Text>A</Text>
          <Text>S</Text>
          <Text>O</Text>
          <Text>N</Text>
          <Text>D</Text>
        </View>
        <TimeSeries dataPoints={dataPoints} />
        <Legend />
        <GradientResultLine />
        <Info {...dataPoints[0]} />
      </CardLayout>
    );
  }
}

NDVIContainer.propTypes = {
  dataPoints: PropTypes.array.isRequired
};
