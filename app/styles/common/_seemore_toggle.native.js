import EStyleSheet from 'react-native-extended-stylesheet';

export default (donateTreesStyles = EStyleSheet.create({
  see_more_toggle__container: {},
  expandedText: {
    color: '$primary',
    fontSize: 13
  },
  collapsedText: {
    color: '#ec6453',
    fontSize: 13
  },

  expanded: {
    height: 40,
    width: 100,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center'
  },
  collapsed: {
    height: 40,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center',
    width: 100
  }
}));
