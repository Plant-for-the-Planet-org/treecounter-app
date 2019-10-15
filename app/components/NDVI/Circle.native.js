import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/NDVI/Circle';
import { getColorForNDVI } from './NDVIfunctions/GradientUtils';
import TouchableItem from '../../components/Common/TouchableItem.native';
const backgroundColor = 'transparent';
const getNDVIColor = (point, isColor = false) => {
  if (!isColor) {
    return getColorForNDVI(point, Dimensions.get('window').width - 40);
  }
  return point;
};

const Circle = props => {
  let colors = [];
  let locations = [];
  const { ndviAggregate } = props;
  let handleOnclick = props.onClick;
  if (props.ndviAggregate) {
    if (
      ndviAggregate.min == undefined &&
      ndviAggregate.avg == undefined &&
      ndviAggregate.max == undefined
    ) {
      colors = ['rgb(142, 142, 142)', 'rgb(142, 142, 142)'];
      locations = [0, 1];
      handleOnclick = undefined;
    } else if (
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
      <TouchableItem onPress={handleOnclick}>
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
    return (
      <View style={[styles.circle, { backgroundColor: backgroundColor }]} />
    );
  }
};

export default Circle;

Circle.propTypes = {
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  onClick: PropTypes.func
};
