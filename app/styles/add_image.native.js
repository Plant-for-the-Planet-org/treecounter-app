import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
// import {row, margin_top10} from './common/common_styles';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default EStyleSheet.create({
  teaser__projectImage: {
    flex: 1,
    overflow: 'hidden',
    marginTop: 6,
    borderRadius: 7
  },
  competitionDeleteButton: {
    width: 70,
    height: 150,
    marginTop: 6,
    zIndex: 5,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    right: 0,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addDeleteButtonIcon: { justifyContent: 'center', alignItems: 'center' },
  addImageButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  addImageTitle: {
    marginTop: 20,
    fontSize: 12,
    color: '#4d5153',
    fontFamily: 'OpenSans-SemiBold'
  },

  addImageButton1: {
    justifyContent: 'center',
    marginRight: 16,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center'
  },
  addImageButtonIcon: { maxHeight: 20, width: 26 },
  addImageButton2: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center'
  }
});
