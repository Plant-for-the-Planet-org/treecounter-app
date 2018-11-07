import EStyleSheet from 'react-native-extended-stylesheet';

export default (datePickerStyle = EStyleSheet.create({
  filePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  },
  addIcon: {
    position: 'absolute',
    height: 15,
    left: 50,
    top: 50,
    width: 15
  }
}));
