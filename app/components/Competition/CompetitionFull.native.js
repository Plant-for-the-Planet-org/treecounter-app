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
import { competitionDetailSelector } from '../../selectors';
import CompetitionProgressBar from './CompetitionProgressBar';
import { compCalendar } from '../../assets';
import i18n from '../../locales/i18n';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CompetitionTopCompetitor from './CompetitionTopCompetitor.native';
import CompetitionParticipant from './CompetitionParticipant.native';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class CompetitionFull extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {}

  componentDidMount() {
    if (this.props.competition_id) {
      this.props.fetchCompetitionDetail(this.props.competition_id);
    }
  }

  render() {
    console.log(this.props);
    const competitionDetail = this.props.competitionDetail.competitionDetail;
    let participantCount = 0,
      requestCount = 0,
      inviteCount = 0;
    if (competitionDetail && competitionDetail.allEnrollments) {
      for (let i = 0; i < competitionDetail.allEnrollments.length; i++) {
        if (competitionDetail.allEnrollments[i].status === 'enrolled') {
          participantCount++;
        } else if (competitionDetail.allEnrollments[i].status === 'pending') {
          requestCount++;
        } else if (competitionDetail.allEnrollments[i].status === 'invited') {
          inviteCount++;
        }
      }
    }
    return (
      <View>
        <ScrollView contentContainerStyle={scrollStyle.styleContainer}>
          <View>
            <CardLayout style={[snippetStyles.projectSnippetContainer]}>
              <View style={snippetStyles.projectSpecsContainer}>
                {competitionDetail && competitionDetail.image ? (
                  <View style={styles.projectImageContainer}>
                    <Image
                      style={styles.teaser__projectImage}
                      source={{
                        uri: getImageUrl(
                          'project',
                          'large',
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
                      by {competitionDetail && competitionDetail.ownerName}
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
                  <View style={snippetStyles.actionContainer}>
                    <View style={snippetStyles.emailContainer}>
                      <Image
                        source={compCalendar}
                        style={{ width: 15, height: 15 }}
                      />
                      <Text style={snippetStyles.bottomText}>
                        {competitionDetail && competitionDetail.email}
                      </Text>
                    </View>
                  </View>
                  <View style={snippetStyles.actionContainer}>
                    <View style={snippetStyles.byOrgContainer}>
                      <Image
                        source={compCalendar}
                        style={{ width: 15, height: 15 }}
                      />
                      <Text style={snippetStyles.bottomText}>
                        Ends {competitionDetail && competitionDetail.endDate}
                      </Text>
                    </View>

                    <View style={snippetStyles.buttonContainer}>
                      {this.props.type === 'owned' ? (
                        <PrimaryButton
                          style={snippetStyles.buttonItem}
                          buttonStyle={snippetStyles.buttonStyle}
                          textStyle={snippetStyles.buttonTextStyle}
                        >
                          <Text> {i18n.t('label.edit')}</Text>
                        </PrimaryButton>
                      ) : this.props.type === 'enrolled' ? (
                        <PrimaryButton
                          style={snippetStyles.buttonItem}
                          buttonStyle={snippetStyles.buttonStyle}
                          textStyle={snippetStyles.buttonTextStyle}
                        >
                          <Text> {i18n.t('label.leave')}</Text>
                        </PrimaryButton>
                      ) : (
                        <PrimaryButton
                          style={snippetStyles.buttonItem}
                          buttonStyle={snippetStyles.buttonStyle}
                          textStyle={snippetStyles.buttonTextStyle}
                        >
                          <Text> {i18n.t('label.request_to_join')}</Text>
                        </PrimaryButton>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </CardLayout>
            {participantCount > 0 ? (
              <CardLayout style={[snippetStyles.projectSnippetContainer]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    <Text style={styles.textHeadingParticipants}>
                      PARTICIPANTS ({competitionDetail &&
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
                              key={index}
                            />
                          ) : null
                      )}
                    </View>
                  </View>
                </View>
              </CardLayout>
            ) : null}
            {requestCount > 0 && this.props.type === 'owned' ? (
              <CardLayout style={[snippetStyles.projectSnippetContainer]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    <Text style={styles.textHeadingParticipants}>
                      REQUESTS TO JOIN ({competitionDetail &&
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
            competitionDetail.allEnrollments &&
            competitionDetail.allEnrollments.length > 0 &&
            this.props.type !== 'owned' ? (
              <CardLayout style={[snippetStyles.projectSnippetContainer]}>
                <View style={snippetStyles.projectSpecsContainer}>
                  <View style={styles.headingParticipantContainer}>
                    <Text style={styles.textHeadingParticipants}>INVITE</Text>
                  </View>
                  <View style={styles.topCompetitorContainer}>
                    <View>
                      {competitionDetail.allEnrollments.map(
                        (top, index) =>
                          top.status === 'invited' ? (
                            <CompetitionParticipant
                              competitor={top}
                              index={index}
                              type="invite"
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
  competitionDetail: competitionDetailSelector(state)
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
  type: PropTypes.any
};
