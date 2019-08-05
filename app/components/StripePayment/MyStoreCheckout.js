import React from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

const MyStoreCheckout = () => (
  <Elements>
    <InjectedCheckoutForm />
  </Elements>
);

export default MyStoreCheckout;
