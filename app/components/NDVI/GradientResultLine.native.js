import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  getPointPercentageOnGradient,
  getColorForNDVI
} from './NDVIfunctions/GradientUtils';
import { formatDate } from '../../utils/utils';
import { formatDateToMySQL } from '../../helpers/utils';

const GradientResultLine = props => {
  const { selectedDataPoint } = props;
  if (!selectedDataPoint || !selectedDataPoint.ndviAggregate) {
    return null;
  }

  const minPercentage = getPointPercentageOnGradient(
    selectedDataPoint.ndviAggregate.min
  );
  const maxPercentage = getPointPercentageOnGradient(
    selectedDataPoint.ndviAggregate.max
  );
  let colors = [];
  let locations = [];
  if (!isNaN(selectedDataPoint.ndviAggregate.min)) {
    colors.push(getColorForNDVI(selectedDataPoint.ndviAggregate.min));
    locations.push(0);
  }
  if (!isNaN(selectedDataPoint.ndviAggregate.avg)) {
    colors.push(getColorForNDVI(selectedDataPoint.ndviAggregate.avg));
    locations.push(0.5);
  }
  if (!isNaN(selectedDataPoint.ndviAggregate.max)) {
    colors.push(getColorForNDVI(selectedDataPoint.ndviAggregate.max));
    locations.push(1);
  }

  return (
    <View style={{ width: '100%', marginTop: 21 }}>
      <Text
        style={{ marginBottom: 16, fontFamily: 'OpenSans-SemiBold' }}
      >{`${formatDate(
        formatDateToMySQL(
          new Date(selectedDataPoint.year, selectedDataPoint.month - 1, 1)
        ),
        'LLLL yyyy'
      )}`}</Text>
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
      <LinearGradient
        style={{
          width: `${maxPercentage - minPercentage}%`,
          height: 16,
          position: 'absolute',
          borderRadius: 4,
          top: Platform.OS === 'android' ? 32 : 29,
          opacity: 0.4,
          left: `${minPercentage}%`
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={locations}
        colors={colors}
      />
    </View>
  );
};

export default GradientResultLine;

GradientResultLine.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selectedDataPoint: PropTypes.object
};
