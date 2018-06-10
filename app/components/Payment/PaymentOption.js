import React from 'react';
import PropTypes from 'prop-types';

import PaypalGateway from './PaypalGateway';
import StripeCcGateway from './StripeCcGateway';
import StripeSepaGateway from './StripeSepaGateway';
import OfflineGateway from './OfflineGateway';
import i18n from '../../locales/i18n.js';

const PaymentOption = ({
  selectable,
  isSelected,
  onSelect,
  amount,
  currency,
  gateway,
  account,
  accountName,
  target,
  onSuccess,
  onFailure,
  onError
}) => {
  console.log(
    selectable,
    isSelected,
    onSelect,
    amount,
    currency,
    gateway,
    account,
    accountName,
    target
  );

  // sepa_cc => SepaCcGateway
  //const GatewayComponent = snakeToPascal(gateway);

  let gatewayComponent;

  const gateWayProps = {
    amount,
    currency,
    account,
    gateway,
    target,
    onSuccess,
    onFailure,
    onError
  };

  console.log('---------------- ', gateway);
  if (i18n.t('label.paypal') === gateway) {
    gatewayComponent = <PaypalGateway {...gateWayProps} />;
  } else if (i18n.t('label.stripe_cc') === gateway) {
    gatewayComponent = <StripeCcGateway {...gateWayProps} />;
  } else if (i18n.t('label.stripe_sepa') === gateway) {
    gatewayComponent = <StripeSepaGateway {...gateWayProps} />;
  } else if (i18n.t('label.offline') === gateway) {
    gatewayComponent = <OfflineGateway {...gateWayProps} />;
  }

  return (
    <div>
      <label key={gateway}>
        <input
          type="radio"
          value={gateway}
          checked={isSelected}
          onChange={evt => onSelect(evt)}
        />
        {gatewayComponent}
      </label>
      <div>
        {i18n.t('label.radio')}
        {gateway} {accountName}
      </div>
    </div>
  );
};

// const snakeToPascal = snake => {
//
//   // snake_case -> camelCase
//   const name =
//     snake.replace(/(_\w)/g, function(m) {
//       return m[1].toUpperCase();
//     }) + 'Gateway';
//
//   // camelCase -> PascalCase
//   return `${name[0].toUpperCase()}${name.slice(1)}`;
// };

PaymentOption.propTypes = {
  selectable: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  gateway: PropTypes.string.isRequired,
  accountName: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default PaymentOption;
