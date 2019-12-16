import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const width = Dimensions.get('window').width;

export default EStyleSheet.create({
  // Pledge Tab View Styles
  tabViewButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  tabViewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: 'center',
    margin: 16,
    marginBottom: 12
  },
  tabViewTitleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  selectedTabButtonText: {
    color: '#89b53a'
  },
  selectedTabButtonView: {
    height: 3.5,
    backgroundColor: '#89b53a',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  tabViewTitleText: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 26,
    marginBottom: 20
  },
  tabViewContentText: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginBottom: 24
  },

  //  Form Styles
  keyboardScrollView: { backgroundColor: 'white' },
  titleText: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 30
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7
  },
  formScrollView: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 24
  },
  formHalfTextField: { width: '45%' },

  formView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40
  },
  formTreeCountView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 12
  },

  // Donation Step 3 Page

  pageScrollView: {
    backgroundColor: 'white',
    paddingBottom: 140
  },
  pageView: {
    padding: 8
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
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
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7,
    marginHorizontal: 12
  },
  buttonSectionView: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    height: 88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '0%'
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
  continueButtonViewInvalid: {
    backgroundColor: '#d5d5d5',
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
    width: '100%',
    paddingBottom: 20
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
  },
  unselectedRadioButton: {
    borderColor: '#d5d5d5',
    borderWidth: 2,
    height: 20,
    width: 20,
    marginRight: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedRadioButton: {
    borderColor: '#89b53a',
    borderWidth: 2,
    height: 20,
    width: 20,
    marginRight: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedRadioButtonCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#89b53a'
  },
  sepaMandateInfoTitle: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  sepaMandateInfoText: {
    fontSize: 9,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 5
  },
  sepaIbanTitle: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 10
  },
  sepaIbanTextView: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
    alignItems: 'center'
  },
  sepaInputTextImage: {
    width: 32,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    marginRight: 15
  },
  sepaIbanTextInput: {
    borderWidth: 0,
    width: '100%'
  },
  sepaPaymentMethodText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  viewProfileText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  }
});
