import React, { Component } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { View, Text, Image } from 'react-native';
import ChallengeUser from './Tabs/ChallengeUser';
import ChallengeEmail from './Tabs/ChallengeEmail';
import { challengeFormSchemaOptions } from '../../server/parsedSchemas/challenge';
import tabStyles from '../../styles/common/tabbar';
import HeaderNew from './../Header/HeaderNew';
import { SafeAreaView } from 'react-navigation';
import i18n from '../../locales/i18n';
import colors from '../../utils/constants';

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
  componentDidMount() { }

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
    const focusedColor = '#89b53a';
    const normalColor = '#4d5153';
    return (
      <TabBar
        useNativeDriver
        bounces
        {...props}
        style={[tabStyles.tabBar]}
        tabStyle={{ width: 'auto', padding: 0 }}
        indicatorStyle={{ backgroundColor: colors.WHITE }}
        renderLabel={({ route, focused }) => (
          <View style={{ textAlign: 'left', marginRight: 24 }}>
            <Text
              style={{
                color: focused ? focusedColor : normalColor,
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
                    backgroundColor: focusedColor,
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    color: focusedColor
                  }
                ]}
              />
            ) : null}
          </View>
        )}
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
    const textColor = '#4d5153';
    const style = {
      backgroundColor: "white",
      flex: 1,
      padding: 20,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
        <HeaderNew
          navigation={this.props.navigation}
          title={i18n.t('label.challenge_heading')}
        />
        <View style={style}>
          <View style={{ paddingBottom: 20 }}>
            <Image
              source={require("../../assets/images/gifts.png")}
              style={{ width: 220, height: 220 }}
            />
          </View>

          <Text
            style={{
              fontSize: 16,
              color: "#4d5153",
              fontFamily: "OpenSans-Regular",
              textAlign: "center"
            }}
          >
            {i18n.t("label.changed_challenge_workflow")}
          </Text>
        </View>
        {/*
         <TabView
          useNativeDriver
          navigationState={this.state}
          // eslint-disable-next-line no-underscore-dangle
          renderScene={this._renderSelectionScene}
          // eslint-disable-next-line no-underscore-dangle
          renderTabBar={this._renderTabBar}
          // eslint-disable-next-line no-underscore-dangle
          onIndexChange={this._handleIndexChange}
        />
        */}
      </SafeAreaView>
    );
  }
}
