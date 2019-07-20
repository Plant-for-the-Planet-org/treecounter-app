import EStyleSheet from 'react-native-extended-stylesheet';

export default (infoStyle = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  info: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '$textColor',
    alignItems: 'center'
  }
}));
