import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 20
  },
  textStyle: {
    marginBottom: 20,
    textAlign: 'center'
  }
});
