/* eslint-disable no-prototype-builtins */
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { compCalendar, email } from '../../assets';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { debug } from '../../debug';
import i18n from '../../locales/i18n.js';
import { getContentLoaderState } from '../../reducers/contentloaderReducer';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../../../actions/apiRouting';
import styles from '../../../styles/competition/competition-full.native';
import CardLayout from '../../Common/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCompetitionDetail } from '../redux/competitionActions';
import {
  competitionDetailSelector,
  userCompetitionEnrolledSelector,
  userTreecounterSelector

} from '../../../selectors';
import CompetitionProgressBar from './../components/CompetitionProgressBar';
import { compCalendar, email, trees } from '../../../assets';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import CompetitionParticipant from '../components/CompetitionParticipant.native';
import SearchUser from '../../Challenge/Tabs/SearchUser.native';
import i18n from '../../../locales/i18n.js';
import { formatDate } from '../../../utils/utils';
import snippetStyles from '../../../styles/competition/competition-fullNew.native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getContentLoaderState } from '../../../reducers/contentloaderReducer';
import LoadingIndicator from '../../Common/LoadingIndicator';
import { getLocalRoute } from '../../../actions/apiRouting';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class CompetitionFull extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
  }

  componentDidMount() {
    if (this.props.competition_id) {
      this.props.fetchCompetitionDetail(this.props.competition_id);
    }
  }

  onSearchResultClick(q) {
    this.props.invitePart(this.props.competitionDetail.id, q.treecounterId);
  }
  render() {
    const { contentloader } = this.props;
    let status = '',
      button = null,
      button2 = null;
    const competitionDetail = this.props.competitionDetail;

    const hasEnrollments = competitionDetail
      ? competitionDetail.hasOwnProperty('allEnrollments')
      : false;

    let participantCount = 0,
      requestCount = 0,
      // eslint-disable-next-line no-unused-vars
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
    let isCompetitionOwner = false;
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
      isCompetitionOwner = true;
      if (status === '') {
        button2 = (
          <PrimaryButton
            style={snippetStyles.buttonItem}
            buttonStyle={snippetStyles.buttonStyle}
            textStyle={snippetStyles.buttonTextStyle}
            onClick={() => this.props.enrollCompetition(competitionDetail.id)}
          >
            <Text> {i18n.t('label.join')}</Text>
          </PrimaryButton>
        );
      }
      if (status === 'enrolled') {
        button2 = (
          <PrimaryButton
            style={snippetStyles.buttonItem}
            buttonStyle={snippetStyles.moreButtonStyleCancel}
            textStyle={snippetStyles.moreButtonTextStyle}
            onClick={() => this.props.leaveCompetition(competitionDetail.id)}
          >
            <Text style={snippetStyles.moreButtonStyleCancelText}>
              {i18n.t('label.leave')}
            </Text>
          </PrimaryButton>
        );
      }
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
          buttonStyle={snippetStyles.moreButtonStyleCancel}
          textStyle={snippetStyles.moreButtonTextStyle}
          onClick={() => this.props.leaveCompetition(competitionDetail.id)}
        >
          <Text style={snippetStyles.moreButtonStyleCancelText}>
            {i18n.t('label.leave')}
          </Text>
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

    let CurrentDate = new Date();
    let competitionEnded = false;
    if (competitionDetail) {
      let endDate = competitionDetail.endDate;
      endDate = new Date(endDate);
      if (CurrentDate > endDate) {
        button = (
          <Text style={snippetStyles.competitionOver}>
            {i18n.t('label.competition_over')}
          </Text>
        );
        competitionEnded = true;
      }
    }

    const { navigation } = this.props;
    return (
      <View style={snippetStyles.flexView}>
        {contentloader ? (
          <LoadingIndicator contentLoader screen={'SingleCompetition'} />
        ) : (
            <KeyboardAwareScrollView
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
              style={styles.keyboardScrollView}
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled
            >
              <View>
                {/* Competition Information  */}
                <View style={[snippetStyles.projectSnippetContainerN]}>
                  <View style={snippetStyles.projectSpecsContainer}>
                    {/* Competition Cover Image */}
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
                    {/* Competition Cover Image Ends */}

                    {/* Competition Progress Bar */}
                    <CompetitionProgressBar
                      countPlanted={competitionDetail && competitionDetail.score}
                      countTarget={competitionDetail && competitionDetail.goal}
                    />
                    {/* Competition Progress Bar Ends */}

                    <View style={snippetStyles.competitionContent}>
                      {/* Competition Name */}
                      <View style={snippetStyles.projectNameContainer}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={3}
                          style={snippetStyles.project_teaser__contentText}
                        >
                          {competitionDetail
                            ? i18n.t('label.comp_by_name', {
                              compname:
                                competitionDetail && competitionDetail.name,
                              ownername:
                                competitionDetail && competitionDetail.ownerName
                            })
                            : null}
                        </Text>
                      </View>
                      {/* Competition Name Ends */}

                      {/* Competition Description */}
                      <View style={snippetStyles.projectDescriptionContainer}>
                        <Text
                          style={
                            snippetStyles.project_teaser__contentDescriptionText
                          }
                        >
                          {competitionDetail && competitionDetail.description}
                        </Text>
                      </View>
                      {/* Competition Description Ends */}

                      {/* Competition Owner Email */}
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
                      {/* Competition Owner Email Ends */}

                      {/* Competition Date */}
                      {competitionDetail && competitionDetail.endDate ? (
                        <View style={styles.actionContainer}>
                          <View style={snippetStyles.byOrgContainer}>
                            <Image
                              source={compCalendar}
                              style={{ width: 15, height: 15 }}
                            />
                            <Text style={snippetStyles.bottomText}>
                              {i18n.t('label.ends')}{' '}
                              {formatDate(competitionDetail.endDate)}
                            </Text>
                          </View>
                        </View>
                      ) : null}

                      {/* Competition Date Ends */}

                      {/* Competition Buttons */}
                      <View
                        style={{
                          marginTop: 20,
                          width: '100%',
                          flexDirection: 'row',
                          left: 0
                        }}
                      >
                        {button}
                        {button2}
                      </View>
                      {/* Competition Buttons Ends */}
                    </View>
                  </View>

                  {/* Donate Card */}
                  {competitionDetail ? (
                    <CardLayout style={[snippetStyles.cardContainer]}>
                      <Text
                        style={[
                          snippetStyles.googleCardTitle,
                          { textAlign: 'left' }
                        ]}
                      >
                        {i18n.t('label.support_comp_trees')}
                      </Text>
                      <View style={snippetStyles.googleCardParaContainer}>
                        <Text style={snippetStyles.googleCardPara}>
                          {competitionDetail.filterType === 'all'
                            ? i18n.t('label.if_all_project_msg')
                            : competitionDetail.filterType === 'donations'
                              ? i18n.t('label.donation_only_msg')
                              : competitionDetail.filterType === 'registered'
                                ? i18n.t('label.register_only_msg')
                                : null}
                          {}
                        </Text>
                        <Image
                          source={trees}
                          style={{ height: 60, flex: 1 }}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={snippetStyles.horizontalLine} />

                      {competitionDetail.filterType === 'all' ? (
                        <TouchableOpacity
                          style={{ width: '100%' }}
                          onPress={() =>
                            navigation.navigate(getLocalRoute('app_donateTrees'))
                          }
                        >
                          <Text style={snippetStyles.googleCardButton}>
                            {i18n.t('label.donate_now')}
                          </Text>
                        </TouchableOpacity>
                      ) : competitionDetail.filterType === 'donations' ? (
                        <TouchableOpacity
                          style={{ width: '100%' }}
                          onPress={() =>
                            navigation.navigate(getLocalRoute('app_donateTrees'))
                          }
                        >
                          <Text style={snippetStyles.googleCardButton}>
                            {i18n.t('label.donate_now')}
                          </Text>
                        </TouchableOpacity>
                      ) : competitionDetail.filterType === 'plantings' ? (
                        <TouchableOpacity
                          style={{ width: '100%' }}
                          onPress={() =>
                            navigation.navigate(
                              getLocalRoute('app_registerTrees')
                            )
                          }
                        >
                          <Text style={snippetStyles.googleCardButton}>
                            {i18n.t('label.register_only')}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </CardLayout>
                  ) : null}

                  {/* Donate Card Ends */}
                </View>
                {/* Competition Information Ended  */}

                {/* Competition Participant Details */}
                {participantCount > 0 ? (
                  <View style={[snippetStyles.projectSnippetContainerN]}>
                    <View style={snippetStyles.projectSpecsContainer}>
                      <View style={styles.headingParticipantContainer}>
                        {/* Participant Total Count */}
                        <Text style={snippetStyles.textHeadingParticipants}>
                          {i18n.t('label.participants')} (
                        {competitionDetail && competitionDetail.competitorCount}
                        )
                      </Text>
                        {/* Participant Total Count Ends */}
                      </View>
                      <View style={snippetStyles.topCompetitorContainer}>
                        <View>
                          {/* Participant Details */}
                          {hasEnrollments &&
                            competitionDetail.allEnrollments.map((top, index) =>
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
                                  setSupportDetails={this.props.setSupportDetails}
                                  setDonationContext={
                                    this.props.setDonationContext
                                  }
                                  key={index}
                                  status={status}
                                  competitionEnded={competitionEnded}
                                  isCompetitionOwner={isCompetitionOwner}
                                />
                              ) : null
                            )}
                          {/* Participant Details Ends */}
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
                {/* Competition Participant Details Ends */}

                {/* Participant Requests */}
                {requestCount > 0 &&
                  competitionDetail &&
                  competitionDetail.ownerTreecounterId ===
                  this.props.treeCounter.id ? (
                    <CardLayout style={[snippetStyles.projectSnippetContainerN]}>
                      <View style={snippetStyles.projectSpecsContainer}>
                        <View style={styles.headingParticipantContainer}>
                          {/* Total Requests  */}
                          <Text style={snippetStyles.textHeadingParticipants}>
                            {i18n.t('label.requests_to_join')} (
                        {competitionDetail && competitionDetail.competitorCount}
                        )
                      </Text>
                          {/* Total Requests Ends */}
                        </View>
                        <View style={styles.topCompetitorContainer}>
                          <View>
                            {/* Requseters Details */}
                            {hasEnrollments &&
                              competitionDetail.allEnrollments.map((top, index) =>
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
                                    setSupportDetails={this.props.setSupportDetails}
                                    setDonationContext={
                                      this.props.setDonationContext
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
                          <Text style={snippetStyles.textHeadingParticipants}>
                            {i18n.t('label.invite')}
                          </Text>
                        </View>
                        <View style={styles.topCompetitorContainer}>
                          <View>
                            <SearchUser
                              onSearchResultClick={this.onSearchResultClick}
                              currentUserProfile={this.props.currentUserProfile}
                              clearTextOnClick
                              alreadyInvited={competitionDetail.allEnrollments}
                              hideCompetitions
                              addstyles={{ width: '90%' }}
                            />
                            {hasEnrollments &&
                              competitionDetail.allEnrollments.map((top, index) =>
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
                                    setSupportDetails={this.props.setSupportDetails}
                                    setDonationContext={
                                      this.props.setDonationContext
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
                          <Text style={snippetStyles.textHeadingParticipants}>
                            {i18n.t('label.invited')}
                          </Text>
                        </View>
                        <View style={styles.topCompetitorContainer}>
                          <View>
                            {hasEnrollments &&
                              competitionDetail.allEnrollments.map((top, index) =>
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
                                      setSupportDetails={this.props.setSupportDetails}
                                      setDonationContext={
                                        this.props.setDonationContext
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
            </KeyboardAwareScrollView>
          )}
      </View>
    );
  }
  componentWillUnmount() { }
}

const mapStateToProps = state => ({
  competitionDetail: competitionDetailSelector(state),
  treeCounter: userTreecounterSelector(state),
  competitionEnrollments: userCompetitionEnrolledSelector(state),
  contentloader: getContentLoaderState(state)
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
