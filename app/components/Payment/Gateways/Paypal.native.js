import React from 'react';
import PropTypes from 'prop-types';
import PayPal from 'react-native-paypal-wrapper';
import { Text, View } from 'react-native';
import TouchableItem from '../../../components/Common/TouchableItem';

class PaypalComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  onPayclick() {
    PayPal.initialize(
      this.props.mode === 'production' ? PayPal.PRODUCTION : PayPal.SANDBOX,
      account.authorization.client_id
    );
    PayPal.pay({
      price: this.props.amount.toString(),
      currency: this.props.currency,
      description: 'Your description goes here'
    })
      .then((confirm, payment) => {
        let response = confirm.response;
        response.paymentID = response.id;
        this.props.onSuccess(response);
        console.log('confirmed called up');
      })
      .catch(error => this.props.onSuccess(data));
  }

  render() {
    // see https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/customize-button/

    return (
      <View
        style={{
          margin: 10,
          backgroundColor: '#eee',
          width: 200,
          padding: 10,
          borderRadius: 100 / 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'transparent'
        }}
      >
        <TouchableItem onPress={() => this.onPayclick()}>
          <Text>
            <Text style={{ fontSize: 11, fontStyle: 'italic' }}>Pay with </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'blue'
              }}
            >
              Pay
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: 'bold', fontStyle: 'italic' }}
            >
              Pal
            </Text>
          </Text>
        </TouchableItem>
      </View>
    );
  }
}

PaypalComponent.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  mode: PropTypes.string,
  onSuccess: PropTypes.func
};

export default PaypalComponent;
