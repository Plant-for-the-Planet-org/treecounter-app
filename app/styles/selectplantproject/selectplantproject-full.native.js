import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantprojectFull = EStyleSheet.create({
  projectFullContainer: {
    width: '100%',
    flex: 1
  },
  projectTeaserContainer: {
    flex: 0.5,
    flexBasis: 50
  },
  projectSpecsContainer: {
    flex: 0.3,
    flexBasis: 40
  },
  seeMoreContainer: {
    alignSelf: 'center'
  }
}));
