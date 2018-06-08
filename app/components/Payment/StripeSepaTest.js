import React from 'react';
import PropTypes from 'prop-types';
import StripeSepaGateway from './StripeSepaGateway';
import scriptLoader from 'react-async-script-loader';
import { StripeProvider, Elements } from 'react-stripe-elements';

class StripeSepaTest extends React.Component {
  constructor(props) {
    super(props);

    // window.React = React;
    // window.ReactDOM = ReactDOM;

    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
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
    const account = {
      type: 'stripe',
      authorization: {
        publishable_key: 'pk_test_4mIOHCBhHWFTsFyPQoVHLRty'
      }
    };
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <StripeSepaGateway amount={77} currency="USD" account={account} />
        </Elements>
      </StripeProvider>
    );
  }
}

StripeSepaTest.propTypes = {
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool
};

export default scriptLoader('https://js.stripe.com/v3/')(StripeSepaTest);
