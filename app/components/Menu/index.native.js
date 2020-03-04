import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, Text, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import styles from '../../styles/menu.native';
import { updateRoute, updateStaticRoute } from '../../helpers/routerHelper';
import * as icons from '../../assets';
import i18n from '../../locales/i18n.js';
import {
  getLocalRoute,
  getCountryFlagImageUrl
} from '../../actions/apiRouting';
import TouchableItem from '../../components/Common/TouchableItem.native';
import UserProfileImage from '../Common/UserProfileImage.native';
import GlobalCurrencySelector from '../Currency/GlobalCurrencySelector.native';
import { LargeMenuItem } from './MenuItem.native';
import countryCodes from '../../assets/countryCodes.json';
import CurrencySelector from '../Common/CurrencySelectorList.native';

//   icons.target_outline;

export default class Menu extends Component {
  state = {
    showCurrencyModal: false
  };
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    selectPlantProjectAction: PropTypes.func,
    userProfile: PropTypes.any,
    navigation: PropTypes.any,
    lastRoute: PropTypes.any
  };
  hideCurrencyModal = () => {
    this.setState({ showCurrencyModal: false });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.lastRoute != this.props.lastRoute) {
      updateRoute(
        nextProps.lastRoute.routeName,
        this.props.navigation,
        0,
        nextProps.lastRoute.routeParams
      );
    }
  }

  async componentDidMount() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          this.resetStackToProperRoute(url);
        }
      })
      .catch(e => {
        debug(e);
      });

    // This listener handles the case where the app is woken up from the Universal or Deep Linking
    Linking.addEventListener('url', this.appWokeUp);
    // const welcome = await fetchItem('welcome');
    if (!this.props.userProfile) {
      // if (welcome == null) {
      //   updateRoute('welcome_screen', this.props.navigation, 0);
      // } else {
      //   updateRoute('app_homepage', this.props.navigation, 0);
      // }
      updateRoute('welcome_screen', this.props.navigation, 0);
    }
    // saveItem('welcome', JSON.stringify({ value: 'true' }));
  }
  componentWillUnmount() {
    // Remove the listener
    Linking.removeEventListener('url', this.appWokeUp);
  }

  appWokeUp = event => {
    // this handles the use case where the app is running in the background and is activated by the listener...
    // Alert.alert(‘Linking Listener’,‘url  ’ + event.url)
    this.resetStackToProperRoute(event.url);
    if (event.url.indexOf('signup') > 0) {
      this.handleOpenURL(event.url);
    }
  };

  handleOpenURL = url => {
    let linkArr = url.split('/');
    if (linkArr && linkArr.length > 0) {
      if (linkArr[1] === 'signup') {
        if (linkArr.length > 2) {
          this.props.navigation.navigate(getLocalRoute('app_signup'), {
            profileTypeParam: linkArr[2]
          });
        } else {
          this.props.navigation.navigate(getLocalRoute('app_signup'));
        }
      }
    }
  };

  resetStackToProperRoute = url => {
    // Do Whatever you need to do within your app to redirect users to the proper route
    let urlBreak = url.split('/');
    //debug(urlBreak);
    const { navigation } = this.props;
    if (
      urlBreak.indexOf('account-activate') !== -1 ||
      urlBreak.indexOf('reset-password') !== -1
    ) {
      setTimeout(
        () =>
          updateRoute(
            '/' + urlBreak[urlBreak.length - 2],
            // '/' +
            // urlBreak[urlBreak.length - 1],
            navigation,
            0,
            {
              token: urlBreak[urlBreak.length - 1]
            }
          ),
        0
      );
    } else if (urlBreak.indexOf('competition') !== -1) {
      setTimeout(
        () =>
          updateRoute(
            '/' + urlBreak[urlBreak.length - 2],
            // '/' +
            // urlBreak[urlBreak.length - 1],
            navigation,
            0,
            {
              competition: urlBreak[urlBreak.length - 1]
            }
          ),
        0
      );
    } else if (urlBreak.indexOf('t') !== -1) {
      setTimeout(
        () =>
          updateRoute(
            '/' + urlBreak[urlBreak.length - 2],
            // '/' +
            // urlBreak[urlBreak.length - 1],
            navigation,
            0,
            {
              treeCounterId: urlBreak[urlBreak.length - 1]
            }
          ),
        0
      );
    } else if (urlBreak[urlBreak.length - 2] === 'donate-trees') {
      this.props.selectPlantProjectAction(urlBreak[urlBreak.length - 1]);
      setTimeout(() => updateRoute('app_selectProject', navigation, 0, {}), 0);
    } else {
      setTimeout(
        () => updateRoute('/' + urlBreak[urlBreak.length - 1], navigation, 0),
        0
      );
    }
  };

  //TODO hkurra
  //Ideally this should be in the container but for now to keep the same container for both web and app it's better to keep it here
  onPressMenu(item) {
    const { navigation } = this.props;
    updateRoute(item.uri, navigation, 0, this.params);
  }
  onPressUserProfile = () => {
    const { navigation } = this.props;
    updateRoute('app_userHome', navigation, 0);
  };

  getCountryCode = currency => countryCodes.find(c => c.code == currency) || {};

  handleCurrencyChange = selectedOption => {
    // this.setState({ preferredCurrency: selectedOption });
    this.props.setCurrencyAction(selectedOption);
    this.props.userProfile &&
      this.props.updateUserProfile({ currency: selectedOption }, 'currency');
  };

  render() {
    return (
      <SafeAreaView style={styles.outerContainer}>
        {this.props.userProfile ? (
          <TouchableItem
            style={styles.topProfileContainer}
            onPress={() => this.onPressUserProfile()}
          >
            <UserProfileImage
              profileImage={
                this.props.userProfile && this.props.userProfile.image
              }
              style={styles.profileImageStyle}
              imageStyle={{ width: 60, height: 60, borderRadius: 60 / 2 }}
            />

            <Text style={styles.profileTextHeading}>
              {this.props.userProfile.fullname}
            </Text>
            <Text style={styles.profileText}>
              {this.props.userProfile.email}
            </Text>
          </TouchableItem>
        ) : (
          <View style={styles.profileContainer}>
            <UserProfileImage
              style={styles.profileLogImageStyle}
              imageStyle={{ width: 60, height: 60, borderRadius: 60 / 2 }}
            />
            <Text style={styles.profileTextHeading}>
              {i18n.t('label.guest')}
            </Text>
            <LargeMenuItem
              style={{ paddingLeft: 0 }}
              onPress={this.onPressMenu.bind(this, { uri: 'app_login' })}
              title={i18n.t('label.login')}
              iconUrl={icons.logout}
            />
          </View>
        )}
        <ScrollView style={styles.sideNavigationActionMenuContainer}>
          <View style={styles.centerMenu}>
            <LargeMenuItem
              onPress={() => {
                this.setState({ showCurrencyModal: true });
              }}
              title={i18n.t('label.select_currency')}
              iconUrl={{
                uri: getCountryFlagImageUrl(
                  this.getCountryCode(this.props.preferredCurrency.currency)
                    .currencyCountryFlag,
                  'png',
                  256
                )
              }}
              // iconUrl={icons.dollar}
            />
            {this.props.userProfile ? (
              <LargeMenuItem
                onPress={this.onPressMenu.bind(this, {
                  uri: 'app_editProfile'
                })}
                title={i18n.t('label.edit_profile')}
                iconUrl={icons.editProfile}
              />
            ) : null}
            {this.props.userProfile ? (
              <LargeMenuItem
                onPress={this.onPressMenu.bind(this, {
                  uri: 'app_target'
                })}
                title={
                  this.props.treecounter.countTarget > 0
                    ? i18n.t('label.update_target')
                    : i18n.t('label.set_target')
                }
                iconUrl={icons.target_outline}
              />
            ) : null}

            {this.props.userProfile ? (
              <LargeMenuItem
                // onPress={this.onPressMenu.bind(this, {
                //   uri: getLocalRoute('app_redeem'),
                //   params: { code: null }
                // })}
                onPress={() => {
                  updateStaticRoute('app_redeem', this.props.navigation, {
                    code: null
                  });
                }}
                title={i18n.t('label.redeem_trees')}
                iconUrl={icons.redeem_outline}
              />
            ) : null}
            {this.props.userProfile ? (
              <LargeMenuItem
                onPress={this.onPressMenu.bind(this, {
                  uri: 'app_challenge'
                })}
                title={i18n.t('label.challenge_heading')}
                iconUrl={icons.challenge_outline}
              />
            ) : null}

            {this.props.userProfile ? (
              <LargeMenuItem
                onPress={this.onPressMenu.bind(this, {
                  uri: 'pickup_profile_modal'
                })}
                title={i18n.t('label.community')}
                details={
                  this.props.userProfile.supportedTreecounter &&
                  this.props.userProfile.supportedTreecounter.displayName
                    ? this.props.userProfile.supportedTreecounter.displayName
                    : i18n.t('label.pick_profile')
                }
                iconUrl={icons.communityMenu}
              />
            ) : null}

            <LargeMenuItem
              onPress={this.onPressMenu.bind(this, {
                uri: getLocalRoute('app_faq')
              })}
              title={i18n.t('label.faqs')}
              iconUrl={icons.faqs}
            />
          </View>

          <CurrencySelector
            hideCurrencyModal={this.hideCurrencyModal}
            show={this.state.showCurrencyModal}
            handleCurrencyChange={this.handleCurrencyChange}
          />
          {/* <GlobalCurrencySelector
              hideCurrencyModal={this.hideCurrencyModal.bind(this)}
              show={this.state.showCurrencyModal}
              handleCurrencyChange={handleCurrencyChange}
            /> */}
        </ScrollView>

        <View style={styles.sideNavigationActionMenuContainer}>
          {this.props.userProfile ? (
            <LargeMenuItem
              onPress={this.props.logoutUser}
              title={i18n.t('label.logout')}
              iconUrl={icons.logout}
            />
          ) : null}
          <LargeMenuItem
            onPress={this.onPressMenu.bind(this, { uri: 'about_us' })}
            title={i18n.t('label.information')}
            iconUrl={icons.info}
          />
        </View>
      </SafeAreaView>
    );
  }
}
