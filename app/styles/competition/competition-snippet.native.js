import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
const rowHeight = 20;

export default (selectCompetitionFull = EStyleSheet.create({
  projectSnippetContainer: {
    flexDirection: 'column',

    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  competitionContent: {
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  projectImageContainer: {
    height: Layout.window.width * 0.2,
    width: '100%'
  },
  teaser__projectImage: {
    flex: 1
  },
  treeCounterContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#d2e3af',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
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
    backgroundColor: '#b9d384',
    borderRightColor: '#b9d384'
  },
  treePlantedtext: {
    // padding: 5,
    paddingLeft: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  treePlantedtextTrees: {
    color: 'white',
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  treePlantedtextPlanted: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 16
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '$cardTextColor',
    maxWidth: '90%'
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
    fontSize: 14,
    color: '$cardTextColor',
    paddingLeft: 10,
    paddingRight: 5
  },
  bottomParticipantText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingLeft: 5
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
    color: '$textColor',
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
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  topCompetitorScore: {
    width: '10%',
    alignItems: 'flex-end'
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
  horizontalRule: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 2,
    marginTop: 10
  },
  profileImageStyle: {
    width: 30,
    height: 30
  }
}));
