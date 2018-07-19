import EStyleSheet from 'react-native-extended-stylesheet';

export default (donateTreesStyles = EStyleSheet.create({
  see_more_toggle__container: {
    marginBottom: 20,
    height: 20
  },
  expandedText: {
    color: '$primary',
    textAlign: 'left'
  },
  collapsedText: {
    color: '#ec6453'
  },

  expanded: {
    borderLeftWidth: 2,
    borderColor: '$primary',
    height: 40,
    flex: 1,
    alignItems: 'center',
    paddingLeft: 10
  },
  collapsed: {
    borderLeftWidth: 2,
    borderColor: '$placeholderColor',
    height: 40,
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10
  }
}));
