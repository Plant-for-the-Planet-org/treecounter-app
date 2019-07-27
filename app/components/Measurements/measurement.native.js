import React from 'react';
import { View, Text } from 'react-native';
// { plantedDate: 'On April 9,2019', heightOfTree: 150, widhtOfTree: 120 },

const Measurement = props => (
  <View>
    <View>
      <Text>{props.plantedDate}</Text>
    </View>
    <View>
      <View>
        <Text>{props.heightOfTree}</Text>
      </View>
      <View>
        <Text>{props.widthOfTree}</Text>
      </View>
    </View>
  </View>
);

export default Measurement;
