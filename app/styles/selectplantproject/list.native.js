import EStyleSheet from 'react-native-extended-stylesheet';

import { SearchContainerWidth } from '../header/search_bar';

export default (selectplantprojectFull = EStyleSheet.create({
  projectNameContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    borderColor: '#aba2a2',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  tpoNameText: {
    fontStyle: 'italic',
    fontWeight: '100'
  },
  projectNameText: {
    color: '$textColor',
    fontWeight: '500'
  },
  projectMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  projectMetaLabels: {
    // paddingLeft: 5
  },
  projectMetaValue: {
    paddingRight: 5
  },
  projectButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    fontSize: 12,
    color: '$textColor'
  },

  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    margin: 5,
    height: 40
  },
  searchIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingTop: 1,
    paddingLeft: 10,
    color: '$textColor',
    borderBottomWidth: 1,
    borderColor: '#aba2a2'
  },

  listContentContainer: {
    borderColor: '#aba2a2',
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    margin: 10
  }
}));
