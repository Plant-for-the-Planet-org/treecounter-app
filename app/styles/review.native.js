import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  reviewPageTitle: {
    fontSize: 27,
    lineHeight: 40,
    color: '#4d5153',
    fontWeight: '800',
    fontStyle: 'normal'
  },
  reviewPageSubTitle: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7,
    marginBottom: 15
  },
  totalRating: {
    opacity: 0.8,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    color: '#4d5153'
  },

  pledgeSmallButton: {
    backgroundColor: '#89b53a',
    height: 54,
    width: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: '80%'
  },

  writeReviewButton: {
    paddingHorizontal: 36,
    backgroundColor: '#89b53a',
    height: 52,
    borderRadius: 24,
    marginTop: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  ratingsText: {
    marginRight: 4,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    textTransform: 'uppercase'
  },
  singleRatingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 25,
    minWidth: '40%'
  },
  pickImageButton1: {
    flex: 1,
    backgroundColor: '#03A9F4',
    padding: 12,
    alignItems: 'center',
    borderTopLeftRadius: 4,
    marginTop: 12,
    borderRightWidth: 1,
    borderRightColor: 'white'
  },
  pickImageButton2: {
    flex: 1,
    backgroundColor: '#03A9F4',
    padding: 12,
    alignItems: 'center',
    borderTopRightRadius: 4,
    marginTop: 12
  },
  pickImageButtonText: {
    fontSize: 37
  },
  briefReview: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    paddingTop: 12,
    borderRadius: 4,
    marginTop: 5,
    textAlign: 'left',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  reviewDate: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  headerParent: {
    width: '90%',
    marginLeft: '4%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textParent: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 16
  },
  reviewText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'justify',
    color: '#4d5153'
  },
  ratingsParent: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  pdfButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153'
  },
  pdfButton: {
    paddingHorizontal: 36,
    paddingVertical: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 24,
    marginTop: 20
  }
});
