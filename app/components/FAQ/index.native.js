/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking
} from 'react-native';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';
import { SafeAreaView } from 'react-navigation';
import { debug } from '../../debug';
import { readmoreDown, readmoreUp, FAQsCover } from '../../assets';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { context } from '../../config';
import styles from '../../styles/faq';
import HeaderNew from './../Header/HeaderNew.native';
import i18n from '../../locales/i18n.js';

export default class FAQ extends Component {
  state = {
    activeSections: []
  };
  _renderHeader(section, index, isActive) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.question}</Text>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={isActive ? readmoreUp : readmoreDown}
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
              // debug(err);
            }

            //debug('clicked link: ', url);
            Linking.openURL(url).catch(err => {
              debug(err);
            });
          }}
        />
      </View>
    );
  }
  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
  render() {
    const textColor = '#4d5153';

    return this.props.loading ? (
      <LoadingIndicator />
    ) : (
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderNew title={''} navigation={this.props.navigation} />

        <ScrollView
          contentContainerStyle={{ paddingBottom: 72, paddingTop: 80 }}
        >
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              fontSize: 27,
              lineHeight: 40,
              letterSpacing: 0,
              textAlign: 'left',
              color: textColor,
              marginLeft: 24
            }}
          >
            {i18n.t('label.faq')}
          </Text>
          <Image
            resizeMode="contain"
            source={FAQsCover}
            style={styles.faqcover}
          />
          <Accordion
            activeSections={this.state.activeSections}
            sections={this.props.faqs}
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            touchableComponent={TouchableOpacity}
            onChange={this._updateSections}
          />
        </ScrollView>
        {/* <TabContainer {...this.props} /> */}
      </SafeAreaView>
    );
  }
}

FAQ.propTypes = {
  faqs: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
