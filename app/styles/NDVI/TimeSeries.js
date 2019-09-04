import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

let lineBreakMargin = -20;
if (Platform.OS === 'android') {
  lineBreakMargin = -30;
}
export default (timeSeriesStyle = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 13
  }
}));
