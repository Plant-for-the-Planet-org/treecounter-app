import EStyleSheet from 'react-native-extended-stylesheet';

export default (datePickerStyle = EStyleSheet.create({
  datePickerContainer: {
    marginLeft: 10,
    flex: 1
  },
  underlineStyle: {
    height: 1,
    flex: 1,
    backgroundColor: '$inputBorderColor'
  },
  dateValueStyle: {
    color: '$textColor',
    fontSize: 13,
    paddingBottom: 7
  }
}));
