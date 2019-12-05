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
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153',
    marginVertical: 30
  },
  imageStyle: {
    width: 100,
    height: 100
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
  bottomRow2: {
    flexDirection: 'row',
    justifyContent: 'center'
    //marginVertical: 10
  },
  buttonStyle: {
    width: 312,
    height: 52,
    borderRadius: 100
  },
  buttonStyle2: {
    width: 312,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#fff'
  },
  gettingStartedBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  },
  alreadyHaveAccountBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#87b738'
  }
});
