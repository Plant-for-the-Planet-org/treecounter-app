import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
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
    width: '45%'
  },
  treecount_price_conversion_label: {
    alignSelf: 'center'
  },
  treecount_price_conversion_column: {
    flexDirection: 'column',
    maxWidth: '55%'
  },
  treecount_price_conversion_text_input: {
    paddingLeft: 8,
    paddingBottom: 2,
    alignSelf: 'center'
  },
  treecount_price_conversion_text_input2: {
    paddingLeft: 8,
    borderBottomWidth: 1,
    borderColor: '#686060',
    paddingBottom: 2,
    alignSelf: 'center'
  },
  treecount_price_conversion_text: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingRight: 8
  },
  treecount_price_conversion_text_equal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingRight: 8
  },

  radioContainer: {
    height: 60,
    justifyContent: 'center'
  },
  radio_button: {
    width: 20,
    margin: 5
  },
  radio_label: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});
