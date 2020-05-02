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
  flexView: {
    flex: 1,
    backgroundColor: 'white'
  },
  projectSnippetContainerN: {
    flexDirection: 'column',
    padding: 0
  },
  competitionContent: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 16,
    paddingBottom: 16
  },
  projectImageContainer: {
    height: Layout.window.width * 0.4,
    width: '100%',

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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10
    //height: rowHeight + rowHeight / 2,
  },
  project_teaser__contentText: {
    fontSize: 16,
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    fontFamily: 'OpenSans-SemiBold'
  },
  textHeadingParticipants: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'OpenSans-SemiBold'
  },
  project_teaser__contentByText: {
    fontSize: 10,
    paddingBottom: 16,
    maxWidth: '90%'
  },
  project_teaser__contentDescriptionText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  bottomText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  bottomParticipantText: {
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
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
    width: '100%'
  },
  locationText: {
    fontSize: 10,
    fontStyle: 'italic',
    paddingBottom: 2
  },
  survivalText: {
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 8
  },
  costText: {
    fontSize: 18
  },

  buttonStyle: {
    borderRadius: 4,
    backgroundColor: '#89b53a',
    minWidth: '45%',
    height: 36,
    padding: 6
  },
  buttonTextStyle: {
    fontSize: 12,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'OpenSans-SemiBold'
  },
  moreButtonStyle: {
    backgroundColor: 'white',
    height: 35,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10
  },
  moreButtonTextStyle: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular'
  },
  moreButtonStyleCancel: {
    backgroundColor: 'white',
    height: 35,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#e74c3c',
    minWidth: '45%'
  },
  moreButtonStyleCancelText: { color: '#e74c3c' },
  projectNameContainer: {
    flexDirection: 'row',
    paddingBottom: 16,
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

  // Card Styles
  cardContainer: {
    flexDirection: 'column',
    flex: 1,
    borderRadius: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 16,
    marginBottom: 40
  },
  googleCardTitle: {
    fontSize: 17,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  googleCardPara: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    flex: 3,
    marginRight: 20
  },
  googleCardButton: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a',
    marginTop: 16
  },
  googleCardParaContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 14
  },
  horizontalLine: {
    borderColor: '#d5d5d5',
    width: '100%',
    borderBottomWidth: 1
  },

  secondaryButton: {
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 36,
    borderColor: '#d5d5d5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 8,
    padding: 6
  },
  secondaryButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153',
    fontFamily: 'OpenSans-SemiBold'
  },
  cancelButton: {
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 36,
    borderColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 93,
    alignSelf: 'flex-end',
    marginLeft: 12,
    marginTop: 8,
    padding: 6
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#e74c3c'
  },
  topCompetitorScore: {
    width: '40%'
  },
  topCompetitorSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  competitionOver: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    width: 160
  }
});
