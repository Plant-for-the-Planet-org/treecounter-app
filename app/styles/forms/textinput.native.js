import EStyleSheet from 'react-native-extended-stylesheet';

export default (textInputStyles = EStyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 20
  },
  container: {
    width: '100%'
  },
  imageStyle: { width: 26, height: 26, resizeMode: 'center' },
  textboxStyle: {
    flex: 1,
    marginLeft: 10,
    width: '80%',
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#cecece'
  }
}));
