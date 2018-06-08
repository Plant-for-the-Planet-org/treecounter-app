import React from 'react';
import PropTypes from 'prop-types';
//import {StripeProvider, Elements, IbanElement} from 'react-stripe-elements';

const StripeSepaGateway = ({ amount, currency, account, target }) => {
  // publishable key is available under: account.authorization.publishable_key
  //
  const style = {
    base: {
      // Add your base input styles here. For example:
      fontSize: '16px',
      color: '#32325d'
    }
  };
  console.log(amount, currency, account, target, style);

  return (
    <div>
      {/*<StripeProvider apiKey={account.authorization.publishable_key}>*/}
      {/*<Elements>*/}
      {/*<IbanElement style={style} placeholderCountry={'DE'}/>*/}
      {/*</Elements>*/}
      {/*</StripeProvider>*/}
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
