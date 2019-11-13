import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  cardContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 20,
    padding: 10
  },
  cardContainerWithoutShadow: {
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowRadius: 0,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 20,
    padding: 10
  }
});
