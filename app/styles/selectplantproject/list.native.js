import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default EStyleSheet.create({
  flexContainer: {
    flex: 1,
    flexGrow: 1
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
    height: undefined
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
    borderBottomWidth: 1,
    padding: 10
  },
  searchItem: {
    // paddingBottom: 10
    backgroundColor: 'white',
    height: 40
    //marginRight: 15
  },
  searchIconContainer: {
    height: 15,
    width: 15,
    marginRight: 1
  },
  searchIcon: {
    height: '100%',
    width: '100%'
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
    marginBottom: 1,
    flexDirection: 'column'
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
    width: '100%',
    height: '100%'
  },

  cardHeader: {
    flexDirection: 'row',
    padding: 10,

    backgroundColor: 'white'
  },
  listViewContainer: {
    flex: 0.95
  },
  headingStyle: {
    fontSize: 16,
    marginRight: 10,
    color: '$textColor'
  },
  cardStyle: {
    width: Layout.window.width - 30,
    padding: 0,
    //margin: 0,
    paddingBottom: 10
  }
});
