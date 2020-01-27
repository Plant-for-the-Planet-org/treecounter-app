import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    // paddingTop: 23
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subHeadContainer: {
    marginTop: 7,
    paddingHorizontal: 20
  },
  subHeaderText: {
    color: '#4D5153',
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold'
  },
  italic: {
    fontStyle: 'italic'
  },
  mapView: {
    width: '100%',
    height: Dimensions.get('window').height * 2 / 5,
    position: 'relative'
  },
  closeIcon: {
    position: 'absolute',
    top: 30,
    left: 14
  },
  dateContainer: {
    position: 'absolute',
    left: 20,
    bottom: -14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    borderColor: '#D5D5D5',
    borderWidth: 1
  },
  closeContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plantedDate: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14
  },
  icon: {
    width: 24,
    height: 24
  },
  iconContainer: {
    minWidth: 38,
    minHeight: 38,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40
  },
  treeCount: {
    fontSize: 27,
    color: '#4D5153',
    fontFamily: 'OpenSans-ExtraBold'
  },
  text: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 5
  },
  buttonsWrapper: {
    flex: 1,
    justifyContent: 'space-between'
  },
  buttonGroup: {
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 100,
    padding: 14,
    alignItems: 'center',
    width: Dimensions.get('window').width * 42 / 100
  },
  borderGreen: {
    borderWidth: 1,
    borderColor: '#89B53A'
  },
  borderedButtonText: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#89B53A',
    fontSize: 16,
    marginLeft: 10
  },
  bgGreen: {
    backgroundColor: '#89B53A'
  },
  bgButtonText: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#fff',
    fontSize: 16,
    marginLeft: 10
  },
  plantedButtonWrapper: {
    alignItems: 'center',
    backgroundColor: '#d5d5d5',
    borderBottomLeftRadius: 4
  },
  plantedText: {
    paddingVertical: 10,
    color: '#4d5153'
  },
  itemContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  markerCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#89b53a',
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
