import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import i18n from '../../locales/i18n';
import { delimitNumbers } from './../../utils/utils';

export default class PledgeTabView extends Component {
  state = {
    index: 0,
    tabselected: 'recent'
  };

  onTabChangeToHighest = () => {
    this.setState({
      tabselected: 'highest'
    });
  };

  onTabChangeToRecent = () => {
    this.setState({
      tabselected: 'recent'
    });
  };
  render() {
    const allpledgeshigh = this.props.pledges.highestPledgeEvents;

    const highestPledges = allpledgeshigh.map((highestPledges, index) => (
      <View
        key={`highestPledges-${index}`}
        style={styles.tabViewTitleContainer}
      >
        <View style={{ flex: 1, marginLeft: 26 }}>
          <Text style={styles.tabViewContentText}>
            {highestPledges.isAnonymous
              ? i18n.t('label.anonymous')
              : highestPledges.firstname + ' ' + highestPledges.lastname}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.tabViewContentText}>
            {i18n.t(delimitNumbers(highestPledges.treeCount))}
          </Text>
        </View>
      </View>
    ));

    const allpledgesrecent = this.props.pledges.latestPledgeEvents;

    const latestPledges = allpledgesrecent.map((latestPledges, index) => (
      <View key={`latestPledges-${index}`} style={styles.tabViewTitleContainer}>
        <View style={{ flex: 1, marginLeft: 26 }}>
          <Text style={styles.tabViewContentText}>
            {latestPledges.isAnonymous
              ? i18n.t('label.anonymous')
              : latestPledges.firstname + ' ' + latestPledges.lastname}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.tabViewContentText}>
            {i18n.t(delimitNumbers(latestPledges.treeCount))}
          </Text>
        </View>
      </View>
    ));

    return (
      <ScrollView>
        <View style={styles.tabViewButtonContainer}>
          <TouchableOpacity
            style={[
              { padding: 16 },
              this.state.tabselected === 'recent'
                ? styles.selectedTabButtonView
                : null
            ]}
            onPress={this.onTabChangeToRecent}
          >
            <Text
              style={[
                styles.tabViewButtonText,
                this.state.tabselected === 'recent'
                  ? styles.selectedTabButtonText
                  : null
              ]}
            >
              {i18n.t('label.most_recent')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              { padding: 16 },
              this.state.tabselected === 'highest'
                ? styles.selectedTabButtonView
                : null
            ]}
            onPress={this.onTabChangeToHighest}
          >
            <Text
              style={[
                styles.tabViewButtonText,
                this.state.tabselected === 'highest'
                  ? styles.selectedTabButtonText
                  : null
              ]}
            >
              {i18n.t('label.biggest_pledges')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabViewTitleContainer}>
          <View style={{ flex: 1, marginLeft: 26 }}>
            <Text style={styles.tabViewTitleText}>
              {i18n.t('label.pledgeTitleName')}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tabViewTitleText}>
              {i18n.t('label.pledgeTitleTrees')}
            </Text>
          </View>
        </View>

        {/* Biggest Pledges */}
        <View>
          {this.state.tabselected === 'recent' ? latestPledges : highestPledges}
        </View>
      </ScrollView>
    );
  }
}
