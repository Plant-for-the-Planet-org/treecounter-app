/* eslint-disable no-underscore-dangle */
// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import Paypal from './Gateways/Paypal';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import {
  foldin,
  foldout,
  payment_paypal,
  payment_sepa,
  payment_bank,
  payment_credit,
  check_green
} from '../../assets';
import Accordion from 'react-native-collapsible/Accordion';
import styles from '../../styles/payment.styles.native';
import StripeCC from './Gateways/StripeCC';
// currently tipsi-stripe is removed from package.json as (1) it is unused and (2) the native support modules did not compile with Android
import stripe from 'tipsi-stripe';
import StripeSepa from './Gateways/StripeSepa';
import i18n from '../../locales/i18n';
import Offline from './Gateways/Offline';
import InlineLink from '../Common/InlineLink.native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { formatNumber, delimitNumbers } from '../../utils/utils';

class PaymentSelector extends React.Component<{}, { elementFontSize: string }> {
  constructor(props) {
    super(props);
    this.decorateSuccess = this.donateSuccess.bind(this);
  }
  _renderHeader(section, index, isActive) {
    let paymentGateway = section.key;
    if ('offline' === paymentGateway) {
      return (
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              style={[styles.logoStyle, { width: 40 }]}
              source={payment_bank}
            />
            <Text style={styles.headerText}>
              {i18n.t('label.bank_transfer')}
            </Text>
          </View>

          <Image
            resizeMode="contain"
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
              resizeMode="contain"
              style={[styles.logoStyle, { width: 40 }]}
              source={payment_sepa}
            />
            <Text style={styles.headerText}>{i18n.t('label.sepa_debit')}</Text>
          </View>

          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={isActive ? foldin : foldout}
          />
        </View>
      );
    }
    if ('stripe_cc' === paymentGateway) {
      return (
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              style={[styles.logoStyle, { width: 40 }]}
              source={payment_credit}
            />
            <Text style={styles.headerText}>{i18n.t('label.creditCard')}</Text>
          </View>

          <Image
            resizeMode="contain"
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
            <Image
              resizeMode="contain"
              style={styles.logoStyle}
              source={payment_paypal}
            />
          </View>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={isActive ? foldin : foldout}
          />
        </View>
      );
    }
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{paymentGateway}</Text>
        <Image
          resizeMode="contain"
          style={styles.imageStyle}
          source={isActive ? foldin : foldout}
        />
      </View>
    );
  }

  donateSuccess(gateway, accountName) {
    return response =>
      this.props.onSuccess({ gateway, accountName, ...response });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    const { currency, context, paymentStatus } = this.props;
    const donationId = this.props.donationId
      ? this.props.donationId
      : paymentStatus && paymentStatus.contribution
        ? paymentStatus.contribution[0].id
        : undefined;
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
            donationId={donationId}
            mode={this.props.accounts[accountName].mode}
            onSuccess={this.donateSuccess(paymentGateway, accountName)}
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
            setLoading={value => this.props.setProgressModelState(value)}
            onSuccess={this.donateSuccess(paymentGateway, accountName)}
            {...gatewayProps}
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
            onSuccess={this.donateSuccess(paymentGateway, accountName)}
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
      // eslint-disable-next-line no-prototype-builtins
      if (accounts.hasOwnProperty(paymentMethods[key])) {
        obj.key = key;
        obj.value = accounts[paymentMethods[key]];
        arr.push(obj);
      }
    }
    return (
      <CardLayout style={{ flex: 1, alignItems: 'center' }}>
        {this.props.paymentStatus && this.props.paymentStatus.status ? (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={[styles.logoStyle, { width: 40 }]}
              source={check_green}
            />
            <Text style={{ padding: 10 }}>
              {i18n.t('label.thankyou_planting', {
                count: delimitNumbers(context.treeCount)
              })}
            </Text>

            <InlineLink
              uri={'app_userHome'}
              caption={i18n.t('label.return_home')}
            />
          </View>
        ) : this.props.paymentStatus && this.props.paymentStatus.message ? (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={[styles.logoStyle, { width: 40 }]}
              source={check_green}
            />
            <Text style={{ padding: 10 }}>
              {i18n.t('label.error') + ' ' + this.props.paymentStatus.message}
            </Text>

            <PrimaryButton onClick={() => this.props.paymentClear()}>
              {i18n.t('label.try_again')}
            </PrimaryButton>
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>
              {i18n.t('label.amount')}: {formatNumber(amount, null, currency)}
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {i18n.t('label.trees')}: {delimitNumbers(context.treeCount)}
            </Text>

            <ScrollView>
              <Accordion
                sections={arr}
                renderHeader={this._renderHeader}
                renderContent={event => this._renderContent(event)}
                touchableComponent={TouchableOpacity}
              />
            </ScrollView>
          </View>
        )}
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
  donationId: PropTypes.number,
  currency: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  setProgressModelState: PropTypes.func,
  paymentStatus: PropTypes.any,
  paymentClear: PropTypes.func
};

export default withNavigation(PaymentSelector);
