import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Swiper from '../../components/ReactNativeSwiper/index';
import WelcomeScreen1 from './welcomescreen1.native';
import WelcomeScreen2 from './welcomescreen2.native';
import WelcomeScreen3 from './welcomescreen3.native';
import WelcomeScreen4 from './welcomescreen4.native';
import WelcomeScreen5 from './welcomescreen5.native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';
import styless from '../../styles/WelcomeScreens/WelcomeScreen5';
import { updateRoute } from '../../helpers/routerHelper/routerHelper.native';

const WelcomSlider = ({ navigation }) => {
  const appHomePage = () => updateRoute('app_homepage', navigation);
  const Footer = () => {
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 16 }}>
        <View style={styless.bottomRow}>
          <PrimaryButton
            onClick={() => updateRoute('app_signup', navigation)}
            buttonStyle={styless.buttonStyle}
          >
            <Text style={styless.continueBtn}>
              {i18n.t('label.welcome_scrn_5_create_an_account')}
            </Text>
          </PrimaryButton>
        </View>
        <View style={styless.bottomRow}>
          <PrimaryButton
            onClick={() => updateRoute('app_login', navigation)}
            buttonStyle={styless.lowerBtnStyle}
          >
            <Text style={styless.alreadyHaveAccountBtn}>
              {i18n.t('label.welcome_scrn_5_already_have_an_account')}
              <Text style={styless.signInBtn}>
                {' '}
                {i18n.t('label.welcome_scrn_5_sign_in')}
              </Text>
            </Text>
          </PrimaryButton>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        showsButtons={false}
        activeDotColor={'#89b53a'}
        paginationStyle={{ bottom: -5 }}
      >
        <View style={styles.container}>
          <WelcomeScreen1 _appHomePage={appHomePage} />
        </View>
        <View style={styles.container}>
          <WelcomeScreen2 />
        </View>
        <View style={styles.container}>
          <WelcomeScreen3 />
        </View>
        <View style={styles.container}>
          <WelcomeScreen4 />
        </View>
        <View style={styles.container}>
          <WelcomeScreen5 />
        </View>
      </Swiper>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});
export default WelcomSlider;
