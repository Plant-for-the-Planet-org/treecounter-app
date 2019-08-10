import React from 'react';
import { Elements } from 'react-stripe-elements';
// import PropTypes from 'prop-types';
import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}

export default MyStoreCheckout;
