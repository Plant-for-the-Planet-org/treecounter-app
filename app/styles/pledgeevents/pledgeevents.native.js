import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Fonts } from './../../utils/fonts';

const width = Dimensions.get('window').width;

export default (pledgeeventsStyle = EStyleSheet.create({
  peRootView: { flex: 1, height: '100%' },
  peRootScrollView: {
    backgroundColor: 'white',
    paddingBottom: 108
  },
  peHeader: { marginTop: 20, marginHorizontal: 20 },
  peHeaderLogo: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginBottom: 10
  },
  peSliderScrollView: { paddingRight: 20, height: 180, marginTop: 30 },
  peDescriptionView: {
    padding: 16,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    borderRadius: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5'
  },
  peDescriptionText: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  peSliderImage: {
    width: width * 0.75,
    borderRadius: 7,
    marginBottom: 10,
    marginLeft: 20
  },
  eventTitle: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  eventSubTitle: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7
  },
  makePledgeButton: {
    width: '88%',
    marginLeft: '7%',
    position: 'absolute',
    top: '90%'
  },
  makePledgeButton2: {
    width: '100%',
    marginLeft: '6%',
    position: 'absolute',
    top: '90%'
  },
  makePledgeButtonView: {
    borderRadius: 100,
    backgroundColor: '#89b53a',
    height: 52,
    justifyContent: 'center'
  },
  makePledgeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  },
  // Pledge Tab View Styles
  tabViewButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    justifyContent: 'space-around'
  },
  tabViewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: 'center'
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

  // Make Pledge Form Styles
  titleText: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 2
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
    padding: 24,
    paddingTop: 0
  },

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
    top: '90%',
    left: '88%'
  },

  baMessage: {
    fontSize: 20,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 30,
    letterSpacing: 0.28,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: 18
  },

  baSuccessImage: { height: 100, width: 100, alignSelf: 'center' },
  baContinueText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0.26,
    color: 'white'
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
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0.26,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  baLaterButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#707070',
    width: 150,
    paddingVertical: 14,
    marginTop: 24
  }
}));
