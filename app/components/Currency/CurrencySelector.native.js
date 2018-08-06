import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import { View, Picker, Text } from 'react-native';
import styles from '../../styles/currencies/currencyselector';

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  return (
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
            <Picker.Item key={value} label={currencies[value]} value={value} />
          );
        })}
      </Picker>
    </View>
  );
};

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CurrencySelector;
