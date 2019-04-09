import React, { PureComponent } from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Animated,
  Image
} from 'react-native';

import NavigationEvents from './importNavigationEvents';

import { trillionCampaign } from '../../actions/trillionAction';
import SvgContainer from '../Common/SvgContainer';
import svgStyles from '../../styles/common/treecounter_svg';
import styles from '../../styles/trillion.native';
import { pledgeEventSelector } from '../../selectors';
import LoadingIndicator from '../Common/LoadingIndicator';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n';
import { getAllPlantProjectsSelector } from '../../selectors';
import PlantProjectSnippet from '../../components/PlantProjects/PlantProjectSnippet.native';
import { bindActionCreators } from 'redux';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import Leaderboard from '../../containers/Leaderboard';
import { TabView, TabBar } from 'react-native-tab-view';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};
import tabStyles from '../../styles/common/tabbar';
import { saveItem, fetchItem } from '../../stores/localStorage.native';
import Constants from '../../utils/const';
import { getImageUrl } from '../../actions/apiRouting';

const height = Dimensions.get('window').height;
let viewheight = height - 50;
class Trillion extends PureComponent {
  constructor() {
    super();
    this.state = {
      svgData: null,
      displayName: '',
      loading: true,
      offsetY: new Animated.Value(0),
      loadSvg: true,
      routes: [
        { key: 'world', title: 'World' },
        { key: 'leaderBoard', title: 'LeaderBoard' }
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
  }

  onMoreClick(id) {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    //console.log('OnMore');
    updateRoute('app_selectProject', navigation);
  }
  onSelectClickedFeaturedProjects = id => {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    updateStaticRoute('app_donate_detail', navigation);
  };

  _handleIndexChange = index => {
    this.setState({ index, offsetY: new Animated.Value(0) });
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
    switch (route.key) {
      case 'world': {
        return this.state.loading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView
            bounces={false}
            scrollEventThrottle={16}
            contentContainerStyle={{
              justifyContent: 'flex-start',
              flexGrow: 3
            }}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.offsetY } } }
            ])}
          >
            <View style={styles.parentContainer}>
              <View style={svgStyles.svgContainer}>
                <SvgContainer {...this.state.svgData} trillion={true} />
              </View>
              {/*{this.props.pledgeEvents &&*/}
              {/*this.props.pledgeEvents.pledgeEvents.length > 0 ? (*/}
              {/*<View style={styles.pledgeContainer}>*/}
              {/*<Text style={styles.pledgeText}>*/}
              {/*Trillion Tree Events today*/}
              {/*</Text>*/}
              {/*<View style={styles.pledgeEventContainer}>*/}
              {/*{this.props.pledgeEvents.pledgeEvents*/}
              {/*.sort((val1, val2) => val1.position > val2.position)*/}
              {/*.map(element => (*/}
              {/*<CardLayout*/}
              {/*key={element.slug}*/}
              {/*className="event_item"*/}
              {/*onClick={() => {*/}
              {/*updateRoute('app_pledge', null, null, {*/}
              {/*eventSlug: element.slug*/}
              {/*});*/}
              {/*}}*/}
              {/*>*/}
              {/*<View className="imgContainer">*/}
              {/*<Image*/}
              {/*src={getImageUrl('event', 'thumb', element.image)}*/}
              {/*/>*/}
              {/*</View>*/}

              {/*<Text style={styles.titleText}>{element.name}</Text>*/}
              {/*</CardLayout>*/}
              {/*))}*/}
              {/*</View>*/}
              {/*</View>*/}
              {/*) : null}*/}
              <CardLayout style={styles.cardContainer}>
                <Text style={styles.titleText}>
                  {' '}
                  {i18n.t('label.trillionTreeMessage1')}
                </Text>
                <Text style={styles.titleText}>
                  {' '}
                  {i18n.t('label.trillionTreeMessage2')}
                </Text>
              </CardLayout>

              <View style={{ flex: 1 }}>
                {this.props.plantProjects
                  .filter(filterProj => filterProj.allowDonations)
                  .map(project => (
                    <PlantProjectSnippet
                      key={'trillion' + project.id}
                      onMoreClick={id => this.onMoreClick(id)}
                      plantProject={project}
                      onSelectClickedFeaturedProjects={id =>
                        this.onSelectClickedFeaturedProjects(id)
                      }
                      showMoreButton={false}
                      tpoName={project.tpo_name}
                    />
                  ))}
              </View>
            </View>
          </ScrollView>
        );
      }
      case 'leaderBoard': {
        return (
          <Leaderboard
            navigation={this.props.navigation}
            handleScrollAnimation={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.offsetY } } }
            ])}
          />
        );
      }
      default:
        return null;
    }
  };

  render() {
    const headerTranslate = Animated.diffClamp(
      this.state.offsetY,
      0,
      120
    ).interpolate({
      inputRange: [0, 120],
      outputRange: [0, -50]
    });
    console.log(this.state.loadSvg);

    return [
      this.props.navigation ? (
        <NavigationEvents
          onWillFocus={payload => {
            this.setState({ loadSvg: true });
          }}
          onWillBlur={payload => {
            this.setState({ loadSvg: false });
          }}
          key="navigation-events"
        />
      ) : null,
      <Animated.View
        style={[
          { height: viewheight },
          {
            transform: [{ translateY: headerTranslate }],
            flexGrow: 1
          }
        ]}
        key="world-tab"
      >
        {this.state.loadSvg ? (
          <TabView
            useNativeDriver
            navigationState={this.state}
            renderScene={this._renderScreen}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />
        ) : null}
      </Animated.View>
    ];
  }
}

const mapStateToProps = state => ({
  pledgeEvents: pledgeEventSelector(state),
  plantProjects: getAllPlantProjectsSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPlantProjectAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Trillion);

Trillion.propTypes = {
  pledgeEvents: PropTypes.object,
  navigation: PropTypes.any
};
