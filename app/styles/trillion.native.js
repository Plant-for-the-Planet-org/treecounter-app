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
    textAlign: 'left',
    margin: 12,
    fontFamily: 'OpenSans-Regular'
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
    // fontWeight: '600',
    // fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    fontFamily: 'OpenSans-SemiBold'
  },
  googleCardPara: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    flex: 3,
    marginRight: 20,
    fontFamily: 'OpenSans-Regular'
  },
  googleCardButton: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a',
    marginTop: 16,
    fontFamily: 'OpenSans-SemiBold'
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
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'OpenSans-Regular'
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
    borderColor: '#d5d5d5',
    maxWidth: 340,
    padding: 20
  },
  featuredProjectCardRow: {
    display: 'flex',
    flexDirection: 'row'
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
    marginTop: 5,
    alignItems: 'center'
  },
  featuredProjectCardIconText: { fontFamily: 'OpenSans-Regular', fontSize: 12 },

  // Unfulfilled Pledge

  unfulfilledEventCard: {
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 20
  },
  ufpColumn: {
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'column'
  },
  ufpTrees: {
    lineHeight: 40,
    letterSpacing: 0,
    fontSize:27,
    textAlign: 'left',
    marginBottom: 7,
    fontFamily: 'OpenSans-ExtraBold',
    color:'#4d5153',
  },
  textStyle:{
    fontFamily: 'OpenSans-Semibold',
    color:'#4d5153',
    fontSize:18,
    lineHeight:24,
  },
  ufpLeftSection: { flexDirection: 'row', justifyContent: 'space-between' },
  ufpCostView: {
    borderRadius: 100,
    backgroundColor: '#f2f2f7',
    padding: 4
  },
  ufpCostText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#89b53a',
    fontFamily: 'OpenSans-Bold'
  },
  ufpPlantNow: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#707070',
    marginTop: 8,
    fontFamily: 'OpenSans-Regular'
  },
    tabBarcontainer: {
      flex: 1
    },
    tabBar: {
      backgroundColor: '#ffffff',
      marginTop: 10,
    },
    tabBarTabItem: {},
    tabBarTextActive: {
      backgroundColor: '#89b53a',
      height: 3,
      width: 74,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3
    },
    tabBarTextStyle: {
      color: '#4d5153',
      fontSize: 13,
      fontFamily: 'OpenSans-SemiBold',
      textTransform: 'capitalize',

    }
});
