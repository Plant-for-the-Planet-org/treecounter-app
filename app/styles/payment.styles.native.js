import EStyleSheet from 'react-native-extended-stylesheet';
export default (paymentStyles = EStyleSheet.create({
  imageStyle: {
    width: 17,
    height: 18,
    resizeMode: 'contain'
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#0e7baa',
    color: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    height: 50
  },
  logoContainer: {
    width: 50,
    height: 30
  },
  logoStyle: {
    flex: 1,
    resizeMode: 'contain'
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
