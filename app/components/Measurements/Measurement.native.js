import React from 'react';
import { View, Text, Image } from 'react-native';
// { plantedDate: 'On April 9,2019', heightOfTree: 150, widhtOfTree: 120 },
import ArrowUpIcon from '../../assets/images/green-arrow-up.png';
import ArrowRightIcon from '../../assets/images/green-arrow-right.png';
import CalendarIcon from '../../assets/images/green-calendar.png';

const Measurement = props => (
  <View style={{ paddingTop: 10 }}>
    <View>
      <Text>
        <Image source={CalendarIcon} />
        {props.plantedDate}
      </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{ backgroundColor: 'yellow', flexDirection: 'column', flex: 4 }}
      >
        <Text style={{ justifyContent: 'center' }}>
          <Image source={ArrowUpIcon} />
          {props.heightOfTree} m tall
        </Text>
      </View>
      <View
        style={{ backgroundColor: 'blue', flexDirection: 'column', flex: 8 }}
      >
        <Text>
          <Image source={ArrowRightIcon} />
          {props.widthOfTree} cm wide
        </Text>
      </View>
    </View>
  </View>
);

export default Measurement;
