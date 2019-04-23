import EStyleSheet from 'react-native-extended-stylesheet';

export default (editProfileStyle = EStyleSheet.create({
  buttonStyle: {
    borderColor: '#b8da8d',
    backgroundColor: '#b8da8d',
    borderWidth: 0,
    borderRadius: 6,
    padding: 10,
    margin: 0,
    height: 30
  },
  primaryButtonText: {
    fontSize: 15
  },
  textStyle: {
    fontSize: 15,
    color: '#666666'
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));
