import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const width = Dimensions.get('window').width;
export default EStyleSheet.create({
  scrollView: {
    padding: 24,
    paddingBottom: 320,
    paddingTop: 0
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
    fontFamily: 'OpenSans-Regular',
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
    color: '#4d5153',
    marginLeft: 8
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
  supportUser: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5
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
  supportUserNameContainer: {
    marginLeft: 10,
    flexGrow: 1,
    justifyContent: 'center'
  },
  supportUserName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    letterSpacing: 0.1,
    textAlign: 'left',
    color: '#4d5153',
    display: 'flex',
    flexWrap: 'wrap'
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
  giftTreesAddRecepient: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a',
    marginTop: 10
  },
  giftTreesTreeCountNumber: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'right',
    color: '#89b53a',
    marginRight: 4
  },
  giftTreesSelectTrees: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.6)'
  },

  // Tree Count Selector

  treeCountSelector: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  selectorView: {
    borderRadius: 7,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    minHeight: 54,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: width * 0.24
  },
  treeCountText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    color: '#4d5153',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 42
  },
  selectedView: {
    borderRadius: 7,
    borderColor: '#89b53a',
    borderWidth: 1,
    minHeight: 54,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: width * 0.24
  },
  selectedTreeCountText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#89b53a',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 42
  },

  // Custom Tree Count Selector
  customSelectorView: {
    borderRadius: 7,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    minHeight: 54,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    flexGrow: 1,
    marginLeft: 20
  },
  customSelectedView: {
    borderRadius: 7,
    borderColor: '#89b53a',
    borderWidth: 1,
    minHeight: 54,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20
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
    borderRadius: 32,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    minHeight: 32,
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
    borderRadius: 32,
    backgroundColor: '#89b53a',
    minHeight: 32,
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
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(0, 0, 0, 0.6)',
    width: width * 0.7
  },
  isTaxDeductibleCountry: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#87b738',
    marginRight: 6
  },
  isTaxDeductibleView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
    marginBottom: 200
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
    color: '#4d5153'
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
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 8,
    fontFamily: 'OpenSans-SemiBold'
  },
  continueButtonView: {
    backgroundColor: '#89b53a',
    paddingVertical: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 26,
    right: 20
  },
  continueButtonText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    letterSpacing: 0.21,
    color: '#ffffff',
    marginRight: 12
  },
  continueOtherButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 26
  },
  continueOtherButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
    letterSpacing: 0.21,
    color: '#89b53a',
    marginRight: 5.4,
    marginTop: 18
  },
  nativePayButton: {
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 36,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#d5d5d5',
    marginTop: -48
  },
  // Input Selection

  treeCountTextInput: {
    borderColor: 'gray',
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 0,
    width: 100,
    color: '#fff',
    fontFamily: 'OpenSans-SemiBold'
  },
  treeCountTextInputSelected: {
    padding: 0,
    width: 100,
    color: '#89b53a',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16
  },
  treeCountNumber: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153',
    fontFamily: 'OpenSans-SemiBold'
  },
  treeCountNumberSelected: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#89b53a',
    fontFamily: 'OpenSans-SemiBold'
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
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#eeeeee'
  },

  // Pledge Event Details
  titlePledge: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    textTransform: 'uppercase'
  },
  pledgeDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  pledgeImage: {
    height: 32,
    width: 32,
    borderRadius: 16
  },
  pledgeNameAmount: {
    marginLeft: 10
  },
  pledgeName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#4d5153',
    display: 'flex',
    flexWrap: 'wrap'
    //maxWidth: '95%'
  },
  pledgeAmountView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4
  },
  pledgeAmountImage: {
    height: 14,
    width: 14
  },
  pledgeAmountText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    color: '#4d5153'
  },
  pledgeTreeCountError: {
    fontFamily: 'OpenSans-Regular',
    color: '#e74c3c',
    marginTop: 8,
    fontSize: 12
  }
});
