import React, { Component } from 'react';
import { LargeMenuItem } from '../Menu/MenuItem.native';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import i18n from '../../locales/i18n';
import { withNavigation } from 'react-navigation';
const LicenseInfo = require('./LicenseInfo.json');

class AboutUs extends Component {
  render() {
    const version = DeviceInfo.getReadableVersion();
    const buildNumber = DeviceInfo.getBuildNumber();
    return (
      <ScrollView>
        <LargeMenuItem
          onPress={() => {
            console.log('open change log');
          }}
          title={version}
        />
        <LargeMenuItem
          onPress={() => {
            console.log('open change log');
          }}
          title={i18n.t('label.privacy')}
        />
        <LargeMenuItem
          onPress={() => {
            console.log('open Third party here');
            this.props.navigation.navigate('license_info_list', {
              licenseList: LicenseInfo
            });
          }}
          title={i18n.t('label.open_source_license')}
        />
      </ScrollView>
    );
  }
}

export default withNavigation(AboutUs);
