import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import i18n from '../../../locales/i18n';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { IbanElement } from '../Stripe/stripeDefs';
import stripe from 'tipsi-stripe';

const styles = StyleSheet.create({
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5
  }
});

export default class StripeSepa extends Component {
  handleSubmit = ev => {
    const { currency, context, account } = this.props;
    stripe.setOptions({
      publishableKey: account.authorization.accountId
    });
    const params = {
      accountNumber: this._iban,
      countryCode: 'DE',
      currency,
      accountHolderName: context.donorName
    };
    stripe
      .createTokenWithBankAccount(params)
      .then(token => {
        this.props.onSuccess(token);
        console.log('token' + token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { currency, context } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}
      >
        <TextInput
          style={styles.field}
          placeholder={currency}
          placeholderTextColor={'#686060'}
          underlineColorAndroid={'transparent'}
          onChangeText={value => {
            this._iban = value;
            console.log(value);
          }}
          allowFontScaling={true}
        />
        <Text style={{ textAlign: 'justify', color: 'black' }}>
          {i18n.t('label.stripe_sepa_des1')} {context.tpoName}{' '}
          {i18n.t('label.stripe_sepa_des2')}
        </Text>
        <PrimaryButton onClick={() => this.handleSubmit()}>
          {i18n.t('label.pay_via_sepa')}
        </PrimaryButton>
      </View>
    );
  }
}
