import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import { View, Picker, Text } from 'react-native';
import styles from '../../styles/currencies/currencyselector';
import { currencySort } from './utils';

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  let currenciesArray = currencySort(Object.keys(currencies));

  return (
    <View style={styles.containerStyle}>
      <Picker
        mode="dropdown"
        selectedValue={selectedCurrency}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
        style={styles.pickerStyle}
        itemStyle={styles.itemStyle}
      >
        {currenciesArray.map(value => {
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
