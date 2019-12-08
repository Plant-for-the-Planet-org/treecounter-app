import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};

export default EStyleSheet.create({
  projectFullContainer: {
    flexDirection: 'column',

    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
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
    padding: 16
  },
  centeredContentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomActionArea: {
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    height: 88
  },
  squareButton: {
    height: 88,
    width: 100,
    backgroundColor: '#89b53a',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  floatingButtonContainer: {
    // padding: 16,
    // position: 'absolute',
    // bottom: 35,
    // right: 0
    backgroundColor: 'red'
  },
  plantProjectDetails: {
    flexGrow: 1,
    flexBasis: 'auto',
    padding: 16
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
  },
  makePledgeButton: {
    display: 'flex',
    marginBottom: 20,
    margin: 'auto',
    alignItems: 'center',
    width: 180,
    alignSelf: 'center',
    paddingHorizontal: 36,
    paddingVertical: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 24,
    marginTop: 20
  },
  makePledgeButtonView: {}
});
