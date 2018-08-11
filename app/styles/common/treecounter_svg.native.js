import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

//Only take multiple of 10s
const squareDimension =
  Math.floor(
    Math.min(Dimensions.get('window').width, Dimensions.get('window').height) /
      10
  ) * 10;

export default (treecounterStyles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  svgStyle: {
    width: '100%',
    height: '100%'
  },
  cloudStyle: {
    flex: 1,
    width: '105%',
    height: '105%',
    elevation: 2,
    position: 'absolute',
    top: '-2.5%',
    left: '-2.5%'
  },
  potStyle: {
    flex: 1,
    width: '105%',
    height: '105%',
    elevation: 4,
    position: 'absolute',
    top: '-2.5%',
    left: '-2.5%'
  },
  circleStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    elevation: 5,
    position: 'absolute',
    top: 0
  },
  imageStyle: {
    overflow: 'visible',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0
  },
  svgContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    width: '100%'
  },
  svgContainer: {
    width: squareDimension,
    height: squareDimension
  },
  svgTextContainer: {
    flexDirection: 'column',
    width: '40%',
    height: '30%',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  svgTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  svgColumn1: {
    maxWidth: 40,
    maxHeight: 40,
    resizeMode: 'contain',
    marginRight: 10
  },
  svgColumn2: {
    maxWidth: 100,
    maxHeight: 40,
    resizeMode: 'contain'
  },
  divider: {
    height: 3,
    width: '30%',
    position: 'relative',
    backgroundColor: '$primary',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center'
  },
  svgTitleText: {
    fontSize: 10,
    color: '#686060',
    width: 'auto'
  },
  svgTextValue: {
    fontSize: 16,
    color: '#686060',
    fontWeight: '600',
    width: 'auto'
  }
}));
