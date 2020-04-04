import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

// const Layout = {
//     window: {
//         height: Dimensions.get('window').height - (56 + 70 + 20),
//         width: Dimensions.get('window').width
//     }
// };
export default EStyleSheet.create({
  formScrollView: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 24,
    paddingBottom: 120,
    minHeight: '100%'
  },
  view_container: { backgroundColor: 'white', flex: 1 },

  gtDescription: {
    padding: 12,
    color: '#c4bfbf',
    marginRight: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    maxWidth: '90%'
  },
  gtDescImage: { width: 36, height: 36, marginRight: 6 },
  giftMessageText: {
    height: 50,
    fontFamily: 'OpenSans-Regular',
    fontSize: 13
  },

  errorText: {
    color: '#ff0033',
    fontSize: 11,
    fontFamily: 'OpenSans-Regular'
  },
  description: {
    fontSize: 16,
    color: '#4d5153',
    fontFamily: 'OpenSans-Regular'
  },

  // New Designs

  nMainContainer: {
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 30 : 70,
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%'
  },
  nGiftDesc: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 8
  },
  giftImage: {
    maxWidth: 246,
    maxHeight: 158,
    alignSelf: 'center',
    marginTop: 24
  },
  actionButtonView: {
    borderRadius: 100,
    backgroundColor: '#89b53a',
    height: 52,
    justifyContent: 'center'
  },
  actionButtonView2: {
    borderRadius: 100,
    borderColor: '#89b53a',
    borderWidth: 1,
    height: 52,
    justifyContent: 'center'
  },
  actionButtonText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'OpenSans-Bold'
  },
  actionButtonText2: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#89b53a',
    fontFamily: 'OpenSans-Bold'
  },
  selectContactTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 40,
    marginBottom: 25
  },
  contactDisplayName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  contactEmail: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 2
  },
  headerText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 27,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  }
});
