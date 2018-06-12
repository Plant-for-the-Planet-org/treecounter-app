// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import StripeCC from './StripeCC';
import StripeSepa from './StripeSepa';
import Paypal from './Paypal';
import Offline from './Offline';

import { StripeProvider, Elements } from './stripeDefs';

class PaymentSelector extends React.Component<{}, { elementFontSize: string }> {
  constructor(props) {
    super(props);

    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
    // do not load Stripe if not required
    const gateways = Object.keys(this.props.paymentMethods);
    if (!(gateways.includes('stripe_cc') || gateways.includes('stripe_sepa'))) {
      return;
    }

    // componentDidMount only runs in a browser environment.
    // In addition to loading asynchronously, this code is safe to server-side render.

    // You can inject a script tag manually like this,
    // or you can use the 'async' attribute on the Stripe.js v3 <script> tag.
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => {
      // The setTimeout lets us pretend that Stripe.js took a long time to load
      // Take it out of your production code!
      setTimeout(() => {
        this.setState({
          stripe: window.Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
        });
      }, 500);
    };
    document.body && document.body.appendChild(stripeJs);
  }

  render() {
    const { accounts, paymentMethods, amount, currency } = this.props;
    const gatewayProps = {
      onSuccess: this.props.onSuccess,
      onFailure: this.props.onFailure,
      onError: this.props.onError
    };

    return (
      <StripeProvider stripe={this.state.stripe}>
        <div className="Checkout">
          <h1>Select Payment Method</h1>
          <h3>
            Amount: {amount} {currency}
          </h3>
          {Object.keys(paymentMethods).map(gateway => {
            const [accountName, target] = paymentMethods[gateway].split(':');
            if ('stripe_cc' === gateway) {
              return (
                <Elements>
                  <StripeCC
                    account={accounts[accountName]}
                    target={target}
                    {...gatewayProps}
                  />
                </Elements>
              );
            }
            if ('stripe_sepa' === gateway) {
              return (
                <Elements>
                  <StripeSepa
                    account={accounts[accountName]}
                    target={target}
                    {...gatewayProps}
                  />
                </Elements>
              );
            }
            if ('paypal' === gateway) {
              return (
                <Paypal
                  amount={amount}
                  currency={currency}
                  account={accounts[accountName]}
                  target={target}
                  {...gatewayProps}
                />
              );
            }
            if ('offline' === gateway) {
              return (
                <Offline account={accounts[accountName]} {...gatewayProps} />
              );
            }
          })}
        </div>
      </StripeProvider>
    );
  }
}

PaymentSelector.propTypes = {
  accounts: PropTypes.object,
  paymentMethods: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default PaymentSelector;
