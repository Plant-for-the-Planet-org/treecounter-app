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
    console.log(this.props.competition);
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => this.containerPress(id)}
      >
        <CardLayout style={[styles.projectSnippetContainer]}>
          {/*{projectImage ? (*/}
          {/*<View style={styles.projectImageContainer}>*/}
          {/*<Image*/}
          {/*style={styles.teaser__projectImage}*/}
          {/*source={{*/}
          {/*uri: getImageUrl(*/}
          {/*'project',*/}
          {/*'large',*/}
          {/*teaserProps.projectImage.image*/}
          {/*)*/}
          {/*}}*/}
          {/*resizeMode={'cover'}*/}
          {/*/>*/}
          {/*</View>*/}
          {/*) : null}*/}

          <View style={styles.projectSpecsContainer}>
            {this.props.competition && this.props.competition.image ? (
              <View style={styles.projectImageContainer}>
                <Image
                  style={styles.teaser__projectImage}
                  source={{
                    uri: getImageUrl(
                      'project',
                      'large',
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

              <View style={styles.actionContainer}>
                <View style={styles.byOrgContainer}>
                  <Image
                    source={compCalendar}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
                    Ends Nov 19, 2019
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
                    {this.props.competition &&
                    this.props.competition.competitorCount > 0
                      ? `${this.props.competition.competitorCount} participants`
                      : 'Join'}
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
  competition: PropTypes.any
};
