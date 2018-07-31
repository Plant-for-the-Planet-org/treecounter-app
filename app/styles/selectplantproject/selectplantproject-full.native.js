import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantprojectFull = EStyleSheet.create({
  projectFullContainer: {
    flex: 1,
    padding: 10
  },
  projectTeaserContainer: {
    flex: 0.6
  },
  projectSpecsContainer: {
    flex: 0.3
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
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 20,
    alignSelf: 'center',
    justifyContent: 'space-between'
  }
}));
