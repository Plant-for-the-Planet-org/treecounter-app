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
import {
  iosLogout,
  iosFaqs,
  ProfilePic,
  iosInformation,
  EditGreen
} from '../../assets';
import i18n from '../../locales/i18n.js';
import { getLocalRoute } from '../../actions/apiRouting';
import { getImageUrl } from '../../actions/apiRouting';
import TouchableItem from '../../components/Common/TouchableItem.native';

export default class Menu extends Component {
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    userProfile: PropTypes.any
  };

  componentDidMount() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          this.resetStackToProperRoute(url);
        }
      })
      .catch(e => {});

    // This listener handles the case where the app is woken up from the Universal or Deep Linking
    Linking.addEventListener('url', this.appWokeUp);
  }

  componentWillUnmount() {
    // Remove the listener
    Linking.removeEventListener('url', this.appWokeUp);
  }

  appWokeUp = event => {
    // this handles the use case where the app is running in the background and is activated by the listener...
    // Alert.alert(‘Linking Listener’,‘url  ’ + event.url)
    this.resetStackToProperRoute(event.url);
  };

  resetStackToProperRoute = url => {
    // Do Whatever you need to do within your app to redirect users to the proper route
    let urlBreak = url.split('/');
    console.log(urlBreak);
    const { navigation } = this.props;
    updateRoute('/' + urlBreak[urlBreak.length - 1], navigation, 0);
  };

  //TODO hkurra
  //Ideally this should be in the container but for now to keep the same container for both web and app it's better to keep it here
  onPressMenu = item => {
    const { navigation } = this.props;
    updateRoute(item.uri, navigation, 0);
  };
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
            <Image
              style={styles.profileImageStyle}
              source={
                this.props.userProfile.image
                  ? {
                      uri: getImageUrl(
                        'profile',
                        'thumb',
                        this.props.userProfile.image
                      )
                    }
                  : ProfilePic
              }
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
            <Image style={styles.profileImageStyle} source={ProfilePic} />
            <Text style={styles.profileTextHeading}>{'Guest'}</Text>
            <LargeMenuItem
              style={{ paddingLeft: 0 }}
              onPress={() => {
                this.onPressMenu({ uri: 'app_login' });
              }}
              title={i18n.t('label.login')}
              iconUrl={iosLogout}
            />
          </View>
        )}
        <ScrollView>
          <View style={styles.centerMenu}>
            {this.props.userProfile ? (
              <LargeMenuItem
                onPress={() => {
                  this.onPressMenu({ uri: getLocalRoute('app_editProfile') });
                }}
                title={i18n.t('label.edit_profile')}
                iconUrl={EditGreen}
              />
            ) : null}
            <LargeMenuItem
              onPress={() => {
                this.onPressMenu({ uri: getLocalRoute('app_faq') });
              }}
              title={i18n.t('label.faqs')}
              iconUrl={iosFaqs}
            />
          </View>
        </ScrollView>
        {this.props.userProfile && (
          <View>
            <LargeMenuItem
              onPress={() => {
                this.props.logoutUser();
              }}
              title={i18n.t('label.logout')}
              iconUrl={iosLogout}
            />
          </View>
        )}
        <LargeMenuItem
          onPress={() => {
            this.onPressMenu({ uri: 'about_us' });
          }}
          title={i18n.t('label.about_us')}
          iconUrl={iosInformation}
        />
      </SafeAreaView>
    );
  }
}
