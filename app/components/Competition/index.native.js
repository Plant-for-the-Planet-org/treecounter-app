/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { SafeAreaView } from 'react-navigation';
import { updateStaticRoute } from '../../helpers/routerHelper';
import i18n from '../../locales/i18n';
import buttonStyles from '../../styles/common/button.native';
import styles from '../../styles/common/tabbar.native';
import colors from '../../utils/constants';
import HeaderStatic from './../Header/HeaderStatic';
import CommonCompetitionTab from './Tabs/commonTab.native'; // Shows my competitions

const height = Dimensions.get('window').height;

class Competiton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Routes are used for showing the tabs
      routes: [
        { key: 'featured', title: i18n.t('label.featured_competitions') },
        { key: 'all', title: i18n.t('label.all_competitions') },
        { key: 'mine', title: i18n.t('label.mine_competitions') },
        { key: 'archived', title: i18n.t('label.archived_competitions') }
      ],
      index: 0, // It refers to the selected tab, 0 goes for featured
      scrollY: new Animated.Value(0)
    };
  }

  // Function to change the index and update the state
  _handleIndexChange = index => {
    this.setState({ index });
  };

  // Tabbar represents the top header with the different tab items
  _renderTabBar = props => {
    const focusedColor = '#89b53a';
    const normalColor = '#4d5153';
    const colorWhite = colors.WHITE;
    const colorGreen = '#89b53a';
    return (
      <TabBar
        scrollEnabled
        {...props}
        style={[styles.tabBar]}
        tabStyle={{ width: 'auto', padding: 0 }}
        indicatorStyle={{ backgroundColor: colorWhite }}
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
                    backgroundColor: colorGreen,
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    color: colorGreen
                  }
                ]}
              />
            ) : null}
          </View>
        )}
      />
    );
  };

  // This loads the different components based on the selected index
  _renderSelectPlantScene = ({ route }) => {
    let competitionsArr = this.props[`${route.key}Competitions`];
    let tabType = route.key;
    let tabHeader = i18n.t(`label.${route.key}_compeition_tab_header`);
    let nullTabHeader =
      route.key === 'mine'
        ? i18n.t('label.mine_compeition_tab_header_null')
        : '';
    let fetchCompetitions =
      route.key === 'mine'
        ? this.props.fetchMineCompetitions
        : this.props.fetchCompetitions;
    // switch (route.key) {
    //   case 'mine':
    //     // competitionsArr = this.props.mineCompetitions;
    //     tabHeader = i18n.t('label.mine_compeition_tab_header');
    //     // nullTabHeader = i18n.t('label.mine_compeition_tab_header_null');
    //     break;
    //   case 'featured':
    //     // competitionsArr = this.props.featuredCompetitions;
    //     tabHeader = i18n.t('label.featured_compeition_tab_header');
    //     break;
    //   case 'all':
    //     // competitionsArr = this.props.allCompetitions;
    //     tabHeader = i18n.t('label.all_compeition_tab_header');
    //     break;
    //   case 'archived':
    //     // competitionsArr = this.props.archivedCompetitions;
    //     tabHeader = i18n.t('label.archived_compeition_tab_header');
    //     break;
    //   default:
    //     return null;
    // }
    return (
      <CommonCompetitionTab
        competitionsArr={competitionsArr}
        onMoreClick={this.props.onMoreClick}
        leaveCompetition={this.props.leaveCompetition}
        enrollCompetition={this.props.enrollCompetition}
        editCompetition={this.props.editCompetition}
        fetchCompetitions={fetchCompetitions}
        tabType={tabType}
        tabHeader={tabHeader}
        nullTabHeader={nullTabHeader}
        scrollY={this.state.scrollY}
      />
    );
  };

  render() {
    // const headerTop = this.state.scrollY.interpolate({
    //   inputRange: [0, 120],
    //   outputRange: [56, 0],
    //   extrapolate: 'clamp'
    // });
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderStatic
            title={i18n.t('label.competitions')}
            scrollY={this.state.scrollY}
            pageName={'competitions'}
            showSearch
            navigation={this.props.navigation}
          />
          <Animated.View
            style={{
              marginTop: Platform.OS === 'ios' ? (height < 737 ? 56 : 26) : 56
            }}
          />
          <TabView
            useNativeDriver
            navigationState={this.state}
            renderScene={this._renderSelectPlantScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />

          {/* Button to add new competitions(On each page) */}
          <TouchableOpacity
            style={buttonStyles.plusButton}
            onPress={() => {
              updateStaticRoute(
                'app_create_competition',
                this.props.navigation,
                {
                  onCreateCompetition: this.props.onCreateCompetition
                }
              );
            }}
          >
            <Text style={buttonStyles.plusButtonIcon}>+</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
}
export default Competiton;
