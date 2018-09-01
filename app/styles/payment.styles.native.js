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
    height: 100,
    margin: 10,
    backgroundColor: '#0e7baa',
    color: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  content: {
    borderColor: '#0e7baa',
    borderWidth: 1
  }
}));
