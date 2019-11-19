import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

export const SearchContainerHorizontalMargin = 10;
export const SearchContainerWidth =
  Layout.window.width - SearchContainerHorizontalMargin * 2;
//On android, there is default paddingTop , override it to make the text centerline
export const centerTextInput =
  Platform.OS === 'android'
    ? {
        paddingTop: 0,
        paddingBottom: 0
      }
    : {};
export default EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  searchContainer: {
    height: 56,
    width: '75%',
    backgroundColor: '#f2f2f2',
    padding: 17,
    paddingLeft: 27,
    marginLeft: 10,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5'
  },
  button: {
    width: '100%',
    marginRight: 5
  },
  searchIconContainer: {
    position: 'absolute',
    left: 15,
    top: 19,
    bottom: 0
  },
  searchIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },
  searchInput: {
    fontSize: 16,
    marginLeft: 14,
    color: '$primary',
    ...centerTextInput,
    fontFamily: 'OpenSans-Regular'
  }
});
