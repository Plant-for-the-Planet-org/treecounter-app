import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform, StyleSheet, Dimensions } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

const { height, width } = Dimensions.get('window');

export const getAppBarHeight = isLandscape => {
  return Platform.OS === 'ios'
    ? isLandscape && !Platform.isPad
      ? 32
      : 44
    : 56;
};

let platformContainerStyles;
if (Platform.OS === 'ios') {
  platformContainerStyles = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .3)'
  };
} else {
  platformContainerStyles = {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth
    },
    elevation: 4
  };
}

export default (styles = EStyleSheet.create({
  container: {
    backgroundColor: '$primary',
    paddingTop: STATUSBAR_HEIGHT,
    height: STATUSBAR_HEIGHT + getAppBarHeight(width > height),
    ...platformContainerStyles
  },
  appBar: {
    flex: 1
  },
  header: {
    flexDirection: 'row'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    bottom: 0,
    left: TITLE_OFFSET,
    right: TITLE_OFFSET,
    top: 0,
    position: 'absolute',
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start'
  },
  left: {
    left: 0,
    bottom: 0,
    top: 0,
    position: 'absolute'
  },
  right: {
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute'
  }
}));
