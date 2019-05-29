import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
import styles from '../../styles/competition/competition-full.native';
import snippetStyles from '../../styles/competition/competition-snippet.native';
import CardLayout from '../Common/Card';
import { ScrollView } from 'react-native';
import scrollStyle from '../../styles/common/scrollStyle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCompetitionDetail } from '../../actions/competition';
import {
  competitionDetailSelector,
  userCompetitionEnrolledSelector,
  userTreecounterSelector
} from '../../selectors';
import CompetitionProgressBar from './CompetitionProgressBar';
import { compCalendar, email } from '../../assets';
import i18n from '../../locales/i18n';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CompetitionTopCompetitor from './CompetitionTopCompetitor.native';
import CompetitionParticipant from './CompetitionParticipant.native';
import searchBarStyles from '../../styles/header/search_bar.native';
import SearchUser from '../Challenge/Tabs/SearchUser.native';
import moment from 'moment';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class CompetitionFull extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {}

  componentDidMount() {
    if (this.props.competition_id) {
      this.props.fetchCompetitionDetail(this.props.competition_id);
    }
  }

  onSearchResultClick(q) {
    this.props.invitePart(this.props.competitionDetail.id, q.treecounterId);
  }
  render() {
    let status = '',
      button = null;
    const competitionDetail = this.props.competitionDetail;
    let participantCount = 0,
      requestCount = 0,
      inviteCount = 0,
      invitedCount = 0;
    if (competitionDetail && competitionDetail.allEnrollments) {
      for (let i = 0; i < competitionDetail.allEnrollments.length; i++) {
        if (competitionDetail.allEnrollments[i].status === 'enrolled') {
          participantCount++;
        } else if (competitionDetail.allEnrollments[i].status === 'pending') {
          requestCount++;
        } else if (competitionDetail.allEnrollments[i].status === 'invited') {
          if (
            competitionDetail.allEnrollments[i].treecounterSlug ===
            this.props.treeCounter.slug
          ) {
            invitedCount++;
          }
          inviteCount++;
        }
      }
    }
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
        <PrimaryButton
          style={snippetStyles.buttonItem}
          buttonStyle={snippetStyles.buttonStyle}
          textStyle={snippetStyles.buttonTextStyle}
          onClick={() => this.props.editCompetition(competitionDetail.id)}
        >
          <Text> {i18n.t('label.edit')}</Text>
        </PrimaryButton>
      );
      // button = null;
    } else if (status === '') {
      if (competitionDetail && competitionDetail.access === 'immediate') {
        button = (
          <PrimaryButton
            style={snippetStyles.buttonItem}
            buttonStyle={snippetStyles.buttonStyle}
            textStyle={snippetStyles.buttonTextStyle}
            onClick={() => this.props.enrollCompetition(competitionDetail.id)}
          >
            <Text> {i18n.t('label.join')}</Text>
          </PrimaryButton>
        );
      } else if (competitionDetail && competitionDetail.access === 'request') {
        button = (
          <PrimaryButton
            style={snippetStyles.buttonItem}
            buttonStyle={snippetStyles.buttonStyle}
            textStyle={snippetStyles.buttonTextStyle}
            onClick={() => this.props.enrollCompetition(competitionDetail.id)}
          >
            <Text> {i18n.t('label.request_to_join')}</Text>
          </PrimaryButton>
        );
      } else if (
        competitionDetail &&
        competitionDetail.access === 'invitation'
      ) {
        button = null;
      }
    } else if (status === 'enrolled') {
      button = (
        <PrimaryButton
          style={snippetStyles.buttonItem}
          buttonStyle={snippetStyles.moreButtonStyle}
          textStyle={snippetStyles.moreButtonTextStyle}
          onClick={() => this.props.leaveCompetition(competitionDetail.id)}
        >
          <Text> {i18n.t('label.leave')}</Text>
        </PrimaryButton>
      );
    } else if (status === 'pending') {
      button = (
        <PrimaryButton
          style={snippetStyles.buttonItem}
          buttonStyle={snippetStyles.buttonStyle}
          textStyle={snippetStyles.buttonTextStyle}
          onClick={() => this.props.leaveCompetition(competitionDetail.id)}
        >
          <Text> {i18n.t('label.cancel_join_request')}</Text>
        </PrimaryButton>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={scrollStyle.styleContainer}>
          <View>
            <CardLayout style={[snippetStyles.projectSnippetContainer]}>
              <View style={snippetStyles.projectSpecsContainer}>
                {competitionDetail && competitionDetail.image ? (
                  <View style={snippetStyles.projectImageContainer}>
                    <Image
                      style={snippetStyles.teaser__projectImage}
                      source={{
                        uri: getImageUrl(
                          'competition',
                          'medium',
                          competitionDetail.image
                        )
                      }}
                      resizeMode={'cover'}
                    />
                  </View>
                ) : null}
                <CompetitionProgressBar
                  countPlanted={competitionDetail && competitionDetail.score}
                  countTarget={competitionDetail && competitionDetail.goal}
                />
                <View style={snippetStyles.competitionContent}>
                  <View style={snippetStyles.projectNameContainer}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={snippetStyles.project_teaser__contentText}
                    >
                      {competitionDetail && competitionDetail.name}
                    </Text>
                  </View>
                  <View style={snippetStyles.projectNameContainer}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={snippetStyles.project_teaser__contentByText}
                    >
                      {i18n.t('label.by')}{' '}
                      {competitionDetail && competitionDetail.ownerName}
                    </Text>
                  </View>
                  <View style={snippetStyles.projectDescriptionContainer}>
                    <Text
                      style={
                        snippetStyles.project_teaser__contentDescriptionText
                      }
                    >
                      {competitionDetail && competitionDetail.description}
                    </Text>
                  </View>
                  {/*<View style={styles.projectdetailsContainer}>*/}
                  {/**/}
                  {/*</View>*/}
                  {competitionDetail && competitionDetail.email ? (
                    <View style={snippetStyles.actionContainer}>
                      <View style={snippetStyles.emailContainer}>
                        <Image
                          source={email}
                          style={{ width: 15, height: 15 }}
                        />
                        <Text style={snippetStyles.bottomText}>
                          {competitionDetail &&
                            competitionDetail.contact +
                              ', ' +
                              competitionDetail &&
                            competitionDetail.email}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                  <View style={styles.actionContainer}>
                    <View style={snippetStyles.byOrgContainer}>
                      <Image
                        source={compCalendar}
                        style={{ width: 15, height: 15 }}
                      />
                      <Text style={snippetStyles.bottomText}>
                        {i18n.t('label.ends')}{' '}
                        {competitionDetail && competitionDetail.endDate
                          ? moment(new Date(competitionDetail.endDate)).format(
                              'MMM DD, YYYY'
                            )
                          : ''}
                      </Text>
                    </View>

                    <View style={styles.buttonContainer}>{button}</View>
                  </View>
                </View>
              </View>
            </CardLayout>
            {participantCount > 0 ? (
              <CardLayout style={[snippetStyles.projectSnippetContainer]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    <Text style={styles.textHeadingParticipants}>
                      {i18n.t('label.participants')} ({competitionDetail &&
                        competitionDetail.competitorCount})
                    </Text>
                  </View>
                  <View style={styles.topCompetitorContainer}>
                    <View>
                      {competitionDetail.allEnrollments.map(
                        (top, index) =>
                          top.status === 'enrolled' ? (
                            <CompetitionParticipant
                              competitor={top}
                              index={index}
                              type="participants"
                              navigation={this.props.navigation}
                              treeCounter={this.props.treeCounter}
                              competitionDetail={competitionDetail}
                              confirmPart={id => this.props.confirmPart(id)}
                              declinePart={id => this.props.declinePart(id)}
                              cancelInvite={id => this.props.cancelInvite(id)}
                              supportTreecounterAction={
                                this.props.supportTreecounterAction
                              }
                              key={index}
                            />
                          ) : null
                      )}
                    </View>
                  </View>
                </View>
              </CardLayout>
            ) : null}
            {requestCount > 0 &&
            competitionDetail &&
            competitionDetail.ownerTreecounterId ===
              this.props.treeCounter.id ? (
              <CardLayout style={[snippetStyles.projectSnippetContainer]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    <Text style={styles.textHeadingParticipants}>
                      {i18n.t('label.requests_to_join')} ({competitionDetail &&
                        competitionDetail.competitorCount})
                    </Text>
                  </View>
                  <View style={styles.topCompetitorContainer}>
                    <View>
                      {competitionDetail.allEnrollments.map(
                        (top, index) =>
                          top.status === 'pending' ? (
                            <CompetitionParticipant
                              competitor={top}
                              index={index}
                              type="request_join"
                              navigation={this.props.navigation}
                              treeCounter={this.props.treeCounter}
                              competitionDetail={competitionDetail}
                              confirmPart={id => this.props.confirmPart(id)}
                              declinePart={id => this.props.declinePart(id)}
                              cancelInvite={id => this.props.cancelInvite(id)}
                              supportTreecounterAction={
                                this.props.supportTreecounterAction
                              }
                              key={index}
                            />
                          ) : null
                      )}
                    </View>
                  </View>
                </View>
              </CardLayout>
            ) : null}
            {competitionDetail &&
            competitionDetail.ownerTreecounterId ===
              this.props.treeCounter.id ? (
              <CardLayout style={[snippetStyles.projectSnippetContainer]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    <Text style={styles.textHeadingParticipants}>
                      {i18n.t('label.invite')}
                    </Text>
                  </View>
                  <View style={styles.topCompetitorContainer}>
                    <View>
                      <SearchUser
                        onSearchResultClick={this.onSearchResultClick}
                        currentUserProfile={this.props.currentUserProfile}
                        clearTextOnClick={true}
                        alreadyInvited={competitionDetail.allEnrollments}
                        hideCompetitions
                      />
                      {competitionDetail.allEnrollments.map(
                        (top, index) =>
                          top.status === 'invited' ? (
                            <CompetitionParticipant
                              competitor={top}
                              index={index}
                              type="invite"
                              navigation={this.props.navigation}
                              treeCounter={this.props.treeCounter}
                              competitionDetail={competitionDetail}
                              confirmPart={id => this.props.confirmPart(id)}
                              declinePart={id => this.props.declinePart(id)}
                              cancelInvite={id => this.props.cancelInvite(id)}
                              supportTreecounterAction={
                                this.props.supportTreecounterAction
                              }
                              key={index}
                            />
                          ) : null
                      )}
                    </View>
                  </View>
                </View>
              </CardLayout>
            ) : null}
            {competitionDetail &&
            invitedCount > 0 &&
            competitionDetail.ownerTreecounterId !==
              this.props.treeCounter.id ? (
              <CardLayout style={[snippetStyles.projectSnippetContainer]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    <Text style={styles.textHeadingParticipants}>
                      {i18n.t('label.invited')}
                    </Text>
                  </View>
                  <View style={styles.topCompetitorContainer}>
                    <View>
                      {competitionDetail.allEnrollments.map(
                        (top, index) =>
                          top.status === 'invited' &&
                          top.treecounterSlug ===
                            this.props.treeCounter.slug ? (
                            <CompetitionParticipant
                              competitor={top}
                              index={index}
                              type="request_join"
                              navigation={this.props.navigation}
                              treeCounter={this.props.treeCounter}
                              competitionDetail={competitionDetail}
                              confirmPart={id => this.props.confirmPart(id)}
                              declinePart={id => this.props.declinePart(id)}
                              cancelInvite={id => this.props.cancelInvite(id)}
                              supportTreecounterAction={
                                this.props.supportTreecounterAction
                              }
                              key={index}
                            />
                          ) : null
                      )}
                    </View>
                  </View>
                </View>
              </CardLayout>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
  componentWillUnmount() {}
}

const mapStateToProps = state => ({
  competitionDetail: competitionDetailSelector(state),
  treeCounter: userTreecounterSelector(state),
  competitionEnrollments: userCompetitionEnrolledSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCompetitionDetail
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionFull);
CompetitionFull.propTypes = {
  competition_id: PropTypes.any,
  fetchCompetitionDetail: PropTypes.func,
  competitionDetail: PropTypes.any,
  treeCounter: PropTypes.any,
  competitionEnrollments: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  confirmPart: PropTypes.any,
  declinePart: PropTypes.any,
  cancelInvite: PropTypes.any,
  supportTreecounterAction: PropTypes.any,
  editCompetition: PropTypes.any
};
