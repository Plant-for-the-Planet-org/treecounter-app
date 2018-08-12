import EStyleSheet from 'react-native-extended-stylesheet';

export default (textInputStyles = EStyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 20
  },
  container: {
    width: '100%',
    flexDirection: 'column'
  },
  imageStyle: { width: 26, height: 26, resizeMode: 'contain' },
  textboxStyle: {
    flex: 1,
    marginLeft: 10,
    width: '80%',
    fontSize: 16,
    color: '#686060',
    borderBottomWidth: 1,
    borderColor: '#cecece'
  },
  emptyView: {
    width: 26,
    height: 26
  }
}));
