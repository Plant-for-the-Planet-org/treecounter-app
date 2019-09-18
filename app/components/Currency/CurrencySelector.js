import React from 'react';
import PropTypes from 'prop-types';
import TextBlock from '../Common/Text/TextBlock';
import i18n from '../../locales/i18n.js';
import { currencySort } from './utils';
function encloseWithBraket(str) {
  return ' [' + str + ']';
}
const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  let currenciesArray = currencySort(Object.keys(currencies));
  if (currenciesArray.indexOf(selectedCurrency) === -1) {
    onChange(currenciesArray[0]);
  }

  return (
    <div className="pftp-selectfield">
      <TextBlock strong>{i18n.t('label.currency')}</TextBlock>
      <select
        className="pftp-selectfield__select"
        required="required"
        value={selectedCurrency}
        onChange={evt => onChange(evt.target.value)}
      >
        {currenciesArray.map(value => {
          return (
            <option
              className="pftp-selectfield__option"
              value={value}
              key={value}
            >
              {currencies[value]}
              {encloseWithBraket(value)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CurrencySelector;
