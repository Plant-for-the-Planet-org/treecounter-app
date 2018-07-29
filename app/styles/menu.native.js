import EStyleSheet from 'react-native-extended-stylesheet';

export default (menuStyles = EStyleSheet.create({
  outerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  imageStyle: {
    paddingLeft: 43,
    paddingBottom: 20
  }
}));
