import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
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
  profileImageBackground: {
    position: 'absolute',
    height: 15,
    left: 40,
    top: 40,
    width: 15,
    zIndex: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff'
  },
  addIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 15,
    height: 15,
    transform: [{ rotate: '45deg' }]
  }
});
