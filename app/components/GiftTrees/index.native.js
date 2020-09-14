import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import GiftTabView from './GiftTabs';
import HeaderStatic from './../Header/HeaderStatic';
import { View, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
// import { debug } from '../../debug';
import i18n from '../../locales/i18n';
const height = Dimensions.get('window').height;

export default class GiftTrees extends Component {
  constructor(props) {
    super(props);
    this.openProjects = this.openProjects.bind(this);
  }
  openProjects(formValue, type) {
    //debug('Open Project called up ', formValue);
    this.props.openProjects(formValue, type);
  }
  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderStatic
            title={i18n.t('label.gift_trees')}
            navigation={this.props.navigation}
          />
          <View style={{ marginTop: Platform.OS === 'ios' ? height < 737 ? 56 : 26 : 56 }} />
          <GiftTabView openProjects={this.openProjects} {...this.props} />
        </SafeAreaView>
      </>
    );
  }
}

GiftTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  gift: PropTypes.func,
  paymentStatus: PropTypes.object,
  paymentClear: PropTypes.func,
  plantProjectClear: PropTypes.func
};
