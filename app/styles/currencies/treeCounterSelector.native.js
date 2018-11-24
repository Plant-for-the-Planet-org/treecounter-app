import EStyleSheet from 'react-native-extended-stylesheet';

export default (currentSelectorStyles = EStyleSheet.create({
  treecount_container: {
    marginTop: 30,
    width: '100%'
  },
  treecount_priceContainer_row: {
    flexDirection: 'row',
    width: '100%'
  },
  treecount_price_radio_container: {
    flexDirection: 'row',
    width: '40%'
  },
  treecount_price_conversion_lebel: {
    width: 40,
    marginLeft: 28,
    marginVertical: 10
  },
  treecount_price_conversion_Column: {
    flexDirection: 'column',
    maxWidth: '70%'
  },

  treecount_price_conversion_Text_input: {
    marginVertical: 10,
    width: '15%'
  },

  treecount_price_conversion_Text: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 5
  },

  treecount_price_conversion_Text_currency: {
    marginVertical: 10,
    width: '20%'
  },
  treecount_price_conversion_Text_currency2: {
    marginTop: 5,
    width: '20%'
  },
  treecount_price_conversion_Text_equal: {
    marginLeft: '25%',
    marginRight: '25%',
    marginVertical: 10,
    alignSelf: 'center'
  },

  treecount_price_conversion_Text_equal2: {
    marginLeft: '15%',
    marginRight: '15%',
    marginVertical: 5,
    alignSelf: 'center'
  },
  treecount_price_conversion_Text_input2: {
    paddingLeft: 8,
    marginTop: -7,
    width: 38,
    borderBottomWidth: 1,
    borderColor: '#686060',
    paddingBottom: 2,
    alignSelf: 'center'
  },
  treecount_price_conversion_Text_input3: {
    marginTop: -10,
    width: '12%',
    borderBottomWidth: 1,
    paddingBottom: 4,
    borderColor: '#686060',
    alignSelf: 'center',
    textAlign: 'center'
  },

  radio_button: {
    width: 20,
    margin: 5
  },
  radio_label: {
    width: 107,
    flexDirection: 'row'
  }
}));
