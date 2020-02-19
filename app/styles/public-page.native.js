import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    width: Dimensions.get('window').width,
    justifyContent: 'space-between'
  },
  giftIcon: {
    marginRight: 10
  },
  tableHeader: {
    flexDirection: 'row',
    height: 40
  },
  firstColumn: {
    flex: 1.5
  },
  secondColumn: {
    flex: 1
  },
  thirdColumn: {
    flex: 1
  },
  fourthColumn: {
    flex: 1,
    height: 30
  },
  supportText: {
    color: '#ec6453'
  },
  bottomActionArea: {
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    height: 88
  },

  centeredContentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  supportUserText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginLeft: 20,
    maxWidth: '50%'
  },
  fullHeightButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#89b53a',
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 26
  },
  primaryButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
    marginRight: 10
  }
});
