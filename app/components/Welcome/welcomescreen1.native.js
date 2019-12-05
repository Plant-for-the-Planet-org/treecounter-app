import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { treelogo } from '../../assets';
import styles from '../../styles/WelcomeScreens/WelcomeScreen1';

const WelcomeScreen1 = ({}) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.crossContainer}>
        <Icon name="remove" size={25} color="#89b53a" />
      </View>
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={treelogo}
        />
        <Text style={styles.textHeader}>
          {i18n.t('label.welcome_scrn_1_heading')}
        </Text>
        <Text style={styles.textPara}>
          {i18n.t('label.welcome_scrn_1_sub_heading')}
        </Text>
      </View>

      <View style={{ height: 130 }}>
        <View style={styles.bottomRow}>
          <PrimaryButton buttonStyle={styles.buttonStyle}>
            <Text style={styles.gettingStartedBtn}>
              {i18n.t('label.welcome_scrn_1_get_started_btn')}
            </Text>
          </PrimaryButton>
        </View>
        <View style={styles.bottomRow2}>
          <PrimaryButton buttonStyle={styles.buttonStyle2}>
            <Text style={styles.alreadyHaveAccountBtn}>
              {i18n.t('label.welcome_scrn_1_already_have_an_account')}
            </Text>
          </PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen1;
