import React from 'react';
// import TimeSerie from './TimeSerie';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const TimeSeries = props => {
  return (
    <View>
      <Text>TimeSeries</Text>
    </View>
  );
};

export default TimeSeries;

TimeSeries.propTypes = {
  map: PropTypes.array,
  dataPoints: PropTypes.array,
  year: PropTypes.number,
  monthUid: PropTypes.number,
  month: PropTypes.number,
  carbon: PropTypes.number,
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  avg: PropTypes.number,
  max: PropTypes.number
};
