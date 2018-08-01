import EStyleSheet from 'react-native-extended-stylesheet';

export default (currentSelectorStyles = EStyleSheet.create({
  treecount_container: {
    marginTop: 30,
    width: 350
  },
  treecount_priceContainer_row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%'
  },
  treecount_price_radio_container: {
    flexDirection: 'row',
    width: 127
  },
  treecount_price_conversion_Column: {
    flexDirection: 'column'
  },

  treecount_price_conversion_Text_input: {
    // width: 60,
    paddingLeft: 3,
    marginTop: 5,
    width: 28
    //  marginVertical: 10
  },

  treecount_price_conversion_Text: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 160
  },
  treecount_price_conversion_lebel: {
    width: 40,
    marginLeft: 28,
    marginVertical: 10
  },
  treecount_price_conversion_Text_currency: {
    //  marginVertical: 10,
    marginTop: 5,
    marginLeft: 10
  },
  treecount_price_conversion_Text_equal2: {
    marginLeft: 59,
    paddingRight: 60,
    // marginRight: 10,
    marginVertical: 5
  },
  treecount_price_conversion_Text_input2: {
    paddingLeft: 8,
    marginTop: -3,
    width: 38
  },
  treecount_price_conversion_Text_input3: {
    marginTop: -10,
    width: 28
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
