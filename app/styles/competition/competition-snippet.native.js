import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
const rowHeight = 20;

export default EStyleSheet.create({
  projectSnippetContainer: {
    flexDirection: 'column',
    padding: 0,
    borderRadius: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5'
  },
  competitionContent: {
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  projectImageContainer: {
    height: Layout.window.width * 0.4,
    width: '100%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    overflow: 'hidden'
  },
  teaser__projectImage: {
    flex: 1,
    overflow: 'hidden'
  },
  treeCounterContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#d3d3d3',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    height: rowHeight * 1.7
  },
  treePlantedContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  treePlantedChildContainer: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#89b53a',
    borderRightColor: '#89b53a'
  },
  treePlantedtext: {
    // padding: 5,
    paddingLeft: 5,
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold'
  },
  treePlantedtextTrees: {
    color: 'white',
    paddingLeft: 5,
    fontFamily: 'OpenSans-Bold'
  },
  treePlantedtextPlanted: {
    color: 'white',
    paddingLeft: 16,
    fontFamily: 'OpenSans-Bold'
  },
  targetContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'flex-end'
  },
  projectdetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: rowHeight * 2,
    padding: 5
  },
  locationContainer: {
    flexDirection: 'column'
  },
  costContainer: { flexDirection: 'row' },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10
    //height: rowHeight + rowHeight / 2,
  },
  project_teaser__contentText: {
    maxWidth: '90%',
    fontSize: 16,
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    fontFamily: 'OpenSans-SemiBold'
  },
  project_teaser__contentByText: {
    fontSize: 10,
    paddingBottom: 5,
    color: '$cardTextColor',
    maxWidth: '90%'
  },
  project_teaser__contentDescriptionText: {
    fontSize: 14,
    color: '$cardTextColor'
  },
  bottomText: {
    marginLeft: 8,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'OpenSans-Regular'
  },
  bottomParticipantText: {
    fontSize: 11,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  byOrgContainer: {
    width: '50%',
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center'
  },
  emailContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 16,
    alignItems: 'center'
  },
  byOrgText: {
    fontSize: 16,
    width: '100%',
    color: '$cardTextColor'
  },
  locationText: {
    fontSize: 10,
    fontStyle: 'italic',
    paddingBottom: 2,
    color: '$cardTextColor'
  },
  survivalText: {
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 8,
    color: '$cardTextColor'
  },
  costText: {
    fontSize: 18,
    color: '$cardTextColor'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '50%',
    paddingTop: 10,
    justifyContent: 'flex-end'
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
    height: 35,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5
  },
  buttonTextStyle: {
    fontSize: 14
  },
  moreButtonStyle: {
    backgroundColor: 'white',
    height: 35,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '$borderColor'
  },
  moreButtonTextStyle: {
    color: '$textColor',
    fontSize: 12
  },
  projectNameContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
    width: '100%',
    alignItems: 'center'
  },
  projectByNameContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  projectDescriptionContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  topCompetitorContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  topCompetitorSection: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    width: '100%',
    justifyContent: 'space-between'
  },
  topCompetitorName: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  topCompetitorScore: {
    width: '10%',
    alignItems: 'flex-end'
  },
  topCompetitorScoreText: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: 10,
    fontFamily: 'OpenSans-Regular'
  },
  topCompetitorRank: {
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 1.2,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'OpenSans-SemiBold'
  },
  topCompetitorDiv: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    height: 3
  },
  horizontalRule: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 2,
    marginTop: 10
  },
  profileImageStyle: {
    width: 30,
    height: 30,
    borderRadius: 0,
    borderWidth: 0,
    marginLeft: 10
  },

  progressbar: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#89b53a',
    borderColor: '#89b53a',
    paddingRight: 12,
    padding: 5,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  },
  progressbarw100: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#89b53a',
    borderColor: '#89b53a',

    paddingRight: 12,
    padding: 5
  },
  progressbarw0: {
    height: '100%',
    flexDirection: 'row',
    padding: 5
  },
  treeCountViewPB: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8
  },
  targetflagview: { paddingLeft: 5, paddingRight: 16 },
  targetflagimage: { width: 15, height: 15 }
});
