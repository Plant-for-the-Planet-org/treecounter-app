import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    marginVertical: 10
  },
  headerText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 27,
    color: '#4d5153'
  },
  subHeaderText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    lineHeight: 24,
    color: '#4d5153'
  },
  timeLineContainer: {
    marginVertical: 10,
    borderWidth: 0,
    borderColor: '#4d5153',
    maxHeight: 40
  },
  timeLineContentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activeChipContainer: {
    backgroundColor: '#87b738',
    alignItems: 'center',
    borderRadius: 60,
    paddingVertical: 5,
    width: 104
  },
  activeChipText: {
    color: '#fff',
    fontFamily: 'OpenSans-Regular'
  },
  chipContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 60,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderColor: '#4d5153',
    borderWidth: 1,
    width: 104
  },
  chipText: {
    color: '#4d5153',
    fontFamily: 'OpenSans-Regular'
  },
  countriesListContainer: {
    flex: 1,
    marginVertical: 10
  },
  oneContryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    borderColor: 'red',
    borderWidth: 0
  },
  indexContainer: {
    width: 27,
    marginRight: 5,
    borderColor: 'red',
    borderWidth: 0
  },
  indexText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    textAlign: 'right'
  },
  countryFlagContainer: {
    flex: 0.2
  },
  countryFlagImage: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  countryBody: {
    flex: 0.7
  },
  countryNameText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    color: '#4d5153',
    lineHeight: 24
  },
  tressCounter: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: '#4d5153',
    fontWeight: 'bold',
    lineHeight: 25
  },
  tressText: {
    fontWeight: 'normal'
  }
});
