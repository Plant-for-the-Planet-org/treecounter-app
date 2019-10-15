import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { getLocalRoute } from '../../actions/apiRouting';
import { successAnimated } from '../../assets';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import i18n from '../../locales/i18n';

export default class BottomAction extends Component {
  render() {
    const treeCount = this.props.treeCount.toLocaleString();
    return (
      <View>
        <View style={styles.baContainer}>
          {/* <Image
            source={successAnimated}
            style={styles.baSuccessImage}
            resizeMode="cover"
          /> */}
          <Text style={styles.baMessage}>
            {i18n.t('label.pledgeAddedMessage', {
              treeCount: treeCount
            })}
          </Text>

          <View style={styles.baButtonContainer}>
            <TouchableOpacity
              style={styles.baLaterButton}
              onPress={() => {
                updateStaticRoute('app_pledge_events', this.props.navigation, {
                  slug: this.props.navigation.getParam('slug'),
                  eventName: this.props.navigation.getParam('eventName'),
                  eventDate: this.props.navigation.getParam('eventDate'),
                  totalTrees: this.props.navigation.getParam('totalTrees'),
                  eventImage: this.props.navigation.getParam('eventImage'),
                  description: this.props.navigation.getParam('description')
                });
              }}
            >
              <Text style={styles.baLaterText}>
                {i18n.t('label.pledgeAddedLaterButton')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.baContinueButton}
              onPress={() => {
                updateStaticRoute(
                  getLocalRoute('app_donateTrees'),
                  this.props.navigation
                );
              }}
            >
              <Text style={styles.baContinueText}>
                {i18n.t('label.pledgeAddedContinueButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
