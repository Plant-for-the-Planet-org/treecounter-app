import React from "react";
import {
  Animated,
  Image,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import WebView from "react-native-webview";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import stripe from "tipsi-stripe";
import { nextArrowWhite, paypal, paypalLogo } from "../../../assets";
import { updateStaticRoute } from "../../../helpers/routerHelper";
import styles from "../../../styles/donation/donation.native";
import colors from "../../../utils/constants";
import { formatNumber } from "../../../utils/utils";
import CreditCardForm from "./../components/CreditCardForm";
import { handleCreditCardPayPress } from "./../components/paymentMethods/creditCard";
import SafeAreaView from "react-native-safe-area-view";
import { Header } from "../components/donationComponents.native";
import PaymentLoader from "../components/PaymentLoader";
import { handleNativePayPress } from "./../components/paymentMethods/nativePay";
import Axios from "axios";

export default function DonationStep3(props) {
  const [payPalInfo, setPayPalInfo] = React.useState(false);
  const [paypalOption, setPaypalOption] = React.useState(false);
  const [showPay, setShowPay] = React.useState(true);

  const [paymentId, setPaymentId] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [approvalUrl, setApprovalUrl] = React.useState(null);
  const [dataDetail, setDataDetail] = React.useState(null);

  const [cardValues, setcardValues] = React.useState("");
  const [cardValid, setcardValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const togglePaypalInfo = () => {
    setPayPalInfo(!payPalInfo);
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );
    if (props.paymentSetup) {
      stripe.setOptions({
        publishableKey:
          props.paymentSetup.gateways[
            props.context.donationDetails.selectedTaxCountry
          ].stripe.stripePublishableKey,
        merchantId: "", // Optional
        androidPayMode: "test" // Android only
      });

      if (
        "paypal" in
        props.paymentSetup.gateways[
          props.context.donationDetails.selectedTaxCountry
        ]
      ) {
        setPaypalOption(true);
        setDataDetail({
          intent: "sale",
          payer: {
            payment_method: "paypal"
          },
          transactions: [
            {
              amount: {
                total: (
                  props.context.donationDetails.totalTreeCount *
                  props.context.donationDetails.selectedProject.treeCost
                ).toString(),
                currency: props.context.donationDetails.selectedCurrency,
                details: {
                  subtotal: (
                    props.context.donationDetails.totalTreeCount *
                    props.context.donationDetails.selectedProject.treeCost
                  ).toString(),
                  tax: "0",
                  shipping: "0",
                  handling_fee: "0",
                  shipping_discount: "0",
                  insurance: "0"
                }
              }
            }
          ],
          redirect_urls: {
            return_url: "https://example.com",
            cancel_url: "https://example.com"
          }
        });
      }
    }

    // clean up
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const getPaypalDetails = () => {
    Axios.get(
      `https://app-development.plant-for-the-planet.org/public/v1.4/en/plantProject/${
        props.context.donationDetails.selectedProject.id
      }/paypalAccessToken/${
        props.paymentSetup.gateways[
          props.context.donationDetails.selectedTaxCountry
        ].paypal.account
      }`
    ).then(response => {
      setAccessToken(response.data.accessToken);
      Axios.post(
        "https://api.sandbox.paypal.com/v1/payments/payment",
        dataDetail,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.data.accessToken}`
          }
        }
      )
        .then(response => {
          const { id, links } = response.data;
          const approvalUrl = links.find(data => data.rel == "approval_url");

          setPaymentId(id);
          setApprovalUrl(approvalUrl.href);
        })
        .catch(err => {
          console.log({ ...err });
        });
    });
  };

  const _onNavigationStateChange = webViewState => {
    if (webViewState.url.includes("https://example.com/")) {
      setApprovalUrl(null);

      const { PayerID, paymentId } = webViewState.url;

      Axios.post(
        `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        { payer_id: PayerID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log({ ...err });
        });
    }
  };

  const keyboardDidShow = () => {
    setShowPay(false);
  };

  const keyboardDidHide = () => {
    setShowPay(true);
  };

  return loading ? (
    <PaymentLoader />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {approvalUrl ? (
        <WebView
          style={{ height: "100%", width: "100%" }}
          source={{ uri: approvalUrl }}
          onNavigationStateChange={_onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{ marginTop: 20 }}
        />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={[
            Platform.OS === "ios"
              ? { paddingBottom: 200 }
              : { marginTop: 24, paddingBottom: 200 }
          ]}
          keyboardDismissMode="on-drag"
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
          scrollEventThrottle={16}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Header navigation={props.navigation} title={"Payment Mode"} />
          </View>

          <View style={styles.pageView}>
            {/* <Text style={styles.pageTitle}>Payment</Text> */}
            <Text style={styles.pageSubTitle}>
              Please review your payment and donation details.
            </Text>

            <CreditCardForm
              setcardValid={setcardValid}
              setcardValues={setcardValues}
            />

            {/* PayPal Information Card */}
            {paypalOption ? (
              <View style={styles.paymentCardView}>
                <TouchableOpacity
                  style={styles.paymentModeView}
                  onPress={() => {
                    togglePaypalInfo();
                  }}
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
                      Click the PayPal icon below to sign into your PayPal
                      account and pay securely.
                    </Text>
                    <TouchableOpacity
                      onPress={getPaypalDetails}
                      style={styles.paypalButton}
                    >
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
            ) : null}
            {/* PayPal Information Card Ended */}

            {/* <SepaAccountForm /> */}
          </View>
        </KeyboardAwareScrollView>
      )}
      {/* Pay Button Section  */}

      {showPay ? (
        props.context &&
        props.context.donationDetails &&
        props.context.donationDetails.totalTreeCount ? (
          <PaymentButton
            treeCount={props.context.donationDetails.totalTreeCount}
            treeCost={props.context.donationDetails.selectedProject.treeCost}
            selectedCurrency={props.context.donationDetails.selectedCurrency}
            stripe={stripe}
            currentUserProfile={props.currentUserProfile}
            context={props.context}
            createDonation={props.createDonation}
            donationPay={props.donationPay}
            selectedProject={props.context.donationDetails.selectedProject}
            paymentSetup={props.paymentSetup}
            selectedTaxCountry={
              props.context.donationDetails.selectedTaxCountry
            }
            setLoading={setLoading}
            navigation={props.navigation}
            cardValid={cardValid}
            cardValues={cardValues}
            rates={props.context.donationDetails.rates}
          />
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )
      ) : null}
      {/* Pay Button Section Ended */}
    </SafeAreaView>
  );
}

const PaymentButton = props => {
  let paymentProps = {
    totalTreeCount: String(props.treeCount),
    totalPrice: String(props.treeCount * props.treeCost),
    amountPerTree: String(props.treeCost),
    currency_code: String(props.selectedCurrency),
    stripe: props.stripe,
    currentUserProfile: props.currentUserProfile,
    context: props.context,
    createDonation: props.createDonation,
    donationPay: props.donationPay,
    selectedProject: props.selectedProject,
    paymentSetup: props.paymentSetup,
    selectedTaxCountry: props.selectedTaxCountry,
    setLoading: props.setLoading,
    navigation: props.navigation,
    setApplePayStatus: null,
    isApplePay: false,
    isCredit: true,
    cardValues: props.cardValues
  };
  return (
    <View style={styles.buttonSectionView}>
      <View style={styles.donationSummary}>
        <View style={styles.donationCost}>
          <Text style={styles.donationAmount}>
            {formatNumber(
              props.commissionSwitch
                ? props.treeCost *
                    props.treeCount *
                    props.rates[props.selectedCurrency] +
                    ((props.treeCount / 100) * 2.9 + 0.3)
                : props.treeCost *
                    props.treeCount *
                    props.rates[props.selectedCurrency],
              null,
              props.selectedCurrency
            )}
          </Text>
          <Text style={styles.donationTree}>for {props.treeCount} trees</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleNativePayPress(paymentProps);
        }}
        style={
          props.cardValid
            ? styles.continueButtonView
            : styles.continueButtonViewInvalid
        }
      >
        <Text style={styles.payText}>Pay</Text>
        <Image
          style={{ maxHeight: 24, maxWidth: 24 }}
          source={nextArrowWhite}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
