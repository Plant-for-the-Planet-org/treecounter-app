import EStyleSheet from 'react-native-extended-stylesheet';

export default (datePickerStyle = EStyleSheet.create({
  filePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  underlineStyle: {
    height: 2,
    flex: 1,
    backgroundColor: '#dad7d7'
  },
  dateValueStyle: {
    color: '$textColor',
    fontSize: 17,
    paddingBottom: 1
  }
}));
