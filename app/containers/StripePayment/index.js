import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import InjectedCheckoutForm from '../../components/StripePayment/CheckoutForm';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

class StripePayment extends Component {
  componentDidMount() {
    console.log('===Component Did Mount Stripe Container===');
    console.log(this.props);
  }
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
            receipt={props.receipt}
            tpoName={props.context.tpoName}
            account={props.account}
            expanded={props.expanded}
            handleExpandedClicked={this.handleExpandedClicked}
            paymentDetails={props.paymentDetails}
            onError={this.onError}
            onSuccess={this.onSuccess}
          />
        </Elements>
      </StripeProvider>
    );
  }
}

export default StripePayment;

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {

//       route: (routeName, id, navigation) => dispatch =>
//         updateRoute(routeName, navigation || dispatch, id)
//     },
//     dispatch
//   );
// };

// export default connect(mapDispatchToProps)(
//   StripePayment
// );

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
