import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantprojectFull = EStyleSheet.create({
  projectFullContainer: {
    flex: 1,
    padding: 10
  },
  projectTeaserContainer: {
    height: 250
  },
  projectSpecsContainer: {
    height: 180
  },
  select_different_project_style: {
    flex: 1,
    paddingTop: 10
  },
  select_different_project_style_text: {
    color: '#ec6453',
    fontSize: 13,
    textAlign: 'center'
  },
  seeMoreContainer: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flex: 1
  }
}));
