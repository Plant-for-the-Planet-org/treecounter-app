import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
// import CardLayout from '../Common/Card/CardLayout';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    // backgroundColor: '#F5FCFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    textAlign: 'left',
    color: '#686060'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  content: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    color: '#938989'
  },

  a: {
    fontWeight: '300',
    color: '#e86f56'
  }
});
export default class FAQ extends Component {
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.question}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <HTMLView value={section.answer} stylesheet={styles} />
      </View>
    );
  }
  render() {
    return (
      <ScrollView>
        <Accordion
          sections={this.props.faqs}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          touchableComponent={TouchableOpacity}
        />
      </ScrollView>
    );
  }
}

FAQ.propTypes = {
  faqs: PropTypes.array.isRequired
};
