import React from 'react';
import PropTypes from 'prop-types';

import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import InlineLink from '../Common/InlineLink';
import i18n from '../../locales/i18n.js';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import styles from '../../styles/login';

import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';
import { getLocalRoute } from '../../actions/apiRouting';

export default class UserContributions extends React.Component {
  render() {
    const { userProfileId, userContributions } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.loginHeader}>
          <Text style={styles.titleText}>{i18n.t('label.my_trees')}</Text>
          <View style={styles.titleTextUnderline} />
        </View>
        <View style={styles.inputContainer}>
          {Object.keys(userContributions).length > 0 ? (
            <View>
              {/* <ArcGISContributionsMap userId={userProfileId} /> */}
              <ContributionsMapLegend />
              <View className="contribution-container">
                <ContributionCardList contributions={userContributions} />
              </View>
              <View className="contribution-buttons">
                <TouchableHighlight
                  onPress={() => getLocalRoute('app_registerTrees')}
                >
                  <Text>{i18n.t('label.registerFurther')}</Text>
                  {/* uri={'app_registerTrees'} */}
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => getLocalRoute('app_donateTrees')}
                >
                  {/* uri={'app_donateTrees'}  */}
                  <Text>{i18n.t('label.donate_trees')}</Text>
                </TouchableHighlight>
              </View>
            </View>
          ) : (
            <View className="no-contribution-wrapper">
              <Text>{i18n.t('label.no_contributions')}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

UserContributions.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired
};
