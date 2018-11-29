import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};

export default (selectplantprojectFull = EStyleSheet.create({
  projectFullContainer: {
    padding: 0,
    flexDirection: 'column',
    width: Layout.window.width - 30
  },
  projectTeaserContainer: {
    height: Layout.window.height * 0.5
  },
  projectSpecsContainer: {
    height: Layout.window.height * 0.3,
    width: '100%'
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
  snippetContainer: {
    width: Layout.window.width - 30
  },
  cardStyle: {
    padding: 0,
    margin: 0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    width: '100%',
    shadowOpacity: 0,
    elevation: 0,
    paddingBottom: 10
  },
  horizontalRule: {
    borderBottomColor: '$primary',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
}));
