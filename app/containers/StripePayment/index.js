import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import MyStoreCheckout from '../../components/StripePayment/MyStoreCheckout';
import PropTypes from 'prop-types';

class StripePayment extends Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }

  set = () => {
    this.setState({ stripe: window.Stripe(this.props.apiKey) });
  };

  componentDidMount() {
    if (window.Stripe) {
      this.set();
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe(this.props.apiKey) });
      });
    }
  }

  render() {
    return (
      <StripeProvider apiKey={this.props.apiKey} stripe={this.state.stripe}>
        <MyStoreCheckout />
      </StripeProvider>
    );
  }
}

export default StripePayment;

StripePayment.propTypes = {
  apiKey: PropTypes.string
};
