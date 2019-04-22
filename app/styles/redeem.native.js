import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default (redeemStyles = EStyleSheet.create({
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
    paddingBottom: 16,
    alignItems: 'center'
  },
  headerContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20
  },
  titleText: {
    color: '#575756',
    fontSize: 15,
    textAlign: 'center'
  },
  imageStyle: {
    width: 59,
    height: 81,
    margin: 15
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
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '$colorRedeemBorder',
    borderStyle: 'solid',
    backgroundColor: '$colorRedeemInside',
    color: '$textColor',
    margin: 10,
    padding: 10,
    textAlign: 'center',
    paddingRight: 10
  },
  glyphiconTouch: {},
  glyphiconStyle: {
    position: 'absolute',
    padding: 10,
    right: 20,
    height: 25,
    top: -42,
    width: 25
  },
  iconCrossStyle: {
    width: '100%',
    height: '100%'
  },
  redeemInputView: {
    position: 'relative',
    width: '100%'
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
  }
}));
