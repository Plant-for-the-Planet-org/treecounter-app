import EStyleSheet from 'react-native-extended-stylesheet';
// import { Dimensions } from 'react-native';

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
    color: '#4d5153'
  }
});
