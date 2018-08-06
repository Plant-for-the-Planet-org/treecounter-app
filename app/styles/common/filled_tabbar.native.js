import EStyleSheet from 'react-native-extended-stylesheet';

export default (filledTabBar = EStyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: '$colorPrimaryAccentLight',
    borderRadius: 5,
    margin: 15
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '$colorPrimaryAccentLight'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center'
  },
  textActive: {
    color: '#fff',
    fontSize: '1.1rem',
    '@media (min-width: 250) and (max-width: 350)': {
      fontSize: '.8rem'
    },
    padding: 10
  },
  text: {
    color: '$colorPrimaryAccentLight',
    padding: 10,
    fontSize: '1.1rem',
    '@media (min-width: 250) and (max-width: 350)': {
      fontSize: '.8rem'
    }
  }
}));
