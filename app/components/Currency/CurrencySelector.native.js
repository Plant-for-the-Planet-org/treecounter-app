import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import i18n from '../../locales/i18n';
// import styles from '../../styles/currencies/currencyselector';
// import t from 'tcomb-form-native';
import { Dropdown } from 'react-native-material-dropdown';
// import { getFormSchema } from '../../server/parsedSchemas/currencySelector';
import { currencySort } from './utils';

// let Form = t.form.Form;

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  // const {
  //   schemaOptions,
  //   transformedSchema: currencySelectorFormSchema
  // } = getFormSchema(currencies);
  const currenciesArray = currencySort(Object.keys(currencies));

  const currenciesDropdownFormat = currenciesArray.map(item => {
    return { value: item, text: currencies[item] };
  });
  const textColor = '#686060';
  return (
    <Dropdown
      containerStyle={{
        width: '100%',
        marginLeft: 10,
        marginBottom: 10,
        paddingRight: 10,
        elevation: 2
      }}
      pickerStyle={{
        position: 'absolute',
        maxHeight: Dimensions.get('window').height
          ? Dimensions.get('window').height - 160
          : 400,
        top: 160,
        zIndex: 60
      }}
      itemCount={10}
      dropdownPosition={1}
      animationDuration={0}
      itemTextStyle={{
        fontSize: 13,
        color: textColor
      }}
      initialNumToRender={currenciesDropdownFormat.length}
      value={i18n.t(selectedCurrency)}
      textColor="rgba(104,96,96, 0.8)"
      selectedItemColor="rgba(104,96,96, 0.8)"
      labelExtractor={item => i18n.t(item.text)}
      valueExtractor={item => item.value}
      onChangeText={item => onChange(item)}
      // label={i18n.t(locals.value.text)}
      data={currenciesDropdownFormat}
    />
    // <Form
    //   onChange={currency => {
    //     onChange(currency.currency);
    //   }}
    //   type={currencySelectorFormSchema}
    //   options={schemaOptions}
    //   value={{ currency: selectedCurrency }}
    // />
  );
};

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CurrencySelector;
