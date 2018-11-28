import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
const rowHeight = 20;

export default (selectplantprojectFull = EStyleSheet.create({
  projectSnippetContainer: {
    flexDirection: 'column',

    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1
  },
  projectImageContainer: {
    height: Layout.window.width * 0.5,
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
    shadowOffset: {
      width: 0,
      height: -3
    },
    height: rowHeight * 1.5,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  treePlantedContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '60%'
  },
  treePlantedChildContainer: {
    height: '100%',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#b9d384',
    borderRightColor: '#b9d384'
  },
  treePlantedtext: {
    paddingRight: 5,
    color: 'white'
  },
  treePlantedtextPlanted: {
    paddingRight: 5,
    color: 'white'
    // width: '100%'
  },
  targetContainer: {
    flexDirection: 'row',
    padding: 5,
    width: '40%',
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
    //height: rowHeight + rowHeight / 2,
    paddingLeft: 5
  },
  project_teaser__contentText: {
    fontSize: 16,
    color: '$cardTextColor'
  },
  byOrgContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  byOrgText: {
    fontSize: 16,
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
    width: 80,
    height: 25,
    borderWidth: 1,
    borderRadius: 6,
    padding: 0,
    marginRight: 5
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
    height: rowHeight * 1.5,
    padding: 5,
    flexDirection: 'row'
  }
}));
