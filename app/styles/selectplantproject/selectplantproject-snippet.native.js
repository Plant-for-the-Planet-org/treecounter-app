import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
const rowHeight = 20;

export const flatListContainerStyle = {
  paddingBottom: 45,
  flexGrow: 1,
  backgroundColor: '#ffffff'
};
export default EStyleSheet.create({
  project_specs__taxdeductibleIcon: {
    width: 14,
    height: 14
  },
  projectSnippetContainer: {
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
    borderWidth: 0,
    borderColor: 'red'
  },
  projectImageContainer: {
    height: Layout.window.width * 0.4,
    width: '100%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    overflow: 'hidden',
    position: 'relative'
  },

  // Rating Styles
  certifiedAndRatingContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    right: 12,
    borderRadius: 9,
    top: 12,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ratingTouchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 12
  },
  ratingTick: {
    width: 15,
    height: 15,
    marginRight: 7
  },
  ratingCount: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: '#4d5153',
    textAlign: 'center',
    marginRight: 5,
    marginLeft: 2
  },
  // Rating styles ends

  teaser__projectImage: {
    flex: 1,
    overflow: 'hidden'
  },
  projectSpecsContainer: {
    width: '100%',
    padding: 4,
    paddingTop: 7
  },
  treeCounterContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '$greyColor',
    shadowOffset: {
      width: 0,
      height: -3
    },
    height: rowHeight * 1.75,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    lineHeight: 19
  },
  treePlantedContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  treePlantedChildContainer: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#79b805', //b9d384',
    borderRightColor: '#79b805',
    borderBottomLeftRadius: 4
  },
  treePlantedtext: {
    // padding: 5,
    paddingLeft: 5,
    color: 'white',
    fontFamily: 'OpenSans-SemiBold'
  },
  treePlantedtextTrees: {
    color: 'white',
    paddingLeft: 5,
    fontFamily: 'OpenSans-SemiBold'
  },
  treePlantedtextPlanted: {
    color: 'white',
    paddingLeft: 16,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold'
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
    paddingBottom: 15,
    marginTop: 16,
    // marginRight: 5,
    alignItems: 'center'
  },
  locationContainer: {
    flexDirection: 'column',
    maxWidth: '60%',
    '@media (max-width: 350)': {
      maxWidth: '45%'
    }
  },
  costContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
    // marginRight: 17
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
    //height: rowHeight + rowHeight / 2,
  },
  project_teaser__contentText: {
    fontSize: 18,
    color: '$cardTextColor',
    maxWidth: '90%',
    lineHeight: 24,
    fontFamily: 'OpenSans-SemiBold'
  },
  byOrgContainer: {
    width: '70%',
    flexDirection: 'row',
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
    fontSize: 11,
    flexWrap: 'wrap',
    color: '$cardTextColor',
    fontFamily: 'OpenSans-Regular'
  },
  costTextContainer: {
    backgroundColor: '#f2f2f7',
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 2
    // marginRight: 20
  },
  costText: {
    fontSize: 14,
    color: '$newPrimary',
    fontFamily: 'OpenSans-Bold'
  },
  costPerTreeText: {
    fontSize: 9,
    marginTop: 6,
    color: '$cardTextColor',
    fontFamily: 'OpenSans-Regular'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'flex-end'
  },
  buttonItem: {
    padding: 0
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
    width: 80,
    height: 25,
    borderWidth: 1,
    borderRadius: 4,
    padding: 0
  },
  buttonTextStyle: {
    fontSize: 12
  },
  moreButtonStyle: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '$primary'
  },
  moreButtonTextStyle: {
    color: '$primary',
    fontSize: 12
  },
  projectNameContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginRight: 16,
    justifyContent: 'space-between'
  }
});
