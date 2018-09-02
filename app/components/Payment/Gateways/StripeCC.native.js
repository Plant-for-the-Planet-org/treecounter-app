import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import stripe, { PaymentCardTextField } from 'tipsi-stripe';
import TouchableItem from '../../Common/TouchableItem.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';

const styles = StyleSheet.create({
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5
  }
});

export default class StripeCC extends Component {
  state = {
    valid: false,
    params: {
      number: '',
      expMonth: 0,
      expYear: 0,
      cvc: ''
    }
  };

  componentDidMount() {}

  handleFieldParamsChange = (valid, params) => {
    this.setState({
      valid,
      params
    });
  };

  payviaCard() {
    if (this.state.valid) {
      const params = {
        number: this.state.params.number,
        expMonth: this.state.params.expMonth,
        expYear: this.state.params.expYear,
        cvc: this.state.params.cvc
      };
      const token = stripe
        .createTokenWithCard(params)
        .then(token => {
          this.props.onSuccess(token);
          console.log('tokem' + token);
        })
        .catch(err => {
          console.log(err);
        });

      console.log('pay via card');
    } else {
      console.log('Enter valid details');
    }
  }

  render() {
    const { valid, params } = this.state;
    return (
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.header}>PaymentCardTextField Example</Text>
        <PaymentCardTextField
          accessible={false}
          style={styles.field}
          onParamsChange={this.handleFieldParamsChange}
          numberPlaceholder="XXXX XXXX XXXX XXXX"
          expirationPlaceholder="MM/YY"
          cvcPlaceholder="CVC"
        />
        {/* <View style={styles.params}>
          <Text style={styles.instruction}>Valid:</Text>
          <Text style={styles.instruction}>Number: {params.number || '-'}</Text>
          <Text style={styles.instruction}>
            Month: {params.expMonth || '-'}
          </Text>
          <Text style={styles.instruction}>Year: {params.expYear || '-'}</Text>
          <Text style={styles.instruction}>CVC: {params.cvc || '-'}</Text>
        </View> */}
        <PrimaryButton onClick={() => this.payviaCard()}>Pay</PrimaryButton>
      </View>
    );
  }
}
