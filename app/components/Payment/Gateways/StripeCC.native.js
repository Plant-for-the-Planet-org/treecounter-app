import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
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
  handleFieldParamsChange = (valid, params) => {
    console.log(`
      Valid: ${valid}
      Number: ${params.number || '-'}
      Month: ${params.expMonth || '-'}
      Year: ${params.expYear || '-'}
      CVC: ${params.cvc || '-'}
    `);
  };

  render() {
    return (
      <View>
        <PaymentCardTextField
          style={styles.field}
          onParamsChange={this.handleFieldParamsChange}
        />
      </View>
    );
  }
}
