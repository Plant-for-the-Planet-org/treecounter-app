import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20)
  }
};

export default (selectplantprojectFull = EStyleSheet.create({
  projectFullContainer: {
    padding: 10,
    flexDirection: 'column',
    height: Layout.window.height * 0.5
    // height: Layout.window.height
  },
  projectImageContainer: {
    height: '60%'
  },
  teaser__projectImage: {
    width: undefined,
    height: undefined,
    flex: 1
  },
  treeCounterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d2e3af'
  },
  treePlantedContainer: {
    flexDirection: 'row',
    height: '100%',
    padding: 5,
    paddingRight: 10,
    backgroundColor: '#b9d384',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderRightWidth: 0.5,
    borderRightColor: '#b9d384'
  },
  treePlantedtext: {
    paddingRight: 5
  },
  targetContainer: { flexDirection: 'row', padding: 5 },
  projectdetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  locationContainer: {
    flexDirection: 'column'
  },
  costContainer: { flexDirection: 'row' },
  actionContainer: {
    flexDirection: 'row'
  }
}));
