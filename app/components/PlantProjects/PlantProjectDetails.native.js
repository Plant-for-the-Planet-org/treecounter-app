import PropTypes from 'prop-types';

import { context } from '../../../app/config/index';
import { View, Text, Linking, Image } from 'react-native';
import VideoContainer from '../../components/Common/VideoContainer';
import React from 'react';
import PlantProjectImageCarousel from './PlantProjectImageCarousel';
import styles from '../../styles/selectplantproject/plant-details.native';
import { link } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem';
import i18n from '../../locales/i18n';
import NewUserContributions from '../UserContributions/NewUserContribution.native';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectDetails
 */
class PlantProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this._goToURL = this._goToURL.bind(this);
  }

  onClickDeleteUserContributor = props => {
    console.log('Clicked Delete ');
  };

  onClickEditUserContributor = props => {
    console.log('Clicked Edit ');
  };

  render() {
    let vUrl = this.props.videoUrl;
    if (context.debug && !this.props.videoUrl) {
      vUrl = 'https://www.youtube.com/embed/XJ3p5TAjH30';
    }
    return (
      <View style={styles.carousalContainer}>
        <NewUserContributions
          treeCount={500.0}
          location={'Yucatan, Mexico'}
          dedicatedTo={'Sagar Aryal'}
          plantedDate={'March 3,2019'}
          onClickDelete={this.onClickDeleteUserContributor}
          onClickEdit={this.onClickEditUserContributor}
        />
        <PlantProjectImageCarousel images={this.props.plantProjectImages} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{this.props.description}</Text>
        </View>
        {this.props.url && this.props.url !== '' ? (
          <TouchableItem
            style={styles.linkTextContainer}
            onPress={() => this._goToURL()}
          >
            <Image source={link} style={styles.linkIcon} />

            <Text style={styles.linkText}>
              {this.props.linkText ? this.props.linkText : i18n.t('label.link')}
            </Text>
          </TouchableItem>
        ) : null}
        <View style={styles.videoContainer}>
          <VideoContainer url={vUrl} />
        </View>
      </View>
    );
  }

  _goToURL() {
    const { url } = this.props;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Don't know how to open URI: " + url);
      }
    });
  }
}

PlantProjectDetails.propTypes = {
  description: PropTypes.string,
  homepageUrl: PropTypes.string,
  homepageCaption: PropTypes.string,
  videoUrl: PropTypes.string,
  mapData: PropTypes.object,
  plantProjectImages: PropTypes.array
};

export default PlantProjectDetails;
