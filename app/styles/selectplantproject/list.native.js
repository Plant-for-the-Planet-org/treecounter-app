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
  selectedItemStyle: {
    backgroundColor: '#e3e3e3'
  },
  evenItemStyle: {
    backgroundColor: '#f0f0f0'
  },
  projectNameContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 5,
    borderColor: '#efefef',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  projectImageContainer: {
    width: 25,
    height: 25,
    marginRight: 10
    // borderRadius: 13,
    // borderWidth: 1,
    // borderColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  projectImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  },
  projectNameTextContainer: {
    flexDirection: 'column'
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
    padding: 5
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
    paddingBottom: 5
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
    borderColor: '#efefef',
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
    borderColor: '#efefef',
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
  },
  sortContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  imageStyleContainer: {
    width: 10,
    height: 10
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },

  cardHeader: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  headingStyle: {
    fontSize: 16,
    marginRight: 10,
    color: '$textColor'
  }
}));
