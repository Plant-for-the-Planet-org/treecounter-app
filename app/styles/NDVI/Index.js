import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 2
  },
  monthStyle: {
    height: 15,
    width: 15,
    fontSize: 13
  },
  headerText: {
    marginTop: 20,
    fontSize: 14,
    color: '$textColor',
    marginRight: 8
  },
  cardLayout: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d5d5d5',
    marginLeft: 0,
    marginTop: 12,
    width: '100%'
  }
});
