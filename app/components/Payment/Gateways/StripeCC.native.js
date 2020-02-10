import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
// currently tipsi-stripe is removed from package.json as (1) it is unused and (2) the native support modules did not compile with Android
import stripe, { PaymentCardTextField } from 'tipsi-stripe';
import { debug } from '../../../debug';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';
import i18n from '../../../locales/i18n';

const colors = {
  color: '#449aeb',
  borderColor: '#000'
};
const styles = StyleSheet.create({
  field: {
    width: 300,
    color: colors.color,
    borderColor: colors.borderColor,
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
    },
    submitClicked: false
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
      this.setState({
        submitClicked: true
      });
      const params = {
        number: this.state.params.number,
        expMonth: this.state.params.expMonth,
        expYear: this.state.params.expYear,
        cvc: this.state.params.cvc
      };
      this.props.setLoading(true);
      stripe
        .createTokenWithCard(params)
        .then(token => {
          token.id = token.tokenId;
          token.card.id = token.card.cardId;
          this.props.setLoading(false);
          this.props.onSuccess(token);
          //debug(token);
        })
        .catch(err => {
          debug(err);
          this.props.setLoading(false);
          this.props.onError();
        });

      //debug('pay via card');
    } else {
      NotificationManager.error(
        i18n.t('label.please_enter_card_details'),
        i18n.t('label.error')
      );
    }
  }

  render() {
    // const { valid, params } = this.state;
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
        <PrimaryButton
          onClick={
            this.state.submitClicked ? () => null : () => this.payviaCard()
          }
        >
          {i18n.t('label.pay')}
        </PrimaryButton>
      </View>
    );
  }
}
