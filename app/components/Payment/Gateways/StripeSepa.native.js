/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { debug } from '../../debug';
import i18n from '../../../locales/i18n';
import PrimaryButton from '../../Common/Button/PrimaryButton';
// currently tipsi-stripe is removed from package.json as (1) it is unused and (2) the native support modules did not compile with Android
import stripe from 'tipsi-stripe';
import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';

const colors = {
  color: '#449aeb',
  borderColor: '#000'
};
const styles = StyleSheet.create({
  field: {
    height: 30,
    width: 300,
    color: colors.color,
    borderColor: colors.borderColor,
    borderWidth: 1,
    padding: 2
  }
});

export default class StripeSepa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitClicked: false
    };
  }
  handleSubmit = (/* ev */) => {
    this.setState({
      submitClicked: true
    });
    const { currency, context /* , account */ } = this.props;
    let ibanPattern = new RegExp(
      /^DE\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}|DE\d{20}$/i
    );

    if (!this._iban || !ibanPattern.test(this._iban)) {
      NotificationManager.error(
        i18n.t('label.please_enter_iban'),
        i18n.t('label.error')
      );
      return;
    }
    const params = {
      type: 'sepaDebit',
      iban: this._iban.replace(/\s/g, ''),
      countryCode: 'de',
      currency: currency,
      email: context.donorEmail,
      name: context.donorName
    };
    stripe
      .createSourceWithParams(params)
      .then(token => {
        //debug('token Test', token);
        token.sepa_debit = token.sepaDebitDetails;
        token.type = 'sepa_debit';
        //TODO hkurra it will start working once this will get merged
        //https://github.com/tipsi/tipsi-stripe/pull/319/files
        token.id = token.id || token.sourceId;
        // let tokenObj = token;
        // tokenObj.id = token.tokenId;
        this.props.onSuccess(token);
      })
      .catch(err => {
        debug(err);
      });
  };

  render() {
    const { /*  currency, */ context } = this.props;

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
            //debug(value);
          }}
          autoCapitalize={'sentences'}
          allowFontScaling
        />
        <Text
          style={{
            textAlign: 'justify',
            color: colors.borderColor,
            marginTop: 5
          }}
        >
          {i18n.t('label.stripe_sepa_des1')} {context.tpoName}{' '}
          {i18n.t('label.stripe_sepa_des2')}
        </Text>
        <PrimaryButton
          onClick={
            this.state.submitClicked ? () => null : () => this.handleSubmit()
          }
        >
          {i18n.t('label.pay_via_sepa')}
        </PrimaryButton>
      </View>
    );
  }
}
