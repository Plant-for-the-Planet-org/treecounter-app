import * as React from "react";
import {
    View, StyleSheet, TouchableWithoutFeedback, Dimensions, Text, Image
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateRoute } from './../../helpers/routerHelper/tabrouteHelper.native';
import { donateIcon, donateIconGreen, competeIconGreen, competeIcon } from './../../assets';
const width = Dimensions.get('window').width;

interface Tab {
    name: string;
}

interface StaticTabbarProps {
    tabs: Tab[];
}

export default class StaticTabbar extends React.PureComponent<StaticTabbarProps> {

    constructor(props: StaticTabbarProps) {
        super(props);
        const { tabs } = this.props;
        this.state = {
            selectedTab: 0
        }
    }

    onPress = (index: number) => {
        const { tabs, navigation } = this.props;
        const tabWidth = width / tabs.length;
        this.setState({
            selectedTab: index
        })
        updateRoute(tabs[index].route, navigation, 0);
    }

    render() {
        const { onPress } = this;
        const { tabs } = this.props;

        return (
            <View style={styles.container}>
                {
                    tabs.map((tab, key) => {
                        const tabWidth = width / tabs.length;
                        const cursor = tabWidth * key;
                        console.log('Tab value ---', tab);
                        console.log('Key value ---', key);

                        const iconColor = key === this.state.selectedTab ? '#89b53a' : "#4d5153";
                        return (
                            <React.Fragment {...{ key }}>
                                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                                    {key === 2 ?
                                        (<View style={[styles.donatetab]}>
                                            <View style={{ height: 72, width: 72, borderRadius: 36, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', bottom: 10 }}>
                                                <Image source={key === this.state.selectedTab ? donateIconGreen : donateIcon} style={{ height: 36, width: 36 }} />
                                            </View>
                                            <Text style={key === this.state.selectedTab ? styles.donateTabTextGreen : styles.donateTabText}>{tab.title}</Text>
                                        </View>) : key === 3 ? (
                                            <View style={[styles.donatetab]}>
                                                <Image source={key === this.state.selectedTab ? competeIconGreen : competeIcon} style={{ height: 25, width: 25 }} />
                                                <Text style={key === this.state.selectedTab ? styles.tabTextGreen : styles.tabText}>{tab.title}</Text>
                                            </View>
                                        ) :
                                            (<View style={[styles.tab]}>
                                                <Icon name={tab.name} color={iconColor} size={25} />
                                                <Text style={key === this.state.selectedTab ? styles.tabTextGreen : styles.tabText}>{tab.title}</Text>
                                            </View>)}

                                </TouchableWithoutFeedback>
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
    donatetab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 64,
    },
    tabText: {
        fontSize: 10,
        fontFamily: 'OpenSans-SemiBold',
        marginTop: 2
    },
    donateTabText: {
        fontSize: 10,
        fontFamily: 'OpenSans-SemiBold',
        top: -23
    },
    tabTextGreen: {
        fontSize: 10,
        fontFamily: 'OpenSans-SemiBold',
        marginTop: 2,
        color: '#88B72E'
    },
    donateTabTextGreen: {
        fontSize: 10,
        fontFamily: 'OpenSans-SemiBold',
        top: -23,
        color: '#88B72E'
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
