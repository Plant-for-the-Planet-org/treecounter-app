import React from 'react';
import PropTypes from 'prop-types';
import TextBlock from '../Common/Text/TextBlock';
import i18n from '../../locales/i18n.js';

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  return (
    <div className="pftp-selectfield">
      <TextBlock strong={true}>{i18n.t('label.currency')}</TextBlock>
      <select
        className="pftp-selectfield__select"
        required="required"
        value={selectedCurrency}
        onChange={evt => onChange(evt.target.value)}
      >
        {Object.keys(currencies).map(value => {
          return (
            <option
              className="pftp-selectfield__option"
              value={value}
              key={value}
            >
              {currencies[value]} [{value}]
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
