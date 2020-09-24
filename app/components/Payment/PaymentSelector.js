// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../locales/i18n';
import StripeContainer from '../../containers/StripePayment';

import Paypal from './Gateways/Paypal';
// import Offline from './Gateways/Offline';
import { handlePay, finalizeDonation } from '../../actions/donateAction';
import { setProgressModelState } from '../../reducers/modelDialogReducer';
import { paymentFailed } from '../../reducers/paymentStatus';
import NumberFormat from '../Common/NumberFormat';

class PaymentSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stripe: null,
      errorMessage: null,
      paymentDetails: {}
    };
  }

  async componentDidMount() {
    const props = this.props;

    if (props.paymentMethods) {
      // lookup stripe related payment methods for the current country/currency combination
      const stripeGateways = Object.keys(props.paymentMethods).filter(gateway =>
        ['stripe_cc', 'stripe_sepa'].includes(gateway)
      );

      // do not load Stripe if not required
      if (stripeGateways.length > 0) {
        // componentDidMount only runs in a browser environment.
        // In addition to loading asynchronously, this code is safe to server-side render.

        // You can inject  script tag manually like this,
        // or you can use the 'async' attribute on the Stripe.js v3 <script> tag.
        const stripeJs = document.createElement('script');
        stripeJs.src = 'https://js.stripe.com/v3/';
        stripeJs.async = true;
        stripeJs.onload = () => {
          this.setState({
            stripe: window.Stripe(props.stripePublishableKey)
          });
        };
        document.body && document.body.appendChild(stripeJs);
      }
    }
  }

  reinitiateStripe = account => {
    this.setState({
      stripe: window.Stripe(this.props.stripePublishableKey, account)
    });
  };

  decorateSuccess(gateway, accountName, data) {
    if (data.error) {
      this.props.paymentFailed({
        status: false,
        message: data.error.message || 'error'
      });
    } else {
      const donationId = this.props.donationId
        ? this.props.donationId
        : this.props.paymentStatus && this.props.paymentStatus.contribution
          ? this.props.paymentStatus.contribution[0].id
          : undefined;
      if (donationId) {
        setProgressModelState(true);
        this.props
          .handlePay(
            donationId,
            {
              gateway,
              account: accountName,
              source: { ...data }
            },
            this.props.currentUserProfile
          )
          .then(response => {
            if (response.data.status == 'failed') {
              this.props.paymentFailed({
                status: false,
                message: response.data.message || 'error'
              });
            } else {
              this.props.finalizeDonation(
                donationId,
                this.props.currentUserProfile
              );
            }
            setProgressModelState(false);
          });
      } else {
        setProgressModelState(false);
        this.props.paymentFailed({
          status: false,
          message: i18n.t('label.donation_id_missing_error')
        });
      }
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.paymentMethods) {
  //     if (
  //       !this.props.paymentMethods ||
  //       JSON.stringify(this.props.paymentMethods) !==
  //         JSON.stringify(nextProps.paymentMethods)
  //     ) {
  //       // lookup stripe related payment methods for the current country/currency combination
  //       const stripeGateways = Object.keys(nextProps.paymentMethods).filter(
  //         gateway => ['stripe_cc', 'stripe_sepa'].includes(gateway)
  //       );

  //       // do not load Stripe if not required
  //       if (stripeGateways.length > 0) {
  //         // componentDidMount only runs in a browser environment.
  //         // In addition to loading asynchronously, this code is safe to server-side render.

  //         // You can inject script tag manually like this,
  //         // or you can use the 'async' attribute on the Stripe.js v3 <script> tag.
  //         const stripeJs = document.createElement('script');
  //         stripeJs.src = 'https://js.stripe.com/v3/';
  //         stripeJs.async = true;
  //         stripeJs.onload = () => {
  //           this.setState({
  //             stripe: window.Stripe(nextProps.stripePublishableKey)
  //           });
  //         };
  //         document.body && document.body.appendChild(stripeJs);
  //       }
  //     }
  //   }
  // }

  handleExpandedClicked = option => {
    this.props.handleExpandedClicked(option);
  };

  render() {
    const {
      accounts,
      paymentMethods,
      currency,
      context,
      paymentDetails
    } = this.props;

    // const paymentMethods = { stripe_cc: {}, stripe_sepa: {} };

    const gatewayProps = {
      context: context,
      paymentDetails: paymentDetails,
      currency: currency,
      onFailure: this.props.onFailure,
      onError: this.props.onError
    };
    let giftToName = null;

    if (gatewayProps.context.giftTreeCounterName) {
      giftToName = gatewayProps.context.giftTreeCounterName;
    }
    if (gatewayProps.context.supportTreecounter) {
      giftToName = gatewayProps.context.supportTreecounter.displayName;
    }
    return paymentMethods ? (
      <div className="payment_options__wrapper">
        <div className="payment_option_details">
          <div>{gatewayProps.context.tpoName}</div>
          {giftToName && <div>{gatewayProps.context.plantProjectName}</div>}
          {giftToName && (
            <div>
              {gatewayProps.context.supportTreecounter
                ? i18n.t('label.support_user_trees', {
                    user: giftToName,
                    count: gatewayProps.context.treeCount
                  })
                : i18n.t('label.gift_user_trees', {
                    user: giftToName,
                    count: gatewayProps.context.treeCount
                  })}
            </div>
          )}
          {!giftToName && (
            <div>
              {i18n.t('label.donate_to', {
                name: gatewayProps.context.plantProjectName
              })}
            </div>
          )}
          <div>
            {`${i18n.t('label.amount')}: `}
            <NumberFormat
              data={paymentDetails.amount}
              currency={currency}
              force="true"
            />
          </div>
          <div>{`${i18n.t('label.trees')}: ${context.treeCount}`}</div>
        </div>
        {Object.keys(paymentMethods).map(gateway => {
          const accountName = paymentMethods[gateway];
          if ('stripe_cc' === gateway) {
            const donationId = this.props.donationId
              ? this.props.donationId
              : this.props.paymentStatus &&
                this.props.paymentStatus.contribution
                ? this.props.paymentStatus.contribution[0].id
                : undefined;
            return (
              <div key={gateway}>
                {this.state.errorMessage ? (
                  <div>{this.state.errorMessage}</div>
                ) : null}
                <StripeContainer
                  paymentType="stripe_cc"
                  stripe={this.state.stripe}
                  receipt={this.props.receipt}
                  currentUserProfile={this.props.currentUserProfile}
                  plantProjectName={this.props.context.plantProjectName}
                  paymentDetails={this.props.paymentDetails}
                  account={accounts[accountName]}
                  accountName={accountName}
                  donationId={donationId}
                  reinitiateStripe={this.reinitiateStripe}
                  stripePublishableKey={this.props.stripePublishableKey}
                  paymentFailed={this.props.paymentFailed}
                  gateway={'stripe'}
                  paymentStatus={this.props.paymentStatus}
                  expanded={this.props.expandedOption === '1'}
                  handleExpandedClicked={() => this.handleExpandedClicked('1')}
                  {...gatewayProps}
                />
              </div>
            );
          }
          if ('stripe_sepa' === gateway) {
            return null;
            // return (
            //   <div key={gateway}>
            //     {/* {this.state.errorMessage ? (
            //       <div>{this.state.errorMessage}</div>
            //     ) : null} */}
            //     <StripeContainer
            //       paymentType="stripe_sepa"
            //       stripe={this.state.stripe}
            //       currentUserProfile={this.props.currentUserProfile}
            //       paymentDetails={{
            //         ...this.props.paymentDetails,
            //         topName: this.props.context.tpoName
            //       }}
            //       receipt={this.props.receipt}
            //       account={accounts[accountName]}
            //       expanded={this.props.expandedOption === '2'}
            //       handleExpandedClicked={() => this.handleExpandedClicked('2')}
            //       {...gatewayProps}
            //     />
            //   </div>
            // );
          }
          if ('paypal' === gateway) {
            const donationId = this.props.donationId
              ? this.props.donationId
              : this.props.paymentStatus &&
                this.props.paymentStatus.contribution
                ? this.props.paymentStatus.contribution[0].id
                : undefined;
            return (
              <div key={gateway}>
                {this.state.errorMessage ? (
                  <div>{this.state.errorMessage}</div>
                ) : null}
                <Paypal
                  key={gateway}
                  onSuccess={data =>
                    this.decorateSuccess(gateway, accountName, data)
                  }
                  amount={paymentDetails.amount}
                  currency={currency}
                  donationId={donationId}
                  account={accounts[accountName]}
                  mode={accounts[accountName].mode}
                  expanded={this.props.expandedOption === '3'}
                  handleExpandedClicked={() => this.handleExpandedClicked('3')}
                  {...gatewayProps}
                />
              </div>
            );
          }
          if ('offline' === gateway) {
            return null;
            // (
            //   <div key={gateway}>
            //     {this.state.errorMessage ? (
            //       <div>{this.state.errorMessage}</div>
            //     ) : null}
            //     <Offline
            //       key={gateway}
            //       onSuccess={this.decorateSuccess(gateway, accountName, {
            //         userMessage: 'Success',
            //         isConfirmed: true
            //       })}
            //       amount={paymentDetails.amount}
            //       currency={currency}
            //       account={accounts[accountName]}
            //       expanded={this.props.expandedOption === '4'}
            //       handleExpandedClicked={() => this.handleExpandedClicked('4')}
            //       {...gatewayProps}
            //     />
            //   </div>
            // );
          }
        })}
      </div>
    ) : null;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handlePay,
      setProgressModelState,
      paymentFailed,
      finalizeDonation
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(PaymentSelector);

PaymentSelector.propTypes = {
  paymentDetails: PropTypes.object,
  accounts: PropTypes.object,
  paymentMethods: PropTypes.object,
  paymentStatus: PropTypes.object,
  currentUserProfile: PropTypes.object,
  stripePublishableKey: PropTypes.string,
  expandedOption: PropTypes.string,
  handleExpandedClicked: PropTypes.func,
  donationId: PropTypes.number,
  currency: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  onFailure: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  receipt: PropTypes.object,
  paymentFailed: PropTypes.func,
  handlePay: PropTypes.func,
  finalizeDonation: PropTypes.func
};
