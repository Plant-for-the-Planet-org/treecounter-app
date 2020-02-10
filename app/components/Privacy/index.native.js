/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import { Text, View, Linking } from 'react-native';
import ListView from 'deprecated-react-native-listview';
import { debug } from '../../debug';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { context } from '../../config';
import styles from '../../styles/faq';

export default class Privacy extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(
        this.convertPrivacyArrayToMap(this.props.privacies)
      )
    };
  }
  componentWillReceiveProps(nextProps) {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.setState({
      dataSource: dataSource.cloneWithRowsAndSections(
        this.convertPrivacyArrayToMap(nextProps.privacies)
      )
    });
  }
  convertPrivacyArrayToMap(privacies) {
    const privacyHeadingMap = {}; // Create the blank map

    privacies.forEach(function(privacyItem) {
      if (!privacyHeadingMap[privacyItem.heading]) {
        // Create an entry in the map for the category if it hasn't yet been created
        privacyHeadingMap[privacyItem.heading] = [];
      }

      privacyHeadingMap[privacyItem.heading].push(privacyItem);
    });
    return privacyHeadingMap;
  }
  // getInitialState() {
  //
  //
  //   return {
  //     dataSource: dataSource.cloneWithRowsAndSections(this.convertPrivacyArrayToMap())
  //   };
  // }
  _renderHeader(section, category) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{category}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <HTMLView
          value={`<div>${section.description.replace(
            /(\r\n|\n|\r)/gm,
            ''
          )}</div>`}
          stylesheet={styles}
          onLinkPress={url => {
            try {
              url = url.startsWith('/')
                ? `${context.scheme}://${context.host}${url}`
                : url;
            } catch (err) {
              //debug(err);
            }

            // debug('clicked link: ', url);
            Linking.openURL(url).catch(err => {
              debug(err);
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderContent}
        renderSectionHeader={this._renderHeader}
      />
    );
  }
}

Privacy.propTypes = {
  privacies: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
