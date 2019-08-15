import React from 'react';
import PropTypes from 'prop-types';
import parseDate from './NDVIfunctions/parseDate';
import { View, Text } from 'react-native';

const Info = props => {
  return (
    <View>
      <Text>Info</Text>
    </View>
  );
};

export default Info;

Info.propTypes = {
  year: PropTypes.number,
  monthUid: PropTypes.number,
  month: PropTypes.number,
  carbon: PropTypes.number,
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  avg: PropTypes.number,
  max: PropTypes.number
};
