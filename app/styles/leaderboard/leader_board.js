import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default (LeaderboardStyle = EStyleSheet.create({
  outerContainer: {
    alignItems: 'stretch',
    width: Dimensions.get('window').width,
    marginBottom: 10
  },
  innerContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  imageStyle: {
    width: 60,
    height: 60
  },
  selectedImageStyle: {
    width: 99,
    height: 99
  },
  circle: {
    borderRadius: 25,
    borderWidth: 0,

    height: 60
  },
  selectedBottomTypeLabel: {
    color: '#95c243',
    fontSize: 11,
    maxWidth: 80
  },
  bottomTypeLabel: {
    color: '#9c9b9b',
    fontSize: 11,
    maxWidth: 80
  },
  selectedSeprater: {
    backgroundColor: '#95c243',
    width: '100%',
    height: 2,
    marginTop: 3,
    marginBottom: 3
  },
  seprater: {
    backgroundColor: '#9c9b9b',
    width: '100%',
    height: 2,
    marginTop: 3,
    marginBottom: 3
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginBottom: 10
  }
}));
