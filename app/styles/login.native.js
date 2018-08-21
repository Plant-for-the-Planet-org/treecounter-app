import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default (loginStyles = EStyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 10
  },
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
    justifyContent: 'center',
    alignItems: 'center'
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
