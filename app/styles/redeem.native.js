import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default EStyleSheet.create({
  safeAreaViewContainer: { flex: 1, backgroundColor: 'white' },
  mainContainer: { flex: 1 },
  loadingContainer: {
    flex: 1,
    alignItems: 'center'
  },
  parentContainer: {
    flexDirection: 'column',
    flex: 1
  },

  contentContainer: {
    margin: 15,
    marginTop: 10,
    flexDirection: 'column'
  },
  formScrollView: {
    padding: 24,
    marginTop: 80,
    paddingBottom: 240
    // borderWidth: 1
    // minHeight: height * 0.94
  },
  cardContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 16,
    paddingBottom: 16
  },
  headerContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20
  },
  mainTitle: {
    // fontSize: 27,
    // lineHeight: 40,
    fontSize: height < 500 ? height * 0.032 : 27,
    lineHeight: height < 500 ? height * 0.032 * 1.375 : 40,
    fontFamily: 'OpenSans-Bold',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  titleText: {
    // fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    // lineHeight: 24,
    fontSize: height < 500 ? height * 0.0264 : 18,
    lineHeight: height < 500 ? height * 0.0264 * 1.375 : 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7
  },
  imageStyle: {
    width: height > 700 ? width * 0.889 : width * 0.889 * 0.75,
    height: height > 700 ? height * 0.235 : height * 0.235 * 0.75,
    marginTop: 42,
    alignSelf: 'center'
  },
  imageLoginStyle: {
    width: 50,
    height: 50,
    margin: 25
  },
  descriptionTextStyle: {
    color: '$textColor',
    fontSize: 15,
    margin: 15,
    textAlign: 'center'
  },
  errorTextStyle: {
    color: '$colorError',
    margin: 15,
    fontSize: 15,
    textAlign: 'center'
  },
  inputStyle: {
    backgroundColor: '$colorRedeemInside',
    color: '$textColor',
    width: '90%',
    paddingRight: 0,
    padding: 10,
    paddingLeft: 25,
    textAlign: 'center'
  },
  glyphiconStyle: {
    padding: 10,
    marginTop: 10,
    height: 25,
    width: 25
  },
  iconCrossStyle: {
    width: '100%',
    height: '100%'
  },
  redeemInputView: {
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '$colorRedeemBorder',
    borderStyle: 'solid',
    backgroundColor: '$colorRedeemInside',
    color: '$textColor',
    margin: 10,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10
  },
  loginButtons: {
    flex: 1,
    flexDirection: 'row'
  },
  loginButton1: {
    margin: 20
  },
  buttonStyle: {
    margin: 20
  },

  // Validate Code Input

  validateCodeInputContainer: { marginTop: 40 },
  validateCodeButton: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  validateCodeButtonView: {
    width: '88%',
    borderRadius: 100,
    backgroundColor: '#89b53a',
    height: 52,
    justifyContent: 'center'
  },
  validateCodeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  },

  // Add Trees Page

  subheader: { marginTop: 110, padding: 24 },
  subheaderClaiming: { fontFamily: 'OpenSans-SemiBold', fontSize: 18 },
  subheaderTrees: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    marginTop: 42
  },
  alreadyRedeemed: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    marginTop: 42,
    color: '#e74c3c'
  },
  singleRedeemObject: { borderBottomWidth: 1, borderBottomColor: '#d5d5d5' },
  redeemObjectDate: {
    backgroundColor: '#f7f7f7',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    padding: 20
  },
  redeemObjectDateText: { fontFamily: 'OpenSans-Regular', fontSize: 14 },
  redeemObjectTreesContainer: { paddingHorizontal: 20, paddingVertical: 16 },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6
  },
  redeemObjectTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#4d5153'
  },
  redeemObjectTrees: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#89b53a'
  },
  redeemObjectSubTitle: { fontFamily: 'OpenSans-Regular', fontSize: 13 }
});
