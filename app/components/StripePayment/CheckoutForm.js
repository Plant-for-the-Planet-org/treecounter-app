// CheckoutForm.js
import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import PropTypes from 'prop-types';

class CheckoutForm extends React.Component {
  handleSubmit = async ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    // try {
    //   const token = await this.props.stripe.createToken({ type: 'card', name: 'Jenny Rosen' });
    //   console.log(token);
    // } catch (e) {
    //   throw e;
    // }

    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    try {
      const source = await this.props.stripe.createSource({
        type: 'card',
        owner: {
          name: 'Jenny Rosen'
        }
      });

      console.log(source);
    } catch (e) {
      throw e;
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);

CheckoutForm.propTypes = {
  stripe: PropTypes.object,
  createToken: PropTypes.func
};
