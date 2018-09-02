// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import Paypal from './Gateways/Paypal';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
  foldin,
  foldout,
  payment_paypal,
  payment_sepa,
  payment_bank
} from '../../assets';
import Accordion from 'react-native-collapsible/Accordion';
import styles from '../../styles/payment.styles.native';
import StripeCC from './Gateways/StripeCC';
import stripe from 'tipsi-stripe';
import StripeSepa from './Gateways/StripeSepa';
import i18n from '../../locales/i18n';
import Offline from './Gateways/Offline';

class PaymentSelector extends React.Component<{}, { elementFontSize: string }> {
  constructor(props) {
    super(props);
    this.decorateSuccess = this.decorateSuccess.bind(this);
  }
  _renderHeader(section, index, isActive) {
    let paymentGateway = section.key;
    if ('offline' === paymentGateway) {
      return (
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              style={[styles.logoStyle, { width: 40 }]}
              source={payment_bank}
            />
            <Text style={styles.headerText}>
              {i18n.t('label.bank_transfer')}
            </Text>
          </View>

          <Image
            style={styles.imageStyle}
            source={isActive ? foldin : foldout}
          />
        </View>
      );
    }
    if ('stripe_sepa' === paymentGateway) {
      return (
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              style={[styles.logoStyle, { width: 40 }]}
              source={payment_sepa}
            />
            <Text style={styles.headerText}>{i18n.t('label.sepa_debit')}</Text>
          </View>

          <Image
            style={styles.imageStyle}
            source={isActive ? foldin : foldout}
          />
        </View>
      );
    }
    if (paymentGateway === 'paypal') {
      return (
        <View style={styles.header}>
          <View style={[styles.logoStyle, { width: 80 }]}>
            <Image style={styles.logoStyle} source={payment_paypal} />
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

  decorateSuccess(gateway, accountName) {
    return response =>
      this.props.onSuccess({ gateway, accountName, ...response });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paymentMethods) {
      // lookup stripe related payment methods for the current country/currency combination
      const stripeGateways = Object.keys(nextProps.paymentMethods).filter(
        gateway => ['stripe_cc', 'stripe_sepa'].includes(gateway)
      );

      // do not load Stripe if not required
      if (stripeGateways.length > 0) {
        // componentDidMount only runs in a browser environment.
        // In addition to loading asynchronously, this code is safe to server-side render.

        stripe.setOptions({
          publishableKey: nextProps.stripePublishableKey
        });
      }
    }
  }

  _renderContent(section) {
    const { accounts, paymentMethods, amount, currency, context } = this.props;
    const gatewayProps = {
      context: context,
      currency: currency,
      onFailure: this.props.onFailure,
      onError: this.props.onError
    };
    let paymentGateway = section.key;
    const accountName = this.props.paymentMethods[paymentGateway];
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
            onSuccess={this.decorateSuccess(paymentGateway, accountName)}
          />
        </View>
      );
    }
    if ('stripe_sepa' === paymentGateway) {
      return (
        <View style={styles.content}>
          <StripeSepa
            amount={this.props.amount}
            currency={this.props.currency}
            account={section.value}
            onSuccess={this.decorateSuccess(paymentGateway, accountName)}
            {...gatewayProps}
          />
        </View>
      );
    }
    if ('offline' === paymentGateway) {
      return (
        <View style={styles.content}>
          <Offline
            key={paymentGateway}
            amount={this.props.amount}
            currency={this.props.currency}
            account={section.value}
            onSuccess={this.decorateSuccess(paymentGateway, accountName)}
            {...gatewayProps}
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
      <CardLayout style={{ flex: 1, alignItems: 'center' }}>
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
      </CardLayout>
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
