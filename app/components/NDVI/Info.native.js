import React from 'react';
import PropTypes from 'prop-types';
import parseDate from './NDVIfunctions/parseDate';
import { View, Text } from 'react-native';
import TouchableItem from '../Common/TouchableItem.native';

const Info = props => {
  const aggregate = props.selectedDataPoint.ndviAggregate;
  return (
    <View style={{ marginTop: 28 }}>
      {aggregate && (
        <React.Fragment>
          <View className="row">
            <Text className="flex-1">
              <Text>
                {props.ndviResulFromSpell}{' '}
                {parseDate(
                  props.selectedDataPoint.month,
                  props.selectedDataPoint.year
                )}
              </Text>
              <Text>
                {props.minimumSpell}
                <Text>{aggregate.min ? aggregate.min : 'NaN'}</Text>
                {props.averageSpell}
                <Text>{aggregate.avg ? aggregate.avg : 'NaN'}</Text>
                {props.maximumSpell}
                <Text>{aggregate.max ? aggregate.max : 'NaN'}</Text>
              </Text>
            </Text>
            <TouchableItem className="flex-1 text-center btn-container">
              <Text>?</Text>
            </TouchableItem>
          </View>
        </React.Fragment>
      )}
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
