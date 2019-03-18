import React from 'react';
import CardLayout from '../Common/Card';
import styles from '../../styles/competition/competition-snippet.native';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
import tick from '../../assets/images/icons/tick.png';
import i18n from '../../locales/i18n';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CompetitionProgressBar from './CompetitionProgressBar';
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
            <CompetitionProgressBar countPlanted={20} countTarget={1000} />
            <View style={styles.competitionContent}>
              <View style={styles.projectNameContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.project_teaser__contentText}
                >
                  WorldWide Tree Planting Campaign
                </Text>
              </View>
              <View style={styles.projectNameContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.project_teaser__contentByText}
                >
                  by World Wide Fund for Nature
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
                    290 participants
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
