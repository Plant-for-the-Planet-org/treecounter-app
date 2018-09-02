import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import i18n from '../../../locales/i18n';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import stripe from 'tipsi-stripe';
import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';

const styles = StyleSheet.create({
  field: {
    height: 30,
    width: 300,
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    padding: 2
  }
});

export default class StripeSepa extends Component {
  handleSubmit = ev => {
    const { currency, context, account } = this.props;
    let ibanPattern = new RegExp(
      /^DE\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}|DE\d{20}$/i
    );

    if (!this._iban || !ibanPattern.test(this._iban)) {
      NotificationManager.error('Please enter Correct IBAN', 'Error');
      return;
    }
    const params = {
      accountNumber: this._iban.replace(/\s/g, ''),
      countryCode: 'de',
      currency: currency
    };
    stripe
      .createTokenWithBankAccount(params)
      .then(token => {
        console.log('token Test' + token);
        token = { ...token, id: token.tokenId };
        this.props.onSuccess({ token });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { loading, token, params } = this.state;

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
          placeholder={'DE00 0000 0000 0000 0000 00'}
          placeholderTextColor={'#686060'}
          underlineColorAndroid={'transparent'}
          onChangeText={value => {
            this._iban = value;
            console.log(value);
          }}
          allowFontScaling={true}
        />
        <Text style={{ textAlign: 'justify', color: 'black', marginTop: 5 }}>
          {i18n.t('label.stripe_sepa_des1')} {context.tpoName}{' '}
          {i18n.t('label.stripe_sepa_des2')}
        </Text>
        <PrimaryButton
          loading={loading}
          onClick={this.handleBankAccountPayPress}
        >
          Generate token
        </PrimaryButton>
        <View style={styles.token}>
          {token && (
            <Text style={styles.instruction}>Token: {token.tokenId}</Text>
          )}
        </View>
      </View>
    );
  }
}
