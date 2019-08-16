// CheckoutForm.js
import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import PropTypes from 'prop-types';
import Axios from 'axios';
import './stripe.scss';
import LoadingIndicators from '../../components/Common/LoadingIndicator';
import { repeat } from 'rxjs/operator/repeat';

class CheckoutForm extends React.Component {
  state = {
    loading: false,
    requestPaymentIntentUrl:
      'https://devel.trilliontreecampaign.org/app_dev.php/public/v1.3/stripe/paymentIntent/request',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjU3NzM1MDIsImV4cCI6MTU2NTc3NzEwMiwicm9sZXMiOlsiUk9MRV9UUkVFRE9OT1IiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0UHJvZEBvbmV6ZXJvZWlnaHQuY28ifQ.qQARDy6FJoW1b9qmhsjJjMmYzUwcfa48-vpfRQxCc2dyTj8yKCdHuJlMlVanwLkMRxfi2i9orS4Jk10oyVpn01kfwnlNtNmKt815x5u9LWYUOMrYW7Vm_zB6J0HGpQYSm3ikbA_5N4D9in8gXZYIYoCFjeZnSRhgmbnBOtDrkcOHKUb52pshsxIJfzSUz3j0d8mhcaQb31gQahIKn7rPJUWyfJm6rVqdQCA2g5zYRUJLZgtNcukIBle-HkgW7jhlFDrHw_b-K8rFcr_Oy6yTXfV6Fh9ZhVMq4NpqYpeufEbab3cu9abo7vXrFPJ-iTXbzDXQgTnmCGKGs2IL6GNINcOMXZgXk1WMXra4_PcSnXvHjku9iM4jplqo1W_u_DGmWWMVs1lhJL16nzhJH5yC9eBF67mkYYtwTglyYLiTpV7V9yuf86bGBgqEj3pZuD49hr2lc0Qq2n7domCGLU6-d8_hJtjN8fuFUgMJnFr9QPuAsTbM0ip7Ehw4qLeic1Be01LG8d9nHqW1wk5czMabtPOwM78dl32wALP-siwgt4hV1niPu0zbC6EKCOm5RNnt2J7UxxF0cxezNRgwexUtkEAuVbD16Uor6iqcPhosrAnwZdebMMBkViPJrqEoOHwINgAHJ123oqfBCXLviFT5Z-Aq093grQG6-iAWS6efXJI'
  };
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

      //test case
      let requestData = {
        customer: 'cus_FcYGDg4Fxm4SZQ',
        amount: 2000,
        currency: 'EUR',
        payment_method_id: 'src_1F7J9bGhHD5xN1Uq4vJlChre'
      };

      // const requestPaymentIntentUrl =
      // 'https://devel.trilliontreecampaign.org/app_dev.php/public/v1.3/stripe/paymentIntent/request';
      let config = {
        headers: {
          Authorization: 'Bearer ' + this.state.token
        }
      };

      const response = await Axios.post(
        this.state.requestPaymentIntentUrl,
        requestData,
        config
      );

      if (response.status === 200 && response.data.success) {
        console.log(response.data.payment_intent.client_secret);
        this.setState({ costumerData: response.data, loading: false });
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
