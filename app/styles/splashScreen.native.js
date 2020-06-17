import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  updateMainView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateTitle: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 54
  },
  updateImage: {
    width: 150,
    height: 150
  },
  updateExplanation: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153',
    marginHorizontal: 44,
    marginTop: 7
  },
  updateButtonStyle: {
    height: 52,
    borderRadius: 100,
    backgroundColor: '#89b53a',
    width: '86%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '7%'
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  }
});
