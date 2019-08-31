// CheckoutForm.js
import React from 'react';
import PropTypes from 'prop-types';
import { injectStripe } from 'react-stripe-elements';
import classnames from 'classnames';
import Axios from 'axios';
import LoadingIndicators from '../../components/Common/LoadingIndicator';
import { getAccessToken } from '../../utils/user';
import { context } from '../../config/index';

import CCForm from './CCForm';
import SEPAForm from './SEPAForm';
import ProjectNameIds from './projectNameIds';

class CheckoutForm extends React.Component {
  state = {
    loading: false,
    saveForLaterCC: false,
    saveForLaterSEPA: false,
    chosenCard: '',
    cards: [],
    plantProjectId: 0, // in case for testing
    configureAPI: {
      version: 'v1.3',
      baseURL: 'https://' + context.host,
      _locale: 'en'
    }
  };

  async componentDidMount() {
    try {
      const token = await getAccessToken();

      this.setToken(token);
      if (token !== null) {
        this.fillCard();
      }
    } catch (e) {
      throw e;
    }
  }

  setToken = token => {
    this.setState({ token });
  };

  fillCard = async _ => {
    const config = this.state.configureAPI;
    const requestResponse = await Axios.get(
      config.baseURL +
        `/api/${config.version}/${config._locale}/stripe/customer`,
      {
        headers: { Authorization: 'Bearer ' + this.state.token }
      }
    );

    if (requestResponse.status === 200) {
      this.setState({ cards: requestResponse.data.paymentMethods });
    }
  };

  handleSubmitSEPAPayment = async ev => {
    console.log('SEPA PAYMENT SUBMITED');
  };

  attachCardToCostumer = async paymentMethod => {
    try {
      const config = this.state.configureAPI;
      await Axios.post(
        config.baseURL +
          `/api/${config.version}/${
            config._locale
          }/stripe/customer/paymentMethod/attach`,
        { paymentMethod },
        {
          headers: { Authorization: 'Bearer ' + this.state.token }
        }
      );
    } catch (e) {
      this.props.onError(e.message);
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
      this.props.onError(e.message);
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
    const apiFirstParameter = this.state.token ? 'api' : 'public';
    const plantProjectName = this.props.plantProjectName;
    const config = this.state.configureAPI;
    const findIndexProjectNameIds = _.findIndex(ProjectNameIds, function(pn) {
      return pn.name == plantProjectName;
    });
    try {
      if (paymentMethodId !== undefined || paymentMethodId != 0) {
        const {
          address,
          city,
          country,
          email,
          firstname,
          lastname,
          modeReceipt,
          zipCode
        } = this.props.receipt;
        let recepientType =
          modeReceipt === 'individual' ? 'receiptIndividual' : 'receiptCompany';

        let requestData = {
          amount: paymentDetails.amount * 100,
          currency: paymentDetails.currency,
          treeCount: paymentDetails.treeCount,
          isRecurrent: true, //static
          recurrencyMnemonic: '', //static
          recipientType: modeReceipt,
          [recepientType]: {
            firstname,
            lastname,
            email,
            address,
            city,
            zipCode,
            country
          }
        };

        const requestResponse = await Axios.post(
          config.baseURL +
            `/${apiFirstParameter}/${config.version}/${
              config._locale
            }/donation/${ProjectNameIds[findIndexProjectNameIds].value}/create`,
          requestData,
          this.state.token
            ? {
                headers: { Authorization: 'Bearer ' + this.state.token }
              }
            : {}
        );

        const donationId = requestResponse.data.merge.contribution[0].id;

        const payResponse = await Axios.post(
          config.baseURL +
            `/${apiFirstParameter}/${config.version}/${
              config._locale
            }/donation/${donationId}/pay`,
          {},
          this.state.token
            ? {
                headers: { Authorization: 'Bearer ' + this.state.token }
              }
            : {}
        );

        // if (payResponse.status === 200) {
        //   this.props.onSuccess('success');
        //   this.setState({ loading: false });
        // } else if (requestResponse.data.requires_action) {
        //   this.handle3DSecure(
        //     requestResponse.data.payment_intent_client_secret
        //   );
        // } else {
        //   this.props.onSuccess('success');
        //   this.setState({ loading: false });
        // }
      }
    } catch (e) {
      this.props.onError(e.message);
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
  onError: PropTypes.func,
  tpoName: PropTypes.string,
  plantProjectName: PropTypes.string,
  receipt: PropTypes.object
};
