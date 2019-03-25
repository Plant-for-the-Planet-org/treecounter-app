import React from 'react';
import CardLayout from '../Common/Card';
import styles from '../../styles/competition/competition-snippet.native';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
import tick from '../../assets/images/icons/tick.png';
import i18n from '../../locales/i18n';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CompetitionProgressBar from './CompetitionProgressBar';
import PropTypes from 'prop-types';
import { compCalendar } from '../../assets';
import CompetitionTopCompetitor from './CompetitionTopCompetitor.native';

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
                this.props.competition.topEnrollments.length > 0 ? (
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
                  <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
                    {this.props.competition &&
                    this.props.competition.competitorCount > 0
                      ? `${this.props.competition.competitorCount} participants`
                      : this.props.type !== 'mine'
                        ? i18n.t('label.join')
                        : null}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </CardLayout>
      </TouchableHighlight>
    );
  }
}

export default CompetitionSnippet;
CompetitionSnippet.propTypes = {
  competition: PropTypes.any,
  type: PropTypes.any
};
