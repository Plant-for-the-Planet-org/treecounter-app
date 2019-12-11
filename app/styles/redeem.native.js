import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scrollContainer: {},
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
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7
  },
  imageStyle: {
    width: 320,
    height: 174,
    marginTop: 24
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
  }
});
