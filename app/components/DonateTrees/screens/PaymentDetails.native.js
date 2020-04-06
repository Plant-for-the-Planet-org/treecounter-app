import React from 'react';
import { Animated, Image, Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { applePay, googlePay, paypal, paypalLogo } from '../../../assets';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/donation/donation.native';
import colors from '../../../utils/constants';
import HeaderAnimated from '../../Header/HeaderAnimated.native';
import CreditCardForm from '../components/CreditCardForm';
import SepaAccountForm from '../components/SepaAccountForm';

export default function DonationStep3(props) {
  const [payPalInfo, setPayPalInfo] = React.useState(false)
  const [showPay, setShowPay] = React.useState(true)
  const [allValid, setAllValid] = React.useState(false)
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

  togglePaypalInfo = () => {
    setPayPalInfo(!payPalInfo)
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );

    // clean up
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [])

  const keyboardDidShow = () => {
    setShowPay(false)
  }

  const keyboardDidHide = () => {
    setShowPay(true)
  }

  return (
    <View style={{ backgroundColor: colors.WHITE }}>
      <HeaderAnimated
        scrollY={scrollY}
        navigation={props.navigation}
        title={'Payment Mode'}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.pageScrollView}
        keyboardDismissMode="on-drag"
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        <View style={styles.pageView}>
          {/* <Text style={styles.pageTitle}>Payment</Text> */}
          <Text style={styles.pageSubTitle}>
            Please review your payment and donation details.
            </Text>

          <CreditCardForm />

          {/* PayPal Information Card */}
          <View style={styles.paymentCardView}>
            <TouchableOpacity
              style={styles.paymentModeView}
              onPress={() => { togglePaypalInfo() }}
            >
              <Image source={paypal} style={styles.creditCardsDesign} />
              <Text style={styles.paymentModeTitle}>PayPal</Text>

              {payPalInfo ? (
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
            {payPalInfo ? (
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

          <SepaAccountForm />

          {/* Apple Pay Information Card */}
          {Platform.OS === 'ios' ? (
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
          ) : null}
          {/* Apple Pay Information Card Ended */}

          {/* Google Pay Information Card */}

          {Platform.OS === 'ios' ? null : (
            <TouchableOpacity>
              <View style={styles.paymentCardView}>
                <View style={styles.paymentModeView}>
                  <Image
                    source={googlePay}
                    style={styles.creditCardsDesign}
                  />
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
          )}
          {/* Google Pay Information Card Ended */}
        </View>
      </KeyboardAwareScrollView>
      {/* Pay Button Section  */}

      {showPay ? (
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
              updateStaticRoute('donate_thankyou', props.navigation, {
                treeCount: 4,
                plantedBy: 'Eden Reforestation Project'
              });
            }}
          >
            <View
              style={
                allValid
                  ? styles.continueButtonView
                  : styles.continueButtonViewInvalid
              }
            >
              <Icon name="heart" size={30} color="#fff" />
              <Text style={styles.payText}>Pay</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      {/* Pay Button Section Ended */}
    </View>
  );
}
