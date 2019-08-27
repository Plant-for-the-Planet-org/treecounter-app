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
    saveForLaterCC: false,
    saveForLaterSEPA: false,
    chosenCard: '',
    cards: []
  };

  async componentDidMount() {
    try {
      const requestResponse = await Axios.get(
        Config.baseURL + Config.fetchCardUrl,
        Config.headerConfig
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
    try {
      await Axios.post(
        Config.baseURL + Config.attachPaymentUrl,
        { paymentMethod },
        Config.headerConfig
      );
    } catch (e) {
      throw e;
    }
  };

  onChangeSelectedCard = choose => {
    this.setState({ chosenCard: choose });
  };

  onClickSaveForLater = name => {
    this.setState({ [name]: !this.state[name] });
  };

  createPaymentMethod = async paymentDetails => {
    try {
      //Create a payment method id for making request to the API
      const paymentMethodResponse = await this.props.stripe.createPaymentMethod(
        'card',
        {
          billing_details: {
            name: paymentDetails.donorName
          }
        }
      );

      this.setState({ loading: true });
      const paymentMethodId = paymentMethodResponse.paymentMethod.id;

      if (this.state.saveForLaterCC) {
        this.attachCardToCostumer(paymentMethodId);
      }

      return paymentMethodId;
    } catch (e) {
      this.props.onError(e);
    }
  };

  handleSubmitCCPayment = async ev => {
    ev.preventDefault();

    const paymentDetails = this.props.paymentDetails;
    let paymentMethodId = 0;

    if (
      this.state.chosenCard.length === 0 ||
      this.state.chosenCard === 'new-card'
    ) {
      paymentMethodId = await this.createPaymentMethod(paymentDetails);
    } else {
      paymentMethodId = this.state.cards[this.state.chosenCard].id;
    }

    this.handlePayment(paymentMethodId, paymentDetails);
  };

  handlePayment = async (paymentMethodId, paymentDetails) => {
    try {
      if (paymentMethodId !== undefined || paymentMethodId != 0) {
        let requestData = {
          amount: paymentDetails.amount * 100,
          currency: paymentDetails.currency,
          payment_method_id: paymentMethodId
        };

        const requestResponse = await Axios.post(
          Config.baseURL + '' + Config.requestPaymentIntentUrl,
          requestData,
          Config.headerConfig
        );

        if (requestResponse.data.success) {
          this.props.onSuccess('success');
          this.setState({ loading: false });
        } else if (requestResponse.data.requires_action) {
          this.handle3DSecure(
            requestResponse.data.payment_intent_client_secret
          );
        } else {
          this.props.onSuccess('success');
          this.setState({ loading: false });
        }
      }
    } catch (e) {
      this.props.onError(e);
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
  paymentType: PropTypes.string,
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
