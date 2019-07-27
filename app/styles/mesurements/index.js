import EStyleSheet from 'react-native-extended-stylesheet';

export default (Measurements = EStyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 20,
    paddingLeft: 16,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#d5d5d5'
  },
  icon: {
    width: 25,
    height: 25
  }
}));
