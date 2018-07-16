import EStyleSheet from 'react-native-extended-stylesheet';

export default (donateTreesStyles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  plantProjectContent: {
    flex: 1
  },
  header: {
    height: '10%',
    width: '90%'
  },
  titleText: {
    fontSize: 29.5,
    // fontFamily: 'OpenSans',
    color: '#575756',
    fontWeight: 'bold',
    width: 300,
    paddingBottom: 10,
    textAlign: 'center'
  },
  titleTextUnderline: {
    height: 3,
    width: 117,
    backgroundColor: '$primary',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center'
  },
  cardContainer: {
    borderWidth: 6,
    borderRadius: 3,
    borderColor: '#f0f0f0',
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },

  cardHeader: {
    height: 50,
    backgroundColor: '$primary'
  },
  cardHeaderText: {
    fontSize: 23,
    // fontFamily: 'OpenSans',
    color: '#f0f0f0',
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center'
  },
  selectDifferentProjectStyle: {
    flex: 1,
    color: '#ec6453',
    marginTop: 10
  },
  nextButtonText: {
    fontSize: 12,
    backgroundColor: '#ec6453',
    color: '#ec6453'
  }
}));
