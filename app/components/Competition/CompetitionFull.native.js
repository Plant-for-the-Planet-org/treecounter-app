import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
import styles from '../../styles/competition/competition-full.native';
// import snippetStyles from '../../styles/competition/competition-snippet.native';
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
import PrimaryButton from '../Common/Button/PrimaryButton';
import CompetitionTopCompetitor from './CompetitionTopCompetitor.native';
import CompetitionParticipant from './CompetitionParticipant.native';
import searchBarStyles from '../../styles/header/search_bar.native';
import SearchUser from '../Challenge/Tabs/SearchUser.native';
import moment from 'moment';
import 'moment/min/locales';
import i18n from '../../locales/i18n.js';
import { getLocale } from '../../actions/getLocale';
import { getDateFromMySQL } from '../../helpers/utils';
import { Dimensions } from 'react-native';
import { trees } from './../../assets';
import { getLocalRoute } from '../../actions/apiRouting';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
const rowHeight = 20;
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class CompetitionFull extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
    moment.locale(getLocale());
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
    console.log(competitionDetail);
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
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View>
            {/* Compeition Information  */}
            <View style={[snippetStyles.projectSnippetContainerN]}>
              <View style={snippetStyles.projectSpecsContainer}>
                {/* Compeition Cover Image */}
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
                {/* Compeition Cover Image Ends */}

                {/* Compeition Progress Bar */}
                <CompetitionProgressBar
                  countPlanted={competitionDetail && competitionDetail.score}
                  countTarget={competitionDetail && competitionDetail.goal}
                />
                {/* Compeition Progress Bar Ends */}

                <View style={snippetStyles.competitionContent}>
                  {/* Compeition Name */}
                  <View style={snippetStyles.projectNameContainer}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={3}
                      style={snippetStyles.project_teaser__contentText}
                    >
                      {competitionDetail && competitionDetail.name}{' '}
                      {i18n.t('label.by_a_name')}{' '}
                      {competitionDetail && competitionDetail.ownerName}
                    </Text>
                  </View>
                  {/* Compeition Name Ends */}

                  {/* Compeition Description */}
                  <View style={snippetStyles.projectDescriptionContainer}>
                    <Text
                      style={
                        snippetStyles.project_teaser__contentDescriptionText
                      }
                    >
                      {competitionDetail && competitionDetail.description}
                    </Text>
                  </View>
                  {/* Compeition Description Ends */}

                  {/* Compeition Owner Email */}
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
                  {/* Compeition Owner Email Ends */}

                  {/* Compeition Date */}
                  <View style={styles.actionContainer}>
                    <View style={snippetStyles.byOrgContainer}>
                      <Image
                        source={compCalendar}
                        style={{ width: 15, height: 15 }}
                      />
                      <Text style={snippetStyles.bottomText}>
                        {i18n.t('label.ends')}{' '}
                        {competitionDetail && competitionDetail.endDate
                          ? moment(
                              getDateFromMySQL(competitionDetail.endDate)
                            ).format('MMM DD, YYYY')
                          : ''}
                      </Text>
                    </View>
                  </View>
                  {/* Compeition Date Ends */}

                  {/* Compeition Buttons */}
                  <View
                    style={{
                      marginTop: 20,
                      width: '100%',
                      flexDirection: 'row',
                      left: 0
                    }}
                  >
                    {button}
                  </View>
                  {/* Compeition Buttons Ends */}
                </View>
              </View>

              {/* Donate Card */}
              <CardLayout style={[snippetStyles.cardContainer]}>
                <Text
                  style={[snippetStyles.googleCardTitle, { textAlign: 'left' }]}
                >
                  {i18n.t('label.plant_trees')}
                </Text>
                <View style={snippetStyles.googleCardParaContainer}>
                  <Text style={snippetStyles.googleCardPara}>
                    {i18n.t(
                      'This competition supports Yucatation Reforestation by Plant -for-the-Planet'
                    )}
                  </Text>
                  <Image
                    source={trees}
                    style={{ height: 60, flex: 1 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={snippetStyles.horizontalLine} />
                <TouchableOpacity
                  style={{ width: '100%' }}
                  onPress={() =>
                    navigation.navigate(getLocalRoute('app_donateTrees'))
                  }
                >
                  <Text style={snippetStyles.googleCardButton}>
                    {i18n.t('Donate Now')}
                  </Text>
                </TouchableOpacity>
              </CardLayout>
              {/* Donate Card Ends */}
            </View>
            {/* Compeition Information Ended  */}

            {/* Compeition Participant Details */}
            {participantCount > 0 ? (
              <View style={[snippetStyles.projectSnippetContainerN]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    {/* Participant Total Count */}
                    <Text style={styles.textHeadingParticipants}>
                      {i18n.t('label.participants')} ({competitionDetail &&
                        competitionDetail.competitorCount})
                    </Text>
                    {/* Participant Total Count Ends */}
                  </View>
                  <View style={snippetStyles.topCompetitorContainer}>
                    <View>
                      {/* Participant Details */}
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
                      {/* Participant Details Ends */}
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {/* Compeition Participant Details Ends */}

            {/* Participant Requests */}
            {requestCount > 0 &&
            competitionDetail &&
            competitionDetail.ownerTreecounterId ===
              this.props.treeCounter.id ? (
              <CardLayout style={[snippetStyles.projectSnippetContainerN]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    {/* Total Requests  */}
                    <Text style={styles.textHeadingParticipants}>
                      {i18n.t('label.requests_to_join')} ({competitionDetail &&
                        competitionDetail.competitorCount})
                    </Text>
                    {/* Total Requests Ends */}
                  </View>
                  <View style={styles.topCompetitorContainer}>
                    <View>
                      {/* Requseters Details */}
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
                      {/* Requseters Details Ends */}
                    </View>
                  </View>
                </View>
              </CardLayout>
            ) : null}
            {/* Participant Requests Ends */}

            {/* Invitation Details */}
            {competitionDetail &&
            competitionDetail.ownerTreecounterId ===
              this.props.treeCounter.id ? (
              <CardLayout style={[snippetStyles.projectSnippetContainerN]}>
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
            {/* Invitation Details Ends */}

            {/* Invited Users */}
            {competitionDetail &&
            invitedCount > 0 &&
            competitionDetail.ownerTreecounterId !==
              this.props.treeCounter.id ? (
              <CardLayout style={[snippetStyles.projectSnippetContainerN]}>
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
            {/* Invited Users Ends */}
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

const snippetStyles = StyleSheet.create({
  projectSnippetContainerN: {
    flexDirection: 'column',
    padding: 0
  },
  competitionContent: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 16,
    paddingBottom: 16
  },
  projectImageContainer: {
    height: Layout.window.width * 0.4,
    width: '100%',

    overflow: 'hidden'
  },
  teaser__projectImage: {
    flex: 1,
    overflow: 'hidden'
  },
  treeCounterContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#d3d3d3',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    height: rowHeight * 1.7
  },
  treePlantedContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  treePlantedChildContainer: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#89b53a',
    borderRightColor: '#89b53a'
  },
  treePlantedtext: {
    // padding: 5,
    paddingLeft: 5,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  treePlantedtextTrees: {
    color: 'white',
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  treePlantedtextPlanted: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 16
  },
  targetContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'flex-end'
  },
  projectdetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: rowHeight * 2,
    padding: 5
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10
    //height: rowHeight + rowHeight / 2,
  },
  project_teaser__contentText: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  textHeadingParticipants: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  project_teaser__contentByText: {
    fontSize: 10,
    paddingBottom: 16,
    maxWidth: '90%'
  },
  project_teaser__contentDescriptionText: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  bottomText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  bottomParticipantText: {
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  byOrgContainer: {
    width: '50%',
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center'
  },
  emailContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 16,
    alignItems: 'center'
  },
  byOrgText: {
    fontSize: 16,
    width: '100%'
  },
  locationText: {
    fontSize: 10,
    fontStyle: 'italic',
    paddingBottom: 2
  },
  survivalText: {
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 8
  },
  costText: {
    fontSize: 18
  },

  buttonItem: {
    padding: 5,
    backgroundColor: '#89b53a'
  },
  buttonStyle: {
    height: 36,
    borderRadius: 4,
    backgroundColor: '#89b53a',
    width: '50%'
  },
  buttonTextStyle: {
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  moreButtonStyle: {
    backgroundColor: 'white',
    height: 35,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10
  },
  moreButtonTextStyle: {
    fontSize: 12
  },
  projectNameContainer: {
    flexDirection: 'row',
    paddingBottom: 16,
    width: '100%',
    alignItems: 'center'
  },
  projectByNameContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  projectDescriptionContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  topCompetitorContainer: {
    flex: 1,
    flexDirection: 'column'
  },

  // Card Styles
  cardContainer: {
    flexDirection: 'column',
    flex: 1,
    borderRadius: 7,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 16,
    marginBottom: 40
  },
  googleCardTitle: {
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  googleCardPara: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    flex: 3,
    marginRight: 20
  },
  googleCardButton: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a',
    marginTop: 16
  },
  googleCardParaContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 14
  },
  horizontalLine: {
    borderColor: '#d5d5d5',
    width: '100%',
    borderBottomWidth: 1
  }
});
