import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import styles from './../../../styles/trillion.native';
import i18n from '../../../locales/i18n';
import { greencalendar } from './../../../assets/';
import { smalltree } from './../../../assets/';
import moment from 'moment';
import { getLocale } from '../../../actions/getLocale';

export default class FeaturedProject extends Component {
  constructor(props) {
    super(props);
    moment.locale(getLocale());
  }

  render() {
    return (
      <View style={styles.featuredProjectCard}>
        <View style={styles.featuredProjectCardRow}>
          <Image
            source={{ uri: this.props.imageUri }}
            style={styles.featuredProjectCardImage}
            resizeMode="contain"
          />
          <View
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              flexWrap: 'wrap',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Text
              style={{ flex: 1, flexWrap: 'wrap', fontFamily: 'OpenSans-Bold' }}
            >
              {this.props.orgname}
            </Text>
            <View style={styles.featuredProjectCardIconContainer}>
              <Image
                style={styles.featuredProjectCardIcon}
                source={smalltree}
              />
              <Text style={styles.featuredProjectCardIconText}>
                {this.props.treespledged.toLocaleString()}
                {/* Trees Pledged */} {i18n.t('label.treesPledged')}
              </Text>
            </View>
            <View style={styles.featuredProjectCardIconContainer}>
              {this.props.date ? (
                <Image
                  style={styles.featuredProjectCardIcon}
                  source={greencalendar}
                />
              ) : null}

              <Text style={styles.featuredProjectCardIconText}>
                {this.props.date
                  ? moment(this.props.date).format('D MMM, YYYY')
                  : null}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
