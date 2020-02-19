import EStyleSheet from 'react-native-extended-stylesheet';

const grayColor = '#4D5153';
const greenColor = '#89B53A';

export default EStyleSheet.create({
  title: {
    paddingLeft: 16,
    paddingTop: 25,
    fontSize: 14,
    lineHeight: 5
  },
  container: {
    paddingTop: 16
  },
  measurementHeadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  measurementText: {
    color: grayColor,
    fontSize: 17,
    fontFamily: 'OpenSans-SemiBold'
  },
  addMeasurement: {
    color: greenColor,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold'
  },
  icon: {
    height: 19,
    width: 19
  },
  iconContainer: {
    height: 19,
    width: 19,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  upArrow: {
    height: 17,
    width: 12
  },
  nextArrow: {
    height: 12,
    width: 17
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: grayColor,
    marginLeft: 5,
    fontFamily: 'OpenSans-Regular'
  }
});
