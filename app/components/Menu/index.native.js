import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  Linking
} from 'react-native';
import { LargeMenuItem } from './MenuItem.native';
import PropTypes, { func } from 'prop-types';
import styles from '../../styles/menu.native';
import { updateRoute } from '../../helpers/routerHelper';
import * as icons from '../../assets';
import i18n from '../../locales/i18n.js';
import { getLocalRoute } from '../../actions/apiRouting';
import TouchableItem from '../../components/Common/TouchableItem.native';
import { fetchItem, saveItem } from '../../stores/localStorage';
import UserProfileImage from '../Common/UserProfileImage.native';

//   icons.target_outline;

export default class Menu extends Component {
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    userProfile: PropTypes.any,
    navigation: PropTypes.any,
    lastRoute: PropTypes.any
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
      .catch(e => {});

    // This listener handles the case where the app is woken up from the Universal or Deep Linking
    Linking.addEventListener('url', this.appWokeUp);
    const welcome = await fetchItem('welcome');

    if (!this.props.userProfile) {
      if (welcome == null) {
        updateRoute('welcome_screen', this.props.navigation, 0);
      } else {
        updateRoute('app_homepage', this.props.navigation, 0);
      }
    }
    saveItem('welcome', JSON.stringify({ value: 'true' }));
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
    //console.log(urlBreak);
    const { navigation } = this.props;
    updateRoute('/' + urlBreak[urlBreak.length - 1], navigation, 0);
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

  render() {
    return (
      <SafeAreaView style={styles.outerContainer}>
        {this.props.userProfile ? (
          <TouchableItem
            style={styles.profileContainer}
            onPress={() => this.onPressUserProfile()}
          >
            <UserProfileImage
              profileImage={
                this.props.userProfile && this.props.userProfile.image
              }
              style={styles.profileImageStyle}
              imageStyle={{ borderRadius: 30 }}
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
            <Image style={styles.profileImageStyle} source={icons.ProfilePic} />
            <Text style={styles.profileTextHeading}>{'Guest'}</Text>
            <LargeMenuItem
              style={{ paddingLeft: 0 }}
              onPress={this.onPressMenu.bind(this, { uri: 'app_login' })}
              title={i18n.t('label.login')}
              iconUrl={icons.iosLogout}
            />
          </View>
        )}
        <ScrollView style={styles.sideNavigationActionMenuContainer}>
          <View style={styles.centerMenu}>
            {this.props.userProfile ? (
              <LargeMenuItem
                onPress={this.onPressMenu.bind(this, {
                  uri: 'app_editProfile'
                })}
                title={i18n.t('label.edit_profile')}
                iconUrl={icons.editGrey}
              />
            ) : null}
            {this.props.userProfile ? (
              <LargeMenuItem
                onPress={this.onPressMenu.bind(this, {
                  uri: 'app_target'
                })}
                title={i18n.t('label.set_target')}
                iconUrl={icons.target_outline}
              />
            ) : null}

            <LargeMenuItem
              onPress={this.onPressMenu.bind(this, {
                uri: getLocalRoute('app_redeem'),
                params: { code: null }
              })}
              title={i18n.t('label.redeem_trees')}
              iconUrl={icons.redeem_outline}
            />
            {this.props.userProfile ? (
              <LargeMenuItem
                onPress={this.onPressMenu.bind(this, {
                  uri: 'app_challenge'
                })}
                title={i18n.t('label.challenge_heading')}
                iconUrl={icons.challengeIcon}
              />
            ) : null}
            <LargeMenuItem
              onPress={this.onPressMenu.bind(this, {
                uri: getLocalRoute('app_faq')
              })}
              title={i18n.t('label.faqs')}
              iconUrl={icons.iosFaqs}
            />
          </View>
        </ScrollView>
        {this.props.userProfile ? (
          <View>
            <LargeMenuItem
              onPress={this.props.logoutUser}
              title={i18n.t('label.logout')}
              iconUrl={icons.iosLogout}
            />
          </View>
        ) : null}
        <LargeMenuItem
          onPress={this.onPressMenu.bind(this, { uri: 'about_us' })}
          title={i18n.t('label.information')}
          iconUrl={icons.infoGrey}
        />
      </SafeAreaView>
    );
  }
}
