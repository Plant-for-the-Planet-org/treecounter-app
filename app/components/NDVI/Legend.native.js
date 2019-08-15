import React from 'react';
import Circle from '../../components/NDVI/Circle.native';
import { View, Text } from 'react-native';
//styles

const Legend = props => {
  return (
    <View>
      <Text>Legend</Text>
      <Circle />
    </View>
  );
};

export default Legend;
