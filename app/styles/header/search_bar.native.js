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
    flex: 1,
    flexDirection: 'row'
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingRight: 17,
    paddingLeft: 2
  },
  searchContainer: {
    height: 30,
    width: SearchContainerWidth,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginHorizontal: SearchContainerHorizontalMargin,
    marginTop: 10,
    paddingLeft: 27
  },
  searchIconContainer: {
    position: 'absolute',
    left: 7,
    top: 6,
    bottom: 0
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
    color: '$primary'
  }
}));
