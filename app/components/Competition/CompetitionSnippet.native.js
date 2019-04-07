import React from 'react';
import CardLayout from '../Common/Card';
import styles from '../../styles/competition/competition-snippet.native';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
import tick from '../../assets/images/icons/tick.png';
import i18n from '../../locales/i18n';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CompetitionProgressBar from './CompetitionProgressBar';
import TouchableItem from '../../components/Common/TouchableItem';
import PropTypes from 'prop-types';
import { compCalendar } from '../../assets';
import { bindActionCreators } from 'redux';
import CompetitionTopCompetitor from './CompetitionTopCompetitor.native';
import {
  userCompetitionEnrolledSelector,
  userTreecounterSelector
} from '../../selectors';
import connect from 'react-redux/es/connect/connect';

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
    console.log(this.props);
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
        <TouchableItem>
          <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
            {i18n.t('label.edit')}
          </Text>
        </TouchableItem>
      );
    } else if (status === '') {
      button = (
        <TouchableItem
          onPress={() =>
            this.props.enrollCompetition(this.props.competition.id)
          }
        >
          <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
            {i18n.t('label.join')}
          </Text>
        </TouchableItem>
      );
    } else if (status === 'enrolled') {
      button = (
        <TouchableItem
          onPress={() => this.props.leaveCompetition(this.props.competition.id)}
        >
          <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
            {i18n.t('label.leave')}
          </Text>
        </TouchableItem>
      );
    } else if (status === 'pending') {
      button = (
        <TouchableItem
          onPress={() => this.props.leaveCompetition(this.props.competition.id)}
        >
          <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
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
        <CardLayout style={[styles.projectSnippetContainer]}>
          <View style={styles.projectSpecsContainer}>
            {/*{this.props.competition && this.props.competition.image ? (*/}
            {/*<View style={styles.projectImageContainer}>*/}
            {/*<Image*/}
            {/*style={styles.teaser__projectImage}*/}
            {/*source={{*/}
            {/*uri: getImageUrl(*/}
            {/*'project',*/}
            {/*'large',*/}
            {/*this.props.competition.image*/}
            {/*)*/}
            {/*}}*/}
            {/*resizeMode={'cover'}*/}
            {/*/>*/}
            {/*</View>*/}
            {/*) : null}*/}
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
                  numberOfLines={1}
                  style={styles.project_teaser__contentText}
                >
                  {this.props.competition && this.props.competition.name}
                </Text>
              </View>
              <View style={styles.projectNameContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.project_teaser__contentByText}
                >
                  by{' '}
                  {this.props.competition && this.props.competition.ownerName}
                </Text>
              </View>
              {/*<View style={styles.projectdetailsContainer}>*/}
              {/**/}
              {/*</View>*/}
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
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={styles.bottomText}>
                    Ends{' '}
                    {this.props.competition && this.props.competition.endDate}
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  {this.props.competition &&
                  this.props.competition.competitorCount > 0 ? (
                    <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
                      {this.props.competition.competitorCount + 1} participants
                    </Text>
                  ) : (
                    button
                  )}
                </View>
              </View>
            </View>
          </View>
        </CardLayout>
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
  enrollCompetition: PropTypes.any
};
