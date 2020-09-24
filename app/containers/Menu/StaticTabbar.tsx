import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { updateRoute } from "../../helpers/routerHelper/tabrouteHelper.native";
import {
  donateIcon,
  donateIconGreen,
  competeIconGreen,
  competeIcon
} from "../../assets";

const width = Dimensions.get("window").width;

interface Tab {
  name: string;
}

interface StaticTabbarProps {
  tabs: Tab[];
}

export default class StaticTabbar extends React.PureComponent<
  StaticTabbarProps
> {
  constructor(props: StaticTabbarProps) {
    super(props);
    const { tabs } = this.props;
    this.state = {
      selectedTab: 3
    };
  }

  componentDidMount() {
    let selectedTab = this.props.navigation.state.index;
    this.setState({ selectedTab: selectedTab });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.navigation !== this.props.navigation) {
      let selectedTab = this.props.navigation.state.index;
      this.setState({ selectedTab: selectedTab });
    }
  }
  onPress = (index: number) => {
    const { tabs, navigation } = this.props;
    const tabWidth = width / tabs.length;
    this.setState({
      selectedTab: index
    });
    updateRoute(tabs[index].route, this.props.navigation, 0);
  };

  render() {
    const { onPress } = this;
    const { tabs } = this.props;

    return (
      <View>
        <View style={styles.container}>
          {tabs.map((tab, key) => {
            const tabWidth = width / tabs.length;
            const cursor = tabWidth * key;
            const iconColor =
              key === this.state.selectedTab ? "#89b53a" : "#4d5153";
            return (
              <React.Fragment {...{ key }}>
                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                  {key === 2 ? (
                    <View style={[styles.donatetab]}>
                      <View
                        style={{
                          height: 72,
                          width: 72,
                          borderRadius: 36,
                          backgroundColor: "white",
                          alignItems: "center",
                          justifyContent: "center",
                          bottom: 10
                        }}
                      >
                        <Image
                          source={
                            key === this.state.selectedTab
                              ? donateIconGreen
                              : donateIcon
                          }
                          style={{ height: 36, width: 36 }}
                        />
                      </View>
                      <Text
                        style={
                          key === this.state.selectedTab
                            ? styles.donateTabTextGreen
                            : styles.donateTabText
                        }
                      >
                        {tab.title}
                      </Text>
                    </View>
                  ) : key === 3 ? (
                    <View style={[styles.donatetab]}>
                      <Image
                        source={
                          key === this.state.selectedTab
                            ? competeIconGreen
                            : competeIcon
                        }
                        style={{ height: 24, width: 24 }}
                      />
                      <Text
                        style={
                          key === this.state.selectedTab
                            ? styles.tabTextGreen
                            : styles.tabText
                        }
                      >
                        {tab.title}
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.tab]}>
                      <Icon name={tab.name} color={iconColor} size={21} />
                      <Text
                        style={
                          key === this.state.selectedTab
                            ? styles.tabTextGreen
                            : styles.tabText
                        }
                      >
                        {tab.title}
                      </Text>
                    </View>
                  )}
                </TouchableWithoutFeedback>
              </React.Fragment>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64
  },
  donatetab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
    zIndex: 12
  },
  tabText: {
    fontSize: 10,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 2,
    color: "#000000"
  },
  donateTabText: {
    fontSize: 10,
    fontFamily: "OpenSans-SemiBold",
    top: -23,
    color: "#000000"
  },
  tabTextGreen: {
    fontSize: 10,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 2,
    color: "#88B72E"
  },
  donateTabTextGreen: {
    fontSize: 10,
    fontFamily: "OpenSans-SemiBold",
    top: -23,
    color: "#88B72E"
  },
  activeIcon: {
    // backgroundColor: "white",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#89b53a"
  },
  activeIconContainer: {
    // backgroundColor: "white",
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#89b53a"
  }
});
