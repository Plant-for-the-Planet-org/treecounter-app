import EStyleSheet from 'react-native-extended-stylesheet';

export default (currentSelectorStyles = EStyleSheet.create({
  treecount_container: {
    marginTop: 30,
    width: 350
  },
  treecount_priceContainer_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  treecount_price_conversion_Text: {
    flex: 1,
    flexDirection: 'row',
    width: 160
  },
  treecount_price_conversion_Column: {
    flexDirection: 'column'
  },

  treecount_price_radio_container: {
    flexDirection: 'row',
    width: 127
  },
  treecount_price_conversion_Text_input: {
    width: 60,
    paddingLeft: 10,
    marginVertical: 10
  },
  treecount_price_conversion_lebel: {
    width: 40,
    marginVertical: 10
  },
  treecount_price_conversion_Text_equal: {
    marginVertical: 10
  }
}));
