import React from 'react';
import PropTypes from 'prop-types';

import PaypalGateway from './PaypalGateway';
import StripeCcGateway from './StripeCcGateway';
import StripeSepaGateway from './StripeSepaGateway';
import OfflineGateway from './OfflineGateway';

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
  if ('paypal' === gateway) {
    gatewayComponent = <PaypalGateway {...gateWayProps} />;
  } else if ('stripe_cc' === gateway) {
    gatewayComponent = <StripeCcGateway {...gateWayProps} />;
  } else if ('stripe_sepa' === gateway) {
    gatewayComponent = <StripeSepaGateway {...gateWayProps} />;
  } else if ('offline' === gateway) {
    gatewayComponent = <OfflineGateway {...gateWayProps} />;
  }

  return (
    <div>
      <div>
        currency: {currency}, amount: {amount}{' '}
      </div>
      {gatewayComponent}
      Radio {gateway} {accountName}
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
