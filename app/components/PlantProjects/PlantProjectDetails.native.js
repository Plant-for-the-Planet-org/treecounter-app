import PropTypes from 'prop-types';
import React from 'react';
import { Image, Linking, Text, View, TouchableOpacity } from 'react-native';

import { link } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem';
import VideoContainer from '../../components/Common/VideoContainer';
import NDVI from '../../containers/NDVI/NDVI';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/plant-details.native';
import PlantProjectImageCarousel from './PlantProjectImageCarousel';
import { updateStaticRoute } from '../../helpers/routerHelper';
import AccordionContact./HelperComponents/AccordionContactInfo.nativedionContactInfo.native';
import ReadMore from './HelperComponents/ReadMore.native';
const cleanUrl = url => {
  url = (url || '').trim();
  if (url) {
    // It's a URL
    if (
      url.match(
        // eslint-disable-next-line no-useless-escape
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i
      )
    ) {
      return url;
    }
    // URL with no domain
    if (
      url.match(
        // eslint-disable-next-line no-useless-escape
        /^(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i
      )
    ) {
      return `https://${url}`;
    }
  }
  return null;
};

/**
 * Bottom half of PlantProjectFull
 */
const PlantProjectDetails = ({
  description,
  homepageUrl,
  homepageCaption,
  videoUrl,
  // mapData,
  plantProjectImages,
  ndviUid,
  currentUserProfile,
  navigation,
  tpo: { email, treecounterSlug: slug, address, name }
}) => {
  const getDescriptionPart = (which) => {
    let howManySentence = description.split('.');
    if (!which && howManySentence.length < 3) return false;
    return which == 1 ? howManySentence.slice(0, 2).join('') : howManySentence.slice(-(howManySentence.length - 2)).join('');
  }
  // if (context.debug && !this.props.videoUrl) {
  //   //un-comment this if anybody want to test video playing on App
  //   // videoUrl = 'https://www.youtube.com/embed/XJ3p5TAjH30';
  // }
  const url = cleanUrl(homepageUrl);
  const backgroundColorLightGreen = '#89b53a';
  const backgroundColor = 'white';

  return (
    <View style={styles.carousalContainer}>
      {videoUrl ? (
        <View
          style={[styles.videoContainer, { paddingBottom: 20, borderWidth: 0 }]}
        >
          <VideoContainer url={videoUrl} />
        </View>
      ) : null}
      <PlantProjectImageCarousel images={plantProjectImages} />
      <View style={[styles.descriptionContainer]}>
        <Text style={styles.aboutHeader}>{i18n.t('label.about')}</Text>
        <Text style={styles.descriptionText}>{getDescriptionPart(1)}</Text>
        {getDescriptionPart() && <ReadMore style={styles.descriptionText}
          desciptionText={getDescriptionPart()} />}
      </View>

      <AccordionContactInfo
        navigation={navigation}
        slug={slug}
        updateStaticRoute={updateStaticRoute}
        url={url}
        _goToURL={_goToURL}
        email={email}
        address={address}
        name={name}
      />
      {currentUserProfile && currentUserProfile.isReviewer ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 36,
              backgroundColor: backgroundColorLightGreen,
              height: 52,
              borderRadius: 24,
              width: '85%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
              updateStaticRoute('app_add_review', navigation);
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: backgroundColor,
                fontSize: 16
              }}
            >
              {i18n.t('label.write_review')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {<NDVI ndviUid={ndviUid} />}
    </View>
  );
};

// eslint-disable-next-line no-underscore-dangle
const _goToURL = url => {
  /*
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('Cannot open URI: ' + url);
    }
  });
*/
  Linking.openURL(url).catch(err => console.log('Cannot open URI', err));
};

PlantProjectDetails.propTypes = {
  description: PropTypes.string,
  homepageUrl: PropTypes.string,
  homepageCaption: PropTypes.string,
  videoUrl: PropTypes.string,
  // unused
  mapData: PropTypes.object,
  plantProjectImages: PropTypes.array,
  ndviUid: PropTypes.string,
  currentUserProfile: PropTypes.any
};

export default PlantProjectDetails;
