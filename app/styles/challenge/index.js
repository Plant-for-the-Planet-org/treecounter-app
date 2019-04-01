import EStyleSheet from 'react-native-extended-stylesheet';

const buttonStyle = {
  padding: 10,
  borderRadius: 6,
  marginLeft: 35,
  width: 100,
  height: 40
};
export default (editProfileStyle = EStyleSheet.create({
  goalStyle: {
    fontSize: 18,
    fontWeight: '600'
  },
  statusLabel: {
    backgroundColor: '#e0e0e0',
    //Bug till 0.58 react native
    // textTransform: 'capitalize',
    ...buttonStyle,
    overflow: 'hidden',
    textAlign: 'center'
  },
  buttonStyle: {
    ...buttonStyle
  },
  limitWidth: {
    width: 190
  },
  profileImage: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  flexContainerStyle: {
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center'
  },
  flexStyle: {
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
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
