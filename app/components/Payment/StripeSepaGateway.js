import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';

const StripeSepaGateway = ({ amount, currency, account, target }) => {
  //  const props = {account, target};

  console.log(amount, currency, account, target);

  return (
    <div>
      <div>
        {i18n.t('label.stripeSepa')}
        {target}
      </div>
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
