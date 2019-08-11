import React from 'react';
import PropTypes from 'prop-types';
import parseDate from './NDVIfunctions/parseDate';
import { View, Text } from 'react-native';
import TouchableItem from '../Common/TouchableItem.native';
import styles from '../../styles/NDVI/Info';
import ReactNativeTooltipMenu from 'react-native-popover-tooltip';

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
                <Text style={boldTextStyle}>
                  {Math.round(aggregate.min * 100) / 100}
                </Text>
                {` ${props.averageSpell} `}
                <Text style={boldTextStyle}>
                  {Math.round(aggregate.avg * 100) / 100}
                </Text>
                {` ${props.maximumSpell} `}
                <Text style={boldTextStyle}>
                  {Math.round(aggregate.max * 100) / 100}
                </Text>
              </Text>
            </View>
            <ReactNativeTooltipMenu
              labelContainerStyle={{
                width: 200,
                alignItems: 'center'
              }}
              buttonComponent={
                <TouchableItem
                  style={{
                    ...styles.info
                  }}
                >
                  <Text>?</Text>
                </TouchableItem>
              }
              items={[
                {
                  label: props.toolTipHelpButtonSpell
                    ? props.toolTipHelpButtonSpell
                    : 'None',
                  onPress: () => {}
                }
              ]}
            />
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
