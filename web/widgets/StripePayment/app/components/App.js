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
        <link href="stripewidget.css" rel="stylesheet" />
        <StripePaymentContainer apiKey="pk_test_0ahH0yMukgNzOEd0UppzUfsc" />
      </div>
    );
  }
}
