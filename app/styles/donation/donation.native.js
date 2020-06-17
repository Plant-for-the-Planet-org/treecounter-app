import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  tabViewButtonContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    justifyContent: "center"
  },
  tabViewButtonText: {
    fontSize: 13,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: "center",
    margin: 16,
    marginBottom: 12
  },
  tabViewTitleContainer: {
    display: "flex",
    flexDirection: "row"
  },
  selectedTabButtonText: {
    color: "#89b53a"
  },
  selectedTabButtonView: {
    height: 3.5,
    backgroundColor: "#89b53a",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  tabViewTitleText: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    marginTop: 26,
    marginBottom: 20
  },
  tabViewContentText: {
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    marginBottom: 24
  },

  //  Form Styles
  keyboardScrollView: { backgroundColor: "white" },
  titleText: {
    fontSize: 27,
    fontWeight: "800",
    fontStyle: "normal",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    marginTop: 30
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    marginTop: 7
  },
  formScrollView: {
    backgroundColor: "white",
    flexGrow: 1,
    padding: 24
  },
  formHalfTextField: { width: "45%" },

  formView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40
  },
  formTreeCountView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 12
  },

  // Donation Step 3 Page

  pageScrollView: {
    backgroundColor: "white",
    paddingBottom: 180,
    marginTop: 120
  },
  pageView: {
    padding: 8
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: "800",
    fontStyle: "normal",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    marginHorizontal: 12,
    marginTop: 20
  },
  creditCardsDesign: {
    height: 20,
    width: 32,
    marginRight: 6
  },
  pageSubTitle: {
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    marginTop: 7,
    marginHorizontal: 12
  },
  buttonSectionView: {
    width: "100%",
    backgroundColor: "#f2f2f7",
    height: 96,
    flexDirection: "row",
    position: "absolute",
    bottom: 0
  },
  donationSummary: {
    padding: 20,
    //width: width * 0.75
    flexGrow: 1,
    justifyContent: "center"
  },
  donationCost: {
    flexDirection: "row"
  },
  donationAmount: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: "#89b53a"
  },
  donationTree: {
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070",
    marginLeft: 6
  },
  donationFrequency: {
    fontSize: 12,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    marginTop: 8
  },
  continueButtonView: {
    backgroundColor: "#89b53a",
    paddingVertical: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 26,
    right: 20,
    minWidth: 120
  },
  continueButtonViewInvalid: {
    backgroundColor: "#d5d5d5",
    paddingVertical: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 26,
    right: 20,
    minWidth: 120
  },
  payText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    letterSpacing: 0.21,
    color: "#ffffff",
    marginRight: 12
  },
  paymentCardView: {
    borderRadius: 9,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d5d5d5",
    padding: 16,
    marginTop: 20
  },
  paymentModeTitle: {
    fontSize: 14,
    fontFamily: "OpenSans-Bold",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    flexGrow: 1
  },
  paymentModeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 5
  },
  paypalMessage: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: 28
  },
  paypalButton: {
    borderRadius: 30,
    backgroundColor: "#f7f7f7",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#f7f7f7",
    height: 45,
    width: "80%",
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  expandedPaymentModePaypal: {
    alignItems: "center"
  },
  paypalButtonText: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)"
  },
  unselectedRadioButton: {
    borderColor: "#d5d5d5",
    borderWidth: 2,
    height: 20,
    width: 20,
    marginRight: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedRadioButton: {
    borderColor: "#89b53a",
    borderWidth: 2,
    height: 20,
    width: 20,
    marginRight: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedRadioButtonCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#89b53a"
  },
  sepaMandateInfoTitle: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)"
  },
  sepaMandateInfoText: {
    fontSize: 9,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: 5
  },
  sepaIbanTitle: {
    fontSize: 12,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153",
    marginTop: 10
  },
  sepaIbanTextView: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 0, 0.38)",
    alignItems: "center"
  },
  sepaInputTextImage: {
    width: 32,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d5d5d5",
    marginRight: 15
  },
  sepaIbanTextInput: {
    borderWidth: 0,
    width: "100%"
  },
  sepaPaymentMethodText: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)"
  },
  viewProfileText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#4d5153"
  },
  imageContainer: {
    width: "100%",
    position: "relative"
  },
  height40: {
    height: Dimensions.get("window").height * 0.36
  },
  closeContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  closeIcon: {
    position: "absolute",
    top: 30,
    left: 14
  },
  treeImage: {
    width: "100%"
  },
  thankYouContainer: {
    padding: 20
  },
  thankyouText: {
    color: "#4D5153",
    fontFamily: "OpenSans-ExtraBold",
    fontSize: 27
  },
  thankyouMessage: {
    color: "#4D5153",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    marginTop: 4
  },
  thankyouButton: {
    position: "absolute",
    bottom: 14,
    width: "86%"
  },
  donateThankYouContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  shareDonationContainer: {
    backgroundColor: "#F2F2F7",
    borderColor: "#F2F2F7",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 60,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 26,
    position: "relative"
  },
  shareImageTree: {
    width: 120,
    height: 120,
    marginBottom: 36
  },
  shareTextMessage: {
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
    lineHeight: 40,
    textAlign: "center"
  },
  shareTextCaption: {
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    lineHeight: 40,
    textAlign: "center"
  },
  pfpLogoContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 54,
    height: 54,
    padding: 6,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ffffff"
  },
  pfpLogo: {
    width: "100%",
    height: "100%"
  },
  shareButtonGroup: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    position: "absolute",
    bottom: -26
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  borderGreen: {
    borderWidth: 1,
    borderColor: "#89B53A"
  },
  borderedButtonText: {
    fontFamily: "OpenSans-SemiBold",
    color: "#89B53A",
    fontSize: 16,
    marginLeft: 10
  },

  // Credit card form
  checkBoxText: {
    fontFamily: "OpenSans-Regular"
  }
});
