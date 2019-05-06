import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import i18n from '../../locales/i18n';
import styles from '../../styles/currencies/currencyselector';
import t from 'tcomb-form-native';
import { Dropdown } from 'react-native-material-dropdown';
import { getFormSchema } from '../../server/parsedSchemas/currencySelector';

let Form = t.form.Form;

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  // const {
  //   schemaOptions,
  //   transformedSchema: currencySelectorFormSchema
  // } = getFormSchema(currencies);
  let currenciesArray = Object.keys(currencies);
  let currenciesTitles = Object.values(currencies);

  currenciesDropdownFormat = currenciesArray.map((item, index) => {
    return { value: item, text: currenciesTitles[index] };
  });
  return (
    <Dropdown
      containerStyle={[
        {
          width: '100%',
          marginLeft: 10,
          marginBottom: 10,
          paddingRight: 10,
          elevation: 2
        }
      ]}
      pickerStyle={{
        position: 'absolute',
        maxHeight: Dimensions.get('window').height - 150,
        marginTop: 'auto',
        top:
          currenciesDropdownFormat.length <= 15
            ? Dimensions.get('window').height / 2 -
              currenciesDropdownFormat.length * 18
            : Dimensions.get('window').height / 2 - 275,
        alignSelf: 'center',
        flex: 1,
        zIndex: 60
      }}
      itemCount={20}
      dropdownOffset={{
        top: 10,
        left: 0
      }}
      animationDuration={0}
      itemTextStyle={{
        fontSize: 13,
        color: '#686060'
      }}
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
