import React, { Component } from 'react';
import { View, Image, ScrollView, SafeAreaView, Text } from 'react-native';
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

import { row } from '../../styles/common/common_styles';

export default class Menu extends Component {
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    userProfile: PropTypes.any
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
            <LargeMenuItem
              onPress={() => {
                this.onPressMenu({ uri: getLocalRoute('app_editProfile') });
              }}
              title={i18n.t('label.edit_profile')}
              iconUrl={EditGreen}
            />
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
