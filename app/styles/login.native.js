import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white',
    flex: 1
  },

  formView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: 300
  },
  container: {
    width: '100%',
    padding: 15,
    paddingTop: 30
  },
  headerContainer: {
    flexDirection: 'column',

    alignItems: 'center',
    margin: 20
  },
  imageStyle: {
    width: 64,
    height: 64
  },

  // inputContainer: {
  //   height: 120
  // },
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
    paddingTop: 25,
    paddingBottom: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  bottomText: {
    fontSize: 11,
    color: '$textColor'
  },
  bottomTextHighlight: {
    fontSize: 12,
    color: '#ec6453',
    flexDirection: 'row'
  },
  loginHeader: {
    marginBottom: 60
  },
  descriptionText: {
    fontSize: 20,
    color: '#575756',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'flex-start'
    // fontFamily: 'Open Sans'
  },
  loginTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10
  },
  loginDescriptionStyle: {
    fontSize: 12,
    color: '$textColor',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'OpenSans-Regular',
    marginTop: 12
  },
  loginButtonStyle: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    padding: 0,
    margin: 0,
    alignSelf: 'center',
    position: 'absolute',
    right: 0
  }
});
