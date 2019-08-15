import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import styles from './../../../styles/trillion.native';
import i18n from '../../../locales/i18n';
import { greencalendar } from './../../../assets/';
import { smalltree } from './../../../assets/';

export default class FeaturedProject extends Component {
  render() {
    return (
      <View style={styles.featuredProjectCard}>
        <View style={styles.featuredProjectCardRow}>
          <Image
            source={{ uri: this.props.imageUri }}
            style={styles.featuredProjectCardImage}
            resizeMode="contain"
          />
          <View style={{ paddingLeft: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>{this.props.orgname}</Text>
            <View style={styles.featuredProjectCardIconContainer}>
              <Image
                style={styles.featuredProjectCardIcon}
                source={smalltree}
              />
              <Text style={styles.featuredProjectCardIconText}>
                {this.props.treespledged} Trees Pledged
                {/* {i18n.t('label.treespledged')} */}
              </Text>
            </View>
            <View style={styles.featuredProjectCardIconContainer}>
              <Image
                style={styles.featuredProjectCardIcon}
                source={greencalendar}
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
