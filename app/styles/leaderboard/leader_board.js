import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

const boxShadow = {
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 8 },
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowRadius: 12,
  elevation: 4
};
export default (LeaderboardStyle = EStyleSheet.create({
  leaderBoardContainer: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? 'transparent' : '#fff',
    position: 'relative'
  },

  tooltipContainerStyle: {
    zIndex: 7,
    ...boxShadow,
    marginTop: Platform.OS === 'android' ? -10 : -35,
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
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardImageStyle: {
    position: 'absolute',
    zIndex: 1000,
    height: 60,
    width: 60,
    left: '40%'
  },
  plantedContainer: {
    top: 25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plantedTextStyle: {
    marginBottom: 5,
    fontSize: 14,
    color: '$colorPrimaryAccent'
  },
  plantedUnderline: {
    height: 2,
    width: '50%',
    marginBottom: 20,
    backgroundColor: '$colorPrimaryAccent'
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
    backgroundColor: '#fff'
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10
  },
  imageContainerStyle: {
    width: 60,
    height: 60,
    '@media (max-width: 350)': {
      width: 50,
      height: 50
    }
  },
  imageStyle: {
    borderRadius: 30,
    '@media (max-width: 350)': {
      borderRadius: 25
    }
  },
  selectedBottomTypeLabel: {
    fontWeight: 'bold',
    color: '#95c243',
    fontSize: '.8rem',
    '@media (min-width: 250) and (max-width: 350)': {
      fontSize: '.7rem'
    }
  },
  bottomTypeLabel: {
    fontWeight: 'bold',
    color: '#9c9b9b',
    fontSize: '.7rem',
    '@media (min-width: 250) and (max-width: 350)': {
      fontSize: '.6rem'
    }
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
