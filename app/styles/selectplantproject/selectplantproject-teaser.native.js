import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantTeaserStyles = EStyleSheet.create({
  project_teaser__container: {
    height: '100%',
    width: '100%'
  },
  project_teaser__content: {
    width: '100%',
    height: 60
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
    height: '80%',
    paddingBottom: 10
  },
  teaser__projectImage: {
    width: undefined,
    height: undefined,
    flex: 1
  },

  teaser__certified: {
    width: 14,
    height: 14
  }
}));
