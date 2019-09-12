import React, { PureComponent } from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import NavigationEvents from './importNavigationEvents';

import { trillionCampaign } from '../../actions/trillionAction';

import SvgContainer from '../Common/SvgContainer';
import svgStyles from '../../styles/common/treecounter_svg';
import styles from '../../styles/trillion.native';
import { pledgeEventSelector } from '../../selectors';
import LoadingIndicator from '../Common/LoadingIndicator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n';
import { getAllPlantProjectsSelector } from '../../selectors';
import { bindActionCreators } from 'redux';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import Leaderboard from '../../containers/Leaderboard';
import { TabView, TabBar } from 'react-native-tab-view';
import { getLocalRoute } from '../../actions/apiRouting';
import { fetchpledgeEventsAction } from '../../actions/pledgeEventsAction';
import { loadUserProfile } from './../../actions/loadUserProfileAction';
import { currentUserProfileSelector } from './../../selectors';
import { trees } from './../../assets';
const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};
import tabStyles from '../../styles/common/tabbar';
import { saveItem, fetchItem } from '../../stores/localStorage.native';
import Constants from '../../utils/const';
import { getImageUrl } from '../../actions/apiRouting';
import FeaturedProject from './FeaturedProjectScroll/FeaturedProject';

class Trillion extends PureComponent {
  constructor() {
    super();
    this.state = {
      svgData: null,
      displayName: '',
      pledgedEvents2: [],
      allPledgeEvents: [],
      loading: true,
      loadSvg: true,
      routes: [
        { key: 'world', title: i18n.t('label.world') },
        { key: 'leaderBoard', title: i18n.t('label.leaderboard') }
      ],
      index: 0
    };
  }
  componentDidMount() {
    trillionCampaign()
      .then(({ data }) => {
        const svgData = {
          id: 1,
          target: data.countTarget,
          planted: data.countPlanted,
          community: data.countReceived,
          personal: data.countPersonal,
          displayName: data.displayName
        };
        this.setState({
          svgData,
          displayName: svgData.displayName,
          loading: false
        });
        saveItem(Constants.storageKeys.svgData, JSON.stringify(svgData));
      })
      .catch(error => {
        //console.log(error);
        fetchItem(Constants.storageKeys.svgData).then(svgData => {
          try {
            svgData = JSON.parse(svgData);
            if (svgData) {
              this.setState({
                svgData,
                displayName: svgData.displayName,
                loading: false
              });
            }
          } catch (err) {
            //console.log(error);
          }
        });
      });

    // this.setFeaturedEvents();

    this.props.fetchpledgeEventsAction();
    pledgedEvents2 = this.props.pledgeEvents;
  }

  onMoreClick(id, name) {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    //console.log('OnMore');
    updateRoute('app_selectProject', navigation, null, { titleParam: name });
  }

  onSelectClickedFeaturedProjects = id => {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    updateStaticRoute('app_donate_detail', navigation);
  };

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={tabStyles.indicator}
        style={tabStyles.tabBar}
        tabStyle={{ width: Layout.window.width / 2 }}
        labelStyle={tabStyles.textStyle}
        indicatorStyle={tabStyles.textActive}
      />
    );
  };

  _renderScreen = ({ route }) => {
    const { navigation, userProfile, isLoggedIn } = this.props;

    // console.log(this.props.pledgeEvents);

    switch (route.key) {
      case 'world': {
        return this.state.loading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 72,
              backgroundColor: 'white'
            }}
          >
            <View style={styles.parentContainer}>
              {/* Trillion Tree Events Title */}
              <View style={{ marginTop: 25, marginLeft: 16 }}>
                <Text style={styles.trillionTreeEventTitle}>
                  {this.props.pledgeEvents &&
                  this.props.pledgeEvents.pledgeEvents &&
                  this.props.pledgeEvents.pledgeEvents.length > 0
                    ? i18n.t('label.trillionTreesEvents')
                    : null}
                </Text>
              </View>
              {/* Trillion Tree Events Title Ended */}

              {/* Featured events horizontal ScrollView */}
              <View style={{ marginTop: 16 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 20 }}
                >
                  {this.props.pledgeEvents &&
                  this.props.pledgeEvents.pledgeEvents
                    ? this.props.pledgeEvents.pledgeEvents.map(
                        featuredEvents => (
                          <TouchableOpacity
                            key={featuredEvents.slug}
                            onPress={() => {
                              updateStaticRoute(
                                'app_pledge_events',
                                navigation,
                                {
                                  slug: featuredEvents.slug,
                                  eventName: featuredEvents.name,
                                  eventDate: featuredEvents.eventDate,
                                  totalTrees: featuredEvents.total,
                                  eventImage: featuredEvents.image,
                                  description: featuredEvents.description,
                                  plantProject: { id: -1 },
                                  treeCount: -1
                                }
                              );
                            }}
                          >
                            <FeaturedProject
                              imageUri={getImageUrl(
                                'event',
                                'thumb',
                                featuredEvents.image
                              )}
                              orgname={featuredEvents.name}
                              treespledged={featuredEvents.total}
                              date={featuredEvents.eventDate}
                            />
                          </TouchableOpacity>
                        )
                      )
                    : null}
                </ScrollView>
              </View>
              {/* Featured events horizontal ScrollView Ended */}

              {/* Tree Counter SVG */}
              <View style={svgStyles.svgContainer}>
                <SvgContainer {...this.state.svgData} trillion={true} />
              </View>
              {/* Tree Counter SVG Ended */}

              <CardLayout style={styles.cardContainer}>
                <Text style={styles.titleText}>
                  {i18n.t('label.trillionTreeMessage1')}
                </Text>
                <Text style={styles.titleText}>
                  {i18n.t('label.trillionTreeMessage2')}
                </Text>
              </CardLayout>
              {/* {userProfile && userProfile.type === 'tpo' ? (
                <CardLayout
                  style={[
                    styles.cardContainer,
                    {
                      padding: 16
                    }
                  ]}
                >
                  <Text style={styles.googleCardTitle}>
                    Tree Planting Projects
                  </Text>
                  <View style={styles.tpoCardText}>
                    <Text style={styles.googleCardPara}>
                      Are you involved in reforestation and would you like to
                      receive donations to plant trees?
                    </Text>
                    <Image
                      source={trees}
                      style={{ width: 72, height: 56, flex: 1 }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.tpoCardButton} />
                  <TouchableOpacity style={{ width: '100%' }}>
                    <Text style={styles.googleCardButton}>
                      Add Your Project
                    </Text>
                  </TouchableOpacity>
                </CardLayout>
              ) : null} */}

              <CardLayout
                style={[
                  styles.cardContainer,
                  {
                    padding: 16
                  }
                ]}
              >
                <Text style={[styles.googleCardTitle, { textAlign: 'left' }]}>
                  {i18n.t('label.searchProjectTitle')}
                </Text>
                <View style={styles.googleCardParaContainer}>
                  <Text style={styles.googleCardPara}>
                    {i18n.t('label.searchProjectPara')}
                  </Text>
                  <Image
                    source={trees}
                    style={{ width: 72, height: 56, flex: 1 }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.horizontalLine} />
                <TouchableOpacity
                  style={{ width: '100%' }}
                  onPress={() =>
                    navigation.navigate(getLocalRoute('app_donateTrees'))
                  }
                >
                  <Text style={styles.googleCardButton}>
                    {i18n.t('label.searchProjectButton')}
                  </Text>
                </TouchableOpacity>
              </CardLayout>

              <CardLayout
                style={[
                  styles.cardContainer,
                  {
                    padding: 16
                  }
                ]}
              >
                <Text style={[styles.googleCardTitle, { textAlign: 'left' }]}>
                  {i18n.t('Update your app')}
                </Text>

                <TouchableOpacity
                  style={{ width: '100%' }}
                  onPress={() =>
                    updateStaticRoute('app_splash_screen', navigation)
                  }
                >
                  <Text style={styles.googleCardButton}>
                    {i18n.t('Update App')}
                  </Text>
                </TouchableOpacity>
              </CardLayout>
            </View>
          </ScrollView>
        );
      }
      case 'leaderBoard': {
        return <Leaderboard navigation={this.props.navigation} />;
      }
      default:
        return null;
    }
  };

  render() {
    return [
      this.props.navigation ? (
        <NavigationEvents
          key="nav"
          onWillFocus={payload => {
            this.setState({ loadSvg: true });
          }}
          onWillBlur={payload => {
            this.setState({ loadSvg: false });
          }}
          key="navigation-events"
        />
      ) : null,
      this.state.loadSvg ? (
        <TabView
          key="tabs"
          useNativeDriver
          navigationState={this.state}
          renderScene={this._renderScreen}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      ) : null
    ];
  }
}

const mapStateToProps = state => ({
  pledgeEvents: pledgeEventSelector(state),
  userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchpledgeEventsAction, loadUserProfile },
    dispatch
  );
};

Trillion.propTypes = {
  pledgeEvents: PropTypes.object.isRequired,
  navigation: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(Trillion);
