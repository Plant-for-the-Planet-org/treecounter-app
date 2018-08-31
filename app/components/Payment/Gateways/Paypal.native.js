import React from 'react';
import PropTypes from 'prop-types';
import PayPal from 'react-native-paypal-wrapper';
import { TouchableHighlight, Text, View } from 'react-native';
import PrimaryButton from '../../Common/Button/PrimaryButton';

class PaypalComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  onPayclick() {
    PayPal.initialize(
      PayPal.SANDBOX,
      'AVM8OuLVHPJJFABHQdXdrmV0QZU5jS0w_AYtMzijVqm1etflKYpKXdQoqMUX5b5mQqHrRhKBG_oKPb5i'
    );
    PayPal.pay({
      price: this.props.amount.toString(),
      currency: this.props.currency,
      description: 'Your description goes here'
    })
      .then(confirm => console.log(confirm))
      .catch(error => console.log(error));
  }

  render() {
    // see https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/customize-button/

    return (
      <View
        style={{
          margin: 10,
          backgroundColor: '#eee',
          width: 200,
          borderRadius: 100 / 4,
          borderColor: 'transparent'
        }}
      >
        <TouchableHighlight onPress={() => this.onPayclick()}>
          <Text>
            <Text style={styles.paraStyle}>Pay with </Text>
            <Text style={styles.payStyle}>Pay</Text>
            <Text style={styles.payStyle}>Pal</Text>
          </Text>
        </TouchableHighlight>
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
  onSuccess: PropTypes.func
};

export default PaypalComponent;
