// CheckoutForm.js
import React from 'react';
import PropTypes from 'prop-types';
import { injectStripe } from 'react-stripe-elements';
import classnames from 'classnames';
//import { debug } from '../../debug';
import LoadingIndicators from '../../components/Common/LoadingIndicator';
import CCForm from './CCForm';
import SEPAForm from './SEPAForm';
import i18n from '../../locales/i18n';

class CheckoutForm extends React.Component {
  state = {
    loading: false,
    saveForLaterCC: false,
    saveForLaterSEPA: false,
    chosenCard: 'new-card',
    cards: [],
    isPayEnable: true
  };

  componentDidMount() {
    if (this.props.currentUserProfile) {
      this.fillCard();
    }
  }

  fillCard = () => {
    this.props.fillCard().then(response => {
      if (response.status === 200) {
        this.setState({ cards: response.data.paymentMethods });
      }
    });
  };

  handleSubmitSEPAPayment = async (/* ev */) => {
    //debug('SEPA PAYMENT SUBMITED');
  };

  onChangeSelectedCard = choose => {
    this.setState({ chosenCard: choose });
  };

  onClickSaveForLater = name => {
    this.setState({ [name]: !this.state[name] });
  };

  createPaymentMethod = async paymentDetails => {
    let paymentMethodResponse;
    try {
      //Create a payment method id for making request to the API
      paymentMethodResponse = await this.props.stripe.createPaymentMethod(
        'card',
        {
          billing_details: {
            name: paymentDetails.donorName
          }
        }
      );
      const paymentMethodId = paymentMethodResponse.paymentMethod.id;

      if (this.state.saveForLaterCC) {
        this.props.attachCardToCostumer(paymentMethodId);
      }

      return paymentMethodId;
    } catch (e) {
      this.props.setProgressModelState(false);
      this.props.paymentFailed({
        status: false,
        message: (paymentMethodResponse && paymentMethodResponse.error ? paymentMethodResponse.error.message : i18n.t('label.error'))
      });
      this.props.onError(e.message);
    }
  };

  handleSubmitCCPayment = async ev => {
    this.props.setProgressModelState(true);
    this.setState({ isPayEnable: false });
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
    if (paymentMethodId) {
      this.handlePayment(paymentMethodId);
    }
  };

  handlePayment = paymentMethodId => {
    if (paymentMethodId !== undefined || paymentMethodId != 0) {
      const donationId = this.props.donationId
        ? this.props.donationId
        : this.props.paymentStatus && this.props.paymentStatus.contribution
          ? this.props.paymentStatus.contribution[0].id
          : undefined;
      if (donationId) {
        //this.props.setProgressModelState(true);
        let requestData = {
          account: this.props.accountName,
          gateway: this.props.gateway,
          source: {
            id: paymentMethodId,
            object: 'payment_method'
          }
        };
        this.props
          .handlePay(donationId, requestData, this.props.currentUserProfile)
          .then(response => {
            this.props.setProgressModelState(false);
            if (response.data.status == 'failed') {
              this.props.paymentFailed({
                status: false,
                message: response.data.message || 'error'
              });
            } else {
              if (response.data.status == 'action_required') {
                this.handle3DSecure(
                  response.data.response.payment_intent_client_secret,
                  window.Stripe(this.props.stripePublishableKey, {
                    stripeAccount: response.data.response.account
                  }),
                  donationId
                );
              } else {
                this.props.finalizeDonation(
                  donationId,
                  this.props.currentUserProfile
                );
              }
            }
          });
      } else {
        this.props.setProgressModelState(false);
        this.props.paymentFailed({
          status: false,
          message: i18n.t('label.donation_id_missing_error')
        });
      }
    }
  };

  handle3DSecure = async (paymentIntentClientSecret, stripe, donationId) => {
    const confirmPaymentIntentResponse = await stripe.handleCardAction(
      paymentIntentClientSecret
    );
    if (confirmPaymentIntentResponse.error) {
      this.props.paymentFailed({
        status: false,
        message: confirmPaymentIntentResponse.error.message || 'Error'
      });
    } else {
      this.props.finalizeDonation(donationId, this.props.currentUserProfile);
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
            chosenCard={this.state.chosenCard}
            currentUserProfile={this.props.currentUserProfile}
            onChangeSelectedCard={this.onChangeSelectedCard}
            isPayEnable={state.isPayEnable}
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
  currentUserProfile: PropTypes.object,
  stripe: PropTypes.object,
  createPaymentMethod: PropTypes.func,
  createSource: PropTypes.func,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  fontSize: PropTypes.object,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  tpoName: PropTypes.string,
  receipt: PropTypes.object,
  fillCard: PropTypes.func,
  attachCardToCostumer: PropTypes.func,
  accountName: PropTypes.string,
  gateway: PropTypes.string,
  paymentStatus: PropTypes.object,
  handlePay: PropTypes.func,
  donationId: PropTypes.number,
  paymentFailed: PropTypes.func,
  stripePublishableKey: PropTypes.string,
  setProgressModelState: PropTypes.func,
  reinitiateStripe: PropTypes.func,
  finalizeDonation: PropTypes.func
};
