import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - 2 * 56
  }
};

export default (selectplantprojectFull = EStyleSheet.create({
  projectFullContainer: {
    padding: 10,
    height: Layout.window.height
  },
  projectTeaserContainer: {
    height: Layout.window.height * 0.4
  },
  projectSpecsContainer: {
    height: Layout.window.height * 0.3
  },
  select_different_project_style: {
    paddingTop: 10,
    marginLeft: 20
  },
  select_different_project_style_text: {
    color: '#ec6453',
    fontSize: 13,
    textAlign: 'center'
  },
  seeMoreContainer: {
    height: Layout.window.height * 0.1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    height: Layout.window.height * 0.1
  },
  plantProjectDetails: {
    flexGrow: 1
  }
}));
