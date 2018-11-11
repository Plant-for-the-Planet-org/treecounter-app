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
    // padding: 10,
    flexDirection: 'column',
    height: Layout.window.width * 0.5 + 110
  },
  projectImageContainer: {
    height: Layout.window.width * 0.5,
    width: Layout.window.width * 0.9
  },
  teaser__projectImage: {
    flex: 1
  },
  treeCounterContainer: {
    flexDirection: 'row',
    width: Layout.window.width * 0.9,
    justifyContent: 'space-between',
    backgroundColor: '#d2e3af'
  },
  treePlantedContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '60%'
  },
  treePlantedChildContainer: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#b9d384',
    borderRightColor: '#b9d384'
  },
  treePlantedtext: {
    paddingRight: 5,
    color: 'white'
  },
  targetContainer: {
    flexDirection: 'row',
    padding: 5,
    width: '40%',
    justifyContent: 'flex-end'
  },
  projectdetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  locationContainer: {
    flexDirection: 'column'
  },
  costContainer: { flexDirection: 'row' },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  project_teaser__contentText: {
    fontSize: 16
  },
  locationText: {
    fontSize: 12,
    color: '$textColor',
    fontStyle: 'italic'
  },
  survivalText: {
    fontSize: 13,
    color: '$textColor'
  },
  costText: {
    fontSize: 20
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonItem: {
    padding: 5
  },
  buttonStyle: {
    height: 20,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
    borderWidth: 0,
    borderRadius: 0,
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
  }
}));
