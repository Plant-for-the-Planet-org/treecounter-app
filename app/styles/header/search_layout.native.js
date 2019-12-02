import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '$primary'
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
    fontSize: 20,
    color: '#b9d384',
    width: '97%',
    fontFamily: 'OpenSans-Regular'
  }
});
