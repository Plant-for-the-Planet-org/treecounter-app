import EStyleSheet from 'react-native-extended-stylesheet';

export default (textInputStyles = EStyleSheet.create({
  container: {
    // flexDirection: 'column',
    //flex: 1
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20
  },

  imageContainerStyle: {
    width: 20,
    height: 20
  },
  imageStyle: {
    width: '100%',
    height: '100%'
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
  },
  errorTextStyle: {
    color: '$colorError',
    fontSize: 11,
    marginTop: -12
  }
}));
