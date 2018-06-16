import React from 'react';
import PropTypes from 'prop-types';

import PaymentOption from './PaymentOption';

const PaymentSelector = ({
  paymentMethods,
  accounts,
  currency,
  amount,
  onSuccess,
  onFailure,
  onError
}) => {
  const options = [];
  Object.keys(paymentMethods).map(gateway => {
    const accountKey = paymentMethods[gateway];
    const [accountName, target] = accountKey.split(':');

    options.push({
      gateway: gateway,
      accountName: accountName,
      currency,
      amount,
      target: target,
      account: accounts[accountName],
      selectable: true,
      onSuccess,
      onFailure,
      onError
    });
  });

  return (
    <div>
      {options.map(option => (
        <PaymentOption key={option.gateway} {...option} />
      ))}
    </div>
  );
};

PaymentSelector.propTypes = {
  paymentMethods: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  accounts: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default PaymentSelector;
