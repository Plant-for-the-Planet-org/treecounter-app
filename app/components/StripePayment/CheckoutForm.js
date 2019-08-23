// CheckoutForm.js
import React from 'react';
import { injectStripe, CardElement, IbanElement } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { payment_credit, payment_arrow, payment_sepa } from '../../assets';
import Axios from 'axios';
import LoadingIndicators from '../../components/Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        borderWidth: '1px',
        borderStyle: 'solid',
        height: '100px',
        borderColor: '#FFCC00',
        color: '#FFCC00',
        letterSpacing: '0.025em',
        fontFamily: 'Verdana',
        '::placeholder': {
          color: '#aab7c4'
        },
        ...(padding ? { padding } : {})
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

class CheckoutForm extends React.Component {
  state = {
    submitClicked: false,
    loading: false,
    baseURL: 'https://devel.trilliontreecampaign.org',
    paymentIntentConfirm:
      '/app_dev.php/public/v1.3/stripe/paymentIntent/confirm',
    requestPaymentIntentUrl:
      '/app_dev.php/public/v1.3/stripe/paymentIntent/request',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjU3NzM1MDIsImV4cCI6MTU2NTc3NzEwMiwicm9sZXMiOlsiUk9MRV9UUkVFRE9OT1IiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0UHJvZEBvbmV6ZXJvZWlnaHQuY28ifQ.qQARDy6FJoW1b9qmhsjJjMmYzUwcfa48-vpfRQxCc2dyTj8yKCdHuJlMlVanwLkMRxfi2i9orS4Jk10oyVpn01kfwnlNtNmKt815x5u9LWYUOMrYW7Vm_zB6J0HGpQYSm3ikbA_5N4D9in8gXZYIYoCFjeZnSRhgmbnBOtDrkcOHKUb52pshsxIJfzSUz3j0d8mhcaQb31gQahIKn7rPJUWyfJm6rVqdQCA2g5zYRUJLZgtNcukIBle-HkgW7jhlFDrHw_b-K8rFcr_Oy6yTXfV6Fh9ZhVMq4NpqYpeufEbab3cu9abo7vXrFPJ-iTXbzDXQgTnmCGKGs2IL6GNINcOMXZgXk1WMXra4_PcSnXvHjku9iM4jplqo1W_u_DGmWWMVs1lhJL16nzhJH5yC9eBF67mkYYtwTglyYLiTpV7V9yuf86bGBgqEj3pZuD49hr2lc0Qq2n7domCGLU6-d8_hJtjN8fuFUgMJnFr9QPuAsTbM0ip7Ehw4qLeic1Be01LG8d9nHqW1wk5czMabtPOwM78dl32wALP-siwgt4hV1niPu0zbC6EKCOm5RNnt2J7UxxF0cxezNRgwexUtkEAuVbD16Uor6iqcPhosrAnwZdebMMBkViPJrqEoOHwINgAHJ123oqfBCXLviFT5Z-Aq093grQG6-iAWS6efXJI'
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
    const state = this.state;
    const paymentDetails = this.props.paymentDetails;

    let config = {
      headers: {
        Authorization: 'Bearer ' + state.token
      }
    };

    if (paymentMethodId !== undefined) {
      let requestData = {
        amount: paymentDetails.amount * 100,
        currency: paymentDetails.currency,
        payment_method_id: paymentMethodId
      };

      const requestResponse = await Axios.post(
        state.baseURL + '' + state.requestPaymentIntentUrl,
        requestData,
        config
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

  handleArrowClick = () => {
    this.props.handleExpandedClicked('1');
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
      <form
        className="payment-option"
        onSubmit={
          paymentType === 'stripe_cc'
            ? this.handleSubmitCCPayment
            : this.handleSubmitSEPAPayment
        }
      >
        <div onClick={this.handleArrowClick} className="payment-option-header">
          <span>
            <img
              className="logo"
              src={paymentType === 'stripe_cc' ? payment_credit : payment_sepa}
            />
            {paymentType === 'stripe_cc'
              ? i18n.t('label.creditCard')
              : i18n.t('label.sepa_debit')}
          </span>
          <img className={arrow} src={payment_arrow} />
        </div>
        <div className={displayNone}>
          {paymentType === 'stripe_cc' ? (
            <CardElement
              hidePostalCode={true}
              {...createOptions(this.props.fontSize)}
            />
          ) : (
            <IbanElement
              supportedCountries={['SEPA']}
              onChange={this.handleChange}
              {...createOptions()}
            />
          )}
          {paymentType === 'stripe_sepa' && (
            <div className="mandate-acceptance">
              {i18n.t('label.stripe_sepa_des1')}{' '}
              {this.props.paymentDetails.tpoName}{' '}
              {i18n.t('label.stripe_sepa_des2')}
            </div>
          )}
          <PrimaryButton>{i18n.t('label.pay')}</PrimaryButton>
        </div>
      </form>
    ) : (
      <LoadingIndicators />
    );
  }
}

export default injectStripe(CheckoutForm);

CheckoutForm.propTypes = {
  context: PropTypes.object,
  tpoName: PropTypes.string,
  paymentType: PropTypes.func,
  paymentDetails: PropTypes.object,
  stripe: PropTypes.object,
  createPaymentMethod: PropTypes.func,
  createSource: PropTypes.func,
  fontSize: PropTypes.string,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};
