import React from 'react';
//import { debug } from '../../../debug';
import styles from '../../../styles/user-home';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { getImageUrl } from './../../../actions/apiRouting';
import { delimitNumbers } from './../../../utils/utils';
import i18n from '../../../locales/i18n.js';

class CompetitionSnippet extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleExpanded(id) {
    this.props.onMoreClick(id);
  }

  containerPress(id) {
    if (this.props.onMoreClick) {
      //debug(this.props.onMoreClick, 'this.props.onMoreClick');
      this.props.onMoreClick(id);
    }
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => this.containerPress(this.props.competition.id)}
      >
        <View style={styles.competitionsView}>
          {this.props.competition && this.props.competition.image ? (
            <View style={styles.competitionsImageView}>
              <Image
                style={{ flex: 1 }}
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
          ) : (
            <View style={styles.competitionsNoImageView} />
          )}

          <View style={{ padding: 6 }}>
            <View style={styles.projectNameContainer}>
              {this.props.competition ? (
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={3}
                  style={styles.competitionNameText}
                >
                  {this.props.competition.name}
                </Text>
              ) : null}
              <View style={styles.competitionsInfoView}>
                <Text style={styles.competitionsInfoGoal}>
                  {i18n.t('label.goal')}{' '}
                  {delimitNumbers(this.props.competition.goal)}
                </Text>
                <Text style={styles.competitionsInfoActive}>
                  {i18n.t('label.active')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default CompetitionSnippet;
