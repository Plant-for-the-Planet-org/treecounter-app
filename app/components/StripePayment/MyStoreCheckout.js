import React from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

const MyStoreCheckout = () => (
  <Elements>
    <h1>Hello</h1>
    <InjectedCheckoutForm />
  </Elements>
);

export default MyStoreCheckout;
