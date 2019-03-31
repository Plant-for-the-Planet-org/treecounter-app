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
export default (styles = EStyleSheet.create({
  container: {
    // flex: 1,
    width: '90%',
    flexDirection: 'row',
    // marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  searchContainer: {
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
    paddingRight: 10,
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
    width: 15,
    resizeMode: 'contain'
  },
  searchInput: {
    fontSize: 14,
    paddingTop: 5,
    color: '$primary',
    ...centerTextInput
  }
}));
