import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width;

export default (currentSelectorStyles = EStyleSheet.create({
  treecount_container: {
    marginTop: 30,
    width: width
  },
  treecount_priceContainer_row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%'
  },
  treecount_price_radio_container: {
    flexDirection: 'row',
    // width: 127
    width: width * 0.4
  },
  radio_button: {
    width: width * 0.1,
    margin: 5
  },
  radio_label: {
    width: width * 0.3,
    //width: 107,
    flexDirection: 'row'
  },
  treecount_price_conversion_Column: {
    flexDirection: 'column'
  },

  treecount_price_conversion_Text_input: {
    paddingLeft: 3,
    marginTop: 5,
    // width: 28
    width: width * 0.2
  },

  treecount_price_conversion_Text_container: {
    flex: 1,
    flexDirection: 'row',
    // maxWidth: 160
    width: width * 0.6
  },
  treecount_price_conversion_lebel: {
    // marginLeft: 28,
    marginLeft: width * 0.1,
    //  marginVertical:
    marginTop: 5
  },
  treecount_price_conversion_Text_currency: {
    marginTop: 5,
    // marginLeft: 10,
    // marginRight: 20
    marginLeft: width * 0.05,
    marginRight: width * 0.05
  },
  treecount_price_conversion_Text_equal2: {
    // marginLeft: 59,
    // paddingRight: 50,

    marginLeft: width * 0.05,
    paddingRight: width * 0.05,

    marginVertical: 5
  },
  treecount_price_conversion_Text_input2: {
    paddingLeft: 8,
    marginTop: -7,
    //  width: 38,
    width: width * 0.1,
    borderBottomWidth: 1,
    borderColor: '#686060',
    paddingBottom: 2,
    alignSelf: 'center'
  },
  treecount_price_conversion_Text_input3: {
    marginTop: -10,
    //   width: 38,
    width: width * 0.2,
    borderBottomWidth: 1,
    paddingBottom: 4,
    borderColor: '#686060',
    alignSelf: 'center',
    textAlign: 'center'
  }
}));
