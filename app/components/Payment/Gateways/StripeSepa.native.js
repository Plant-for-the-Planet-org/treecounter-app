import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { PaymentCardTextField } from 'tipsi-stripe';
import i18n from '../../../locales/i18n';

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
          onChangeText={value => console.log('on change')}
          allowFontScaling={true}
        />
        <Text style={{ textAlign: 'justify', color: 'black' }}>
          {i18n.t('label.stripe_sepa_des1')} {context.tpoName}{' '}
          {i18n.t('label.stripe_sepa_des2')}
        </Text>
      </View>
    );
  }
}
