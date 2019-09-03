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
  state = {
    creditCardInfo: false,
    payPalInfo: false,
    sepaInfo: false
  };

  togglecreditCardInfo = () => {
    this.setState({
      creditCardInfo: !this.state.creditCardInfo
    });
  };
  togglePaypalInfo = () => {
    this.setState({
      payPalInfo: !this.state.payPalInfo
    });
  };
  toggleSepaInfo = () => {
    this.setState({
      sepaInfo: !this.state.sepaInfo
    });
  };
  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={styles.pageScrollView}>
          <View style={styles.pageView}>
            <Text style={styles.pageTitle}>Payment</Text>
            <Text style={styles.pageSubTitle}>
              Please review your payment and donation details.
            </Text>

            {/* Payment Information Card */}
            <View style={styles.paymentCardView}>
              <TouchableOpacity
                style={styles.paymentModeView}
                onPress={() => {
                  this.togglecreditCardInfo();
                }}
              >
                <Text style={styles.paymentModeTitle}>CREDIT CARD</Text>
                <Image source={visa} style={styles.creditCardsDesign} />
                <Image source={masterCard} style={styles.creditCardsDesign} />
                <Image
                  source={americanExpress}
                  style={styles.creditCardsDesign}
                />

                {this.state.creditCardInfo ? (
                  <Icon
                    name="chevron-up"
                    size={14}
                    color="rgba(0, 0, 0, 0.38)"
                    style={{ marginLeft: 10 }}
                  />
                ) : (
                  <Icon
                    name="chevron-down"
                    size={14}
                    color="rgba(0, 0, 0, 0.38)"
                    style={{ marginLeft: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* Payment Information Card Ended */}

            {/* PayPal Information Card */}
            <View style={styles.paymentCardView}>
              <TouchableOpacity
                style={styles.paymentModeView}
                onPress={() => {
                  this.togglePaypalInfo();
                }}
              >
                <Image source={paypal} style={styles.creditCardsDesign} />
                <Text style={styles.paymentModeTitle}>PayPal</Text>

                {this.state.payPalInfo ? (
                  <Icon
                    name="chevron-up"
                    size={14}
                    color="rgba(0, 0, 0, 0.38)"
                    style={{ marginLeft: 10 }}
                  />
                ) : (
                  <Icon
                    name="chevron-down"
                    size={14}
                    color="rgba(0, 0, 0, 0.38)"
                    style={{ marginLeft: 10 }}
                  />
                )}
              </TouchableOpacity>

              {/* Hidden until expanded by User */}
              {this.state.payPalInfo ? (
                <View style={styles.expandedPaymentModePaypal}>
                  <Text style={styles.paypalMessage}>
                    Click the PayPal icon below to sign into your PayPal account
                    and pay securely.
                  </Text>
                  <TouchableOpacity style={styles.paypalButton}>
                    <Text style={styles.paypalButtonText}>Pay with</Text>
                    <Image
                      source={paypalLogo}
                      style={{ height: 26, marginLeft: 14, maxWidth: 100 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              {/* Hidden until expanded by User */}
            </View>
            {/* PayPal Information Card Ended */}

            {/* SEPA Information Card */}
            <View style={styles.paymentCardView}>
              <TouchableOpacity
                style={styles.paymentModeView}
                onPress={() => {
                  this.toggleSepaInfo();
                }}
              >
                <Image source={sepa} style={styles.creditCardsDesign} />
                <Text style={styles.paymentModeTitle}>SEPA Direct Debit</Text>
                {this.state.sepaInfo ? (
                  <Icon
                    name="chevron-up"
                    size={14}
                    color="rgba(0, 0, 0, 0.38)"
                    style={{ marginLeft: 10 }}
                  />
                ) : (
                  <Icon
                    name="chevron-down"
                    size={14}
                    color="rgba(0, 0, 0, 0.38)"
                    style={{ marginLeft: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* SEPA Information Card Ended */}

            {/* Apple Pay Information Card */}
            <TouchableOpacity>
              <View style={styles.paymentCardView}>
                <View style={styles.paymentModeView}>
                  <Image source={applePay} style={styles.creditCardsDesign} />
                  <Text style={styles.paymentModeTitle}>Apple Pay</Text>
                  <TouchableOpacity>
                    <Icon
                      name="chevron-right"
                      size={14}
                      color="rgba(0, 0, 0, 0.38)"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            {/* Apple Pay Information Card Ended */}

            {/* Google Pay Information Card */}
            <TouchableOpacity>
              <View style={styles.paymentCardView}>
                <View style={styles.paymentModeView}>
                  <Image source={googlePay} style={styles.creditCardsDesign} />
                  <Text style={styles.paymentModeTitle}>Google Pay</Text>
                  <TouchableOpacity>
                    <Icon
                      name="chevron-right"
                      size={14}
                      color="rgba(0, 0, 0, 0.38)"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            {/* Google Pay Information Card Ended */}
          </View>
        </ScrollView>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageScrollView: {
    backgroundColor: 'white',
    paddingBottom: 140
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
  creditCardsDesign: {
    height: 20,
    width: 32,
    marginRight: 6
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
    backgroundColor: '#f7f7f7',
    height: 88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '80%'
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
