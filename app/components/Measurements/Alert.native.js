import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/mesurements/alert';
import { View, Text } from 'react-native';

const Alert = props => (
  <View style={{ alignItems: 'center' }}>
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.deletedTreeCount ? props.deletedTreeCount : 'None'} Tree
        contribution has been deleted
      </Text>
      <Text style={styles.text}>Successfully. redirect to Me page.</Text>
    </View>
  </View>
);

export default Alert;

Alert.propTypes = {
  deletedTreeCount: PropTypes.number
};
