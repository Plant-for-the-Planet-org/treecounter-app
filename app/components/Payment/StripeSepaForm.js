import React from 'react';
import PropTypes from 'prop-types';
import { injectStripe, IbanElement } from 'react-stripe-elements';

class StripeSepaForm extends React.Component {
  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    const style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: '#32325d'
      }
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <IbanElement style={style} placeholderCountry={'DE'} />
        <button>Confirm order</button>
      </form>
    );
  }
}

StripeSepaForm.propTypes = {
  stripe: PropTypes.object,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  target: PropTypes.string
};

export default injectStripe(StripeSepaForm);
