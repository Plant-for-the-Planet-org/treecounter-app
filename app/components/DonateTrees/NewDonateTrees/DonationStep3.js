import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  visa,
  googlePay,
  applePay,
  sepa,
  masterCard,
  paypal,
  americanExpress,
  discover,
  paypalLogo
} from './../../../assets';
export default class DonationStep3 extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.pageScrollView}>
        <View style={styles.pageView}>
          <Text style={styles.pageTitle}>Payment</Text>
          <Text style={styles.pageSubTitle}>
            Please review your payment and donation details.
          </Text>

          {/* Payment Information Card */}
          <View style={styles.paymentCardView}>
            <View style={styles.paymentModeView}>
              <Text style={styles.paymentModeTitle}>CREDIT CARD</Text>
              <Image
                source={visa}
                style={{ height: 20, width: 32, marginRight: 6 }}
              />
              <Image
                source={masterCard}
                style={{ height: 20, width: 32, marginRight: 6 }}
              />
              <Image
                source={americanExpress}
                style={{ height: 20, width: 32, marginRight: 6 }}
              />
              <TouchableOpacity>
                <Icon
                  name="chevron-up"
                  size={14}
                  color="rgba(0, 0, 0, 0.38)"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Payment Information Card Ended */}

          {/* Payment Information Card */}
          <View style={styles.paymentCardView}>
            <View style={styles.paymentModeView}>
              <Image
                source={paypal}
                style={{ height: 20, width: 32, marginRight: 6 }}
              />
              <Text style={styles.paymentModeTitle}>PayPal</Text>
              <TouchableOpacity>
                <Icon
                  name="chevron-up"
                  size={14}
                  color="rgba(0, 0, 0, 0.38)"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.expandedPaymentModePaypal}>
              <Text style={styles.paypalMessage}>
                Click the PayPal icon below to sign into your PayPal account and
                pay securely.
              </Text>
              <TouchableOpacity style={styles.paypalButton}>
                <Text style={styles.paypalButtonText}>Pay with</Text>
                <Image
                  source={paypalLogo}
                  style={{ height: 26, marginLeft: 14, maxWidth: 100 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Payment Information Card Ended */}

          {/* Payment Information Card */}
          <View style={styles.paymentCardView}>
            <View style={styles.paymentModeView}>
              <Image
                source={sepa}
                style={{ height: 20, width: 32, marginRight: 6 }}
              />
              <Text style={styles.paymentModeTitle}>SEPA Direct Debit</Text>
              <TouchableOpacity>
                <Icon
                  name="chevron-up"
                  size={14}
                  color="rgba(0, 0, 0, 0.38)"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Payment Information Card Ended */}
          {/* Payment Information Card */}
          <View style={styles.paymentCardView}>
            <View style={styles.paymentModeView}>
              <Image
                source={applePay}
                style={{ height: 20, width: 32, marginRight: 6 }}
              />
              <Text style={styles.paymentModeTitle}>Apple Pay</Text>
              <TouchableOpacity>
                <Icon
                  name="chevron-up"
                  size={14}
                  color="rgba(0, 0, 0, 0.38)"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Payment Information Card Ended */}
          {/* Payment Information Card */}
          <View style={styles.paymentCardView}>
            <View style={styles.paymentModeView}>
              <Image
                source={googlePay}
                style={{ height: 20, width: 32, marginRight: 6 }}
              />
              <Text style={styles.paymentModeTitle}>Google Pay</Text>
              <TouchableOpacity>
                <Icon
                  name="chevron-up"
                  size={14}
                  color="rgba(0, 0, 0, 0.38)"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Payment Information Card Ended */}
        </View>

        {/* Pay Button Section  */}
        <View style={styles.buttonSectionView}>
          <View style={styles.donationSummary}>
            <View style={styles.donationCost}>
              <Text style={styles.donationAmount}>€ 50</Text>
              <Text style={styles.donationTree}>for 50 Trees</Text>
            </View>
            <Text style={styles.donationFrequency}>One Time Donation</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              updateStaticRoute(
                getLocalRoute('app_donate_detail2'),
                this.props.navigation
              );
            }}
          >
            <View style={styles.continueButtonView}>
              <Icon name="heart" size={30} color="#fff" />
              <Text style={styles.payText}>Pay</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Pay Button Section Ended */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  pageScrollView: {
    backgroundColor: 'white'
  },
  pageView: {
    padding: 20
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  pageSubTitle: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7
  },
  buttonSectionView: {
    width: '100%',
    marginTop: 40,
    backgroundColor: '#f7f7f7',
    marginBottom: 20,
    height: 88,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  donationSummary: {
    padding: 20
  },
  donationCost: {
    flexDirection: 'row'
  },
  donationAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a'
  },
  donationTree: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#707070',
    marginLeft: 6
  },
  donationFrequency: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 8
  },
  continueButtonView: {
    backgroundColor: '#89b53a',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100
  },
  payText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 4
  },
  paymentCardView: {
    borderRadius: 9,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 16,
    marginTop: 20
  },
  paymentModeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    flexGrow: 1
  },
  paymentModeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  paypalMessage: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 28
  },
  paypalButton: {
    borderRadius: 30,
    backgroundColor: '#f7f7f7',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f7f7f7',
    height: 45,
    width: '80%',
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  expandedPaymentModePaypal: {
    alignItems: 'center'
  },
  paypalButtonText: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)'
  }
});
