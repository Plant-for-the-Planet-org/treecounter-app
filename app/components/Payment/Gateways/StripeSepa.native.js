import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import stripe from 'tipsi-stripe';
import PrimaryButton from '../../Common/Button/PrimaryButton';

export default class CustomBankScreen extends PureComponent {
  static title = 'Custom Bank';

  state = {
    loading: false,
    token: null,
    params: {
      accountNumber: 'DE89370400440532013000', // required field
      countryCode: 'de', // required field
      currency: 'eur', // required field
      routingNumber: '110000000', // 9 digits
      accountHolderName: 'Test holder name',
      accountHolderType: 'company'
    }
  };

  handleBankAccountPayPress = async () => {
    try {
      this.setState({ loading: true, token: null });

      const token = await stripe.createTokenWithBankAccount(this.state.params);
      this.setState({ loading: false, token });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, token, params } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Custom Account Params Example</Text>

        <View style={styles.params}>
          <Text style={styles.param}>
            Routing Number: {params.routingNumber}
          </Text>
          <Text style={styles.param}>
            Account Number: {params.accountNumber}
          </Text>
          <Text style={styles.param}>Country Code: {params.countryCode}</Text>
          <Text style={styles.param}>Currency: {params.currency}</Text>
        </View>

        <View style={styles.params}>
          <Text style={styles.param}>Account Type: {params.accountType}</Text>
          <Text style={styles.param}>
            Account HolderType: {params.accountHolderType}
          </Text>
          <Text style={styles.param}>
            Account Holder Name: {params.accountHolderName}
          </Text>
          <Text style={styles.param}>Fingerprint: {params.fingerprint}</Text>
          <Text style={styles.param}>Bank name: {params.bankName}</Text>
          <Text style={styles.param}>Last4: {params.last4}</Text>
        </View>

        <Text style={styles.instruction}>
          Click button to get token based on params.
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10
  },
  params: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    margin: 5
  },
  param: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  token: {
    height: 20
  }
});
