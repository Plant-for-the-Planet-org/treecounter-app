import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../../styles/competition/competition-full.native';
import { flagTarget } from '../../assets';
import UserProfileImage from '../Common/UserProfileImage.native';
import snippetStyles from '../../styles/competition/competition-snippet.native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { updateRoute } from '../../helpers/routerHelper/routerHelper.native';
import TouchableItem from '../../components/Common/TouchableItem.native';

class CompetitionParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.supportButton = this.supportButton.bind(this);
    this.plantButton = this.plantButton.bind(this);
  }

  supportButton() {
    let supportObject = {
      id: this.props.competitor.treecounterId,
      displayName: this.props.competitor.treecounterDisplayName
    };
    this.props.supportTreecounterAction(supportObject);
    updateRoute('app_donateTrees', this.props.navigation, 0, {
      titleParam: i18n.t('label.support_to', {
        name: this.props.competitor.treecounterDisplayName
      })
    });
  }
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
        <View style={styles2.topCompetitorScore}>
          <TouchableItem
            style={styles2.secondaryButton}
            onClick={() => this.plantButton()}
          >
            <Text style={styles2.secondaryButtonText}>
              {' '}
              {i18n.t('label.plant_trees')}
            </Text>
          </TouchableItem>
        </View>
      );
    } else if (
      this.props.type === 'participants' &&
      this.props.competitor.treecounterSlug !== this.props.treeCounter.slug
    ) {
      support_button = (
        <View style={styles2.topCompetitorScore}>
          <TouchableItem
            style={styles2.secondaryButton}
            onClick={() => this.supportButton()}
          >
            <Text style={styles2.secondaryButtonText}>
              {' '}
              {i18n.t('label.support')}
            </Text>
          </TouchableItem>
        </View>
      );
    } else if (this.props.type === 'invite') {
      support_button = (
        <View style={styles2.topCompetitorScore}>
          <TouchableItem
            style={styles2.cancelButton}
            onClick={() => this.props.cancelInvite(this.props.competitor.token)}
          >
            <Text style={styles2.cancelButtonText}>
              {' '}
              {i18n.t('label.cancel')}
            </Text>
          </TouchableItem>
        </View>
      );
    } else {
      support_button = null;
    }
    return (
      <View style={styles2.topCompetitorSection}>
        <View style={styles.topCompetitorName}>
          {/* User Profile Image */}
          <UserProfileImage
            profileImage={
              this.props.competitor && this.props.competitor.treecounterAvatar
            }
            imageStyle={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
          {/* User Profile Image ends */}

          <View style={styles.participantNameContainer}>
            <Text style={styles.topCompetitorNameText}>
              {this.props.competitor.treecounterSlug ===
              this.props.treeCounter.slug
                ? i18n.t('label.me')
                : this.props.competitor.treecounterDisplayName}
            </Text>
            {this.props.type === 'participants' ||
            this.props.type === 'invite' ? (
              <Text style={styles.topCompetitorScoreText}>
                {this.props.competitor.score} {i18n.t('label.planted')}
              </Text>
            ) : this.props.type === 'request_join' ? (
              <View style={styles.confirm_delete_button}>
                <TouchableItem
                  style={styles2.secondaryButton}
                  onClick={() =>
                    this.props.confirmPart(this.props.competitor.token)
                  }
                >
                  <Text style={styles2.secondaryButtonText}>
                    {' '}
                    {i18n.t('label.confirm')}
                  </Text>
                </TouchableItem>
                <TouchableItem
                  style={styles2.cancelButton}
                  onClick={() =>
                    this.props.declinePart(this.props.competitor.token)
                  }
                >
                  <Text style={styles2.cancelButtonText}>
                    {' '}
                    {i18n.t('label.delete')}
                  </Text>
                </TouchableItem>
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

const styles2 = StyleSheet.create({
  secondaryButton: {
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 30,
    borderColor: '#d5d5d5',
    justifyContent: 'center',
    alignItems: 'center',
    width: 93,
    alignSelf: 'flex-end'
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153'
  },
  cancelButton: {
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 30,
    borderColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 93,
    alignSelf: 'flex-end'
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#e74c3c'
  },
  topCompetitorScore: {
    width: '40%'
  },
  topCompetitorSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
