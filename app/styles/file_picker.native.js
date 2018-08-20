import EStyleSheet from 'react-native-extended-stylesheet';

export default (datePickerStyle = EStyleSheet.create({
  filePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  underlineStyle: {
    height: 2,
    flex: 1,
    backgroundColor: '$inputBorderColor'
  },
  dateValueStyle: {
    color: '$textColor',
    fontSize: 17,
    paddingBottom: 1
  }
}));
