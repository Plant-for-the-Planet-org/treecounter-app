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
  project_specs__taxdeductibleIcon: {
    width: 14,
    height: 14
  },
  projectSnippetContainer: {
    flexDirection: 'column',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 0,
    borderRadius: 7
  },
  projectImageContainer: {
    height: Layout.window.width * 0.5,
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden'
  },
  teaser__projectImage: {
    flex: 1,
    overflow: 'hidden'
  },
  projectSpecsContainer: {
    width: '100%',
    padding: 16
  },
  treeCounterContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#D3D3D3',
    shadowOffset: {
      width: 0,
      height: -3
    },
    height: rowHeight * 1.7,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,

    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7
  },
  treePlantedContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  treePlantedChildContainer: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#89B53A',
    borderRightColor: '#89B53A'
  },
  treePlantedtext: {
    // padding: 5,
    paddingLeft: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  treePlantedtextTrees: {
    color: 'white',
    paddingLeft: 5
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
    paddingBottom: 10
  },
  locationContainer: {
    flexDirection: 'column',
    maxWidth: '65%'
  },
  costContainer: {
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flexGrow: 1
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
    //height: rowHeight + rowHeight / 2,
  },
  project_teaser__contentText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4D5153',
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
    fontSize: 12,
    color: '#4D5153',
    lineHeight: 18
  },
  survivalText: {
    fontSize: 12,
    color: '#4D5153',
    lineHeight: 18
  },
  costText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center'
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
    paddingBottom: 16,
    alignItems: 'center'
  },
  projectTextRowWithImage: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  }
}));
