import EStyleSheet from 'react-native-extended-stylesheet';

export default (indexStyle = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 2
  },
  monthStyle: {
    height: 15,
    width: 15,
    fontSize: 13
  }
}));
