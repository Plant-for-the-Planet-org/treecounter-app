import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20)
  }
};

export default (selectplantprojectFull = EStyleSheet.create({
  projectFullContainer: {
    //padding: 10,

    flexDirection: 'column'
    // height: Layout.window.height
  },
  projectTeaserContainer: {
    height: Layout.window.height * 0.5
  },
  projectSpecsContainer: {
    height: Layout.window.height * 0.3
  },
  select_different_project_style: {
    height: 40,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: 'center'
  },
  select_different_project_style_text: {
    color: '#ec6453',
    fontSize: 13,
    textAlign: 'center'
  },
  seeMoreContainer: {
    height: Layout.window.height * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: Layout.window.height * 0.15,
    height: Layout.window.height * 0.15
  },
  plantProjectDetails: {
    flexGrow: 1,
    flexBasis: 'auto'
  },
  cardStyle: {
    margin: 0,
    padding: 0
  }
}));
