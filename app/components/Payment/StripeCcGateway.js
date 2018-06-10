import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
const StripeCcGateway = ({ amount, currency, account, target }) => {
  //  const props = {account, target};

  console.log(amount, currency, account, target);

  return (
    <div>
      <div>
        {i18n.t('label.stripeCC')}
        {target}
      </div>
      <div>
        {account.authorization.publishable_key} {target}
      </div>
    </div>
  );
};

StripeCcGateway.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string
};

export default StripeCcGateway;
