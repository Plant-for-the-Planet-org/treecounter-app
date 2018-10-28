import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default (loginStyles = EStyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 0.7,
    width: '100%',
    // justifyContent: 'center',
    padding: 20,
    flexGrow: 1
  },
  headerContainer: {
    flex: 0.3,
    flexDirection: 'column',

    alignItems: 'center',
    margin: 20
  },
  imageStyle: {
    width: 100,
    height: 50
  },

  inputContainer: {},
  button: {
    height: 50,
    backgroundColor: '$primary',
    borderColor: '$primary',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 21,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 29,
    color: 'white',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 41,
    color: '#575756',
    width: Dimensions.get('window').width * 0.5,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  titleTextUnderline: {
    height: 3,
    width: Dimensions.get('window').width * 0.5,
    backgroundColor: '$primary'
  },
  bottomRow: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start'
  },
  bottomText: {
    fontSize: 11,
    color: '$textColor'
  },
  bottomTextHighlight: {
    fontSize: 12,
    color: '#ec6453'
  },
  loginHeader: {
    marginBottom: 60
  },
  descriptionText: {
    fontSize: 20,
    color: '#575756',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'flex-start'
  }
}));
