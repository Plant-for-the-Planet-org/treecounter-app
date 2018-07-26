import EStyleSheet from 'react-native-extended-stylesheet';

export default (buttonStyles = EStyleSheet.create({
  primaryButton: {
    height: 50,
    backgroundColor: '$primary',
    borderColor: '$primary',
    borderWidth: 1,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButtonText: {
    fontSize: 25,
    color: 'white',
    width: '100%',
    textAlign: 'center'
  }
}));
