import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/competition/competition-snippet.native';
import { flagTarget } from '../../assets';
import UserProfileImage from '../Common/UserProfileImage.native';

class CompetitionTopCompetitor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.topCompetitorSection}>
        <View style={styles.topCompetitorName}>
          <Text style={styles.topCompetitorScoreText}>
            {this.props.index + 1 + ')'}
          </Text>
          <UserProfileImage
            profileImage={
              this.props.topCompetitor &&
              this.props.topCompetitor.treecounterAvatar
            }
            style={styles.profileImageStyle}
            imageStyle={{ borderRadius: 15 }}
          />
          <Text style={styles.topCompetitorScoreText}>
            {this.props.topCompetitor.treecounterDisplayName}
          </Text>
        </View>
        <View style={styles.topCompetitorScore}>
          <Text style={styles.topCompetitorScoreText}>
            {this.props.topCompetitor.score}
          </Text>
        </View>
      </View>
    );
  }
}

export default CompetitionTopCompetitor;
CompetitionTopCompetitor.propTypes = {
  index: PropTypes.number,
  topCompetitor: PropTypes.any
};
