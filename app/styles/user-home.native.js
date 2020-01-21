import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

//Only take multiple of 10s
const squareDimension =
  Math.floor(
    Math.min(Dimensions.get('window').width, Dimensions.get('window').height) /
      10
  ) * 10;

export default EStyleSheet.create({
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
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#4d5153',
    marginTop: 16,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  linkText: {
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#89b53a'
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
  profileTypeImage: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  profileTypeStyle: {
    color: '#ffffff',
    fontSize: 15
  },

  // Button Designs
  buttonViewRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20
  },
  secondaryButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#89B53A',
    paddingVertical: 6,
    height: 32,
    flex: 1,
    justifyContent: 'center',
    marginRight: 20
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    alignSelf: 'center',
    color: '#89B53A'
  },
  primaryButton: {
    borderRadius: 16,
    backgroundColor: '#89B53A',
    paddingVertical: 6,
    height: 32,
    flex: 1,
    justifyContent: 'center'
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    alignSelf: 'center',
    color: '#fff'
  },

  // Dedicated Trees design

  dedicatedContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 20
  },
  dedicatedContainer2: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  dedicatedTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153'
  },
  dedicatedEdit: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#89b53a'
  },
  dedicatedName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153',
    marginLeft: 10
  },

  // Competitions
  competitionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  }
});
