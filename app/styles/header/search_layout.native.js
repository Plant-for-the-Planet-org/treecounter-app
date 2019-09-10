import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default (styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12
  },
  searchResult: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  profileImage: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  profileText: {
    fontSize: 18,
    color: '#333',
    width: '97%',
    marginLeft: 12
  }
}));
