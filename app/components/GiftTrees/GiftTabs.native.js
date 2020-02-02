/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import styles from '../../styles/common/tabbar';
import { Dimensions, Text, View } from 'react-native';
import GiftToUser from './Tabs/GiftUser';
import GiftEmail from './Tabs/GiftEmail';

import i18n from '../../locales/i18n';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

export default class GiftTabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: 'email', title: i18n.t('label.email') },
        { key: 'user', title: i18n.t('label.user') }
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
        style={[styles.tabBar]}
        tabStyle={{ width: 'auto', padding: 0 }}
        indicatorStyle={{ backgroundColor: '#fff' }}
        renderLabel={({ route, focused, color }) => (
          <View style={{ textAlign: 'left', marginRight: 24 }}>
            <Text
              style={{
                color: focused ? '#89b53a' : '#4d5153',
                fontSize: 13,
                fontFamily: 'OpenSans-SemiBold',
                textTransform: 'capitalize',
                textAlign: 'left'
              }}
            >
              {route.title}
            </Text>
            {focused ? (
              <View
                style={[
                  {
                    width: '100%',
                    marginTop: 11,
                    backgroundColor: '#89b53a',
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    color: '#89b53a'
                  }
                ]}
              />
            ) : null}
          </View>
        )}
      />
    );
  };

  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case 'user':
        return <GiftToUser {...this.props} />;
      case 'email':
        return <GiftEmail {...this.props} />;

      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        useNativeDriver
        navigationState={this.state}
        renderScene={this._renderSelectPlantScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}
