import React from 'react';
import PropTypes from 'prop-types';

const OfflineGateway = ({ amount, currency, account, target }) => {
  console.log(amount, currency, account, target);

  return (
    <div>
      <div>{account.full_text}</div>
    </div>
  );
};

OfflineGateway.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string
};

export default OfflineGateway;
