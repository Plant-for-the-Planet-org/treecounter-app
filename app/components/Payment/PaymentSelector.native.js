// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import Paypal from './Gateways/Paypal';
import { View } from 'react-native';
import { foldin, foldout } from '../../assets';
import Accordion from 'react-native-collapsible/Accordion';

class PaymentSelector extends React.Component<{}, { elementFontSize: string }> {
  constructor(props) {
    super(props);
  }
  _renderHeader(section, index, isActive) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.gateway}</Text>
        <Image style={styles.imageStyle} source={isActive ? foldin : foldout} />
      </View>
    );
  }

  _renderContent(section) {
    const { accounts, paymentMethods, amount, currency, context } = this.props;
    const gatewayProps = {
      context: context,
      currency: currency,
      onFailure: this.props.onFailure,
      onError: this.props.onError
    };
    let paymentGateway = section.gateway;
    let content = 'simple';
    if ('paypal' === paymentGateway) {
      content = (
        <Paypal
          key={gateway}
          amount={this.props.amount}
          currency={this.props.currency}
          account={accounts[paymentGateway]}
          {...gatewayProps}
        />
      );
    }
    return;
    <View style={styles.content}>{content}</View>;
  }

  render() {
    const { accounts, paymentMethods, amount, currency, context } = this.props;
    const gatewayProps = {
      context: context,
      currency: currency,
      onFailure: this.props.onFailure,
      onError: this.props.onError
    };
    return (
      <View>
        <View>
          <Text>
            Amount: {amount} {currency}
          </Text>
        </View>
        <Accordion
          sections={this.props.paymentMethods}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          touchableComponent={TouchableOpacity}
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
