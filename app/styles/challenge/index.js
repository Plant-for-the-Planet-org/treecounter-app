import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

export const centerTextInput =
  Platform.OS === 'android'
    ? {
        paddingTop: 0,
        paddingBottom: 0
      }
    : {};

const buttonStyle = {
  padding: 10,
  borderRadius: 6,
  marginLeft: 35,
  width: 100,
  height: 40
};
export default (editProfileStyle = EStyleSheet.create({
  challengeContainer: {
    flexDirection: 'column',

    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 0
  },
  challengeColumnContainer: {
    flexDirection: 'column',
    padding: 16
  },
  challengeViewContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  goalStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$colorPrimary'
  },
  statusLabel: {
    backgroundColor: '#e0e0e0',
    //Bug till 0.58 react native
    // textTransform: 'capitalize',
    ...buttonStyle,
    overflow: 'hidden',
    textAlign: 'center'
  },
  buttonStyle: {
    ...buttonStyle
  },
  limitWidth: {
    width: '60%',
    flexDirection: 'column'
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '40%',
    justifyContent: 'flex-end'
  },
  profileImage: {
    height: 40,
    width: 40
  },
  flexContainerStyle: {
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
    marginTop: 10
  },
  flexStyle: {
    flexDirection: 'row',
    paddingTop: 16
  },
  treecount_input: {
    paddingLeft: 8,
    width: 50,
    borderBottomWidth: 1,
    borderColor: '#686060',
    paddingBottom: 2,
    ...centerTextInput
  },
  challengeDate: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingLeft: 10
  },
  textChallengePadding: {
    paddingLeft: 5
  },
  textStyle: {
    fontSize: 14,
    color: '$lightTextColor'
  },
  textPadding: {
    paddingLeft: 10
  },
  imageStyle: {
    height: 15,
    width: 15
  }
}));
