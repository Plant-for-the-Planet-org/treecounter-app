import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

//Only take multiple of 10s
const squareDimension =
  Math.floor(
    Math.min(Dimensions.get('window').width, Dimensions.get('window').height) /
      10
  ) * 10;

export default (buttonStyles = EStyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3
  },
  userProfileContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    marginBottom: 10
  },
  circle: {
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#fff',
    position: 'absolute',
    height: 70,
    width: 70
  },
  userInfo: {
    padding: 10,
    flexDirection: 'column'
  },
  userInfoName: {
    marginBottom: 10
  },
  svgContainer: {
    width: squareDimension,
    height: squareDimension,
    maxWidth: '100%',
    maxHeight: '100%'
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    padding: 5
  },
  nameStyle: {
    fontSize: 17,
    color: '$textColor'
  },
  userInfoProfileType: {
    flexDirection: 'row'
  },
  profileTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c7c7c6',
    height: 30,
    marginRight: 10,
    padding: 5
  },
  profileTypeStyle: {
    color: '#ffffff',
    fontSize: 15
  }
}));
