import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/competition/competition-full.native';
import UserProfileImage from '../Common/UserProfileImage.native';
import { updateRoute } from '../../helpers/routerHelper/routerHelper.native';
import { getLocalRoute } from '../../actions/apiRouting';
import snippetStyles from '../../styles/competition/competition-fullNew.native';
class CompetitionParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.supportButton = this.supportButton.bind(this);
    this.plantButton = this.plantButton.bind(this);
  }

  // This function is for people to support someone who is a participant in the competition
  supportButton() {
    let supportObject = {
      id: this.props.competitor.treecounterId,
      displayName: this.props.competitor.treecounterDisplayName
    };
    console.log('support button pressed');
    this.props.supportTreecounterAction(supportObject);
    updateRoute('app_donateTrees', this.props.navigation, 0, {
      titleParam: i18n.t('label.support_to', {
        name: this.props.competitor.treecounterDisplayName
      })
    });
  }
  // This function is for participants to plant trees
  plantButton() {
    updateRoute('app_donateTrees', this.props.navigation);
  }
  render() {
    let support_button = null;
    if (
      this.props.type === 'participants' &&
      this.props.competitor.treecounterSlug === this.props.treeCounter.slug
    ) {
      support_button = (
        <View style={snippetStyles.topCompetitorScore}>
          <TouchableOpacity
            style={snippetStyles.secondaryButton}
            onPress={() => this.plantButton()}
          >
            <Text style={snippetStyles.secondaryButtonText}>
              {' '}
              {i18n.t('label.plant_trees')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (
      this.props.type === 'participants' &&
      this.props.competitor.treecounterSlug !== this.props.treeCounter.slug
    ) {
      support_button = (
        <View style={snippetStyles.topCompetitorScore}>
          <TouchableOpacity
            style={snippetStyles.secondaryButton}
            onPress={() => this.supportButton()}
          >
            <Text style={snippetStyles.secondaryButtonText}>
              {i18n.t('label.support')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.type === 'invite') {
      support_button = (
        <View style={snippetStyles.topCompetitorScore}>
          <TouchableOpacity
            style={snippetStyles.cancelButton}
            onPress={() => this.props.cancelInvite(this.props.competitor.token)}
          >
            <Text style={snippetStyles.cancelButtonText}>
              {' '}
              {i18n.t('label.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      support_button = null;
    }
    return (
      <View style={snippetStyles.topCompetitorSection}>
        <View
          style={styles.topCompetitorName}
          onPress={() =>
            this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
              treeCounterId: this.props.competitor.treecounterSlug
            })
          }
        >
          {/* User Profile Image */}
          <UserProfileImage
            profileImage={
              this.props.competitor && this.props.competitor.treecounterAvatar
            }
            imageStyle={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
          {/* User Profile Image ends */}

          <View style={styles.participantNameContainer}>
            {/* Competitor Name */}
            <Text
              style={styles.topCompetitorNameText}
              onPress={() =>
                this.props.navigation.navigate(
                  getLocalRoute('app_treecounter'),
                  {
                    treeCounterId: this.props.competitor.treecounterSlug
                  }
                )
              }
            >
              {this.props.competitor.treecounterSlug ===
              this.props.treeCounter.slug
                ? i18n.t('label.me')
                : this.props.competitor.treecounterDisplayName}
            </Text>
            {/* Competitor Name Ends */}

            {this.props.type === 'participants' ||
            this.props.type === 'invite' ? (
              <Text style={styles.topCompetitorScoreText}>
                {this.props.competitor.score} {i18n.t('label.planted')}
              </Text>
            ) : this.props.type === 'request_join' ? (
              <View style={styles.confirm_delete_button}>
                <TouchableOpacity
                  style={snippetStyles.secondaryButton}
                  onPress={() =>
                    this.props.confirmPart(this.props.competitor.token)
                  }
                >
                  <Text style={snippetStyles.secondaryButtonText}>
                    {i18n.t('label.confirm')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={snippetStyles.cancelButton}
                  onPress={() =>
                    this.props.declinePart(this.props.competitor.token)
                  }
                >
                  <Text style={snippetStyles.cancelButtonText}>
                    {i18n.t('label.delete')}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
        {support_button}
      </View>
    );
  }
}

export default CompetitionParticipant;
CompetitionParticipant.propTypes = {
  index: PropTypes.number,
  competitor: PropTypes.any,
  type: PropTypes.any,
  confirmPart: PropTypes.any,
  declinePart: PropTypes.any,
  cancelInvite: PropTypes.any,
  supportTreecounterAction: PropTypes.any,
  navigation: PropTypes.any
};
