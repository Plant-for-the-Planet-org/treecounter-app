import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/competition/competition-full.native';
import { flagTarget } from '../../assets';
import UserProfileImage from '../Common/UserProfileImage.native';
import snippetStyles from '../../styles/competition/competition-snippet.native';
import PrimaryButton from '../Common/Button/PrimaryButton';

class CompetitionParticipant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.topCompetitorSection}>
        <View style={styles.topCompetitorName}>
          <UserProfileImage
            profileImage={
              this.props.competitor && this.props.competitor.treecounterAvatar
            }
            style={styles.profileImageStyle}
            imageStyle={{ borderRadius: 15 }}
          />

          <View style={styles.participantNameContainer}>
            <Text style={styles.topCompetitorNameText}>
              {this.props.competitor.treecounterDisplayName}
            </Text>
            {this.props.type === 'participant' ? (
              <Text style={styles.topCompetitorScoreText}>
                {this.props.competitor.score} Planted
              </Text>
            ) : this.props.type === 'request_join' ? (
              <View style={styles.confirm_delete_button}>
                <PrimaryButton
                  style={snippetStyles.buttonItem}
                  buttonStyle={snippetStyles.buttonStyle}
                  textStyle={snippetStyles.buttonTextStyle}
                >
                  <Text> {i18n.t('label.confirm')}</Text>
                </PrimaryButton>
                <PrimaryButton
                  style={snippetStyles.buttonItem}
                  buttonStyle={snippetStyles.buttonStyle}
                  textStyle={snippetStyles.buttonTextStyle}
                >
                  <Text> {i18n.t('label.delete')}</Text>
                </PrimaryButton>
              </View>
            ) : null}
          </View>
        </View>
        {this.props.type === 'participants' ? (
          <View style={styles.topCompetitorScore}>
            <PrimaryButton
              style={snippetStyles.buttonItem}
              buttonStyle={snippetStyles.buttonStyle}
              textStyle={snippetStyles.buttonTextStyle}
            >
              <Text> {i18n.t('label.support')}</Text>
            </PrimaryButton>
          </View>
        ) : null}
      </View>
    );
  }
}

export default CompetitionParticipant;
CompetitionParticipant.propTypes = {
  index: PropTypes.number,
  competitor: PropTypes.any,
  type: PropTypes.any
};
