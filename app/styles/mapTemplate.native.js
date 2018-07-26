import EStyleSheet from 'react-native-extended-stylesheet';

export default (mapTemplateStyle = EStyleSheet.create({
  mapContainer: {
    backgroundColor: '$placeholderColor',
    height: 200,
    flex: 1,
    justifyContent: 'center',
    padding: 50
  }
}));
