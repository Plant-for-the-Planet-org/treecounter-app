import EStyleSheet from 'react-native-extended-stylesheet';

export default (buttonStyles = EStyleSheet.create({
  cardContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 12,
    margin: 10,
    padding: 10
  }
}));
