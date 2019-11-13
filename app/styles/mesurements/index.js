import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  title: {
    paddingLeft: 16,
    paddingTop: 25,
    // color: "#99000000",
    fontSize: 14,
    lineHeight: 5
  },
  container: {
    marginTop: 13,
    marginBottom: 20,
    paddingLeft: 16,
    paddingBottom: 15,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#d5d5d5',
    marginLeft: 8,
    marginRight: 8
  },
  icon: {
    height: 19,
    width: 19,
    marginRight: 4
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 5
  }
});
