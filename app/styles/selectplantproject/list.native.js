import EStyleSheet from 'react-native-extended-stylesheet';

import { SearchContainerWidth } from '../header/search_bar';

export default (selectplantprojectFull = EStyleSheet.create({
  cardStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  listItemContainer: {
    flexDirection: 'column',
    height: 150
  },
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
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: 12,
    color: '$textColor'
  },

  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    margin: 3,
    height: 40,
    alignItems: 'center',
    borderColor: '#aba2a2',
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  searchIconContainer: {
    height: 15,
    width: 15,
    marginRight: 1
  },
  searchIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '$textColor'
  },

  listContentContainer: {
    borderColor: '#aba2a2',
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    margin: 1
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
  }
}));
