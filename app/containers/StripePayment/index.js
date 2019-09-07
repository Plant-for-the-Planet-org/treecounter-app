import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import InjectedCheckoutForm from '../../components/StripePayment/CheckoutForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fillCard,
  attachCardToCostumer,
  handlePay
} from '../../actions/donateAction';

class StripePayment extends Component {
  handleExpandedClicked = () => {
    this.props.handleExpandedClicked('1');
  };

  onError = err => {
    console.log('error happend:');
    console.log(err);
  };

  onSuccess = success => {
    console.log('success happend:');
    console.log(success);
  };

  render() {
    let props = this.props;
    return (
      <StripeProvider stripe={props.stripe}>
        <Elements>
          <InjectedCheckoutForm
            plantProjectName={props.plantProjectName}
            paymentType={props.paymentType}
            currency={props.currency}
            tpoName={props.context.tpoName}
            account={props.account}
            handlePay={props.handlePay}
            currentUserProfile={props.currentUserProfile}
            expanded={props.expanded}
            handleExpandedClicked={this.handleExpandedClicked}
            fillCard={props.fillCard}
            attachCardToCostumer={props.attachCardToCostumer}
            paymentStatus={props.paymentStatus}
            paymentDetails={props.paymentDetails}
            onError={this.onError}
            onSuccess={this.onSuccess}
            accountName={props.accountName}
            gateway={props.gateway}
          />
        </Elements>
      </StripeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fillCard,
      attachCardToCostumer,
      handlePay
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(StripePayment);

StripePayment.propTypes = {
  paymentDetails: PropTypes.object.isRequired,
  currentUserProfile: PropTypes.object,
  stripe: PropTypes.object,
  context: PropTypes.object,
  plantProjectName: PropTypes.string,
  paymentType: PropTypes.string,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFailure: PropTypes.func,
  fillCard: PropTypes.func,
  attachCardToCostumer: PropTypes.func,
  accountName: PropTypes.string,
  gateway: PropTypes.string,
  paymentStatus: PropTypes.object,
  handlePay: PropTypes.func
};
