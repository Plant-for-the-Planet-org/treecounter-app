import EStyleSheet from 'react-native-extended-stylesheet';
export default (paymentStyles = EStyleSheet.create({
  imageStyle: {
    width: 17,
    height: 18,
    resizeMode: 'contain'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#0e7baa',
    color: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoContainer: {
    width: 200,
    height: 300
  },
  logoStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    // borderColor: '#0e7baa',
    // borderWidth: 1
  },
  headerText: {
    color: '#fff'
  }
}));
