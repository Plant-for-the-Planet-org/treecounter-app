import React from 'react';
import PropTypes from 'prop-types';
import StripeSepaForm from './StripeSepaForm';

const StripeSepaGateway = ({ amount, currency, account, target }) => {
  // publishable key is available under: account.authorization.publishable_key
  //
  console.log(amount, currency, account, target);

  const style = { marginLeft: '300px;' };

  return (
    <div style={style}>
      <StripeSepaForm />
      <div>StripeSepa: {target}</div>
      <div>
        {account.authorization.publishable_key} {target}
      </div>
    </div>
  );
};

StripeSepaGateway.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string
};

export default StripeSepaGateway;
