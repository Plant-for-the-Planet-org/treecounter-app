import EStyleSheet from 'react-native-extended-stylesheet';

export default (editProfileStyle = EStyleSheet.create({
  goalStyle: {
    fontSize: 25,
    fontWeight: '600'
  },
  statusLabel: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    textTransform: 'capitalize',
    borderRadius: 6,
    width: 120,
    textAlign: 'center'
  },
  profileImage: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  details: {
    flexDirection: 'row'
  }
}));
