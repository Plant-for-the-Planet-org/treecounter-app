import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantprojectFull = EStyleSheet.create({
  projectFullContainer: {
    width: '100%',
    flex: 1
  },
  projectTeaserContainer: {
    flex: 0.6
  },
  projectSpecsContainer: {
    flex: 0.3
  },
  seeMoreContainer: {
    flex: 0.1,
    paddingTop: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  }
}));
