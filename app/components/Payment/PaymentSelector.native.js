// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import Paypal from './Gateways/Paypal';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { foldin, foldout, payment_paypal } from '../../assets';
import Accordion from 'react-native-collapsible/Accordion';
import styles from '../../styles/payment.styles.native';
import StripeCC from './Gateways/StripeCC';

class PaymentSelector extends React.Component<{}, { elementFontSize: string }> {
  constructor(props) {
    super(props);
  }
  _renderHeader(section, index, isActive) {
    let paymentGateway = section.key;
    if (paymentGateway === 'paypal') {
      return (
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoStyle} src={payment_paypal} />
          </View>

          <Image
            style={styles.imageStyle}
            source={isActive ? foldin : foldout}
          />
        </View>
      );
    }
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{paymentGateway}</Text>
        <Image style={styles.imageStyle} source={isActive ? foldin : foldout} />
      </View>
    );
  }

  _renderContent(section) {
    let paymentGateway = section.key;
    if ('paypal' === paymentGateway) {
      return (
        <View style={styles.content}>
          <Paypal
            amount={this.props.amount}
            currency={this.props.currency}
            account={section.value}
          />
        </View>
      );
    }
    if ('stripe_cc' === paymentGateway) {
      return (
        <View style={styles.content}>
          <StripeCC
            amount={this.props.amount}
            currency={this.props.currency}
            account={section.value}
          />
        </View>
      );
    }
    return (
      <View>
        <Text>Dummy</Text>
      </View>
    );
  }

  render() {
    const { accounts, paymentMethods, amount, currency, context } = this.props;
    //convert to arrya
    let arr = [];
    for (let key in paymentMethods) {
      let obj = {};
      if (accounts.hasOwnProperty(paymentMethods[key])) {
        obj.key = key;
        obj.value = accounts[paymentMethods[key]];
        arr.push(obj);
      }
    }
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>
          Amount: {amount} {currency}
        </Text>
        <Text style={{ fontWeight: 'bold' }}>Trees: {context.treeCount}</Text>

        <View>
          <Accordion
            sections={arr}
            renderHeader={this._renderHeader}
            renderContent={event => this._renderContent(event)}
            touchableComponent={TouchableOpacity}
          />
        </View>
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
