import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default EStyleSheet.create({
  add_competition_title: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },

  formScrollView: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 24,
    paddingBottom: 120
  },

  formHalfTextField: { width: '45%' },

  formView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  showImage: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },

  addImageTitle: { marginTop: 20, fontSize: 16 },

  addImageButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'flex-start'
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
  addImageButton2: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center'
  },
  addImageButtonIcon: { maxHeight: 20, width: 26 },
  addedImage: {
    maxWidth: 80,
    height: 80,
    marginTop: 6,
    borderRadius: 4,
    overflow: 'hidden'
  },
  datePickerUnderline: {
    width: '100%',
    marginTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#909090'
  },
  labelEndDate: { fontSize: 12, marginTop: 2 },
  form_error_text: { fontSize: 12, color: 'red', marginTop: 4 },
  view_container: { backgroundColor: 'white', flex: 1 },
  picker_container: {
    height: 50,
    width: '100%',
    padding: 0,
    margin: 0
  },
  teaser__projectImage: {
    flex: 1,
    overflow: 'hidden',
    marginTop: 6,
    borderRadius: 4
  },
  projectImageContainer: {
    height: Layout.window.width * 0.4,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 4
  }
});
