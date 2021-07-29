/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { TabBar } from "react-native-tab-view";
import styles from "../../styles/common/tabbar";
import { Text, View, Image } from "react-native";
import GiftToUser from "./Tabs/GiftUser";
import GiftEmail from "./Tabs/GiftEmail";
import i18n from "../../locales/i18n";
import colors from "../../utils/constants";
export default class GiftTabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: "email", title: i18n.t("label.email") },
        { key: "user", title: i18n.t("label.user") }
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
    const focusedColor = "#89b53a";
    const normalColor = "#4d5153";
    return (
      <TabBar
        {...props}
        style={[styles.tabBar]}
        tabStyle={{ width: "auto", padding: 0 }}
        indicatorStyle={{ backgroundColor: colors.WHITE }}
        renderLabel={({ route, focused }) => (
          <View style={{ textAlign: "left", marginRight: 24 }}>
            <Text
              style={{
                color: focused ? focusedColor : normalColor,
                fontSize: 13,
                fontFamily: "OpenSans-SemiBold",
                textTransform: "capitalize",
                textAlign: "left"
              }}
            >
              {route.title}
            </Text>
            {focused ? (
              <View
                style={[
                  {
                    width: "100%",
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

  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case "user":
        return <GiftToUser {...this.props} />;
      case "email":
        return <GiftEmail {...this.props} />;

      default:
        return null;
    }
  };

  render() {
    const style = {
      backgroundColor: "white",
      flex: 1,
      padding: 20,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    };
    return (
      /* disabled functionality at July 16th 
        <TabView
          useNativeDriver
          navigationState={this.state}
          renderScene={this._renderSelectPlantScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
       */
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
          {i18n.t("label.changed_gift_workflow")}
        </Text>
      </View>
    );
  }
}
