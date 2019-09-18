import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../styles/welcome_screen.native';
import { Text, View, ScrollView, TextInput, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';
import welcomeLogo from '../../assets/images/icons/welcomeLogo.png';
import { updateRoute } from '../../helpers/routerHelper/routerHelper.native';
import TouchableItem from '../Common/TouchableItem.native';
const colorLiteralWhite = 'white';
class WelcomeScreenModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const welcomeScreenProfile = this.props.navigation.getParam(
      'welcomeScreenProfile'
    );
    return (
      <View style={styles.confirmDeleteContainer}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            backgroundColor: colorLiteralWhite
          }}
        >
          <View style={styles.container}>
            <Image
              style={styles.imageStyle}
              resizeMode="contain"
              source={welcomeLogo}
            />
            <Text style={styles.textHeader}>
              {i18n.t('label.welcome_to_ttc')}
            </Text>
            <Text style={styles.textPara}>
              {i18n.t('label.welcome_screen_summery')}
            </Text>
            <Text style={styles.textPara}>
              {i18n.t('label.welcome_screen_summery_1')}
            </Text>
            <TouchableItem
              onPress={() => updateRoute('app_homepage', this.props.navigation)}
            >
              <Text
                style={[styles.textPara, { marginTop: 20, fontWeight: 'bold' }]}
              >
                {i18n.t('label.view_global_treecounter')}
              </Text>
            </TouchableItem>
          </View>
        </ScrollView>
        <View style={styles.bottomRow}>
          <PrimaryButton
            buttonStyle={styles.buttonStyle}
            onClick={() => {
              updateRoute('app_login', this.props.navigation);
            }}
          >
            {i18n.t('label.login')}
          </PrimaryButton>
          <PrimaryButton
            buttonStyle={styles.buttonStyle}
            onClick={() => {
              updateRoute('app_signup', this.props.navigation);
            }}
          >
            {i18n.t('label.signUp')}
          </PrimaryButton>
        </View>
      </View>
    );
  }
}

export default withNavigation(WelcomeScreenModal);
WelcomeScreenModal.propTypes = {
  onSave: PropTypes.any
};
