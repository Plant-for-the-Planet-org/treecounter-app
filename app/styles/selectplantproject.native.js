import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectPlantTreeStyles = EStyleSheet.create({
  selectDifferentProjectStyle: {
    flex: 1,
    color: '#ec6453',
    marginTop: 10
  },
  projectFullContainer: {
    flex: 1,
    height: '100%'
  },
  link: {
    padding: 10
  },
  project_teaser__container: {
    height: '30%'
  },
  project_teaser__content: {
    flex: 1
  },
  teaser__certified: {
    width: 14,
    height: 14
  },
  teaser__projectImage: {
    width: 300,
    height: 100,
    resizeMode: 'contain'
  },
  column: {
    flex: 1,
    flexDirection: 'row'
  },
  project_specs__item: {
    flexDirection: 'row'
  },
  project_specs__container: {
    width: '100%',
    height: '100%'
  }
}));
