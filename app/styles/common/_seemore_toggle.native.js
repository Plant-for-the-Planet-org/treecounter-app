import EStyleSheet from 'react-native-extended-stylesheet';

export default (donateTreesStyles = EStyleSheet.create({
  see_more_toggle__container: {
    flex: 1,
    paddingTop: 10
  },
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
    alignItems: 'center',
    paddingLeft: 10
  },
  collapsed: {
    height: 40,
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10
  }
}));
