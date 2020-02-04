import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import GiftTabView from './GiftTabs';
import HeaderStatic from './../Header/HeaderStatic';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class GiftTrees extends Component {
  constructor(props) {
    super(props);
    this.openProjects = this.openProjects.bind(this);
  }
  openProjects(formValue, type) {
    // console.log('Open Project called up ', formValue);
    this.props.openProjects(formValue, type);
  }
  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderStatic
            title={'Gift Trees'}
            navigation={this.props.navigation}
          />
          <View style={{ marginTop: Platform.OS === 'ios' ? 24 : 56 }} />
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
