import React from 'react';
import { CardLayoutCompetition } from '../../Common/Card';
import styles from '../../../styles/competition/competition-snippet.native';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { getImageUrl } from '../../../actions/apiRouting';
import CompetitionProgressBar from './CompetitionProgressBar';
import TouchableItem from '../../Common/TouchableItem.native';
import PropTypes from 'prop-types';
import { compCalendar } from '../../../assets';
import { bindActionCreators } from 'redux';
import CompetitionTopCompetitor from './CompetitionTopCompetitor.native';
import {
  userCompetitionEnrolledSelector,
  userTreecounterSelector
} from '../../../selectors';
import { connect } from 'react-redux';
import i18n from '../../../locales/i18n.js';
import { formatDate } from '../../../utils/utils';

class CompetitionSnippet extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleExpanded(id) {
    this.props.onMoreClick(id);
  }

  containerPress(id) {
    if (this.props.onMoreClick) {
      this.props.onMoreClick(id);
    }
  }

  render() {
    const competitionDetail = this.props.competition;
    let status = '',
      button = <Text style={{ paddingLeft: 5, paddingRight: 5 }} />;
    const competitionEnrollments = this.props.competitionEnrollments;
    if (
      competitionDetail &&
      competitionDetail.id &&
      this.props.competitionEnrollments
    ) {
      for (let i = 0; i < competitionEnrollments.length; i++) {
        if (competitionDetail.id === competitionEnrollments[i].competitionId) {
          status = competitionEnrollments[i].status;
        }
      }
    }
    if (
      competitionDetail &&
      competitionDetail.ownerTreecounterId === this.props.treeCounter.id
    ) {
      button = (
        <TouchableItem
          onPress={() => this.props.editCompetition(this.props.competition.id)}
        >
          <Text style={styles.bottomParticipantText}>
            {i18n.t('label.edit')}
          </Text>
        </TouchableItem>
      );
      //button = <Text style={{ paddingLeft: 5, paddingRight: 5 }} />;
    } else if (status === '') {
      if (competitionDetail && competitionDetail.access === 'immediate') {
        button = (
          <TouchableItem
            onPress={() =>
              this.props.enrollCompetition(this.props.competition.id)
            }
          >
            <Text style={styles.bottomParticipantText}>
              {i18n.t('label.join')}
            </Text>
          </TouchableItem>
        );
      } else if (competitionDetail && competitionDetail.access === 'request') {
        button = (
          <TouchableItem
            onPress={() =>
              this.props.enrollCompetition(this.props.competition.id)
            }
          >
            <Text style={styles.bottomParticipantText}>
              {i18n.t('label.request_to_join')}
            </Text>
          </TouchableItem>
        );
      } else if (
        competitionDetail &&
        competitionDetail.access === 'invitation'
      ) {
        button = null;
      }
    } else if (status === 'enrolled') {
      button = (
        <TouchableItem
          onPress={() => this.props.leaveCompetition(this.props.competition.id)}
        >
          <Text style={styles.bottomParticipantText}>
            {i18n.t('label.leave')}
          </Text>
        </TouchableItem>
      );
    } else if (status === 'pending') {
      button = (
        <TouchableItem
          onPress={() => this.props.leaveCompetition(this.props.competition.id)}
        >
          <Text style={styles.bottomParticipantText}>
            {i18n.t('label.cancel_join_request')}
          </Text>
        </TouchableItem>
      );
    }
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => this.containerPress(this.props.competition.id)}
      >
        <CardLayoutCompetition>
          <View style={styles.projectSpecsContainer}>
            {this.props.competition && this.props.competition.image ? (
              <View style={styles.projectImageContainer}>
                <Image
                  style={styles.teaser__projectImage}
                  source={{
                    uri: getImageUrl(
                      'competition',
                      'medium',
                      this.props.competition.image
                    )
                  }}
                  resizeMode={'cover'}
                />
              </View>
            ) : null}
            <CompetitionProgressBar
              countPlanted={
                this.props.competition && this.props.competition.score
              }
              countTarget={
                this.props.competition && this.props.competition.goal
              }
            />
            <View style={styles.competitionContent}>
              <View style={styles.projectNameContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={3}
                  style={styles.project_teaser__contentText}
                >
                  {i18n.t('label.comp_by_name', {
                    compname:
                      this.props.competition && this.props.competition.name,
                    ownername:
                      this.props.competition && this.props.competition.ownerName
                  })}
                </Text>
              </View>

              <View style={styles.topCompetitorContainer}>
                {this.props.competition &&
                this.props.competition.topEnrollments &&
                this.props.competition.topEnrollments.length === 3 ? (
                  <View>
                    <View style={styles.horizontalRule} />
                    {this.props.competition.topEnrollments.map((top, index) => (
                      <CompetitionTopCompetitor
                        topCompetitor={top}
                        index={index}
                        key={index}
                      />
                    ))}
                    <View style={styles.horizontalRule} />
                  </View>
                ) : null}
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.byOrgContainer}>
                  <Image
                    source={compCalendar}
                    style={{ width: 14, height: 14 }}
                  />
                  <Text style={styles.bottomText}>
                    {i18n.t('label.ends')}{' '}
                    {this.props.competition && this.props.competition.endDate
                      ? formatDate(this.props.competition.endDate)
                      : ''}
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  {this.props.competition &&
                  this.props.competition.competitorCount > 0 ? (
                    <Text style={styles.bottomParticipantText}>
                      {this.props.competition.competitorCount}{' '}
                      {i18n.t('label.participants')}
                    </Text>
                  ) : (
                    button
                  )}
                </View>
              </View>
            </View>
          </View>
        </CardLayoutCompetition>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = state => ({
  treeCounter: userTreecounterSelector(state),
  competitionEnrollments: userCompetitionEnrolledSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionSnippet);
CompetitionSnippet.propTypes = {
  competition: PropTypes.any,
  type: PropTypes.any,
  onMoreClick: PropTypes.any,
  competitionEnrollments: PropTypes.any,
  treeCounter: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
