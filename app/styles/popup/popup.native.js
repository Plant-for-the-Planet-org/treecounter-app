import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { isAndroid } from '../../utils/utils';


const backgroundColor = 'rgba(0,0,0,0.46)';
const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default EStyleSheet.create({
  containerWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    backgroundColor
  },
  container: {
    backgroundColor: 'white',
    width: Layout.window.width * 0.8,
    height: isAndroid() ? 50 : Layout.window.height * 0.32,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
    borderRadius: 9
  },
  headerContainer: {
    marginBottom: 18
  },
  headerTextStyle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 24
  },
  bodyContainer: {
    marginBottom: 25
  },
  bodyTextStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 26
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15
  },
  cancelButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginRight: 24
  },
  cancelButtonTextStyle: {
    color: '#4d5153',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 14
  },
  applyButtonContainer: {},
  applyButtonTextStyle: {
    color: '#89b53a',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 14
  }
});
