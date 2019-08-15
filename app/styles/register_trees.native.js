import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const cardWidth = width - 40;
import { row, margin_top10 } from './common/common_styles';
export default (registerTreesStyle = EStyleSheet.create({
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
}));
