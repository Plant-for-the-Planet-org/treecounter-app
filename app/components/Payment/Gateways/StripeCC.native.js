import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PaymentCardTextField } from 'tipsi-stripe';

const styles = StyleSheet.create({
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5
  }
});

export default class FieldExample extends Component {
  state = {
    valid: false,
    params: {
      number: '',
      expMonth: 0,
      expYear: 0,
      cvc: ''
    }
  };

  handleFieldParamsChange = (valid, params) => {
    this.setState({
      valid,
      params
    });
  };

  render() {
    const { valid, params } = this.state;
    return (
      <View>
        <Text style={styles.header}>PaymentCardTextField Example</Text>
        <PaymentCardTextField
          accessible={false}
          style={styles.field}
          onParamsChange={this.handleFieldParamsChange}
          numberPlaceholder="XXXX XXXX XXXX XXXX"
          expirationPlaceholder="MM/YY"
          cvcPlaceholder="CVC"
        />
        <View style={styles.params}>
          <Text style={styles.instruction}>Valid:</Text>
          <Text style={styles.instruction}>Number: {params.number || '-'}</Text>
          <Text style={styles.instruction}>
            Month: {params.expMonth || '-'}
          </Text>
          <Text style={styles.instruction}>Year: {params.expYear || '-'}</Text>
          <Text style={styles.instruction}>CVC: {params.cvc || '-'}</Text>
        </View>
      </View>
    );
  }
}
