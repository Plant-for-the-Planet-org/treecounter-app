import EStyleSheet from 'react-native-extended-stylesheet';

export default (coarbonStyle = EStyleSheet.create({
  container: {
    marginTop: 24
  },
  carbonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  carbonLabel: {
    fontSize: 14,
    color: '$textColor',
    marginLeft: 8,
    marginRight: 8
  },
  carbonText: { fontSize: 24, color: '$primary', fontWeight: 'bold' },
  info: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '$textColor',
    alignItems: 'center'
  }
}));
