import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectPlantTreeStyles = EStyleSheet.create({
  selectPlantProjectContainer: {
    width: 350,
    height: 600
  },

  header: {
    height: '10%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 29.5,
    color: '#575756',
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center'
  },
  plantProjectContent: {
    height: '100%',
    width: '100%'
  },
  plantProjectContentFull: {
    height: '90%',
    width: '100%'
  },
  plantProjectSelectButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    width: '100%'
  },

  titleTextUnderline: {
    height: 3,
    width: 300,
    backgroundColor: '$primary',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center'
  },
  cardContainer: {
    borderWidth: 6,
    borderRadius: 3,
    borderColor: '#f0f0f0',
    paddingTop: 10,
    paddingBottom: 10,
    height: '90%',
    width: '100%'
  },

  cardHeader: {
    height: '10%',
    width: '100%',
    backgroundColor: '$primary'
  },
  cardContent: {
    height: '90%',
    width: '100%',
    paddingRight: 10
  },

  cardHeaderText: {
    fontSize: 23,
    // fontFamily: 'OpenSans',
    color: '#f0f0f0',
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center'
  },
  slickWrapper: {
    height: '100%'
    // width: '100%'
  },
  nextButtonText: {
    fontSize: 12,
    backgroundColor: '#ec6453',
    color: '#ec6453'
  },
  projectFullContainer: {
    width: '100%',
    height: '100%'
  },
  project_teaser__container: {
    height: '50%',
    width: '100%'
  },
  project_teaser__content: {
    width: '100%',
    height: '30%'
  },
  column: {
    marginTop: 5,
    height: '50%',
    flexDirection: 'row'
  },
  teaser__tpoName: {
    height: '50%'
  },
  teaser__projectImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain'
  },

  teaser__certified: {
    width: 14,
    height: 14
  },

  project_specs__container: {
    width: '100%',
    height: '100%'
  },
  project_info: {
    width: '100%',
    height: '50%'
  },
  project_specs__taxdeductible: {
    width: '100%',
    height: '50%'
  },
  project_specs__item: {
    paddingTop: 5,
    paddingRight: 15,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  project_specs__itemText: {
    fontSize: 14
  }
}));
