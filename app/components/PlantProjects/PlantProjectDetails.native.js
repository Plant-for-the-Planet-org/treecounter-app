import PropTypes from 'prop-types';
import React from 'react';
import {
  Linking,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

import { link, readmoreDown, readmoreUp } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem';
import VideoContainer from '../../components/Common/VideoContainer';
// import NDVI from '../../containers/NDVI/NDVI';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/plant-details.native';
import PlantProjectImageCarousel from './PlantProjectImageCarousel';
import { updateStaticRoute } from '../../helpers/routerHelper';
import AccordionContactInfo from './HelperComponents/AccordionContactInfo.native';

import { readmoreDown, readmoreUp } from '../../assets';
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
// const getDescriptionPart = (which, description) => {
//   let howManySentence = description.split('.');
//   if (!which && howManySentence.length < 3) return false;
//   return which == 1
//     ? howManySentence
//         .slice(0, 2)
//         .join('.')
//         .concat('.')
//     : howManySentence.slice(-(howManySentence.length - 2)).join('.');
// };
/**
 * Bottom half of PlantProjectFull
 */
const PlantProjectDetails = ({
  description,
  url: homepageUrl,
  videoUrl,
  // mapData,
  plantProjectImages,
  // ndviUid,
  currentUserProfile,
  navigation,
  tpo: { email, treecounterSlug: slug, address, name }
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}
      >
        {videoUrl ? <VideoContainer url={videoUrl} /> : null}
        {/* TODO Add thumbnail for video */}
        <PlantProjectImageCarousel
          resizeMode={'cover'}
          images={plantProjectImages}
          aspectRatio={16 / 9}
          videoUrl={videoUrl}
        />
      </ScrollView>

      <View style={[styles.accordionCardView, { marginTop: 20 }]}>
        <Text style={styles.descriptionTextTitle}>{i18n.t('label.about')}</Text>
        <Text style={styles.descriptionText}>
          {readMore ? description : description.substring(0, 250) + '...'}
        </Text>
        <TouchableOpacity onPress={() => setReadMore(!readMore)}>
          {readMore ? (
            <View style={styles.readmoreButtonView}>
              <View style={{ height: 8 }}>
                <Image
                  source={readmoreUp}
                  style={{ height: 8, width: 15 }}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={styles.readMoreText}>
                {i18n.t('label.read_less')}
              </Text>
            </View>
          ) : (
            <View style={styles.readmoreButtonView}>
              <View style={{ height: 8 }}>
                <Image
                  source={readmoreDown}
                  style={{ height: 8, width: 15 }}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={styles.readMoreText}>
                {i18n.t('label.read_more')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {/* <Text style={styles.descriptionText}>
          {description && getDescriptionPart(1, description)}
        </Text>
        {description &&
          getDescriptionPart(0, description) && (
            <ReadMore
              style={styles.descriptionText}
              descriptionText={getDescriptionPart(0, description)}
            />
          )} */}
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

      {/* {<NDVI ndviUid={ndviUid} />} */}
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
