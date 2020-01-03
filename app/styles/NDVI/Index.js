import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 2
  },
  monthStyle: {
    height: 16,
    width: 16,
    fontFamily: 'OpenSans-Regular',
    fontSize: 11
  },
  headerText: {
    marginTop: 20,
    fontSize: 14,
    color: '$textColor',
    fontFamily: 'OpenSans-SemiBold',
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
