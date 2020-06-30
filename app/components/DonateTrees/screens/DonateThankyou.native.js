import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';
import { closeIcon, donateThankyou } from '../../../assets';
import i18n from '../../../locales/i18n';
import styles from '../../../styles/donation/donation.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { updateRoute } from '../../../helpers/routerHelper';

export default function DonateThankYou(props) {
  const { getParam } = props.navigation;
  let treeCount = getParam('treeCount');
  let plantedBy = getParam('plantedBy');
  let loggedIn = getParam('loggedIn');
  let treePossessive = treeCount > 1 ? 'trees' : 'tree';

  let navigateBack = () => {
    updateRoute('app_donateTrees', props.navigation);
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', navigateBack);
    // clean up
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', navigateBack);
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.donateThankYouContainer}>
        {/* ===== Image starts ===== */}
        <View style={[styles.imageContainer, styles.height40]}>
          {/* close icon - goes back to previous screen */}
          <Image
            source={donateThankyou}
            style={[styles.treeImage, styles.height40]}
          />
          <TouchableOpacity
            onPress={() => navigateBack()}
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

        {/* ========= Share container STARTS ========== */}
        {/* <View style={styles.shareDonationContainer}>
        <Image source={deciduousTree} style={styles.shareImageTree} />
        <View style={styles.pfpLogoContainer}>
          <Image source={planetLogo} style={styles.pfpLogo} />
        </View>
        <Text style={styles.shareTextMessage}>
          Felix Finkbeiner donated 50 Trees to Eden Reforestation Kenya
        </Text>
        <Text style={styles.shareTextCaption}>Plant trees at weplant.app</Text> */}

        {/* ========== Floating Share button group STARTS ========= */}
        {/* <View style={styles.shareButtonGroup}>
          <TouchableOpacity onPress={() => {}} style={{}}>
            <View
              style={[
                {
                  borderRadius: 100,
                  padding: 14,
                  backgroundColor: "#ffffff"
                },
                styles.borderGreen
              ]}
            >
              <Image
                style={{ width: 14, height: 14, padding: 10 }}
                source={downloadGreen}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={{}}>
            <View style={[styles.buttonContainer, styles.borderGreen]}>
              <Image style={{ width: 24, height: 24 }} source={sendGreen} />
              <Text style={styles.borderedButtonText}>Share</Text>
            </View>
          </TouchableOpacity>
        </View> 
       
      </View>*/}
        {/* ========= Share container ENDS ========== */}
      </ScrollView>
      <PrimaryButton
        onClick={() => {
          loggedIn
            ? updateRoute('app_userHome', props.navigation)
            : updateRoute('app_donateTrees', props.navigation);
        }}
        buttonStyle={styles.thankyouButton}
      >
        <Text>Go Home</Text>
      </PrimaryButton>
    </View>
  );
}
