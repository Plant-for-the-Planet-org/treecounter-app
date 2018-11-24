import EStyleSheet from 'react-native-extended-stylesheet';

const getHeaderText = function(padding, margin) {
  return {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: margin,
    color: '$colorPrimaryAccent',
    paddingRight: padding,
    flex: 1
  };
};
export default (myTreesStyle = EStyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20
  },
  contributionContainer: {
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: '#e6e6e6',
    // borderLeftColor:
    //   contribution.contributionType == 'donation'
    //     ? '#95c243'
    //     : contribution.treeCount > 1
    //       ? '#68aeec'
    //       : '#ec6453',
    justifyContent: 'space-between',
    minHeight: 60,
    marginBottom: 10,
    margin: 10
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
  headerText: getHeaderText(12, 8),
  pictureText: getHeaderText(0, 0),
  content: {
    marginTop: 8,
    padding: 0,
    flex: 1,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 17,
    height: 18,
    resizeMode: 'contain'
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
