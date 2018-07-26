import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import { View, Picker, Text } from 'react-native';
import styles from '../../styles/currencies/currencyselector';

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  return (
    <View style={styles.currency_selector}>
      <Text>{i18n.t('label.currency')}</Text>
      <View style={styles.containerStyle}>
        <Picker
          mode="dropdown"
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
          style={styles.pickerStyle}
          itemStyle={styles.itemStyle}
        >
          {Object.keys(currencies).map(value => {
            return (
              <Picker.Item
                key={value}
                label={i18n.t(currencies[value])}
                value={currencies[value]}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
};

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CurrencySelector;
