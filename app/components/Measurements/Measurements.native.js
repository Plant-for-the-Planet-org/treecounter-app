import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import mockData from './mockData';
import styles from '../../styles/mesurements/index';
import Measurement from './Measurement.native';

export default class Measurements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = mockData;
    return (
      <React.Fragment>
        <Text style={styles.title}>Measurements (For Single Tree Only)</Text>
        <View style={styles.container}>
          <Text style={{ backgroundColor: 'green' }}>Measurements</Text>
          {props &&
            props.map((measurement, index) => (
              // <View key={index} style={{ width: 100, flexDirection: 'row' }}>
              <Measurement {...measurement} />
              // </View>
            ))}
        </View>
      </React.Fragment>
    );
  }
}

// Measurements.propTypes = {
//     dataPoints: PropTypes.array.isRequired
// };
