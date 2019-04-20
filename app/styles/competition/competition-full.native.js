import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};

export default (selectedCompetitionFull = EStyleSheet.create({
  projectFullContainer: {
    padding: 0,
    flexDirection: 'column',
    width: '100%'
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
  },
  profileImageStyle: {
    width: 40,
    height: 40
  },
  topCompetitorContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  topCompetitorSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    justifyContent: 'space-between'
  },
  topCompetitorName: {
    width: '70%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  topCompetitorScore: {
    width: '30%',
    justifyContent: 'flex-end'
  },
  topCompetitorNameText: {
    fontSize: 14,
    color: '$cardTextColor',
    maxWidth: '100%',
    fontWeight: 'bold'
  },
  topCompetitorScoreText: {
    fontSize: 14,
    color: '$cardTextColor',
    maxWidth: '100%'
  },
  topCompetitorDiv: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    height: 3
  },
  headingParticipantContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16
  },
  textHeadingParticipants: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666'
  },
  participantNameContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 5
  },
  confirm_delete_button: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonItem: {
    padding: 5
  },
  buttonStyle: {
    // height: 20,
    // paddingLeft: 2,
    // paddingRight: 2,
    // paddingTop: 0,
    // paddingBottom: 0,
    // margin: 0,
    // borderWidth: 0,
    // borderRadius: 0,
    // marginRight: 5
    height: 30,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonTextStyle: {
    fontSize: 14
  }
}));
