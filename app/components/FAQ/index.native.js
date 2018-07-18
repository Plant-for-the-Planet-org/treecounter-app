import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import HTML from 'react-native-render-html';
import { Text, View } from 'react-native';

export default class FAQ extends Component {
  _renderSectionTitle(section) {
    return (
      <View>
        <HTML html={section.answer} />
      </View>
    );
  }

  _renderHeader(section) {
    return (
      <View>
        <Text>{section.question}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View>
        <HTML html={section.answer} />
      </View>
    );
  }
  render() {
    return (
      <Accordion
        sections={this.props.faqs}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}

FAQ.propTypes = {
  faqs: PropTypes.array.isRequired
};
