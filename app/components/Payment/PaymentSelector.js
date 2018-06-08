import React from 'react';
import PropTypes from 'prop-types';

import PaymentOption from './PaymentOption';

const PaymentSelector = ({
  paymentMethods,
  accounts,
  currency,
  amount,
  context,
  onSuccess,
  onFailure,
  onError
}) => {
  console.log('paymentMethods', paymentMethods);
  console.log('accounts', accounts);
  console.log('currency', currency);
  console.log('amount', amount);
  console.log('email', context);

  console.log(
    'PaymentSelector ==============================================================='
  );

  const options = [];
  Object.keys(paymentMethods).map(gateway => {
    const accountKey = paymentMethods[gateway];
    const [accountName, target] = accountKey.split(':');

    options.push({
      gateway: gateway,
      accountName: accountName,
      currency,
      amount,
      context,
      target: target,
      account: accounts[accountName],
      selectable: true,
      onSuccess,
      onFailure,
      onError
    });
  });
  console.log(options);

  return (
    <div>
      {options.map(option => (
        <div key={option.gateway}>
          <PaymentOption key={option.gateway} {...option} />
          <hr />
        </div>
      ))}
    </div>
  );
};

PaymentSelector.propTypes = {
  accounts: PropTypes.object,
  paymentMethods: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default PaymentSelector;
