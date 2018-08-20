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
    width: width - 60,
    flexDirection: 'column',
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  registerTree__form__row: row,
  registerTree__form__alignLeftRow: {
    alignSelf: 'flex-start',
    ...row
  },
  margin_top10
}));
