import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    marginTop: 24
  },
  cardLayout: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d5d5d5',
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 0,
    marginRight: 0
  },
  carbonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  carbonLabel: {
    fontSize: 14,
    color: '$textColor'
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
});
