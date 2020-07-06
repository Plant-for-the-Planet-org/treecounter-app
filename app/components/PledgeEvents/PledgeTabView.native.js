import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import i18n from '../../locales/i18n';
import { delimitNumbers } from './../../utils/utils';

export const PledgeTabView = props => {
  return (
    <>
      <View style={styles.tabViewTitleContainer}>
        <Text style={[styles.tabViewTitleText, { marginLeft: 26 }]}>
          {i18n.t('label.pledgeTitleName')}
        </Text>
        <Text style={styles.tabViewTitleText}>
          {i18n.t('label.pledgeTitleTrees')}
        </Text>
      </View>

      {(props.tabselected === 'recent'
        ? props.pledges.latestPledgeEvents
        : props.pledges.highestPledgeEvents
      ).map((latestPledges, index) => (
        <View
          key={`latestPledges-${index}`}
          style={styles.tabViewTitleContainer}
        >
          <Text style={[styles.tabViewContentText, { marginLeft: 26 }]}>
            {latestPledges.isAnonymous
              ? i18n.t('label.anonymous')
              : latestPledges.firstname + ' ' + latestPledges.lastname}
          </Text>
          <Text style={styles.tabViewContentText}>
            {i18n.t(delimitNumbers(latestPledges.treeCount))}
          </Text>
        </View>
      ))}
    </>
  );
};

export const TabButtons = props => {
  return (
    <View style={styles.tabViewButtonContainer}>
      <TouchableOpacity
        style={[
          { padding: 16 },
          props.tabselected === 'recent' ? styles.selectedTabButtonView : null
        ]}
        onPress={() => props.setTabSelected('recent')}
      >
        <Text
          style={[
            styles.tabViewButtonText,
            props.tabselected === 'recent' ? styles.selectedTabButtonText : null
          ]}
        >
          {i18n.t('label.most_recent')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          { padding: 16 },
          props.tabselected === 'highest' ? styles.selectedTabButtonView : null
        ]}
        onPress={() => props.setTabSelected('highest')}
      >
        <Text
          style={[
            styles.tabViewButtonText,
            props.tabselected === 'highest'
              ? styles.selectedTabButtonText
              : null
          ]}
        >
          {i18n.t('label.biggest_pledges')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
