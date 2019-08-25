// CheckoutForm.js
import React from 'react';
import PropTypes from 'prop-types';
import { injectStripe } from 'react-stripe-elements';
import Config from './config';
import classnames from 'classnames';
import Axios from 'axios';
import LoadingIndicators from '../../components/Common/LoadingIndicator';

import CCForm from './CCForm';
import SEPAForm from './SEPAForm';

class CheckoutForm extends React.Component {
  state = {
    loading: false
  };

  handleSubmitSEPAPayment = async ev => {
    console.log('SEPA PAYMENT SUBMITED');
  };

  handleSubmitCCPayment = async ev => {
    //available attributes
    // currency, donorAddress, donorZipCode, donorCity, donorCountry, donorEmail, donorName, treeCount: this.state.selectedTreeCount,

    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    const paymentDetails = this.props.paymentDetails;
    try {
      //Create a payment method id for making request to the API
      const paymentMethodResponse = await this.props.stripe.createPaymentMethod(
        'card',
        {
          billing_details: {
            name: paymentDetails.donorName
            // amount: paymentDetails.amount * 100,
            // currency: paymentDetails.currency,
            // email: paymentDetails.donorEmail
          }
        }
      );

      this.setState({ loading: true });
      const paymentMethodId = paymentMethodResponse.paymentMethod.id;

      this.handlePayment(paymentMethodId);
    } catch (e) {
      this.props.onError(e);
    }
  };

  handlePayment = async paymentMethodId => {
    const paymentDetails = this.props.paymentDetails;

    let headerConfig = {
      headers: {
        Authorization: 'Bearer ' + Config.token
      }
    };

    if (paymentMethodId !== undefined) {
      let requestData = {
        amount: paymentDetails.amount * 100,
        currency: paymentDetails.currency,
        payment_method_id: paymentMethodId
      };

      const requestResponse = await Axios.post(
        Config.baseURL + '' + Config.requestPaymentIntentUrl,
        requestData,
        headerConfig
      );

      if (requestResponse.data.success) {
        this.props.onSuccess('success');
        this.setState({ loading: false });
      } else if (requestResponse.data.requires_action) {
        this.handle3DSecure(requestResponse.data.payment_intent_client_secret);
      } else {
        this.props.onSuccess('success');
        this.setState({ loading: false });
      }
    }
  };

  handle3DSecure = async paymentIntentClientSecret => {
    const confirmPaymentIntentResponse = await this.props.stripe.handleCardAction(
      paymentIntentClientSecret
    );

    if (confirmPaymentIntentResponse.error) {
      this.props.onError(confirmPaymentIntentResponse.error.message);
    } else {
      this.setState({ loading: false });
    }
  };

  handleArrowClick = number => {
    this.props.handleExpandedClicked(number);
  };

  render() {
    const props = this.props;
    let arrow = classnames({
      arrow: !props.expanded
    });
    let displayNone = classnames({
      'display-none': !props.expanded
    });
    const paymentType = props.paymentType;

    return !this.state.loading ? (
      <div>
        {paymentType === 'stripe_cc' ? (
          <CCForm
            handleArrowClick={this.handleArrowClick}
            onSubmitCCForm={this.handleSubmitCCPayment}
            style={{ arrow, displayNone, fontSize: this.props.fontSize }}
          />
        ) : (
          <SEPAForm
            handleArrowClick={this.handleArrowClick}
            onSubmitCCForm={this.handleSubmitSEPAPayment}
            style={{ arrow, displayNone, fontSize: this.props.fontSize }}
            tpoName={this.props.paymentDetails.tpoName}
          />
        )}
      </div>
    ) : (
      <div className="card-center">
        <LoadingIndicators />
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

CheckoutForm.propTypes = {
  paymentType: PropTypes.func,
  paymentDetails: PropTypes.object,
  stripe: PropTypes.object,
  createPaymentMethod: PropTypes.func,
  createSource: PropTypes.func,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  fontSize: PropTypes.object,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};
