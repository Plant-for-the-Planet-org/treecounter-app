import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
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
  }
});
