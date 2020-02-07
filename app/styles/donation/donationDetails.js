import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const width = Dimensions.get('window').width;
export default EStyleSheet.create({
  scrollView: {
    padding: 24,
    marginTop: 90,
    paddingBottom: 320
  },
  pageTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 27,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },

  // Project Details
  projectDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  projectImage: {
    height: 32,
    width: 32,
    borderRadius: 16
  },
  projectNameAmount: {
    marginLeft: 10
  },
  projectName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    color: '#4d5153',
    display: 'flex',
    flexWrap: 'wrap'
    //maxWidth: '95%'
  },
  projectAmountView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  projectAmountImage: {
    height: 14,
    width: 14
  },
  projectAmountText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    color: '#4d5153'
  },

  // Project Details
  noprojectDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  noprojectImage: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0'
  },
  noprojectNameAmount: {
    marginLeft: 10,
    flexGrow: 1
  },
  noprojectName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    color: '#4d5153',
    display: 'flex',
    flexWrap: 'wrap'
  },
  noprojectAmountView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  noprojectAmountImage: {
    height: 14,
    width: 14
  },
  noprojectAmountText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    color: '#4d5153'
  },

  // Gift Details
  giftDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  giftImage: {
    height: 32,
    width: 32,
    borderRadius: 16
  },
  giftNameAmount: {
    marginLeft: 10,
    flexGrow: 1
  },
  giftName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    letterSpacing: 0.21,
    textAlign: 'left',
    color: '#4d5153',
    display: 'flex',
    flexWrap: 'wrap'
  },
  giftRecipient: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    color: '#4d5153'
  },

  // Tree Count Selector

  treeCountSelector: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  selectorView: {
    borderRadius: 7,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#d5d5d5',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: width * 0.26,
    marginRight: 10,
    flexGrow: 1
  },
  treeCountText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    color: '#4d5153',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 62
  },
  selectedView: {
    borderRadius: 7,
    borderColor: '#89b53a',
    borderWidth: 2,
    backgroundColor: '#fff',
    color: '#89b53a',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginRight: 10,
    flexGrow: 1,
    width: width * 0.26
  },
  selectedTreeCountText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#89b53a',
    display: 'flex',
    flexWrap: 'wrap'
    //maxWidth: 82
  },

  // Custom Tree Count Selector
  customSelectorView: {
    flexGrow: 2,
    width: width * 0.54
  },
  customSelectedView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 2,
    width: width * 0.54,
    display: 'flex',
    flexDirection: 'row'
  },
  customTreeCountText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153',
    display: 'flex',
    flexWrap: 'wrap'
  },

  // Donation Frequency
  repititionSelector: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20
  },
  repititionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153'
  },
  repititionSelectorView: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    height: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.26
  },
  selectedRepititionText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  repititionSelectedView: {
    borderRadius: 15,
    backgroundColor: '#89b53a',
    height: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.26
  },

  // Horizontal Divider
  horizontalDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#d5d5d5',
    marginTop: 20
  },

  // Commission
  coverCommissionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(0, 0, 0, 0.6)',
    width: width * 0.7
  },
  coverCommissionView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between'
  },

  // Tax Deductible
  notTaxDeductible: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 20
  },
  isTaxDeductibleText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(0, 0, 0, 0.6)',
    width: width * 0.7
  },
  isTaxDeductibleCountry: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#87b738',
    marginRight: 6
  },
  isTaxDeductibleView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between'
  },

  // Payment Process

  paymentProcessText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 20
  },

  // Country For Tax

  countryForTaxText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 200
  },

  // Payment Button
  bottomButtonView: {
    width: '100%',
    backgroundColor: '#f2f2f7',
    height: 96,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  leftSection: {
    padding: 20,
    //width: width * 0.75
    flexGrow: 1,
    justifyContent: 'center'
  },
  paymentTreeAmount: {
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a',
    fontFamily: 'OpenSans-Bold'
  },
  paymentTreeCount: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginLeft: 8
  },
  paymentTreeDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  otherPaymentButton: {
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  donationTree: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#707070',
    marginLeft: 6,
    fontFamily: 'OpenSans-SemiBold'
  },
  otherPaymentText: {
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 8,
    fontFamily: 'OpenSans-SemiBold'
  },
  continueButtonView: {
    backgroundColor: '#89b53a',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.25
  },
  continueButtonText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 6
  },

  // Input Selection

  treeCountTextInput: {
    borderColor: 'gray',
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 0,
    width: 50,
    color: '#fff'
  },
  treeCountTextInputSelected: {
    borderColor: '#89b53a',
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: 1,
    width: 75,
    color: '#89b53a',
    height: 24,
    marginRight: 2
  },
  treeCountNumber: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153',
    fontFamily: 'OpenSans-Regular'
  },
  treeCountNumberSelected: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'OpenSans-Regular'
  },

  // Donor Form

  formScrollView: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 24,
    paddingBottom: 100,
    minHeight: '100%'
  },
  formHalfTextField: { width: '45%' },

  formView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40
  },

  contactDetailsAddress: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },

  //
  sectionRightButton: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'right',
    color: '#89b53a'
  },
  sectionTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginBottom: 10
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30
  }
});
