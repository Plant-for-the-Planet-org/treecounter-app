import React from 'react';
import PropTypes from 'prop-types';

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  return (
    <div>
      <select
        required="required"
        value={selectedCurrency}
        onChange={evt => onChange(evt.target.value)}
      >
        {Object.keys(currencies).map(value => {
          return (
            <option value={value} key={value}>
              {currencies[value]}
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
