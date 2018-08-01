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
  cardSubContainer: {
    padding: 5,
    marginBottom: 8
  },
  headContainer: {
    padding: 30
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginTop: 8,
    justifyContent: 'flex-start'
  },
  dateStyle: {
    color: '#aba2a2',
    fontSize: 16,
    textAlign: 'left'
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: 8,
    color: '$colorPrimaryAccent',
    paddingRight: 12,
    flex: 1
  },
  content: {
    marginTop: 8,
    padding: 0,
    flex: 1,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 17,
    height: 18,
    resizeMode: 'center'
  },
  seprator: {
    height: 2,
    backgroundColor: '#dadada'
  },
  actionBar: {
    flexDirection: 'row',
    height: 35,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%'
  },
  actionButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '$colorPrimaryAccent'
  }
}));
