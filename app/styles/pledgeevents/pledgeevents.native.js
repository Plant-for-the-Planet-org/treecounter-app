import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const width = Dimensions.get('window').width;

export default EStyleSheet.create({
  peRootView: { flex: 1, backgroundColor: 'white' },
  peRootScrollView: {
    backgroundColor: 'white',
    paddingBottom: 300
  },
  peHeaderLogo: {
    height: 70,
    width: 70,
    marginBottom: 10,
    borderRadius: 40
  },
  peSliderScrollView: { paddingRight: 20, height: 180, marginTop: 30 },
  peDescriptionView: {
    padding: 16,
    flexDirection: 'column',
    flex: 1,
    borderRadius: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5'
  },
  peDescriptionText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    fontFamily: 'OpenSans-Regular'
  },
  peSliderImage: {
    width: width * 0.75,
    borderRadius: 7,
    marginBottom: 10,
    marginLeft: 20
  },
  eventTitle: {
    fontSize: 27,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    fontFamily: 'OpenSans-Bold'
  },
  eventSubTitle: {
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7,
    fontFamily: 'OpenSans-Regular'
  },
  makePledgeButton: {
    width: '88%',
    marginLeft: '7%',
    position: 'absolute',
    bottom: '4%'
  },
  makePledgeButton2: {
    width: '80%',
    position: 'absolute',
    bottom: '5%',
    marginLeft: '10%'
  },
  makePledgeButtonView: {
    borderRadius: 100,
    backgroundColor: '#89b53a',
    height: 52,
    justifyContent: 'center'
  },
  makePledgeButtonText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'OpenSans-SemiBold'
  },
  // Pledge Tab View Styles
  tabViewButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  tabViewButtonText: {
    fontSize: 13,
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold'
  },
  tabViewTitleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  selectedTabButtonText: {
    color: '#89b53a'
  },
  selectedTabButtonView: {
    borderBottomWidth: 2,
    borderBottomColor: '#89b53a'
  },
  tabViewTitleText: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 26,
    marginBottom: 20,
    fontFamily: 'OpenSans-SemiBold',
    flex: 1
  },
  tabViewContentText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginBottom: 24,
    fontFamily: 'OpenSans-Regular',
    flex: 1
  },

  // Make Pledge Form Styles
  createPledgeRootView: {
    backgroundColor: 'white',
    flex: 1
  },
  titleText: {
    fontSize: 27,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 30,
    fontFamily: 'OpenSans-Bold'
  },
  pageTitle: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 27,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  subtitleText: {
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7,
    fontFamily: 'OpenSans-SemiBold'
  },
  formScrollView: {
    paddingHorizontal: 24,
    paddingBottom: 220
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
  pledgeSmallButton: {
    backgroundColor: '#89b53a',
    height: 54,
    width: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '10%'
  },
  pledgeSmallButtonIcon: { height: 32, width: 32 },

  // Bottom action

  baContainer: {
    padding: 20,
    paddingVertical: 30
  },
  baButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  baMessage: {
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.28,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: 18,
    fontFamily: 'OpenSans-Regular'
  },

  baSuccessImage: { height: 100, width: 100, alignSelf: 'center' },
  baContinueText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: 0.26,
    color: 'white',
    fontFamily: 'OpenSans-SemiBold'
  },
  baContinueButton: {
    backgroundColor: 'rgba(137, 181, 58, 0.8)',
    width: 150,
    paddingVertical: 14,
    marginTop: 36
  },
  baLaterText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: 0.26,
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'OpenSans-SemiBold'
  },
  baLaterButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#707070',
    width: 150,
    paddingVertical: 14,
    marginTop: 36,
    marginRight: 12
  },

  bottomButtonView: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    height: 88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '0%'
  },
  leftSection: {
    padding: 20
  },
  pledgeTreesAmount: {
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a',
    fontFamily: 'OpenSans-Bold'
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
  pledgeTreesAction: {
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
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  continueText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 4,
    fontFamily: 'OpenSans-SemiBold'
  }
});
