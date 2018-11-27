import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import stripe, { PaymentCardTextField } from 'tipsi-stripe';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';

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
      this.props.setLoading(true);
      const token = stripe
        .createTokenWithCard(params)
        .then(token => {
          token.id = token.tokenId;
          token.card.id = token.card.cardId;
          this.props.setLoading(false);
          this.props.onSuccess(token);
          //console.log(token);
        })
        .catch(err => {
          this.props.setLoading(false);
          this.props.onError();
        });

      //console.log('pay via card');
    } else {
      NotificationManager.error('Please enter Correct Card Details', 'Error');
    }
  }

  render() {
    const { valid, params } = this.state;
    return (
      <View style={{ flexDirection: 'column', padding: 10 }}>
        <PaymentCardTextField
          accessible={false}
          style={styles.field}
          onParamsChange={this.handleFieldParamsChange}
          numberPlaceholder="XXXX XXXX XXXX XXXX"
          expirationPlaceholder="MM/YY"
          cvcPlaceholder="CVC"
        />
        <PrimaryButton onClick={() => this.payviaCard()}>Pay</PrimaryButton>
      </View>
    );
  }
}
