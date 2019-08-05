import React, { Component } from 'react';
import StripePaymentContainer from '../../../../../app/containers/StripePayment';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <link href="ndviwidget.css" rel="stylesheet" />
        <script id="stripe-js" src="https://js.stripe.com/v3/" async />
        <h1>HELLO STRIPE</h1>
        <StripePaymentContainer apiKey="pk_test_0ahH0yMukgNzOEd0UppzUfsc" />
      </div>
    );
  }
}
