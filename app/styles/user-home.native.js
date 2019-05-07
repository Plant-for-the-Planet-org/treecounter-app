import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';

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
    padding: 10,
    marginBottom: 10
  },
  userProfileImage: {
    borderWidth: 5,
    borderColor: '#fff'
  },
  footerText: {
    color: '#686060',
    padding: 10
  },
  linkText: {
    color: '$colorPrimaryAccent',
    padding: 10
  },
  circle: {
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#fff',
    position: 'absolute',
    height: 60,
    width: 60
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2
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
