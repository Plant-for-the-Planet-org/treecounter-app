/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import { debug } from '../../debug';
import { foldin, foldout } from '../../assets';
import { Text, View, ScrollView, Image, Linking } from 'react-native';
import styles from '../../styles/faq';
import i18n from '../../locales/i18n';
import TouchableItem from '../../components/Common/TouchableItem';
import colors from '../../utils/constants';
import HeaderNew from './../Header/HeaderNew';

export default class LicenseInfoList extends Component {
  constructor() {
    super();
    this.state = {
      indexes: []
    };
  }

  _updateSections = sections => {
    this.setState({
      indexes: sections
    });
  };

  _renderHeader(section, index, isActive) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section}</Text>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={isActive ? foldin : foldout}
        />
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
              debug(err);
            });
          }}
        >
          <Text>{'Licenses : ' + appLicenses[section].licenses}</Text>
        </TouchableItem>
        {publisher ? <Text>{'Publisher : ' + publisher}</Text> : null}
        <TouchableItem
          onPress={() => {
            Linking.openURL(repoPath).catch(err => {
              debug(err);
            });
          }}
        >
          <Text>{'Project Code : ' + appLicenses[section].repository}</Text>
        </TouchableItem>
      </View>
    );
  };
  render() {
    // const version = DeviceInfo.getReadableVersion();
    const { appLicenses } = this.props.navigation.getParam('licenseList', {
      appLicenses: {}
    });
    return (
      <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
        <HeaderNew
          title={i18n.t('label.license_info_header')}
          navigation={this.props.navigation}
        />
        <Text
          style={{
            marginTop: Platform.OS === 'ios' ? 160 : 120,
            paddingLeft: 25,
            paddingRight: 20
          }}
        >
          {i18n.t('label.license_credit_info')}
        </Text>
        <ScrollView>
          <Accordion
            activeSections={this.state.indexes}
            sections={Object.keys(appLicenses)}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            touchableComponent={TouchableItem}
            onChange={this._updateSections}
          />
        </ScrollView>
      </View>
    );
  }
}

LicenseInfoList.propTypes = {
  navigation: PropTypes.any
};
