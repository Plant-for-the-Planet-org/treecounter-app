import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import mockData from './mockData';
import styles from '../../styles/mesurements/index';
import Measurement from './measurement.native';

export default class Measurements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = mockData;
    return (
      <View style={styles.container}>
        <Text>Measurements</Text>
        <Measurement {...props} />
      </View>
    );
  }
}

// NDVIContainer.propTypes = {
//     dataPoints: PropTypes.array.isRequired
// };
