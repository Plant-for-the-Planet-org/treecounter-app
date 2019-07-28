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
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n';
import { getAllPlantProjectsSelector } from '../../selectors';
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
import FeaturedProject from './FeaturedProjectScroll/FeaturedProject';
// import { plantsforcard } from './plantsforcard.svg';

class Trillion extends PureComponent {
  constructor() {
    super();
    this.state = {
      svgData: null,
      displayName: '',
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
                <Text
                  style={{
                    fontFamily: 'OpenSans',
                    fontSize: 14,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 19,
                    letterSpacing: 0,
                    textAlign: 'left',
                    color: 'rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {i18n.t('label.trillionTreesEvents')}
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
                  <FeaturedProject
                    imageUri={require('../../assets/images/esri_logo.png')}
                    orgname="Esri User Conference"
                    treespledged="19,517"
                    date="March 3, 2019"
                  />
                  <FeaturedProject
                    imageUri={require('../../assets/images/weforest.png')}
                    orgname="WeForest Conclave"
                    treespledged="121,951,700"
                    date="December 15 - 25, 2019"
                  />
                </ScrollView>
              </View>
              {/* Featured events horizontal ScrollView Ended */}

              {/* Tree Counter SVG */}
              <View style={svgStyles.svgContainer}>
                <SvgContainer {...this.state.svgData} trillion={true} />
              </View>
              {/* Tree Counter SVG Ended */}

              <CardLayout
                style={[
                  styles.cardContainer,
                  {
                    borderRadius: 7,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#d5d5d5'
                  }
                ]}
              >
                <Text
                  style={[
                    styles.titleText,
                    { textAlign: 'justify', margin: 12 }
                  ]}
                >
                  {i18n.t('label.trillionTreeMessage1')}
                </Text>
                <Text
                  style={[
                    styles.titleText,
                    { textAlign: 'justify', margin: 12 }
                  ]}
                >
                  {i18n.t('label.trillionTreeMessage2')}
                </Text>
              </CardLayout>

              {/* <CardLayout style={{ padding: 16 }}>
                <Text style={styles2.googleCardTitle}>
                  Tree Planting Projects
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 14,
                    marginBottom: 14
                  }}
                >
                  <Text style={styles2.googleCardPara}>
                    Are you involved in reforestation and would you like to
                    receive donations to plant trees?
                  </Text>
                  <Image
                    style={{ width: 70, height: 50 }}
                    source={require('./plantsforcard.svg')}
                  />
                </View>
                <View
                  style={{
                    borderColor: '#d5d5d5',
                    width: '100%',
                    borderBottomWidth: 1
                  }}
                />
                <TouchableOpacity style={{ width: '100%' }}>
                  <Text style={styles2.googleCardButton}>Add Your Project</Text>
                </TouchableOpacity>
              </CardLayout> */}

              <CardLayout
                style={{
                  borderRadius: 7,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderColor: '#d5d5d5',
                  padding: 16
                }}
              >
                <Text style={styles2.googleCardTitle}>
                  {i18n.t('label.searchProjectTitle')}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 14,
                    marginBottom: 14
                  }}
                >
                  <Text style={styles2.googleCardPara}>
                    {i18n.t('label.searchProjectPara')}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: '#d5d5d5',
                    width: '100%',
                    borderBottomWidth: 1
                  }}
                />
                <TouchableOpacity
                  style={{ width: '100%' }}
                  onPress={() => navigation.navigate('Search')}
                >
                  <Text style={styles2.googleCardButton}>
                    {i18n.t('label.searchProjectButton')}
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

const styles2 = StyleSheet.create({
  googleCardTitle: {
    fontFamily: 'OpenSans',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  googleCardPara: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  googleCardButton: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a',
    marginTop: 16
  }
});
