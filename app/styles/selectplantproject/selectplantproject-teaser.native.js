import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantTeaserStyles = EStyleSheet.create({
  project_teaser__container: {
    flex: 1,
    width: '100%'
  },
  project_teaser__content: {
    width: '100%',
    flex: 0.3
  },
  column: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row'
  },
  project_teaser__contentText: {
    fontSize: 15,
    color: '$textColor',
    marginBottom: 10
  },
  teaser__projectImageContainer: {
    width: '100%',
    flex: 0.7,
    padding: 5
  },
  teaser__projectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },

  teaser__certified: {
    width: 14,
    height: 14
  }
}));
