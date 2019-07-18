import React from 'react';
import PropTypes from 'prop-types';
import parseDate from './NDVIfunctions/parseDate';
import { View, Text } from 'react-native';
import TouchableItem from '../Common/TouchableItem.native';
import styles from '../../styles/NDVI/Info';

const textCommonStyle = { fontSize: 10, lineHeight: 14 };
const boldTextStyle = { fontWeight: 'bold' };

const Info = props => {
  const aggregate = props.selectedDataPoint.ndviAggregate;
  return (
    <View style={{ marginTop: 21 }}>
      {aggregate && (
        <React.Fragment>
          <View style={styles.container}>
            <View>
              <Text style={textCommonStyle}>
                {`${props.ndviResulFromSpell}  `}
                {parseDate(
                  props.selectedDataPoint.month,
                  props.selectedDataPoint.year
                )}
              </Text>
              <Text style={textCommonStyle}>
                {`${props.minimumSpell} `}
                <Text style={boldTextStyle}>{parseFloat(aggregate.min)}</Text>
                {` ${props.averageSpell} `}
                <Text style={boldTextStyle}>{parseFloat(aggregate.avg)}</Text>
                {` ${props.maximumSpell} `}
                <Text style={boldTextStyle}>{parseFloat(aggregate.max)}</Text>
              </Text>
            </View>
            <TouchableItem
              style={{
                ...styles.info
              }}
            >
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
  selectedDataPoint: PropTypes.object
};
