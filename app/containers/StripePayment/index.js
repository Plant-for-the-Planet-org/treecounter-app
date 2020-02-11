import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debug } from '../../debug';
import InjectedCheckoutForm from '../../components/StripePayment/CheckoutForm';
import {
  fillCard,
  attachCardToCostumer,
  handlePay,
  finalizeDonation
} from '../../actions/donateAction';
import { setProgressModelState } from '../../reducers/modelDialogReducer';

class StripePayment extends Component {
  handleExpandedClicked = () => {
    this.props.handleExpandedClicked('1');
  };

  onError = err => {
    debug('error happend:');
    debug(err);
  };

  onSuccess = success => {
    debug('success happend:');
    debug(success);
  };

  render() {
    let props = this.props;
    const donationId = props.donationId
      ? props.donationId
      : props.paymentStatus && props.paymentStatus.contribution
        ? props.paymentStatus.contribution[0].id
        : null;
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
            reinitiateStripe={props.reinitiateStripe}
            stripePublishableKey={props.stripePublishableKey}
            attachCardToCostumer={props.attachCardToCostumer}
            paymentStatus={props.paymentStatus}
            paymentDetails={props.paymentDetails}
            paymentFailed={props.paymentFailed}
            donationId={donationId}
            onError={this.onError}
            onSuccess={this.onSuccess}
            accountName={props.accountName}
            gateway={props.gateway}
            setProgressModelState={props.setProgressModelState}
            finalizeDonation={props.finalizeDonation}
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
      handlePay,
      setProgressModelState,
      finalizeDonation
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
  donationId: PropTypes.number,
  handlePay: PropTypes.func,
  paymentFailed: PropTypes.func,
  setProgressModelState: PropTypes.func,
  stripePublishableKey: PropTypes.string,
  reinitiateStripe: PropTypes.func,
  finalizeDonation: PropTypes.func
};
