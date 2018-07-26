import EStyleSheet from 'react-native-extended-stylesheet';

export default (currentSelectorStyles = EStyleSheet.create({
  treecount_container: {
    marginTop: 30
  },

  treecount_price_conversion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingRight: 40,
    paddingBottom: 0,
    paddingLeft: 40,
    width: '100%'
  },
  counter_label: {
    color: 'black'
  },
  counter_text: {
    width: 40,
    color: 'black'
    // border-bottom: 1px solid mix(white, #424242, 70%);
  }
}));
