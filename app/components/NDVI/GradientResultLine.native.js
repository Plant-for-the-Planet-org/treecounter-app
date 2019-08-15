import React from 'react';
import PropTypes from 'prop-types';
import getMetricsForDisplayingGradientLineHighlight from './NDVIfunctions/getMetricsForDisplayingGradientLineHighlight';
import { View, Text } from 'react-native';

const GradientResultLine = props => {
  //This method returns left and width in pixel for highlight line
  const hightlightLineMetricts = getMetricsForDisplayingGradientLineHighlight(
    props.min,
    props.max
  );

  return (
    <View>
      <Text>GradientResultLine</Text>
    </View>
  );
};

export default GradientResultLine;

GradientResultLine.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};
