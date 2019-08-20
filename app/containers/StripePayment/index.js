import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import InjectedCheckoutForm from '../../components/StripePayment/CheckoutForm';

class StripePayment extends Component {
  handleExpandedClicked = () => {
    this.props.handleExpandedClicked('1');
  };

  onError = err => {
    this.props.onError(err);
  };

  render() {
    let props = this.props;
    return (
      <StripeProvider stripe={this.props.stripe}>
        <Elements>
          <InjectedCheckoutForm
            currency={props.currency}
            account={props.account}
            expanded={props.expanded}
            handleExpandedClicked={this.handleExpandedClicked}
            paymentDetails={props.paymentDetails}
            onError={props.onError}
          />
        </Elements>
      </StripeProvider>
    );
  }
}

export default StripePayment;

StripePayment.propTypes = {
  paymentDetails: PropTypes.object.isRequired,
  stripe: PropTypes.object,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFailure: PropTypes.func
};
