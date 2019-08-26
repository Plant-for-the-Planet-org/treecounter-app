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
    loading: false,
    saveForLaterCC: true,
    saveForLaterSEPA: false,
    cards: []
  };

  async componentDidMount() {
    let headerConfig = {
      headers: {
        Authorization: 'Bearer ' + Config.token
      }
    };

    try {
      const requestResponse = await Axios.get(
        Config.baseURL + Config.fetchCardUrl,
        headerConfig
      );
      if (requestResponse.status === 200) {
        this.fillCard(requestResponse.data.paymentMethods);
      }
    } catch (e) {
      throw e;
    }
  }

  fillCard = cards => {
    this.setState({ cards });
  };

  handleSubmitSEPAPayment = async ev => {
    console.log('SEPA PAYMENT SUBMITED');
  };

  attachCardToCostumer = async paymentMethod => {
    let headerConfig = {
      headers: {
        Authorization: 'Bearer ' + Config.token
      }
    };
    try {
      const requestResponse = await Axios.post(
        Config.baseURL + '' + Config.requestPaymentIntentUrl,
        { paymentMethod: paymentMethod },
        headerConfig
      );

      console.log(requestResponse);
    } catch (e) {
      throw e;
    }
  };

  onChangeSelectedCard = index => {
    console.log(index);
  };

  onClickSaveForLater = event => {
    console.log('On Click Save For Later Clicked!!!:  ' + event);
    console.log('name:' + event.target.name);
    console.log('value:' + event.target.value);
  };

  handleSubmitCCPayment = async ev => {
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

      if (this.state.saveForLaterCC) {
        this.attachCardToCostumer(paymentMethodId);
      }
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
        // saved_payment_method: true
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
    const state = this.state;

    let arrow = classnames({
      arrow: !props.expanded
    });
    let displayNone = classnames({
      'display-none': !props.expanded
    });
    const paymentType = props.paymentType;
    //just for testing
    const testCards = [
      {
        id: 'pm_1FAdm3GhHD5xN1Uqyk2tJWQ5',
        type: 'card',
        last4: '4242',
        brand: 'visa'
      },
      {
        id: 'pm_1FAdm3GhHD5xN1Uqyk2tJWQ5',
        type: 'card',
        last4: '4242',
        brand: 'visa'
      }
    ];

    return !this.state.loading ? (
      <div>
        {paymentType === 'stripe_cc' ? (
          <CCForm
            handleArrowClick={this.handleArrowClick}
            onSubmitCCForm={this.handleSubmitCCPayment}
            style={{ arrow, displayNone, fontSize: this.props.fontSize }}
            onClickSaveForLater={this.onClickSaveForLater}
            saveForLater={state.saveForLaterCC}
            cards={this.state.cards}
            onChangeSelectedCard={this.onChangeSelectedCard}
          />
        ) : (
          <SEPAForm
            handleArrowClick={this.handleArrowClick}
            onSubmitCCForm={this.handleSubmitSEPAPayment}
            style={{ arrow, displayNone, fontSize: this.props.fontSize }}
            tpoName={this.props.paymentDetails.tpoName}
            onClickSaveForLater={this.onClickSaveForLater}
            saveForLater={state.saveForLaterSEPA}
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
