import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../../../styles/trillion.native';
import { greencalendar } from './../../../assets/';
import { smalltree } from './../../../assets/';
import { formatDate } from '../../../utils/utils';
import { delimitNumbers } from '../../../utils/utils';
import i18n from '../../../locales/i18n';

export default class UnfulfilledEvents extends Component {
  render() {
    return (
      <View>
        <View style={[styles.unfulfilledEventCard]}>
          <View style={[styles.ufpColumn, { flexDirection: 'column' }]}>
            <Text style={styles.ufpTrees}>
              {i18n.t('label.pledgedOn')} {this.props.event.eventName}
            </Text>
            <View style={styles.ufpLeftSection}>
              <View>
                <View style={[styles.featuredProjectCardIconContainer]}>
                  <Image
                    style={styles.featuredProjectCardIcon}
                    source={smalltree}
                  />
                  <Text
                    style={[
                      styles.featuredProjectCardIconText,
                      { maxWidth: 200, flexWrap: 'wrap' }
                    ]}
                  >
                    {delimitNumbers(this.props.event.treeCount)}{' '}
                    {i18n.t('label.trees')}
                  </Text>
                </View>
                <View style={styles.featuredProjectCardIconContainer}>
                  <Image
                    style={styles.featuredProjectCardIcon}
                    source={greencalendar}
                  />
                  <Text style={styles.featuredProjectCardIconText}>
                    {this.props.event.lastIncremented
                      ? formatDate(this.props.event.lastIncremented)
                      : null}
                  </Text>
                </View>
              </View>
              <View style={{ alignSelf: 'flex-end' }}>
                <View style={styles.ufpCostView}>
                  <Text style={styles.ufpCostText}>
                    {this.props.event.plantProjectCurrency}{' '}
                    {delimitNumbers(
                      this.props.event.treeCount *
                        this.props.event.plantProjectTreeCost
                    )}
                  </Text>
                </View>
                <Text style={styles.ufpPlantNow}>
                  {i18n.t('label.plantNow')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
