// CheckoutForm.js
import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import PropTypes from 'prop-types';
// import Axios from 'axios';
import './stripe.scss';
import LoadingIndicators from '../../components/Common/LoadingIndicator';

class CheckoutForm extends React.Component {
  state = { loading: false };
  handleSubmit = async ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    this.setState({ loading: true });
    // stripe.handleCardPayment(
    //   '{PAYMENT_INTENT_CLIENT_SECRET}',
    //   element,
    //   {
    //     payment_method_data: {
    //       billing_details: {
    //         name: 'Jenny Rosen'
    //       }
    //     }
    //   }
    // ).then(function(result) {
    //   // Handle result.error or result.paymentIntent
    // });

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    try {
      // const response = await this.props.stripe.createPaymentMethod('card', {
      //   billing_details: {
      //     name: 'Jenny Rosen',
      //   },
      // })

      //just in test case, createSource will be depricated
      const response = await this.props.stripe.createSource({
        type: 'ideal',
        amount: 1099,
        currency: 'eur',
        owner: {
          name: 'Jenny Rosen'
        },
        redirect: {
          return_url: 'https://localhost:8080/stripe'
        }
      });

      console.log(response);
      if (response.source.id !== undefined) {
        this.setState({ loading: false });
      }

      // const {
      //   data: { clientSecret, intentId }
      // } = await Axios.post(
      //   'https://devel.trilliontreecampaign.org/app_dev.php/stripe/paymentIntentTest',
      //   { amount: 1500, cardType: 'card' }
      // ); // We pay 15€ with a credit card
      // console.log(data);
      // const {
      //   paymentIntent,
      //   error
      // } = await this.props.stripe.handleCardPayment(
      //   clientSecret,
      //   this.state.cardElement
      // );

      // if (error) {
      //   // Handle payment error
      // } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      //   // Handle payment success
      // }

      // handleReady = element => {
      //   debugger;
      //   this.setState({ cardElement: element, loading: false });
      // };
    } catch (e) {
      throw e;
    }
  };

  render() {
    return !this.state.loading ? (
      <form className="form-wrapper" onSubmit={this.handleSubmit}>
        <CardSection />
        <button>Confirm order</button>
      </form>
    ) : (
      <LoadingIndicators />
    );
  }
}

export default injectStripe(CheckoutForm);

CheckoutForm.propTypes = {
  stripe: PropTypes.object,
  createToken: PropTypes.func,
  createPaymentMethod: PropTypes.func,
  createSource: PropTypes.func
};
