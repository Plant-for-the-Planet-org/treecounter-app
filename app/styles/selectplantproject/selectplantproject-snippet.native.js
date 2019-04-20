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
    elevation: 1,
    padding: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  projectImageContainer: {
    height: Layout.window.width * 0.5,
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  teaser__projectImage: {
    flex: 1
  },
  projectSpecsContainer: {
    width: '100%',
    padding: 16
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
    height: rowHeight * 1.7,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
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
    paddingBottom: 10
  },
  locationContainer: {
    flexDirection: 'column'
  },
  costContainer: { flexDirection: 'row' },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
    //height: rowHeight + rowHeight / 2,
  },
  project_teaser__contentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '$cardTextColor',
    maxWidth: '90%'
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
    paddingBottom: 5,
    alignItems: 'center'
  }
}));
