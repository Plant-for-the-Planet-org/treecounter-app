import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const Circle = props => {
  return (
    <View>
      <Text>Circle</Text>
    </View>
  );
};

export default Circle;

Circle.propTypes = {
  gradientName: PropTypes.string
};
