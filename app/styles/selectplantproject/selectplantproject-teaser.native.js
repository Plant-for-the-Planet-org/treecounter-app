import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantTeaserStyles = EStyleSheet.create({
  project_teaser__container: {
    flex: 1,
    width: '100%'
  },
  project_teaser__content: {
    width: '100%',
    flex: 0.2
  },
  column: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row'
  },
  project_teaser__contentText: {
    fontSize: 15
  },
  teaser__projectImageContainer: {
    width: 350,
    flex: 0.8
  },
  teaser__projectImage: {
    width: '95%',
    height: '100%',
    resizeMode: 'stretch'
  },

  teaser__certified: {
    width: 14,
    height: 14
  }
}));
