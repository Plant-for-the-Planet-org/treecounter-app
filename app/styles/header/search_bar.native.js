import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};
export const SearchContainerHorizontalMargin = 10;
export const SearchContainerWidth =
  Layout.window.width - SearchContainerHorizontalMargin * 2;

export default (styles = EStyleSheet.create({
  container: {
    // flex: 1,
    width: '90%',
    flexDirection: 'row',
    // marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10
  },
  searchContainer: {
    flexDirection: 'row',
    height: 30,
    width: '90%',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingLeft: 27,
    marginLeft: 10
  },
  buttonContainer: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  button: {
    paddingRight: 17,
    paddingLeft: 2
  },
  searchIconContainer: {
    position: 'absolute',
    left: 7,
    top: 6,
    bottom: 0
  },
  searchIcon: {
    height: 15,
    width: 15
  },
  searchInput: {
    fontSize: 14,
    paddingTop: 5,
    color: '$primary'
  }
}));
