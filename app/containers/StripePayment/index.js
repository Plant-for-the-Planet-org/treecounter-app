import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import InjectedCheckoutForm from '../../components/StripePayment/CheckoutForm';

class StripePayment extends Component {
  handleExpandedClicked = () => {
    this.props.handleExpandedClicked('1');
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
          />
        </Elements>
      </StripeProvider>
    );
  }
}

export default StripePayment;

StripePayment.propTypes = {
  stripe: PropTypes.object,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFailure: PropTypes.func
};
