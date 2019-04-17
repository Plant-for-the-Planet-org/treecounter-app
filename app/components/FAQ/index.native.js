import React, { Component } from 'react';
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
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { context } from '../../config';
import styles from '../../styles/faq';
import TabContainer from '../../containers/Menu/TabContainer';

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
          value={section.answer}
          addLineBreaks={false}
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
              // console.log(err);
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
        <ScrollView>
          <Accordion
            sections={this.props.faqs}
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            touchableComponent={TouchableOpacity}
          />
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flex: 1,
            width: '100%'
          }}
        >
          <TabContainer {...this.props} />
        </View>
      </View>
    );
  }
}

FAQ.propTypes = {
  faqs: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
