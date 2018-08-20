import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const cardWidth = width - 40;
export default (registerTreesStyle = EStyleSheet.create({
  container: {
    // flex: 1
  },
  registerTree__form: {
    width: width - 60,
    flexDirection: 'column',
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  registerTree__form__row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}));
