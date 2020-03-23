import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  slickWrapper: {
    height: '100%'
  },

  cardContent: {
    width: '100%',
    flex: 1
  },

  plantProjectContent: {
    flex: 1,
    width: '100%'
  },
  plantProjectContentFull: {
    flex: 0.8,
    width: '100%'
  },
  footer: {
    width: '100%',
    flex: 0.2
  },
  selectedProjectRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectedProjectCol: {
    paddingLeft: 5
  },
  selectedCurrencyContainer: {
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 1,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10
  },
  selectedCurrency: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#6f6f6f'
  }
});
