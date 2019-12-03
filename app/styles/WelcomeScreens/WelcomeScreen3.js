import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  inActiveDot: {
    width: 7,
    height: 7,
    backgroundColor: '#e6e9ec',
    marginHorizontal: 5,
    borderRadius: 5
  },
  activeDot: {
    width: 7,
    height: 7,
    backgroundColor: '#89b53a',
    marginHorizontal: 5,
    borderRadius: 5
  },
  crossContainer: {
    borderColor: 'red',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10
  },
  textHeader: {
    fontFamily: 'OpenSans',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153'
  },
  signInBtn: {
    fontWeight: 'bold'
  },
  imageStyle: {
    width: 200,
    height: 200
  },
  textPara: {
    fontFamily: 'OpenSans',
    fontSize: 20,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4d5153'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonStyle: {
    width: 312,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#89b53a'
  },
  alreadyHaveAccountBtn: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    color: '#4d5153'
  },
  alreadyHaveAccountContainer: {
    width: 312,
    height: 52,
    backgroundColor: 'white',
    borderWidth: 0
  },
  textInputfield: {
    marginTop: 20,
    height: 40,
    width: 200,
    color: '#afacac',
    borderWidth: 1,
    padding: 2,
    backgroundColor: '#f0f2f1',
    textAlign: 'center'
  },
  continueBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  }
});
