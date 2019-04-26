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
    minWidth: '15%',
    maxWidth: '25%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioContainer: {
    height: 60,
    justifyContent: 'center'
  },
  treecount_price_conversion_Text: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 5
  },
  treecount_price_conversion_Text_fixed: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingRight: 5
  },

  treecount_price_conversion_Text_currency: {
    marginVertical: 10,
    minWidth: '20%',
    maxWidth: '30%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  treecount_price_conversion_Text_currency2: {
    marginTop: 5,
    minWidth: '20%',
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  treecount_price_conversion_Text_equal: {
    minWidth: '30%',
    maxWidth: '50%',
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 10,
    alignSelf: 'center'
  },

  treecount_price_conversion_Text_equal2: {
    // marginLeft: '15%',
    // marginRight: '15%',
    // marginVertical: 5,
    // alignSelf: 'center'

    minWidth: '20%',
    maxWidth: '30%',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 10,
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
  treecount_price_conversion_Text_input3Container: {
    flexDirection: 'row',
    minWidth: '14%',
    maxWidth: '26%',
    alignItems: 'center'
  },
  treecount_price_conversion_Text_input3: {
    marginTop: -10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#686060',
    alignSelf: 'center'
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
