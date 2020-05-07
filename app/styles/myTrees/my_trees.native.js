import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
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
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listContainer: { backgroundColor: 'grey', flex: 1 },
  contributionMapLegend: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5
  },
  image: {
    height: 30,
    width: 25
  },
  text: {
    fontSize: '1rem',
    '@media (min-width: 250) and (max-width: 350)': {
      fontSize: '.7rem'
    }
  }
});
