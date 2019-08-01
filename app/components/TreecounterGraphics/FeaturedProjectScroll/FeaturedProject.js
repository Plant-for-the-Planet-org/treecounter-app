import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import styles from './../../../styles/trillion.native';
import i18n from '../../../locales/i18n';
import { calendarwhite } from './../../../assets/';
import { smalltreewhite } from './../../../assets/';

export default class FeaturedProject extends Component {
  render() {
    return (
      <View style={styles.featuredProjectCard}>
        <View style={styles.featuredProjectCardRow}>
          <Image
            source={this.props.imageUri}
            style={styles.featuredProjectCardImage}
          />
          <View style={{ paddingLeft: 16 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {this.props.orgname}
            </Text>
            <View style={styles.featuredProjectCardIconContainer}>
              <Image
                style={styles.featuredProjectCardIcon}
                source={smalltreewhite}
              />
              <Text style={styles.featuredProjectCardIconText}>
                {this.props.treespledged} {i18n.t('label.treespledged')}
              </Text>
            </View>
            <View style={styles.featuredProjectCardIconContainer}>
              <Image
                style={styles.featuredProjectCardIcon}
                source={calendarwhite}
              />
              <Text style={styles.featuredProjectCardIconText}>
                {this.props.date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
