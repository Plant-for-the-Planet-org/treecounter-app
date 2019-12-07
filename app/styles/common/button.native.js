import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};

export default EStyleSheet.create({
  primaryButton: {
    height: 50,
    backgroundColor: '#89b53a',
    borderColor: '#89b53a',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButtonText: {
    fontSize: 25,
    color: 'white'
  },
  secondaryButton: {
    backgroundColor: '$colorPrimaryAccent',
    borderColor: '$colorPrimaryAccent'
  },
  followingButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorPrimaryAccent',
    height: 30,
    width: 100,
    marginRight: 10,
    padding: 5
  },
  followButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$primary',
    height: 30,
    width: 80,
    marginRight: 10,
    padding: 5
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 15
  },
  textContainer: {
    // width: '100%',
    flexDirection: 'row'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  image: {
    height: 30,
    width: 30
  },
  actionButtonTouchable: {
    width: '88%',
    marginLeft: '6%',
    position: 'absolute',
    top: '86%'
  },
  actionButtonView: {
    borderRadius: 100,
    backgroundColor: '#89b53a',
    height: 52,
    justifyContent: 'center'
  },
  actionButtonText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'OpenSans-Bold'
  },
  actionButtonSmallTouchable: {
    backgroundColor: '#89b53a',
    height: 54,
    width: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '82%',
    left: '82%'
  },
  actionButtonSmallImage: { height: 32, width: 32 },
  plusButton: {
    backgroundColor: '#89b53a',
    height: 54,
    width: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '13%',
    left: '80%'
  },
  plusButtonIcon: { fontSize: 30, color: '#fff' },

  // Styles for Dual action on a normal page, for example check edit competition page with delete and save button
  dualActionButtonTouchable1: {
    width: Layout.window.width * 0.4,
    position: 'absolute',
    top: '86%',
    left: '6%'
  },
  dualActionButtonTouchable2: {
    width: Layout.window.width * 0.4,
    right: '6%',
    position: 'absolute',
    top: '86%'
  },
  dualActionButtonView1: {
    borderRadius: 26,
    borderColor: '#e74c3c',
    borderWidth: 1,
    height: 52,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  dualActionButtonText1: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#e74c3c'
  },
  dualActionButtonView2: {
    borderRadius: 26,
    backgroundColor: '#89b53a',
    height: 52,
    justifyContent: 'center'
  },
  dualActionButtonText2: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#fff'
  },

  // Bottom action container and buttons
  baContainer: {
    padding: 20,
    paddingVertical: 30
  },
  baButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  baMessage: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 30,
    letterSpacing: 0.28,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  baContinueText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 27,
    letterSpacing: 0.26,
    color: 'white'
  },
  baContinueButton: {
    backgroundColor: '#e74c3c',
    width: 150,
    paddingVertical: 12,
    marginTop: 36,
    borderRadius: 40,
    height: 52,
    justifyContent: 'center'
  },
  baLaterText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 27,
    letterSpacing: 0.26,
    color: '#89b53a'
  },
  baLaterButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#89b53a',
    borderRadius: 40,
    width: 150,
    paddingVertical: 12,
    marginTop: 36,
    marginRight: 12,
    height: 52,
    justifyContent: 'center'
  }
});
