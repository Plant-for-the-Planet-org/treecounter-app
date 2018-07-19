import React from 'react';
import PropTypes from 'prop-types';
import { tick } from '../../assets';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n.js';
import { View, Image, Text } from 'react-native';

import styles from '../../styles/selectplantproject';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectTeaser
 */
const PlantProjectTeaser = ({
  tpoName,
  projectName,
  isCertified,
  projectImage
}) => {
  return (
    <View style={styles.project_teaser__container}>
      <View style={styles.project_teaser__content}>
        <View style={styles.column}>
          <Text>{projectName} </Text>
          <View>
            {isCertified ? (
              <Image
                style={styles.teaser__certified}
                source={require('../../assets/images/icons/tick.png')}
              />
            ) : null}
          </View>
        </View>
        <Text style={styles.teaser__tpoName}>
          {i18n.t('label.by')} {tpoName}
        </Text>
      </View>
      {projectImage ? (
        <View style={styles.teaser__projectImageContainer}>
          <Image
            style={styles.teaser__projectImage}
            source={{
              uri: getImageUrl('project', 'large', projectImage.image)
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

PlantProjectTeaser.propTypes = {
  tpoName: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  isCertified: PropTypes.bool.isRequired,
  projectImage: PropTypes.any
};

export default PlantProjectTeaser;
