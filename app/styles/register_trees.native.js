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
  tabBarcontainer: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#ffffff',
    paddingTop: 0,
    borderLeftWidth: 0
  },
  tabBarTabItem: {},
  tabBarTextActive: {
    backgroundColor: '#89b53a',
    height: 3,
    width: 75,

    flex: 1
  },
  tabBarTextStyle: {
    color: '#4d5153',
    borderLeftWidth: 0,
    fontSize: 13,
    fontFamily: 'OpenSans-SemiBold',
    textTransform: 'capitalize'
  },
  mapEdgecut: {},
  textStyle: {
    fontFamily: 'OpenSans-Semibold',
    color: '#4d5153',
    fontSize: 18,
    lineHeight: 24
  },
  ufpTrees: {
    lineHeight: 40,
    letterSpacing: 0,
    fontSize: 27,
    textAlign: 'left',
    marginBottom: 7,
    fontFamily: 'OpenSans-ExtraBold',
    color: '#4d5153'
  },

  formPlantingLocation: {
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 0,
    marginTop: 40,
    textAlign: 'left',
    color: '#4d5153',
    fontFamily: 'OpenSans-Semibold'
  },
  formPlantingDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4d5153',
    marginTop: 5,
    marginBottom: 15,
    fontFamily: 'OpenSans-Regular'
  },
  errorView: {
    backgroundColor: 'red',
    padding: 1,
    color: 'red'
  },
  errorText: {
    padding: 2,
    color: 'red'
  },
  formScrollView: {
    backgroundColor: 'white',
    padding: 0,
    paddingBottom: 40
  },
  formLabel: {},
  formHalfTextField: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  formNameFields: { flex: 1, marginRight: 20 },
  showImage: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#000'
  },
  formClassificationFields: {
    flex: 1
  },
  formView: { marginTop: 0 },
  addImageTitle: {
    marginTop: 20,
    fontSize: 12,
    color: '#4d5153',
    fontFamily: 'OpenSans-SemiBold'
  },

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
    marginTop: 35,
    justifyContent: 'space-between'
  },
  formClassificationLabel: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 27,
    fontWeight: '300'
  },
  formAddImageBlock: { color: '#4d5153', fontFamily: 'OpenSans-Semibold' },
  classificationBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addImageButtonIcon: { maxHeight: 20, width: 26 },
  addDeleteButtonIcon: { justifyContent: 'center', alignItems: 'center' },
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
    opacity: 0.6,
    borderBottomColor: '#4d5153'
  },
  labelEndDate: {
    fontSize: 12,
    marginTop: 3,
    fontFamily: 'OpenSans-Semibold',
    color: '#4d5153'
  },
  EndDate: {
    fontFamily: 'OpenSans-Regular',
    color: '#4d5153',
    lineHeight: 27,
    fontSize: 18
  },
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
    borderRadius: 7
  },
  projectImageContainer: {
    height: Layout.window.width * 0.4,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 4
  },
  // Competition Delete Button

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
  competitionDeleteImage: {
    height: 20,
    width: 20
  },
  textFiledLabel: {
    fontFamily: 'OpenSans-Semibold',
    color: '#4d5153',
    height: 50
  },
  textFiledTitle: { fontFamily: 'OpenSans-Regular', color: '#4d5153' },
  triangleContainer: {
    width: 12,
    height: 6,
    overflow: 'hidden',
    alignItems: 'center',

    backgroundColor: 'transparent' /* XXX: Required */
  },
  triangle: {
    width: 8,
    height: 8,
    transform: [
      {
        translateY: -4
      },
      {
        rotate: '45deg'
      }
    ]
  },
  buttonContainer: {
    marginTop: 30
  }
});
