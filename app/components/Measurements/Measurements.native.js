import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../../styles/mesurements/index';
import Measurement from './Measurement.native';
import i18n from '../../locales/i18n.js';

export default class Measurements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const measurements = this.props.measurements;
    return (
      <View>
        <Text style={styles.title}>{i18n.t('label.measurement')}</Text>
        <View style={styles.container}>
          {measurements &&
            measurements.map((measurement, index) => (
              <Measurement key={index} {...measurement} />
            ))}
        </View>
      </View>
    );
  }
}

Measurements.propTypes = {
  measurements: PropTypes.array
};
