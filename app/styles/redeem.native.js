import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

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
  }
});
