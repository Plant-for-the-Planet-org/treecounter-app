import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

let lineBreakMargin = -20;
if (Platform.OS === 'android') {
  lineBreakMargin = -30;
}
export default (faqStyles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    flexDirection: 'row',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 12,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'space-between'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: '#686060',
    paddingRight: 12,
    flex: 1
  },
  content: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 17,
    height: 18
  },

  a: {
    fontWeight: '300',
    color: '$colorPrimaryAccent'
  },
  p: { color: '#938989' },
  br: { marginBottom: lineBreakMargin }
}));
