import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import InjectedCheckoutForm from '../../components/StripePayment/CheckoutForm';

class StripePayment extends Component {
  render() {
    let props = this.props;
    return (
      <StripeProvider apiKey={props.apiKey}>
        <Elements>
          <InjectedCheckoutForm
            currency={props.currency}
            account={props.account}
            expanded={props.expanded}
          />
        </Elements>
      </StripeProvider>
    );
  }
}

export default StripePayment;

StripePayment.propTypes = {
  apiKey: PropTypes.string,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFailure: PropTypes.func
};
