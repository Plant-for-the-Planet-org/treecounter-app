import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  deleteProfileButton: {
    backgroundColor: '$colorPrimaryAccent',
    borderColor: '$colorPrimaryAccent'
  },
  confirmDeleteContainer: {
    backgroundColor: '$primary',
    flex: 1,
    height: '100%',
    width: '100%'
  },
  container: {
    backgroundColor: '$primary',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeader: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 25,
    fontWeight: 'bold'
  },
  textPara: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
    fontWeight: '100'
  },
  textStyle: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15
  },
  bottomRow: {
    backgroundColor: '#85a64d',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    borderColor: '#85a64d',
    backgroundColor: '#85a64d',
    flex: 1,
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    margin: 0
  },
  textInputfield: {
    marginTop: 20,
    height: 40,
    width: 200,
    color: '#afacac',
    borderColor: '$primary',
    borderWidth: 1,
    padding: 2,
    backgroundColor: '#f0f2f1',
    textAlign: 'center'
  },
  followerRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 6,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  followerCol: {
    flexGrow: 1,
    flexBasis: 0,
    marginLeft: 5,
    marginRight: 5
  },
  imageStyle: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  }
});
