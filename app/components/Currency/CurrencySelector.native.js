import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from '../../styles/currencies/currencyselector';
import t from 'tcomb-form-native';
import { getFormSchema } from '../../server/parsedSchemas/currencySelector';

let Form = t.form.Form;

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  const {
    schemaOptions,
    transformedSchema: currencySelectorFormSchema
  } = getFormSchema(currencies);

  return (
    <View style={styles.containerStyle}>
      <Form
        onChange={currency => {
          onChange(currency.currency);
        }}
        type={currencySelectorFormSchema}
        //        options={schemaOptions}
        value={{ currency: selectedCurrency }}
      />
    </View>
  );
};

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CurrencySelector;
