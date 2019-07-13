import React from 'react';
import PropTypes from 'prop-types';
import getMetricsForDisplayingGradientLineHighlight from './NDVIfunctions/getMetricsForDisplayingGradientLineHighlight';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const GradientResultLine = props => {
  //This method returns left and width in pixel for highlight line
  const hightlightLineMetricts = getMetricsForDisplayingGradientLineHighlight(
    props.min,
    props.max
  );

  return (
    <View style={{ width: '100%' }}>
      <Text style={{ marginBottom: 16 }}>{`${moment.months(
        props.selectedDataPoint.month - 1
      )}, ${props.selectedDataPoint.year}`}</Text>
      <LinearGradient
        style={{ width: '100%', height: 8, borderRadius: 24 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.1, 0.4, 0.5, 0.55, 0.67, 0.86, 1]}
        colors={[
          '#00437c',
          '#2801fa',
          '#fb431f',
          '#fbf700',
          '#75c700',
          '#04c400',
          '#049f04'
        ]}
      />
    </View>
  );
};

export default GradientResultLine;

GradientResultLine.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};
