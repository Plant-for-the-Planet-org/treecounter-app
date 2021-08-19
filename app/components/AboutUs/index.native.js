import React, { Component } from 'react';
import { LargeMenuItem } from '../Menu/MenuItem.native';
import { ScrollView, View, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import i18n from '../../locales/i18n';
import { withNavigation } from 'react-navigation';
// import TabContainer from '../../containers/Menu/TabContainer';
import HeaderNew from './../Header/HeaderNew.native';
import colors from '../../utils/constants';
import openWebView from '../../utils/openWebView';
import * as icons from '../../assets';

const onPressImprint = () => {
  openWebView(`https://a.plant-for-the-planet.org/${i18n.language}/imprint`);
};
const onPressPolicy = () => {
  openWebView(`https://a.plant-for-the-planet.org/${i18n.language}/privacy-terms`);
};
const onPressTerms = () => {
  openWebView(`https://a.plant-for-the-planet.org/${i18n.language}/privacy-terms`);
};
const onPressOpenSource = () => {
  openWebView('https://github.com/Plant-for-the-Planet-org/treecounter-app/network/dependencies');
};

//Run license-checker --production  --json > license.json to fetch license info from package.json:
//Copy paste required and specific license info in LicenseInfo.json file under app or web specific
class AboutUs extends Component {
  render() {
    const version = DeviceInfo.getReadableVersion();
    // const buildNumber = DeviceInfo.getBuildNumber();
    return (
      <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
        <HeaderNew
          title={i18n.t('label.information')}
          navigation={this.props.navigation}
        />

        <ScrollView style={{ marginTop: Platform.OS === 'ios' ? 160 : 120 }}>
          <LargeMenuItem
            onPress={() => {
              //  debug('open change log');
            }}
            title={version}
          />
          <LargeMenuItem
            onPress={() => { onPressPolicy(); }}
            title={i18n.t('label.data_protection')}
            iconUrl={icons.info}
          />
          <LargeMenuItem
            onPress={() => { onPressImprint(); }}
            title={i18n.t('label.imprint')}
            iconUrl={icons.info}
          />
          <LargeMenuItem
            onPress={() => { onPressTerms(); }}
            title={i18n.t('label.terms_of_service')}
            iconUrl={icons.info}
          />
          <LargeMenuItem
            onPress={() => { onPressOpenSource(); }}
            title={i18n.t('label.open_source_license')}
            iconUrl={icons.info}
          />
        </ScrollView>
        {/* <TabContainer {...this.props} /> */}
      </View>
    );
  }
}

export default withNavigation(AboutUs);
