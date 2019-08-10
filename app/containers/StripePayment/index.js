import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import MyStoreCheckout from '../../components/StripePayment/MyStoreCheckout';
import PropTypes from 'prop-types';

class StripePayment extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_0ahH0yMukgNzOEd0UppzUfsc">
        <MyStoreCheckout />
      </StripeProvider>
    );
  }
}

export default StripePayment;

StripePayment.propTypes = {
  apiKey: PropTypes.string
};
