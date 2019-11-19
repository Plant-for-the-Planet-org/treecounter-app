/* eslint-disable no-underscore-dangle */
import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';
import { foldin, foldout } from '../../assets';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking
} from 'react-native';

const LoadingIndicator = lazy(() =>
  import('../../components/Common/LoadingIndicator')
);
const TabContainer = lazy(() => import('../../containers/Menu/TabContainer'));

import { context } from '../../config';
import styles from '../../styles/faq';

export default class FAQ extends Component {
  _renderHeader(section, index, isActive) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.question}</Text>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={isActive ? foldin : foldout}
        />
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <HTMLView
          value={`<div>${section.answer.replace(/(\r\n|\n|\r)/gm, '')}</div>`}
          stylesheet={styles}
          onLinkPress={url => {
            try {
              url = url.startsWith('/')
                ? `${context.scheme}://${context.host}${url}`
                : url;
            } catch (err) {
              // console.log(err);
            }

            //console.log('clicked link: ', url);
            Linking.openURL(url).catch(err => {
              console.log(err);
            });
          }}
        />
      </View>
    );
  }
  render() {
    return this.props.loading ? (
      <LoadingIndicator />
    ) : (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
          <Accordion
            sections={this.props.faqs}
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            touchableComponent={TouchableOpacity}
          />
        </ScrollView>
        <TabContainer {...this.props} />
      </View>
    );
  }
}

FAQ.propTypes = {
  faqs: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
