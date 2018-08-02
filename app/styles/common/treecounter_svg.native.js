import EStyleSheet from 'react-native-extended-stylesheet';

const skyBlue = '#F5FCFF';

export default (treecounterStyles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: skyBlue
  },
  svgStyle: {
    width: 400,
    height: 400
  },
  cloudStyle: {
    flex: 1,
    width: 420,
    height: 420,
    elevation: 2,
    position: 'absolute',
    top: -12,
    left: -10
  },
  potStyle: {
    flex: 1,
    width: 420,
    height: 420,
    elevation: 4,
    position: 'absolute',
    top: -12,
    left: -10
  },
  circleStyle: {
    flex: 1,
    width: 400,
    height: 400,
    elevation: 5,
    position: 'absolute',
    top: 0
  },
  imageStyle: {
    overflow: 'visible',
    width: 400,
    height: 400,
    flex: 1,
    top: 190,
    left: 0
  }
}));
