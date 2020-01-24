import * as React from "react";
import {
    View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, Text
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateRoute } from './../../helpers/routerHelper/tabrouteHelper.native';

const width = Dimensions.get('window').width;

interface Tab {
    name: string;
}

interface StaticTabbarProps {
    tabs: Tab[];
    value: Animated.Value;
}

export default class StaticTabbar extends React.PureComponent<StaticTabbarProps> {
    values: Animated.Value[] = [];

    constructor(props: StaticTabbarProps) {
        super(props);
        const { tabs } = this.props;
        this.values = tabs.map((tab, index) => new Animated.Value(index === 4 ? 1 : 0));
    }

    onPress = (index: number) => {
        const { value, tabs, navigation } = this.props;
        const tabWidth = width / tabs.length;
        Animated.sequence([
            Animated.parallel(
                this.values.map(v => Animated.timing(v, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                })),
            ),
            Animated.parallel([
                Animated.spring(value, {
                    toValue: tabWidth * index,
                    useNativeDriver: true,
                }),
                Animated.spring(this.values[index], {
                    toValue: 1,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
        updateRoute(tabs[index].route, navigation, 0);
    }

    render() {
        const { onPress } = this;
        const { tabs, value } = this.props;
        return (
            <View style={styles.container}>
                {
                    tabs.map((tab, key) => {
                        const tabWidth = width / tabs.length;
                        const cursor = tabWidth * key;
                        const opacity = value.interpolate({
                            inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
                            outputRange: [1, 0, 1],
                            extrapolate: "clamp",
                        });
                        const translateY = this.values[key].interpolate({
                            inputRange: [0, 1],
                            outputRange: [64, 0],
                            extrapolate: "clamp",
                        });
                        const opacity1 = this.values[key].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            extrapolate: "clamp",
                        });
                        return (
                            <React.Fragment {...{ key }}>
                                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                                    <Animated.View style={[styles.tab, { opacity }]}>
                                        <Icon name={tab.name} color="#4d5153" size={25} />
                                        <Text style={styles.tabText}>{tab.title}</Text>
                                    </Animated.View>
                                </TouchableWithoutFeedback>
                                <Animated.View
                                    style={{
                                        position: "absolute",
                                        top: -20,
                                        left: tabWidth * key,
                                        width: tabWidth,
                                        height: 64,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        opacity: opacity1,
                                        transform: [{ translateY }],
                                        padding: 12,
                                    }}
                                >
                                    <View style={styles.activeIconContainer}>
                                        <View style={styles.activeIcon}>
                                            <Icon name={tab.name} color="white" size={25} />
                                        </View>
                                    </View>

                                </Animated.View>
                            </React.Fragment>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 64,
    },
    tabText: {
        fontSize: 10,
        fontFamily: 'OpenSans-Regular',
        marginTop: 2
    },
    activeIcon: {
        // backgroundColor: "white",
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#89b53a'

    },
    activeIconContainer: {
        // backgroundColor: "white",
        width: 76,
        height: 76,
        borderRadius: 38,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#89b53a'

    },
});
