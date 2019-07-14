import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/NDVI/Circle';
import { getColorForNDVI } from './NDVIfunctions/GradientUtils';
import TouchableItem from '../../components/Common/TouchableItem.native';

getNDVIColor = (point, isColor = false) => {
  if (!isColor) {
    return getColorForNDVI(point);
  }
  return point;
};

const Circle = props => {
  let colors = [];
  let locations = [];
  const { ndviAggregate } = props;
  if (props.ndviAggregate) {
    if (
      ndviAggregate.min != undefined &&
      (!isNaN(parseInt(props.ndviAggregate.min)) || ndviAggregate.isColor)
    ) {
      colors.push(
        getNDVIColor(props.ndviAggregate.min, props.ndviAggregate.isColor)
      );
      locations.push(0);
    }
    if (
      ndviAggregate.avg != undefined &&
      (!isNaN(parseInt(props.ndviAggregate.avg)) || ndviAggregate.isColor)
    ) {
      colors.push(
        getNDVIColor(props.ndviAggregate.avg, props.ndviAggregate.isColor)
      );
      locations.push(0.5);
    }
    if (
      ndviAggregate.max != undefined &&
      (!isNaN(parseInt(props.ndviAggregate.max)) || ndviAggregate.isColor)
    ) {
      colors.push(
        getNDVIColor(props.ndviAggregate.max, props.ndviAggregate.isColor)
      );
      locations.push(1);
    }

    return (
      <TouchableItem onPress={props.onClick}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={locations}
          colors={colors}
          style={styles.circle}
        />
      </TouchableItem>
    );
  } else {
    return <View style={[styles.circle, { backgroundColor: 'transparent' }]} />;
  }
};

export default Circle;

Circle.propTypes = {
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  onClick: PropTypes.func
};
