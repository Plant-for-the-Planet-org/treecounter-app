import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import CardLayout from '../Common/Card';
import TouchableItem from '../Common/TouchableItem.native';
import styles from '../../styles/NDVI/Carbon';
import i18n from '../../locales/i18n.js';
import { delimitNumbers } from '../../utils/utils';

const CarbonDetails = props => {
  const onClickHelp = _ => {
    props.onClickHelp && props.onClickHelp('help');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.carbonLabel}>
          {i18n.t('label.NDVI_carbon_title')}
        </Text>
      </View>

      <CardLayout style={{ padding: 16 }}>
        <View
          style={{
            ...styles.carbonContainer
          }}
        >
          <Text style={{ ...styles.carbonText }}>
            {delimitNumbers(props.carbonValue)} Kg
          </Text>
          <TouchableItem style={styles.info}>
            <Text>?</Text>
          </TouchableItem>
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
