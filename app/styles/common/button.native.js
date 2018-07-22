import EStyleSheet from 'react-native-extended-stylesheet';

export default (buttonStyles = EStyleSheet.create({
  primaryButton: {
    height: 25,
    width: 100,
    backgroundColor: '$primary',
    borderColor: '$primary',
    borderWidth: 1,
    borderRadius: 5
  },
  primaryButtonText: {
    fontSize: 12,
    color: 'white',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    lineHeight: 30
  }
}));
