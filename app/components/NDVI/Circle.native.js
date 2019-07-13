import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/NDVI/Circle';
import { getColorForNDVI } from './NDVIfunctions/GradientUtils';
import TouchableItem from '../../components/Common/TouchableItem.native';

const Circle = props => {
  return props.ndviAggregate ? (
    <TouchableItem onPress={props.onClick}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 0.5, 1]}
        colors={[
          getColorForNDVI(props.ndviAggregate.min),
          getColorForNDVI(props.ndviAggregate.avg),
          getColorForNDVI(props.ndviAggregate.max)
        ]}
        style={styles.circle}
      />
    </TouchableItem>
  ) : (
    <View style={[styles.circle, { backgroundColor: 'transparent' }]} />
  );
};

export default Circle;

Circle.propTypes = {
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  onClick: PropTypes.func
};
