/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import NavigationEvents from './importNavigationEvents';
import { trillionCampaign } from '../../actions/trillionAction';
import SvgContainer from '../Common/SvgContainer';
import svgStyles from '../../styles/common/treecounter_svg';
import styles from '../../styles/trillion.native';
import { pledgeEventSelector, entitiesSelector } from '../../selectors';
import LoadingIndicator from '../Common/LoadingIndicator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import { bindActionCreators } from 'redux';
import { updateStaticRoute } from '../../helpers/routerHelper';
// import Leaderboard from '../../containers/Leaderboard';
import Leaderboard from '../LeaderboardRefresh/LeaderBoard/leaderboard';
import { TabView, TabBar } from 'react-native-tab-view';
import { getLocalRoute } from '../../actions/apiRouting';
import {
  fetchpledgeEventsAction,
  fetchPublicPledgesAction
} from '../../actions/pledgeEventsAction';
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
import FeaturedProject from './FeaturedProjectScroll/Events.native';
import UnfulfilledEvents from './FeaturedProjectScroll/UnfulfilledEvents.native';
import HeaderStatic from './../Header/HeaderStatic';
class Trillion extends PureComponent {
  constructor() {
    super();

    this.state = {
      svgData: null,
      displayName: '',
      loading: true,
      contentLoader: false,
      loadSvg: true,
      routes: [
        { key: 'world', title: i18n.t('label.world') },
        { key: 'leaderBoard', title: i18n.t('label.leaderboard') }
      ],
      index: 0
    };
  }

  componentDidMount() {
    this.setState({ contentLoader: true });
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
          loading: false,
          contentLoader: false
        });
        saveItem(Constants.storageKeys.svgData, JSON.stringify(svgData));
      })
      .catch(error => {
        console.log(error);
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

    this.props.fetchpledgeEventsAction();

    if (this.props.userProfile) {
      console.log('User Logged in');
    } else {
      fetchItem('pledgedEvent')
        .then(data => {
          if (typeof data !== 'undefined' && data.length > 0) {
            let stringPledges = JSON.parse(data);
            stringPledges = stringPledges.toString();
            this.props.fetchPublicPledgesAction(stringPledges);
          }
        })
        .catch(error => console.log(error));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.entities.eventPledge) !==
      JSON.stringify(this.props.entities.eventPledge)
    ) {
      if (this.props.userProfile) {
        console.log('User Logged in');
      } else {
        fetchItem('pledgedEvent')
          .then(data => {
            if (typeof data !== 'undefined' && data.length > 0) {
              let stringPledges = JSON.parse(data);
              stringPledges = stringPledges.toString();
              this.props.fetchPublicPledgesAction(stringPledges);
            }
          })
          .catch(error => console.log(error));
      }
    }
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        style={[tabStyles.tabBar]}
        tabStyle={{ width: 'auto' }}
        indicatorStyle={tabStyles.textActive}
        renderLabel={({ route, focused, color }) => (
          <Text
            style={{
              color: focused ? '#89b53a' : '#aba2a2',
              fontSize: 11,
              fontFamily: 'OpenSans-SemiBold',
              textTransform: 'capitalize'
            }}
          >
            {route.title}
          </Text>
        )}
      />
    );
  };

  _renderScreen = ({ route }) => {
    const { navigation /* , userProfile, isLoggedIn */ } = this.props;
    const backgroundColor = 'white';
    const { contentLoader } = this.state;
    // console.log(this.props.pledgeEvents);
    switch (route.key) {
      case 'world': {
        return this.state.loading ? (
          <LoadingIndicator contentLoader={contentLoader} screen="AppHome" />
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 72,
              backgroundColor: backgroundColor
            }}
          >
            <View style={styles.parentContainer}>
              {/* Trillion Tree Events Title */}
              {/* {this.props.pledgeEvents &&
              this.props.pledgeEvents.pledgeEvents &&
              this.props.pledgeEvents.pledgeEvents.length > 0 ? (
                <View style={{ marginTop: 25, marginLeft: 16 }}>
                  <Text style={styles.trillionTreeEventTitle}>
                    {i18n.t('label.trillionTreesEvents')}
                  </Text>
                </View>
              ) : null} */}
              {/* Trillion Tree Events Title Ended */}

              {/* Featured events horizontal ScrollView */}
              {this.props.pledgeEvents &&
              this.props.pledgeEvents.pledgeEvents ? (
                <View style={{ marginTop: 24 }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                  >
                    {this.props.pledgeEvents.pledgeEvents.map(
                      featuredEvents => (
                        <TouchableOpacity
                          key={featuredEvents.slug}
                          onPress={() => {
                            updateStaticRoute('app_pledge_events', navigation, {
                              slug: featuredEvents.slug,
                              plantProject: { id: -1 },
                              treeCount: -1
                            });
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
                    )}
                  </ScrollView>
                </View>
              ) : null}
              {/* Featured events horizontal ScrollView Ended */}

              {/*  Unfulfilled Pledge Events horizontal ScrollView */}
              {this.props.entities.eventPledge ? (
                <View>
                  <View style={{ marginTop: 25, marginLeft: 16 }}>
                    <Text style={styles.trillionTreeEventTitle}>
                      {i18n.t('label.unfulfilledPledgesTitle')}
                    </Text>
                  </View>
                  <View style={{ marginTop: 16 }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingRight: 20 }}
                    >
                      {Object.values(this.props.entities.eventPledge).map(
                        unfulfilledEvent =>
                          unfulfilledEvent.status === 'pending' ? (
                            <TouchableOpacity
                              key={unfulfilledEvent.token}
                              onPress={() => {
                                updateStaticRoute(
                                  'app_pledge_events',
                                  navigation,
                                  {
                                    slug: unfulfilledEvent.slug,
                                    plantProject: { id: -1 },
                                    treeCount: -1
                                  }
                                );
                              }}
                            >
                              <UnfulfilledEvents event={unfulfilledEvent} />
                            </TouchableOpacity>
                          ) : null
                      )}
                    </ScrollView>
                  </View>
                </View>
              ) : null}
              {/* Unfulfilled Pledge Events horizontal ScrollView Ended */}
              {/* <View style={{ marginTop: 16 }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                  >
                    {this.props.entities.eventPledge !== null &&
                      this.props.entities.eventPledge !== undefined
                      ? Object.values(this.props.entities.eventPledge).map(
                        unfulfilledEvent =>
                          unfulfilledEvent.status === 'pending' ? (
                            <TouchableOpacity
                              key={unfulfilledEvent.token}
                              onPress={() => {
                                updateStaticRoute(
                                  'app_pledge_events',
                                  navigation,
                                  {
                                    slug: unfulfilledEvent.eventSlug,
                                    plantProject: { id: -1 },
                                    treeCount: -1
                                  }
                                );
                              }}
                            >
                              <UnfulfilledEvents event={unfulfilledEvent} />
                            </TouchableOpacity>
                          ) : null
                      )
                      : null}
                  </ScrollView>
                </View> */}
            </View>

            {/* Tree Counter SVG */}
            <View style={svgStyles.svgContainer}>
              <SvgContainer {...this.state.svgData} trillion />
            </View>
            {/* Tree Counter SVG Ended */}

            <View style={styles.cardContainer}>
              <Text style={[styles.titleText, { marginBottom: 16 }]}>
                {i18n.t('label.trillionTreeMessage1')}
              </Text>
              <Text style={styles.titleText}>
                {i18n.t('label.trillionTreeMessage2')}
              </Text>
            </View>

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

            <View
              style={[
                styles.cardContainer,
                {
                  padding: 16,
                  marginLeft: 8,
                  marginRight: 8
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
          onWillFocus={
            (/* payload */) => {
              this.setState({ loadSvg: true });
            }
          }
          onWillBlur={
            (/* payload */) => {
              this.setState({ loadSvg: false });
            }
          }
          key="navigation-events"
        />
      ) : null,
      this.state.loadSvg ? (
        <>
          <HeaderStatic title={'Explore'} />
          <SafeAreaView />
          <View style={{ marginTop: 80 }} />
          <TabView
            key="tabs"
            useNativeDriver
            navigationState={this.state}
            renderScene={this._renderScreen}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />
        </>
      ) : null
    ];
  }
}

const mapStateToProps = state => ({
  pledgeEvents: pledgeEventSelector(state),
  userProfile: currentUserProfileSelector(state),
  entities: entitiesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchpledgeEventsAction, loadUserProfile, fetchPublicPledgesAction },
    dispatch
  );
};

Trillion.propTypes = {
  pledgeEvents: PropTypes.any,
  navigation: PropTypes.any,
  fetchpledgeEventsAction: PropTypes.func,
  fetchPublicPledgesAction: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Trillion);
