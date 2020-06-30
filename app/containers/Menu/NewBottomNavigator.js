import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import StaticTabbar from './StaticTabbar';
import i18n from '../../locales/i18n';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialIcons';

let unsubscribe = null;

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent {
  state = {
    isConnected: true,
    buttonType: 'showBottomNav'
  };

  checkInternet() {
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected
      });
    });
  }
  subscribeCheckInternet() {
    unsubscribe = NetInfo.addEventListener(state => {
      this.setState({
        isConnected: state.isConnected
      });
    });
  }
  unsubscribeCheckInternet() {
    if (unsubscribe) {
      unsubscribe();
    }
  }
  componentDidMount() {
    this.subscribeCheckInternet();

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }
  // eslint-disable-next-line no-underscore-dangle
  _keyboardDidShow = () => {
    this.setState({
      buttonType: ''
    });
  };

  // eslint-disable-next-line no-underscore-dangle
  _keyboardDidHide = () => {
    this.setState({
      buttonType: 'showBottomNav'
    });
  };
  componentWillUnmount() {
    this.unsubscribeCheckInternet();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const { width } = Dimensions.get('window');
    const height = 64;
    const tabs = [
      {
        id: 0,
        name: 'earth',
        title: i18n.t('label.menu_world'),
        route: 'app_homepage'
      },
      {
        id: 1,
        name: 'gift-outline',
        title: i18n.t('label.gift'),
        route: 'app_giftTrees'
      },
      {
        id: 2,
        name: 'heart-outline',
        title: i18n.t('label.donate'),
        route: 'app_donateTrees'
      },
      {
        id: 3,
        name: 'crown',
        title: i18n.t('label.compete'),
        route: 'app_competitions'
      },
      {
        id: 4,
        name: 'account-outline',
        title: i18n.t('label.me'),
        route: 'app_userHome'
      }
    ];
    return this.state.buttonType === 'showBottomNav' ? (
      <>
        <View {...{ height, width }}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                borderTopWidth: 1,
                borderTopColor: '#d5d5d5',
                zIndex: 10,
                backgroundColor: '#fff'
              }
            ]}
          >
            <StaticTabbar {...{ tabs }} navigation={this.props.navigation} />
          </View>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              zIndex: 9,
              height: 72,
              width: 72,
              borderRadius: 36,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 16,
              borderColor: '#d5d5d5',
              borderWidth: 1
            }}
          />
        </View>

        {this.state.isConnected ? (
          <SafeAreaView style={styles.container} />
        ) : (
          <TouchableOpacity
            onPress={() => this.checkInternet()}
            style={{
              width: '100%',
              height: 48,
              backgroundColor: '#bdc3c7',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text style={[styles.noInternetText]}>
              {i18n.t('label.noInternet')}
            </Text>
            <Icon name={'refresh'} size={18} color={'#353b48'} />
            {/* <Text style={styles.noInternetText}>{i18n.t('label.someFunctionality')}</Text> */}
          </TouchableOpacity>
        )}
      </>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  noInternetText: {
    color: '#353b48',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    alignSelf: 'center',
    marginRight: 6
  }
});
