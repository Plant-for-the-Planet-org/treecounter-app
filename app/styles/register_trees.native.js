import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
// eslint-disable-next-line no-unused-vars
const { width } = Dimensions.get('window');

import { row, margin_top10 } from './common/common_styles';
export default EStyleSheet.create({
  container: {
    // flex: 1
  },
  registerTree__form: {
    flexDirection: 'column',
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  registerTree__form__row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  registerTree__form__alignLeftRow: {
    alignSelf: 'flex-start',
    ...row
  },
  registerTree__form__row__split: {
    alignSelf: 'flex-start',
    width: '100%'
  },
  margin_top10
});
