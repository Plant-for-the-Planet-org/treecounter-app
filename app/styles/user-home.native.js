import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

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
    textAlign: 'right',
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
  },
  competitionsView: {
    borderColor: '#d5d5d5',
    borderWidth: 1,
    borderRadius: 4,
    width: width * 0.44,
    marginRight: 20,
    marginTop: 20
  },
  competitionsImageView: {
    height: width * 0.44 * 0.5625,
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden'
  },
  competitionsNoImageView: {
    height: width * 0.44 * 0.5625,
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  competitionNameText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  competitionsInfoView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  competitionsInfoGoal: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  competitionsInfoActive: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'right',
    color: '#87b738'
  },

  sectionTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    paddingLeft: 20,
    paddingBottom: 20
  },
  showMoreTouchable: {
    width: 138,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#4d5153',
    alignSelf: 'center',
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  showMoreView: { backgroundColor: '#f7f7f7', paddingVertical: 20 },
  showMoreText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#4d5153',
    textAlign: 'center'
  },

  // Support

  oneContryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 20,
    borderWidth: 0,
    minHeight: 80
  },
  indexContainer: {
    width: 27,
    marginRight: 10,
    borderWidth: 0
  },
  indexText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    textAlign: 'right',
    color: '#4d5153'
  },
  countryFlagContainer: {
    flex: 0.2
  },
  countryFlagImage: {
    width: 54,
    height: 54,
    borderRadius: 100
  },
  countryBody: {
    flex: 0.7
  },
  countryNameText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    color: '#4d5153',
    lineHeight: 24
  },
  treesCounter: {
    fontFamily: 'OpenSans-Bold'
  },
  treesText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: '#4d5153',
    lineHeight: 25
  }
});
