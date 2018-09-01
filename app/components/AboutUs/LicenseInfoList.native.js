import React, { Component } from 'react';
import { LargeMenuItem } from '../Menu/MenuItem.native';

import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';
import { foldin, foldout } from '../../assets';
import { Text, View, ScrollView, Image, Linking } from 'react-native';
import { context } from '../../config';
import styles from '../../styles/faq';
import DeviceInfo from 'react-native-device-info';
import i18n from '../../locales/i18n';
import TouchableItem from '../../components/Common/TouchableItem';

export default class LicenseInfoList extends Component {
  _renderHeader(section, index, isActive) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section}</Text>
        <Image style={styles.imageStyle} source={isActive ? foldin : foldout} />
      </View>
    );
  }

  _renderContent = section => {
    const { appLicenses } = this.props.navigation.getParam('licenseList', {
      appLicenses: {}
    });
    const repoPath = appLicenses[section].repository;
    let licenseFileUrl = appLicenses[section].licenseFile;
    if (licenseFileUrl.includes('node_modules')) {
      licenseFileUrl = repoPath + `/blob/master/LICENSE`;
    }
    const publisher = appLicenses[section].publisher;
    return (
      <View style={styles.content}>
        <TouchableItem
          onPress={() => {
            Linking.openURL(licenseFileUrl).catch(err => {
              console.log(err);
            });
          }}
        >
          <Text>{'Licenses : ' + appLicenses[section].licenses}</Text>
        </TouchableItem>
        {publisher ? <Text>{'Publisher : ' + publisher}</Text> : null}
        <TouchableItem
          onPress={() => {
            Linking.openURL(repoPath).catch(err => {
              console.log(err);
            });
          }}
        >
          <Text>{'Project Code : ' + appLicenses[section].repository}</Text>
        </TouchableItem>
      </View>
    );
  };
  render() {
    const version = DeviceInfo.getReadableVersion();
    const { appLicenses } = this.props.navigation.getParam('licenseList', {
      appLicenses: {}
    });
    return (
      <ScrollView>
        <Text style={{ padding: 10 }}>
          {i18n.t('label.license_credit_info')}
        </Text>
        <Accordion
          sections={Object.keys(appLicenses)}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          touchableComponent={TouchableItem}
        />
      </ScrollView>
    );
  }
}

LicenseInfoList.propTypes = {
  navigation: PropTypes.any
};
