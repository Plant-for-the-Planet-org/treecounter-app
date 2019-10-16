import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../../../styles/trillion.native';
import { greencalendar } from './../../../assets/';
import { smalltree } from './../../../assets/';
import { formatDate } from '../../../utils/utils';

export default class UnfulfilledEvents extends Component {
  render() {
    return (
      <View>
        <View style={[styles.unfulfilledEventCard]}>
          <View style={[styles.ufpColumn, { flexDirection: 'column' }]}>
            <Text style={styles.ufpTrees}>
              Pledged on {this.props.event.eventName}
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
                    {this.props.event.treeCount.toLocaleString()} Trees
                  </Text>
                </View>
                <View style={styles.featuredProjectCardIconContainer}>
                  <Image
                    style={styles.featuredProjectCardIcon}
                    source={greencalendar}
                  />
                  <Text style={styles.featuredProjectCardIconText}>
                    {this.props.event.lastIncremented
                      ? formatDate(this.props.date)
                      : null}
                  </Text>
                </View>
              </View>
              <View style={{ alignSelf: 'flex-end' }}>
                <View style={styles.ufpCostView}>
                  <Text style={styles.ufpCostText}>
                    {this.props.event.plantProjectCurrency}{' '}
                    {(
                      this.props.event.treeCount *
                      this.props.event.plantProjectTreeCost
                    ).toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.ufpPlantNow}>Plant Now</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
