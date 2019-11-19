import React, { lazy } from 'react';

const Circle = lazy(() => import('./Circle'));

import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../../styles/NDVI/TimeSeries';
import _ from 'lodash';

const TimeSerie = props => {
  return (
    <View style={styles.container}>
      <Text>{props.year}</Text>
      {props.dataPoints.map((dataPoint, index) => {
        if (!_.isEmpty(dataPoint) && dataPoint.status === 'available') {
          return (
            <View key={index}>
              <Circle
                onClick={() => {
                  props.onClick(dataPoint.monthUid);
                }}
                {...dataPoint}
              />
            </View>
          );
        } else {
          return (
            <View key={index}>
              <Circle
                onClick={() => {
                  props.onClick(dataPoint.monthUid);
                }}
              />
            </View>
          );
        }
      })}
    </View>
  );
};

export default TimeSerie;

TimeSerie.propTypes = {
  year: PropTypes.number,
  dataPoints: PropTypes.array,
  dataPoint: PropTypes.object,
  onClick: PropTypes.func,
  getColorForNDVI: PropTypes.func
};
