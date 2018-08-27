// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import Paypal from './Gateways/Paypal';
import { View } from 'react-native';

class PaymentSelector extends React.Component<{}, { elementFontSize: string }> {
  constructor(props) {
    super(props);
  }

  render() {
    const { accounts, paymentMethods, amount, currency, context } = this.props;
    const accountName = paymentMethods ? paymentMethods['paypal'] : null;
    return (
      <View>
        <Paypal
          amount={amount}
          currency={currency}
          account={accounts[accountName]}
          expanded={this.props.expandedOption === '3'}
          handleExpandedClicked={this.handleExpandedClicked}
        />
      </View>
    );
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
