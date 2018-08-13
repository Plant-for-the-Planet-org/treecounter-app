import EStyleSheet from 'react-native-extended-stylesheet';

export default (donateTreesStyles = EStyleSheet.create({
  see_more_toggle__container: {},
  expandedText: {
    color: '$primary',
    textAlign: 'center',
    fontSize: 13
  },
  collapsedText: {
    color: '#ec6453',
    fontSize: 13,
    textAlign: 'center'
  },

  expanded: {
    height: 40,
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  collapsed: {
    height: 40,
    padding: 10,
    alignItems: 'center',
    flex: 1
  }
}));
