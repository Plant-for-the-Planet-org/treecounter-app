import EStyleSheet from 'react-native-extended-stylesheet';

export default (myTreesStyle = EStyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    flexGrow: 1
  },
  headContainer: {
    padding: 30
  },
  mapContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listContainer: { backgroundColor: 'white', flex: 1 },
  contributionMapLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    alignSelf: 'flex-end'
  }
}));
