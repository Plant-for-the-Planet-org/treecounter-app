import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { Fonts } from './../utils/fonts';

export default (trillionStyles = EStyleSheet.create({
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
    borderRadius: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5'
  },
  pledgeContainer: {
    flexDirection: 'column',
    flex: 1
  },
  pledgeText: {
    color: '#b7afad',
    fontSize: 15,
    marginBottom: 15,
    margin: 15
  },
  pledgeEventContainer: {
    flexDirection: 'row',
    flex: 1
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
    marginBottom: 15,
    textAlign: 'justify',
    margin: 12
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
  },
  googleCardTitle: {
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  googleCardPara: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    flex: 3,
    marginRight: 20
  },
  googleCardButton: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a',
    marginTop: 16
  },
  googleCardParaContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 14
  },
  horizontalLine: {
    borderColor: '#d5d5d5',
    width: '100%',
    borderBottomWidth: 1
  },
  trillionTreeEventTitle: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  tpoCardText: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 14
  },
  tpoCardButton: {
    borderColor: '#d5d5d5',
    width: '100%',
    borderBottomWidth: 1
  },
  featuredProjectCard: {
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5'
  },
  featuredProjectCardRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20
  },
  featuredProjectCardImage: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  featuredProjectCardIcon: {
    width: 19,
    height: 19,
    marginRight: 5,
    resizeMode: 'cover'
  },
  featuredProjectCardIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5
  },
  featuredProjectCardIconText: { fontWeight: '300' }
}));
