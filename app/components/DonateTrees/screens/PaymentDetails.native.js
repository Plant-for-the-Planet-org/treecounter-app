import React from 'react';
import { Animated, Image, Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import stripe from 'tipsi-stripe';
import { applePay, googlePay, paypal, paypalLogo } from '../../../assets';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/donation/donation.native';
import colors from '../../../utils/constants';
import { formatNumber } from '../../../utils/utils';
import HeaderAnimated from '../../Header/HeaderAnimated.native';
import CreditCardForm from '../components/CreditCardForm';
import SepaAccountForm from '../components/SepaAccountForm';

export default function DonationStep3(props) {

  stripe.setOptions({
    publishableKey: 'pk_test_9L6XVwL1f0D903gMcdbjRabp00Zf7jYJuw',
    // merchantId: 'MERCHANT_ID', // Optional
    androidPayMode: 'test', // Android only
  })


  const [token, setToken] = React.useState(null)

  const handleAndroidPayPress = async (props) => {
    try {
      setToken(null)
      const token = await stripe.paymentRequestWithNativePay({
        total_price: props.treeCost * props.totalTreeCount,
        currency_code: props.currency_code,
        line_items: [{
          currency_code: props.currency_code,
          description: 'Donation to Plant for the Planet',
          total_price: props.treeCost * props.totalTreeCount,
          unit_price: props.treeCost,
          quantity: props.totalTreeCount,
        }],
      })
      setToken(token)
    } catch (error) {
      console.log('Error', error)
    }
  }

  console.log('Token -----', token)

  const [payPalInfo, setPayPalInfo] = React.useState(false)
  const [showPay, setShowPay] = React.useState(true)
  const [allValid, setAllValid] = React.useState(false)
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
  const [allowedNativePay, setallowedNativePay] = React.useState(false)

  const [amexAvailable, setAmexAvailable] = React.useState(false)
  const [discoverAvailable, setDiscoverAvailable] = React.useState(false)
  const [masterCardAvailable, setMasterCardAvailable] = React.useState(false)
  const [visaAvailable, setVisaAvailable] = React.useState(false)

  const [applePayComplete, setApplePayComplete] = React.useState(false)
  const [applePayStatus, setApplePayStatus] = React.useState('')

  const togglePaypalInfo = () => {
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

    const allowedNativePay = stripe.deviceSupportsNativePay()
    const amexAvailable = stripe.canMakeNativePayPayments({
      networks: ['american_express'],
    })
    const discoverAvailable = stripe.canMakeNativePayPayments({
      networks: ['discover'],
    })
    const masterCardAvailable = stripe.canMakeNativePayPayments({
      networks: ['master_card'],
    })
    const visaAvailable = stripe.canMakeNativePayPayments({
      networks: ['visa'],
    })
    setallowedNativePay(allowedNativePay)
    setAmexAvailable(amexAvailable)
    setDiscoverAvailable(discoverAvailable)
    setMasterCardAvailable(masterCardAvailable)
    setVisaAvailable(visaAvailable)

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

  handleCompleteChange = complete => (
    setApplePayComplete(complete)
  )

  const handleApplePayPress = async (props) => {
    try {
      setApplePayStatus('')
      setToken(null)
      const token = await stripe.paymentRequestWithNativePay({
        currencyCode: props.currency_code
      },
        [{
          label: 'Donation to Plant for the Planet',
          amount: props.treeCost * props.totalTreeCount,
        },])

      setToken(token)

      if (applePayComplete) {
        await stripe.completeNativePayRequest()
        setApplePayStatus('Apple Pay payment completed')
      } else {
        await stripe.cancelNativePayRequest()
        setApplePayStatus('Apple Pay payment cenceled')
      }
    } catch (error) {
      setApplePayStatus(`Error: ${error.message}`)
    }
  }

  handleSetupApplePayPress = () => (
    stripe.openNativePaySetup()
  )


  const cards = {
    americanExpressAvailabilityStatus: { name: 'American Express', isAvailable: amexAvailable },
    discoverAvailabilityStatus: { name: 'Discover', isAvailable: discoverAvailable },
    masterCardAvailabilityStatus: { name: 'Master Card', isAvailable: masterCardAvailable },
    visaAvailabilityStatus: { name: 'Visa', isAvailable: visaAvailable },
  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
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
          {Platform.OS === 'ios' && allowedNativePay ? (
            <TouchableOpacity onPress={() => handleApplePayPress({
              totalTreeCount: toString(props.context.donationDetails.totalTreeCount),
              amountPerTree: toString(props.context.projectDetails.selectedProjectDetails.amountPerTree),
              currency_code: toString(props.context.projectDetails.selectedProjectDetails.currency)
            })}>
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

          {allowedNativePay ? (
            <TouchableOpacity
              onPress={() => handleAndroidPayPress({
                totalTreeCount: toString(props.context.donationDetails.totalTreeCount),
                amountPerTree: toString(props.context.projectDetails.selectedProjectDetails.amountPerTree),
                currency_code: toString(props.context.projectDetails.selectedProjectDetails.currency)
              })}
            >
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
          ) : null}
          {/* Google Pay Information Card Ended */}
        </View>
      </KeyboardAwareScrollView>
      {/* Pay Button Section  */}

      {showPay ? (
        <PaymentButton
          treeCount={props.context.donationDetails.totalTreeCount}
          treeCost={props.context.projectDetails.selectedProjectDetails.amountPerTree}
          selectedCurrency={props.context.projectDetails.selectedProjectDetails.currency}
          // commissionSwitch={props.navigation.getParam('commissionSwitch')}
          navigation={props.navigation}
          allValid={allValid}
        />
      ) : null}
      {/* Pay Button Section Ended */}
    </View>
  );
}


const PaymentButton = (props) => {
  return (
    <View style={styles.buttonSectionView}>
      <View style={styles.donationSummary}>
        <View style={styles.donationCost}>
          <Text style={styles.donationAmount}>{formatNumber(
            props.commissionSwitch
              ? props.treeCost * props.treeCount +
              ((props.treeCount / 100) * 2.9 + 0.3)
              : props.treeCost * props.treeCount,
            null,
            props.selectedCurrency
          )}</Text>
          <Text style={styles.donationTree}>for {props.treeCount} trees</Text>
        </View>
        <Text style={styles.donationFrequency}>One Time Donation</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          updateStaticRoute('donate_thankyou', props.navigation, {
            treeCount: props.treeCount,
            plantedBy: 'Eden Reforestation Project'
          });
        }}
      >
        <View
          style={
            props.allValid
              ? styles.continueButtonView
              : styles.continueButtonViewInvalid
          }
        >
          <Icon name="heart" size={30} color="#fff" />
          <Text style={styles.payText}>Pay</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}