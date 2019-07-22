import EStyleSheet from 'react-native-extended-stylesheet';

export default (NewUserContributions = EStyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    flexGrow: 1
  },
  text: {
    fontSize: '1rem',
    '@media (min-width: 250) and (max-width: 350)': {
      fontSize: '.7rem'
    }
  }
}));
