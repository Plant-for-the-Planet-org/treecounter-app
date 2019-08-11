import React, { Component } from 'react';
import { TabView, TabBar, SceneMap, View } from 'react-native-tab-view';
import styles from '../../styles/common/tabbar';
import { Dimensions } from 'react-native';
import ChallengeUser from './Tabs/ChallengeUser';
import ChallengeEmail from './Tabs/ChallengeEmail';
import { challengeFormSchemaOptions } from '../../server/parsedSchemas/challenge';

import i18n from '../../locales/i18n';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

export default class ChallengeTabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: 'user', title: i18n.t('label.search_user') },
        { key: 'email', title: i18n.t('label.email') }
      ],
      index: 0
    };
  }
  componentDidMount() {}

  indexChange(index) {
    this.setState({
      index: index
    });
  }

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        tabStyle={{ width: Layout.window.width / 2 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    );
  };

  _renderSelectionScene = ({ route }) => {
    switch (route.key) {
      case 'user':
        return (
          <ChallengeUser
            challengeUser={this.props.challengeUser}
            challenges={this.props.challenges}
            error={this.props.error}
            challengeSuccess={this.props.challengeSuccess}
            resetChallengeSuccess={this.props.resetChallengeSuccess}
            challengeStatus={this.props.challengeStatus}
            currentUserProfile={this.props.currentUserProfile}
          />
        );
      case 'email':
        return (
          <ChallengeEmail
            challengeUser={this.props.challengeUser}
            challenges={this.props.challenges}
            error={this.props.error}
            challengeSuccess={this.props.challengeSuccess}
            resetChallengeSuccess={this.props.resetChallengeSuccess}
            challengeFormSchemaOptions={challengeFormSchemaOptions}
            challengeStatus={this.props.challengeStatus}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        useNativeDriver
        navigationState={this.state}
        renderScene={this._renderSelectionScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}
