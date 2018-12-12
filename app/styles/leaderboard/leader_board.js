import EStyleSheet from 'react-native-extended-stylesheet';

const boxShadow = {
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 8 },
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowRadius: 12
};
export default (LeaderboardStyle = EStyleSheet.create({
  leaderBoardContainer: { flex: 1, backgroundColor: '#fff' },
  tooltipContainerStyle: {
    ...boxShadow,
    marginTop: -35,
    marginRight: 10
  },
  sortView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15
  },
  contextMenu: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  cardStyle: {
    ...boxShadow,
    flex: 1,
    padding: 0,
    alignItems: 'center'
  },
  cardImageStyle: {
    top: -50
  },
  outerContainer: {
    alignItems: 'stretch',
    ...boxShadow
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 5,
    flexGrow: 1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  imageStyle: {
    width: 40,
    '@media (min-width: 250) and (max-width: 300)': {
      width: 50
    },
    height: 40,
    '@media (min-width: 250) and (max-width: 300)': {
      height: 50
    }
  },
  selectedBottomTypeLabel: {
    color: '#95c243',
    fontSize: '.7rem',
    '@media (min-width: 250) and (max-width: 350)': {
      fontSize: '.6rem'
    },
    maxWidth: 80
  },
  bottomTypeLabel: {
    color: '#9c9b9b',
    fontSize: '.7rem',
    '@media (min-width: 250) and (max-width: 350)': {
      fontSize: '.6rem'
    },
    maxWidth: 80
  },
  selectedSeprater: {
    backgroundColor: '#95c243',
    width: '100%',
    height: 2,
    marginTop: 3,
    marginBottom: 3
  },
  seprater: {
    backgroundColor: '#9c9b9b',
    width: '100%',
    height: 2,
    marginTop: 3,
    marginBottom: 3
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginBottom: 10
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  itemViewText: {
    marginBottom: 10,
    color: '$lightTextColor'
  },
  categoryType: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
