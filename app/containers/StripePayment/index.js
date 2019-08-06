import React, { Component } from 'react';
// import { StripeProvider, Elements } from 'react-stripe-elements';
// import CheckoutForm from '../../components/StripePayment/CheckoutForm';
import Test from '../../components/StripePayment/test';
import PropTypes from 'prop-types';

class StripePayment extends Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }

  // set = () => {
  //   this.setState({
  //     stripe: window.Stripe('pk_test_0ahH0yMukgNzOEd0UppzUfsc')
  //   });
  // };

  // componentDidMount() {
  //   if (window.Stripe) {
  //     this.set();
  //   } else {
  //     document.querySelector('#stripe-js').addEventListener('load', () => {
  //       // Create Stripe instance once Stripe.js loads
  //       this.setState({
  //         stripe: window.Stripe('pk_test_0ahH0yMukgNzOEd0UppzUfsc')
  //       });
  //     });
  //   }
  // }

  render() {
    return (
      // <StripeProvider apiKey={this.props.apiKey}>
      //   <div className="example">
      //     <h1>React Stripe Elements Example</h1>
      //     <Elements>
      //       <CheckoutForm />
      //     </Elements>
      //   </div>
      // </StripeProvider>
      <Test />
    );
  }
}

export default StripePayment;

StripePayment.propTypes = {
  apiKey: PropTypes.string
};
