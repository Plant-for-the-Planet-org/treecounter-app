// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

// import StripeCC from './Gateways/StripeCC';
// import StripeSepa from './Gateways/StripeSepa';
// import Paypal from './Gateways/Paypal';
// import Offline from './Gateways/Offline';
import i18n from '../../locales/i18n';

// import { StripeProvider, Elements } from './Stripe/stripeDefs';

import StripeContainer from '../../containers/StripePayment';

class PaymentSelector extends React.Component<{}, { elementFontSize: string }> {
  constructor(props) {
    super(props);

    this.state = {
      stripe: null,
      errorMessage: null,
      paymentDetails: {}
    };

    this.decorateSuccess = this.decorateSuccess.bind(this);
  }

  decorateSuccess(gateway, accountName) {
    return response =>
      this.props.onSuccess({ gateway, accountName, ...response });
  }
  setPaymentDetails = paymentDetails => {
    console.log('SET PAYMENT METHOD DETAILS');
    console.log(paymentDetails);
    this.setState({ paymentDetails: paymentDetails });
  };

  componentDidMount() {
    const props = this.props;
    const context = props.context;

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
            // stripe: window.Stripe(nextProps.stripePublishableKey)
            stripe: window.Stripe('pk_test_0ahH0yMukgNzOEd0UppzUfsc')
          });
        };
        document.body && document.body.appendChild(stripeJs);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paymentMethods) {
      if (
        !this.props.paymentMethods ||
        JSON.stringify(this.props.paymentMethods) !==
          JSON.stringify(nextProps.paymentMethods)
      ) {
        // lookup stripe related payment methods for the current country/currency combination
        const stripeGateways = Object.keys(nextProps.paymentMethods).filter(
          gateway => ['stripe_cc', 'stripe_sepa'].includes(gateway)
        );

        // do not load Stripe if not required
        if (stripeGateways.length > 0) {
          // componentDidMount only runs in a browser environment.
          // In addition to loading asynchronously, this code is safe to server-side render.

          // You can inject script tag manually like this,
          // or you can use the 'async' attribute on the Stripe.js v3 <script> tag.
          const stripeJs = document.createElement('script');
          stripeJs.src = 'https://js.stripe.com/v3/';
          stripeJs.async = true;
          stripeJs.onload = () => {
            this.setState({
              // stripe: window.Stripe(nextProps.stripePublishableKey)
              stripe: window.Stripe('pk_test_0ahH0yMukgNzOEd0UppzUfsc')
            });
          };
          document.body && document.body.appendChild(stripeJs);
        }
      }
    }
  }

  handleExpandedClicked = optionNumber => {
    this.props.handleExpandedClicked(optionNumber);
  };

  onError = err => {
    this.props.onError(err);
    this.setState({
      errorMessage: err
    });
  };

  render() {
    const { accounts, paymentMethods, amount, currency, context } = this.props;
    const paymentDetails = {
      name: context.donorName,
      email: context.donorEmail,
      treeCount: context.treeCount,
      currency: this.props.currency,
      amount: this.props.amount * 100
    };
    const gatewayProps = {
      context: context,
      currency: currency,
      onFailure: this.props.onFailure,
      onError: this.props.onError
    };
    let giftToName = null;
    console.log('-----gatewayProps----');
    console.log(gatewayProps);
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
          <div>{`${i18n.t('label.amount')}: ${amount} ${currency}`}</div>
          <div>{`${i18n.t('label.trees')}: ${context.treeCount}`}</div>
        </div>
        {Object.keys(paymentMethods).map(gateway => {
          const accountName = paymentMethods[gateway];
          if ('stripe_cc' === gateway) {
            return (
              <div key={gateway}>
                {this.state.errorMessage ? (
                  <div>this.state.errorMessage</div>
                ) : null}
                <StripeContainer
                  stripe={this.state.stripe}
                  // onSuccess={this.decorateSuccess(gateway, accountName)}
                  paymentDetails={paymentDetails}
                  account={accounts[accountName]}
                  expanded={this.props.expandedOption === '1'}
                  handleExpandedClicked={this.handleExpandedClicked}
                  onError={this.onError}
                  {...gatewayProps}
                />
                {/* <Elements key={gateway}>
                  <StripeCC
                    onSuccess={this.decorateSuccess(gateway, accountName)}
                    account={accounts[accountName]}
                    expanded={this.props.expandedOption === '1'}
                    handleExpandedClicked={this.handleExpandedClicked}
                    {...gatewayProps}
                  />
                </Elements> */}
              </div>
            );
          }
          // if ('stripe_sepa' === gateway) {
          //   return (
          //     <div key={gateway}>
          //       {this.state.errorMessage ? (
          //         <div>this.state.errorMessage</div>
          //       ) : null}
          //       <Elements key={gateway}>
          //         <StripeSepa
          //           onSuccess={this.decorateSuccess(gateway, accountName)}
          //           account={accounts[accountName]}
          //           expanded={this.props.expandedOption === '2'}
          //           handleExpandedClicked={this.handleExpandedClicked}
          //           {...gatewayProps}
          //         />
          //       </Elements>
          //     </div>
          //   );
          // }
          // if ('paypal' === gateway) {
          //   return (
          //     <div key={gateway}>
          //       {this.state.errorMessage ? (
          //         <div>this.state.errorMessage</div>
          //       ) : null}
          //       <StripeProvider stripe={this.state.stripe}>
          //         <Paypal
          //           key={gateway}
          //           onSuccess={this.decorateSuccess(gateway, accountName)}
          //           amount={amount}
          //           currency={currency}
          //           account={accounts[accountName]}
          //           mode={accounts[accountName].mode}
          //           expanded={this.props.expandedOption === '3'}
          //           handleExpandedClicked={this.handleExpandedClicked}
          //           {...gatewayProps}
          //         />
          //       </StripeProvider>
          //     </div>
          //   );
          // }
        })}
      </div>
    ) : null;
  }
}

PaymentSelector.propTypes = {
  accounts: PropTypes.object,
  paymentMethods: PropTypes.object,
  stripePublishableKey: PropTypes.string,
  expandedOption: PropTypes.string,
  handleExpandedClicked: PropTypes.func,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default PaymentSelector;
