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
  borderRadius: 6,
  paddingLeft: 10,
  paddingRight: 10,
  height: 35,
  width: '100%'
};
// const Layout = {
//   window: {
//     height: Dimensions.get('window').height - (56 + 70 + 20),
//     width: Dimensions.get('window').width
//   }
// };

const editProfileStyle = EStyleSheet.create({
  challengeContainer: {
    flexDirection: 'column',

    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  challengeColumnContainer: {
    flexDirection: 'column',
    padding: 16
  },
  challengeViewContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    justifyContent: 'space-between'
  },
  goalStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '$colorPrimary'
  },
  moreButtonStyle: {
    backgroundColor: '#e0e0e0',
    height: 35,
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#e0e0e0'
  },
  moreButtonTextStyle: {
    color: '$textColor',
    fontSize: 14,
    height: 30,
    marginTop: 10
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
    paddingRight: 10,
    flexDirection: 'column'
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    margin: 0
  },
  flexContainerStyle: {
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
    marginTop: 10
  },
  flexStyle: {
    flexDirection: 'row',
    paddingTop: 16,
    width: '100%'
  },
  treecount_input: {
    paddingLeft: 8,
    width: 80,
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
    width: '80%',
    flexWrap: 'wrap',
    flexShrink: 1,
    color: '$lightTextColor'
  },
  buttonTextStyle: {
    fontSize: 14,
    color: '#ffffff',
    height: 30,
    marginTop: 10
  },
  textPadding: {
    paddingLeft: 10,
    flexDirection: 'row'
  },
  imageStyle: {
    height: 15,
    width: 15
  }
});

export default editProfileStyle;
