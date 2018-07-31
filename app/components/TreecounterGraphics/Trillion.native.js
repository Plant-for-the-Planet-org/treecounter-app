import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Image } from 'react-native';
import i18n from '../../locales/i18n';

import { trillionCampaign } from '../../actions/trillionAction';
import SvgContainer from '../Common/SvgContainer';

export default class Trillion extends Component {
  constructor() {
    super();
    this.state = {
      svgData: {},
      displayName: '',
      loading: true
    };
  }
  componentDidMount() {
    trillionCampaign()
      .then(({ data }) => {
        this.setState({
          svgData: {
            id: 1,
            target: data.countTarget,
            planted: data.countPlanted,
            community: data.countCommunity,
            personal: data.countPersonal
          },
          displayName: data.displayName,
          loading: false
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {i18n.t('label.logged_in')}
          {' ' + i18n.t('name.label')}
        </Text>
        <SvgContainer {...this.state.svgData} />
      </View>
    );
  }
}

const skyBlue = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: skyBlue
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
