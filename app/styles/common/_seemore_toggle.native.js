import EStyleSheet from 'react-native-extended-stylesheet';

export default (donateTreesStyles = EStyleSheet.create({
  see_more_toggle__container: {
    marginBottom: 20,
    marginTop: 10,
    height: 20
  },
  expandedText: {
    color: '$primary',
    textAlign: 'center'
  },
  collapsedText: {
    color: '#ec6453'
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
