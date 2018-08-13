import EStyleSheet from 'react-native-extended-stylesheet';

export default (textInputStyles = EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column'
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20
  },

  imageContainerStyle: {
    width: 20,
    height: 20
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  textboxStyle: {
    flex: 1,
    height: 35,
    marginLeft: 10,
    width: '80%',
    fontSize: 13,
    color: '#686060',
    borderBottomWidth: 1,
    borderColor: '#cecece'
  },
  emptyView: {
    width: 20,
    height: 20
  }
}));
