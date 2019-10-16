import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text } from 'react-native';
import styles from '../../styles/competition/competition-full.native';
import UserProfileImage from '../Common/UserProfileImage.native';
import snippetStyles from '../../styles/competition/competition-snippet.native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { updateRoute } from '../../helpers/routerHelper/routerHelper.native';

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
        <View style={styles.topCompetitorScore}>
          <PrimaryButton
            style={snippetStyles.buttonItem}
            buttonStyle={snippetStyles.buttonStyle}
            textStyle={snippetStyles.buttonTextStyle}
            onClick={() => this.plantButton()}
          >
            <Text> {i18n.t('label.plant_trees')}</Text>
          </PrimaryButton>
        </View>
      );
    } else if (
      this.props.type === 'participants' &&
      this.props.competitor.treecounterSlug !== this.props.treeCounter.slug
    ) {
      support_button = (
        <View style={styles.topCompetitorScore}>
          <PrimaryButton
            style={snippetStyles.buttonItem}
            buttonStyle={snippetStyles.buttonStyle}
            textStyle={snippetStyles.buttonTextStyle}
            onClick={() => this.supportButton()}
          >
            <Text> {i18n.t('label.support')}</Text>
          </PrimaryButton>
        </View>
      );
    } else if (this.props.type === 'invite') {
      support_button = (
        <View style={styles.topCompetitorScore}>
          <PrimaryButton
            style={snippetStyles.buttonItem}
            buttonStyle={snippetStyles.moreButtonStyle}
            textStyle={snippetStyles.moreButtonTextStyle}
            onClick={() => this.props.cancelInvite(this.props.competitor.token)}
          >
            <Text> {i18n.t('label.cancel')}</Text>
          </PrimaryButton>
        </View>
      );
    } else {
      support_button = null;
    }
    return (
      <View style={styles.topCompetitorSection}>
        <View style={styles.topCompetitorName}>
          <UserProfileImage
            profileImage={
              this.props.competitor && this.props.competitor.treecounterAvatar
            }
            imageStyle={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />

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
                <PrimaryButton
                  style={snippetStyles.buttonItem}
                  buttonStyle={snippetStyles.buttonStyle}
                  textStyle={snippetStyles.buttonTextStyle}
                  onClick={() =>
                    this.props.confirmPart(this.props.competitor.token)
                  }
                >
                  <Text> {i18n.t('label.confirm')}</Text>
                </PrimaryButton>
                <PrimaryButton
                  style={snippetStyles.buttonItem}
                  buttonStyle={snippetStyles.moreButtonStyle}
                  textStyle={snippetStyles.moreButtonTextStyle}
                  onClick={() =>
                    this.props.declinePart(this.props.competitor.token)
                  }
                >
                  <Text> {i18n.t('label.delete')}</Text>
                </PrimaryButton>
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
