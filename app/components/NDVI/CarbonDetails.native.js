import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import CardLayout from '../Common/Card';
import TouchableItem from '../Common/TouchableItem.native';
import styles from '../../styles/NDVI/Carbon';
import i18n from '../../locales/i18n.js';
import { delimitNumbers } from '../../utils/utils';
import ReactNativeTooltipMenu from 'react-native-popover-tooltip';

const CarbonDetails = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.carbonLabel}>
          {i18n.t('label.NDVI_carbon_title')}
        </Text>
      </View>

      <CardLayout style={styles.cardLayout}>
        <View style={styles.carbonContainer}>
          <Text style={{ ...styles.carbonText }}>
            {delimitNumbers(props.carbonValue)} Kg
          </Text>
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
      </CardLayout>
    </View>
  );
};

export default CarbonDetails;

CarbonDetails.propTypes = {
  carbonValue: PropTypes.number,
  onClickHelp: PropTypes.func
};
