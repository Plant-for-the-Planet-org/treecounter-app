import React from 'react';
import PropTypes from 'prop-types';

const PaymentSelector = ({
  countryCurrencies,
  userCountry,
  selectedCurrency,
  accounts
}) => {
  // function determineCountryCurrency(countryCurrencies, userCountry, selectedCurrency) {
  //   const selectedCountryCurrency = `${userCountry}/${selectedCurrency}`;
  //   console.log('lookup', selectedCountryCurrency, Object.keys(countryCurrencies).find(countryCurrency => countryCurrency === selectedCountryCurrency));
  // }

  const countryCurrency = 'DE/EUR'; //determineCountryCurrency(countryCurrencies, userCountry, selectedCurrency);
  const paymentMethods = countryCurrencies[countryCurrency].paymentMethods;

  console.log(
    'countryCurrencies, userCountry, selectedCurrency, accounts',
    countryCurrencies,
    userCountry,
    selectedCurrency,
    accounts
  );
  return (
    <div>
      {Object.keys(paymentMethods).map(method => {
        const accountKey = paymentMethods[method];
        const [accountName, target] = accountKey.split(':');

        return (
          <div>
            PaymentButton: {method} {accountName} {target}
          </div>
        );
      })}
    </div>
  );
};

PaymentSelector.propTypes = {
  countryCurrencies: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  userCountry: PropTypes.string
};

export default PaymentSelector;
