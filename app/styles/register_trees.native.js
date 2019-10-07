import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default EStyleSheet.create({
  formPlantingLocation: {
    fontSize: 20,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    fontWeight: '500',
    fontFamily: 'OpenSans-Regular'
  },
  formPlantingDescription: {
    fontSize: 16,
    lineHeight: 15,
    color: '#4d5153',
    marginTop: 5,
    marginBottom: 15,
    fontWeight: '100'
  },
  errorView:{
    backgroundColor:'red',
    padding:1,
    color:'red',
  },
  errorText:{

    padding:2,
    color:'red',
  },
  formScrollView: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 0,
    paddingBottom: 10
  },
  formLabel: {
    lineHeight: 24,
    fontSize: 27
  },
  formHalfTextField: {
    flex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  formNameFields: { flex: 1, marginRight: 20 },
  showImage: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  formClassificationFields: {
    marginRight: 20,
    flex: 1
  },
  formView: { marginTop: 0 },
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
  masurmentSwitch: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.7
  },
  uploadImageLabel: {
    fontSize: 18,
    lineHeight: 30
  },
  formSwitchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  formClassificationLabel: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 27,
    fontWeight: '300'
  },
  formAddImageBlock: {},
  classificationBlock: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
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
    marginTop: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#909090'
  },
  labelEndDate: { fontSize: 12, marginTop: 2, fontFamily: 'OpenSans-Regular' },
  EndDate: { fontFamily: 'OpenSans-Regular', color: '#000000', lineHeight: 27 },
  form_error_text: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    fontFamily: 'OpenSans-Regular'
  },
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
  },
  // Competition Delete Button

  competitionDeleteButton: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    top: 14,
    zIndex: 5,
    position: 'absolute',
    right: 8
  },
  competitionDeleteImage: {
    height: 20,
    width: 20
  }
});
