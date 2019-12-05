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
  signInBtn: {
    fontWeight: 'bold'
  },
  zeroPercentComissionContainer: {
    marginVertical: 20
  },
  crossContainer: {
    borderColor: 'red',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10
  },
  zeroPercentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100
  },
  commisionStyle: {
    fontFamily: 'OpenSans',
    fontSize: 24,
    fontWeight: '300',
    color: '#87b738'
  },
  zeroStyle: {
    fontFamily: 'OpenSans',
    fontSize: 90,
    color: '#87b738'
  },
  percentStyle: {
    fontFamily: 'OpenSans',
    fontSize: 40,
    lineHeight: 122,
    color: '#87b738'
  },
  textHeader: {
    fontFamily: 'OpenSans',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153'
  },
  imageStyle: {
    width: 200,
    height: 200
  },
  textPara: {
    fontFamily: 'OpenSans',
    fontSize: 17,
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
  lowerTextStyle: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    color: '#4d5153'
  },
  lowerBtnStyle: {
    width: 312,
    height: 52,
    backgroundColor: 'white',
    borderWidth: 0
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
