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
    paddingBottom: 5,
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
    height: '90%',
    width: '100%',
    marginLeft: 12
  },

  cardHeader: {
    height: '10%',
    width: '100%',
    backgroundColor: '$primary'
  },
  cardContent: {
    height: '90%',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 12
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
  tpoFooterNavImage: {
    position: 'absolute',
    height: 30,
    width: 30,
    color: 'transparent',
    padding: 0,
    top: '50%'
  },
  tpoFooterNavImageLeft: {
    left: -55,
    position: 'absolute',
    height: 30,
    width: 30,
    color: 'black',
    padding: 0,
    top: -500,
    elevation: 1
  },
  tpoFooterNavImageRight: {
    left: -55,
    position: 'absolute',
    height: 30,
    width: 30,
    color: 'black',
    padding: 0,
    top: -500,
    elevation: 1
  },
  projectFullContainer: {
    // width: '100%',
    height: '100%'
  },
  project_teaser__container: {
    height: '50%'
    //width: '100%'
  },
  project_teaser__content: {
    //width: '100%',
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
    // width: '100%',
    height: '100%',
    flex: 1
  },
  project_info: {
    // width: '100%',
    width: 350,
    height: '50%'
  },
  project_specs__taxdeductible: {
    //width: '100%',
    width: 300,
    flex: 1
  },
  project_specs__taxdeductibleText: {
    width: 280,
    marginRight: 10,
    fontSize: 5
  },
  project_specs__item: {
    width: 350,
    paddingTop: 5,
    paddingRight: 15,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  project_specs__itemText: {
    fontSize: 14
  },
  project_specs__itemText: {
    flex: 5,
    alignSelf: 'flex-end',
    alignContent: 'flex-end'
  },
  spec_icon__container: {
    height: 20,
    width: 20,
    flex: 1
  },
  spec_icon: {
    height: 20,
    width: 20
  }
}));
