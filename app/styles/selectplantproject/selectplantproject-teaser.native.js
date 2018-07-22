import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantTeaserStyles = EStyleSheet.create({
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
  project_teaser__contentText: {
    height: '50%',
    fontSize: 15
  },
  teaser__projectImageContainer: {
    width: 350,
    height: '70%'
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
