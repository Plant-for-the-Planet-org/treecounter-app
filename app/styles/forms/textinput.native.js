import EStyleSheet from 'react-native-extended-stylesheet';

export default (textInputStyles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
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
    height: 35,
    flexGrow: 1,
    marginLeft: 10,
    fontSize: 13,
    color: '#686060',
    borderBottomWidth: 1,
    borderColor: '$inputBorderColor'
  },
  emptyView: {
    width: 20,
    height: 20
  }
}));
