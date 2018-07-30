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
  treecount_price_conversion_Text: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 160
  },
  treecount_price_conversion_Column: {
    flexDirection: 'column'
  },

  treecount_price_radio_container: {
    flexDirection: 'row',
    maxWidth: 127
  },
  treecount_price_conversion_Text_input: {
    // width: 60,
    paddingLeft: 10
    //  marginVertical: 10
  },
  treecount_price_conversion_lebel: {
    width: 40,
    marginLeft: 30,
    marginVertical: 10
  },
  treecount_price_conversion_Text_currency: {
    //  marginVertical: 10,
    marginLeft: 10
  },
  treecount_price_conversion_Text_equal2: {
    marginLeft: 59
    // marginRight: 10,
    //  marginVertical: 10
  },
  treecount_price_conversion_Text_input2: {
    paddingLeft: 10,
    marginTop: -20
  }
}));
