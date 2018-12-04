import EStyleSheet from 'react-native-extended-stylesheet';

export default (textInputStyles = EStyleSheet.create({
  // pickerViewStyle: {
  //   flex: 1,
  //   marginLeft: 28,
  //   borderColor: '#cecece',
  //   borderBottomWidth: 1,
  //   height: 45
  //   // marginBottom: 20
  // },
  // pickerStyle: {
  //   height: 45
  // },
  // itemStyle: {
  //   color: '#686060',
  //   borderColor: '#cecece',
  //   borderBottomWidth: 1,
  //   textAlign: 'left',
  //   fontSize: 13
  // }

  containerStyle: {
    paddingBottom: 20
  },
  pickerStyle: {
    marginLeft: 10,
    borderColor: '#cecece',
    borderBottomWidth: 1,
    height: 45
  },
  itemStyle: {
    color: '#cecece',
    height: 45,
    textAlign: 'left',
    fontSize: 16
  }
}));
