import PropTypes from 'prop-types';
import React from 'react';
import { Image, Linking, Text, View, TouchableOpacity } from 'react-native';

import { link, readmoreDown, readmoreUp } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem';
import VideoContainer from '../../components/Common/VideoContainer';
import NDVI from '../../containers/NDVI/NDVI';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/plant-details.native';
import PlantProjectImageCarousel from './PlantProjectImageCarousel';
import { updateStaticRoute } from '../../helpers/routerHelper';
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
  navigation
}) => {
  // if (context.debug && !this.props.videoUrl) {
  //   //un-comment this if anybody want to test video playing on App
  //   // videoUrl = 'https://www.youtube.com/embed/XJ3p5TAjH30';
  // }
  const url = cleanUrl(homepageUrl);
  const backgroundColorLightGreen = '#89b53a';
  const backgroundColor = 'white';

  const [readMore, setReadMore] = React.useState(false);

  return (
    <View style={styles.carousalContainer}>
      <PlantProjectImageCarousel images={plantProjectImages} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTextTitle}>About</Text>
        <Text style={styles.descriptionText}>
          {readMore ? description : description.substring(0, 200) + '...'}
        </Text>
        <TouchableOpacity onPress={() => setReadMore(!readMore)}>
          {readMore ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 6
              }}
            >
              <View style={{ height: 12, marginRight: 8 }}>
                <Image
                  source={readmoreUp}
                  style={{ height: 12, width: 19.46 }}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={styles.descriptionText}>Read less</Text>
            </View>
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 6
              }}
            >
              <View style={{ height: 12, marginRight: 8 }}>
                <Image
                  source={readmoreDown}
                  style={{ height: 12, width: 19.46 }}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={styles.descriptionText}>Read more</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {url ? (
        <TouchableItem
          style={styles.linkTextContainer}
          onPress={() => _goToURL(url)}
        >
          <Image source={link} style={styles.linkIcon} />

          <Text style={styles.linkText}>
            {homepageCaption ? homepageCaption : i18n.t('label.link')}
          </Text>
        </TouchableItem>
      ) : null}
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
      {videoUrl ? (
        <View style={styles.videoContainer}>
          <VideoContainer url={videoUrl} />
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
