import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { closeIcon } from '../../assets';
import styles from './../../styles/donation/donation.native';
import { donateThankyou } from '../../assets';
import PrimaryButton from '../Common/Button/PrimaryButton.native';
import i18n from '../../locales/i18n';

export default function DonateThankYou(props) {
  const { getParam } = props.navigation;
  let treeCount = getParam('treeCount');
  let plantedBy = getParam('plantedBy');
  let treePossessive = treeCount > 1 ? 'trees' : 'tree';
  return (
    <View style={styles.donateThankYouContainer}>
      {/* ===== Image starts ===== */}
      <View style={[styles.imageContainer]}>
        {/* close icon - goes back to previous screen */}
        <Image source={donateThankyou} style={styles.treeImage} />
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.closeIcon}
        >
          <View style={styles.closeContainer}>
            <Image style={{ width: 16, height: 16 }} source={closeIcon} />
          </View>
        </TouchableOpacity>
      </View>
      {/* ===== Image Ends ===== */}

      <View style={styles.thankYouContainer}>
        <Text style={styles.thankyouText}>{i18n.t('label.thankyou')}!</Text>
        <Text style={styles.thankyouMessage}>
          {i18n.t('label.thankyou_message', {
            treeCount,
            treePossessive,
            plantedBy
          })}
        </Text>
      </View>
      <PrimaryButton onClick={() => {}} buttonStyle={styles.thankyouButton}>
        {i18n.t('label.donation_detail')}
      </PrimaryButton>
    </View>
  );
}
