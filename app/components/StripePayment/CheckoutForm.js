// CheckoutForm.js
import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import PropTypes from 'prop-types';
import Axios from 'axios';
import './stripe.scss';
import LoadingIndicators from '../../components/Common/LoadingIndicator';

class CheckoutForm extends React.Component {
  state = {
    amount: '',
    tree_count: '',
    loading: false,
    baseURL: 'https://devel.trilliontreecampaign.org',
    paymentIntentConfirm:
      '/app_dev.php/public/v1.3/stripe/paymentIntent/confirm',
    requestPaymentIntentUrl:
      '/app_dev.php/public/v1.3/stripe/paymentIntent/request',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjU3NzM1MDIsImV4cCI6MTU2NTc3NzEwMiwicm9sZXMiOlsiUk9MRV9UUkVFRE9OT1IiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0UHJvZEBvbmV6ZXJvZWlnaHQuY28ifQ.qQARDy6FJoW1b9qmhsjJjMmYzUwcfa48-vpfRQxCc2dyTj8yKCdHuJlMlVanwLkMRxfi2i9orS4Jk10oyVpn01kfwnlNtNmKt815x5u9LWYUOMrYW7Vm_zB6J0HGpQYSm3ikbA_5N4D9in8gXZYIYoCFjeZnSRhgmbnBOtDrkcOHKUb52pshsxIJfzSUz3j0d8mhcaQb31gQahIKn7rPJUWyfJm6rVqdQCA2g5zYRUJLZgtNcukIBle-HkgW7jhlFDrHw_b-K8rFcr_Oy6yTXfV6Fh9ZhVMq4NpqYpeufEbab3cu9abo7vXrFPJ-iTXbzDXQgTnmCGKGs2IL6GNINcOMXZgXk1WMXra4_PcSnXvHjku9iM4jplqo1W_u_DGmWWMVs1lhJL16nzhJH5yC9eBF67mkYYtwTglyYLiTpV7V9yuf86bGBgqEj3pZuD49hr2lc0Qq2n7domCGLU6-d8_hJtjN8fuFUgMJnFr9QPuAsTbM0ip7Ehw4qLeic1Be01LG8d9nHqW1wk5czMabtPOwM78dl32wALP-siwgt4hV1niPu0zbC6EKCOm5RNnt2J7UxxF0cxezNRgwexUtkEAuVbD16Uor6iqcPhosrAnwZdebMMBkViPJrqEoOHwINgAHJ123oqfBCXLviFT5Z-Aq093grQG6-iAWS6efXJI'
  };

  handleSubmit = async ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    try {
      //Create a payment method id for making request to the API
      const paymentMethodResponse = await this.props.stripe.createPaymentMethod(
        'card',
        {
          billing_details: {
            name: 'Jenny Rosen'
          }
        }
      );

      // this.setState({ loading: true })
      const paymentMethodId = paymentMethodResponse.paymentMethod.id;
      console.log('---------Payment Method Response--------');
      console.log(paymentMethodResponse);
      //payment method exists
      this.handleAPIPayment(paymentMethodId);
    } catch (e) {
      throw e;
    }
  };

  handleAPIPayment = async paymentMethodId => {
    const state = this.state;
    let config = {
      headers: {
        Authorization: 'Bearer ' + state.token
      }
    };

    if (paymentMethodId !== undefined) {
      let requestData = {
        amount: parseInt(this.state.amount * 100),
        currency: this.state.currency,
        payment_method_id: paymentMethodId
      };

      const requestResponse = await Axios.post(
        state.baseURL + '' + state.requestPaymentIntentUrl,
        requestData,
        config
      );

      console.log(requestResponse);
      console.log(requestResponse.data.payment_intent_client_secret);
      if (requestResponse.data.requires_action) {
        const confirmPaymentIntentResponse = await this.props.stripe.handleCardAction(
          requestResponse.data.payment_intent_client_secret
        );
        // console.log(confirmPaymentIntentResponse);
        // this.props.stripe.handleCardPayment(requestResponse.data.payment_intent.client_secret,
        //   {
        //     payment_method_data: {
        //       billing_details: {
        //         name: 'Jenny Rosen'
        //       }
        //     }
        //   });
      }

      // this.setState({ loading: false });
    }
  };

  onInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
    // this.setState({ [name]: value }, (callback) => {
    //   console.log(name + ':' + this.state[name]);
    // });
  };

  render() {
    return !this.state.loading ? (
      <form className="form-wrapper" onSubmit={this.handleSubmit}>
        <label>Amount</label>
        <input
          value={this.state.amount}
          name="amount"
          onChange={this.onInputChange}
          placeholder=""
        />
        <label>Tree Count</label>
        <input
          value={this.state.tree_count}
          name="tree_count"
          onChange={this.onInputChange}
          placeholder=""
        />
        <label>Currency</label>
        <select name="currency" onChange={this.onInputChange}>
          <option value="none">Unselected</option>
          <option value="EUR">Euro</option>
        </select>
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
