import EStyleSheet from 'react-native-extended-stylesheet';

export default (editProfileStyle = EStyleSheet.create({
  goalStyle: {
    fontSize: 18,
    fontWeight: '600'
  },
  statusLabel: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    textTransform: 'capitalize',
    borderRadius: 6,
    overflow: 'hidden',
    marginLeft: 20,
    marginTop: 40,
    width: 110,
    height: 40,
    textAlign: 'center'
  },
  buttonStyle: {
    padding: 10,
    textTransform: 'capitalize',
    borderRadius: 6,
    marginLeft: 35,
    width: 100,
    height: 40
  },
  limitWidth: {
    width: 190
  },
  profileImage: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  flexStyle: {
    flexDirection: 'row',
    paddingTop: 5
  },
  treecount_input: {
    paddingLeft: 8,
    width: 50,
    borderBottomWidth: 1,
    borderColor: '#686060',
    paddingBottom: 2
  },
  textStyle: {
    fontSize: 16
  },
  textPadding: {
    paddingLeft: 5
  },
  imageStyle: {
    height: 15,
    width: 15
  }
}));
