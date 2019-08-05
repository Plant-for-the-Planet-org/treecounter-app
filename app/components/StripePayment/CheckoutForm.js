import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';

// import AddressSection from './AddressSection';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createPaymentMethod knows from which Element to
    // create the PaymentMethod, since there's only one in this group.
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    this.props.stripe
      .createPaymentMethod('card', { billing_details: { name: 'Jenny Rosen' } })
      .then(({ paymentMethod }) => {
        console.log('Received Stripe PaymentMethod:', paymentMethod);
      });

    // You can also use handleCardPayment with the PaymentIntents API automatic confirmation flow.
    // See our handleCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-payment
    this.props.stripe.handleCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', data);

    // You can also use handleCardSetup with the SetupIntents API.
    // See our handleCardSetup documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-setup
    this.props.stripe.handleCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', data);

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    this.props.stripe.createToken({ type: 'card', name: 'Jenny Rosen' });
    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    this.props.stripe.createSource({
      type: 'card',
      owner: {
        name: 'Jenny Rosen'
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection />2 */}
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);

CheckoutForm.propTypes = {
  stripe: PropTypes.object,
  createPaymentMethod: PropTypes.func,
  handleCardPayment: PropTypes.func,
  handleCardSetup: PropTypes.func,
  createToken: PropTypes.func,
  createSource: PropTypes.func
};
