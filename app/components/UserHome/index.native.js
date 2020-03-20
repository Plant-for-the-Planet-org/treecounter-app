/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Share,
  RefreshControl,
  FlatList,
  Dimensions,
  findNodeHandle,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { debug } from '../../debug';
import {
  readmoreDown,
  readmoreUp,
  share,
  coupon,
  registerTree,
  settings
} from './../../assets/';
import { updateRoute, updateStaticRoute } from './../../helpers/routerHelper';
import { getLocalRoute } from './../../actions/apiRouting';
import styles from '../../styles/user-home';
import PlantProjectSnippet from './../PlantProjects/PlantProjectSnippet';
import SvgContainer from '../Common/SvgContainer';
import UserProfileImage from '../Common/UserProfileImage';
import ContributionCardList from '../UserContributions/ContributionCardList.native';
import i18n from '../../locales/i18n';
import CompetitionSnippet from './app/CompetitionSnippet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FullMapComponent from './FullMapComponent';
import SafeAreaView from 'react-native-safe-area-view';
import { withNavigation } from 'react-navigation';
import { fullscreen_icon } from '../../assets/index'
class UserHome extends Component {
  constructor(props) {
    super(props);

    let svgData = {};
    const { treecounterData, userProfile } = props;
    if (treecounterData) {
      svgData = { ...treecounterData, type: userProfile.type };
    }
    this.state = {
      isPressFromList: false,
      singleContributionID: undefined,
      isFullMapComponentModal: false,
      svgData: svgData,
      routes: [
        { key: 'home', title: i18n.t('label.home') },
        { key: 'my-trees', title: i18n.t('label.my_trees') }
      ],
      index: 0,
      showAllContributions: false,
      showAllRecurrentContributions: false,
      recurrentUserContributions: [],
      readMore: false,
      refreshing: false
    };
    this.mapView = React.createRef();

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  componentDidMount() {
    let { userContributions } = this.props;
    let recurrentUserContributions = [];
    if (userContributions.length > 0) {
      userContributions.forEach(contribution => {
        if (contribution.isRecurrent === true) {
          recurrentUserContributions.push(contribution);
        }
      });
    }
    this.setState({
      recurrentUserContributions: recurrentUserContributions
    });
  }
  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.props.userProfile;
    this.props.treecounterData;
    this.props.userContributions;

    this.setState({
      refreshing: false
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { treecounterData, userProfile } = nextProps;
    if (treecounterData) {
      let svgData = { ...treecounterData, type: userProfile.type };
      this.setState({ svgData });
    }
  }

  componentDidUpdate(nextProps) {
    let { userContributions } = nextProps;
    if (userContributions !== this.props.userContributions) {
      let recurrentUserContributions = [];
      if (userContributions.length > 0) {
        userContributions.forEach(contribution => {
          if (contribution.isRecurrent === true) {
            recurrentUserContributions.push(contribution);
          }
        });
      }
      this.setState({
        recurrentUserContributions: recurrentUserContributions
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate =
      JSON.stringify(nextProps) !== JSON.stringify(this.props) ||
      nextState.index !== this.state.index ||
      nextState.showAllContributions !== this.state.showAllContributions ||
      nextState.isFullMapComponentModal !== this.state.isFullMapComponentModal;
    return shouldUpdate;
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  onCompetitionClick = (id, name) => {
    const { navigation } = this.props;
    if (navigation) {
      updateRoute('app_competition', navigation, 1, {
        competition: id,
        titleParam: name
      });
    }
  };

  onPlantProjectClick = (id, name) => {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    if (navigation) {
      updateRoute('app_selectProject', navigation, 1, {
        userForm: navigation.getParam('userForm'),
        titleParam: name
      });
    }
  };

  updateSvg(toggle) {
    if (toggle) {
      const treecounter = this.props.treecounterData;
      if (isNaN(parseInt(treecounter.community))) {
        treecounter.community = 0;
      }
      if (isNaN(parseInt(treecounter.personal))) {
        treecounter.personal = 0;
      }
      let svgData = {
        id: treecounter.id,
        target: treecounter.community + treecounter.personal, // light color
        planted: treecounter.personal, //dark color
        community: treecounter.community,
        personal: treecounter.personal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: this.props.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    } else {
      const treecounter = this.props.treecounterData;
      let svgData = {
        id: treecounter.id,
        target: treecounter.target,
        planted: treecounter.planted,
        community: treecounter.community,
        personal: treecounter.personal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: this.props.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    }
  }

  _goToURL(url) {
    Linking.openURL(url).catch(err => debug('Cannot open URI', err));
  }

  readMore() {
    this.setState(prevState => ({
      showAllContributions: !prevState.showAllContributions
    }));
  }

  setReadMore() {
    this.setState(prevState => ({
      readMore: !prevState.readMore
    }));
  }

  showRecurrentMore() {
    this.setState(prevState => ({
      showAllRecurrentContributions: !prevState.showAllRecurrentContributions
    }));
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message: i18n.t('label.shareuserprofile', {
          displayName: this.props.userProfile.treecounter.displayName,
          slug: this.props.userProfile.treecounter.slug
        })
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  toggleIsFullMapComp = (
    singleContributionIDShouldNull, /*  if true set id to null*/

  ) => {
    console.log('toggleIsFullMapComp');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.mapParent.measureLayout(findNodeHandle(this.scrollRef), (x, y) => {
      this.scrollRef.scrollTo({ x: 0, y: y, animated: true });
    });

    this.setState({
      isFullMapComponentModal: !this.state.isFullMapComponentModal,
      singleContributionID: singleContributionIDShouldNull
        ? null
        : this.state.singleContributionID,
      isPressFromList: singleContributionIDShouldNull ? false : true
    }, () => {
      this.props.navigation.setParams({ isFullMapComponentModal: this.state.isFullMapComponentModal })
    });
  };

  getMapComponent = () => {
    let fullScreenIcon = (
      <TouchableOpacity
        onPress={this.toggleIsFullMapComp}
        style={styles.fullScreenIcon}
      >
        <Image source={fullscreen_icon} />
      </TouchableOpacity>
    );

    const { isFullMapComponentModal } = this.state;
    return (
      <View
        ref={ref => (this.mapParent = ref)}
        style={{
          flex: 1,
          height: isFullMapComponentModal
            ? Dimensions.get('window').height
            : 250
        }}
      >
        <FullMapComponent
          isPressFromList={this.state.isPressFromList}
          singleContributionID={this.state.singleContributionID}
          isFullMapComponentModal={isFullMapComponentModal}
          toggleIsFullMapComp={this.toggleIsFullMapComp}
          navigation={this.props.navigation}
          userContributions={this.props.userContributions}
        />
        {!isFullMapComponentModal ? fullScreenIcon : null}
      </View>
    );
  };

  onPressSingleContribution = id => {
    this.setState({ singleContributionID: id, isPressFromList: true }, () => {
      this.toggleIsFullMapComp();
    });
  };

  getWholeComponent() {
    const { userProfile, navigation } = this.props;
    const {
      svgData,
      showAllContributions,
      showAllRecurrentContributions,
      recurrentUserContributions,
      isFullMapComponentModal
    } = this.state;
    debug(userProfile);
    return (
      <SafeAreaView style={{ elevation: 1, flex: 1 }}
        forceInset={{ bottom: !isFullMapComponentModal ? 'never' : 'never', top: !isFullMapComponentModal ? 'always' : 'never' }}>
        <ScrollView
          scrollEnabled={!isFullMapComponentModal}
          ref={ref => (this.scrollRef = ref)}
          contentContainerStyle={{ paddingBottom: 72 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View>
            <View>
              <View style={styles.userProfileContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <UserProfileImage
                    imageStyle={styles.userProfileImage}
                    profileImage={userProfile.image}
                  />
                </View>
                <View style={styles.userInfo}>
                  <View style={styles.userInfoName}>
                    <Text style={styles.nameStyle}>
                      {userProfile.treecounter.displayName}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.settingIconContainer}
                onPress={() => {
                  navigation.openDrawer();
                }}
              >
                <Image source={settings} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={[styles.svgContainer, { marginTop: -50 }]}>
              <SvgContainer
                {...svgData}
                onToggle={toggleVal => this.updateSvg(toggleVal)}
              />
            </View>
          </View>
          <View style={styles.buttonViewRow}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => {
                updateStaticRoute('app_redeem', this.props.navigation, {
                  code: null
                });
              }}
            >
              <View style={styles.circleButtonView}>
                <Image
                  style={{ width: 24, height: 14.3, alignSelf: 'center' }}
                  source={coupon}
                />
              </View>
              <Text style={styles.circleButtonText}>Redeem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => {
                updateStaticRoute('app_registerTrees', this.props.navigation);
              }}
            >
              <View style={styles.circleButtonView}>
                <Image
                  style={{
                    width: 13.8,
                    height: 24,
                    alignSelf: 'center'
                  }}
                  source={registerTree}
                />
              </View>
              <Text style={styles.circleButtonText}>
                {i18n.t('label.register_trees')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={this.onShare}
            >
              <View style={styles.circleButtonView}>
                <Image
                  style={{ width: 24, height: 24, alignSelf: 'center' }}
                  source={share}
                />
              </View>
              <Text style={styles.circleButtonText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Dedicated Trees Section */}
          {userProfile.supportedTreecounter ? (
            <DedicatedTrees
              navigation={this.props.navigation}
              supportedTreecounter={userProfile.supportedTreecounter}
            />
          ) : null}

          {userProfile.synopsis1 ? (
            <View>
              <View style={styles.dedicatedContainer}>
                <Text style={styles.dedicatedTitle}>
                  {i18n.t('label.about')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    updateRoute('app_editProfile', this.props.navigation);
                  }}
                >
                  <Text style={styles.dedicatedEdit}>
                    {i18n.t('label.edit')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {userProfile.synopsis1 ||
                  userProfile.synopsis2 ||
                  userProfile.linkText ||
                  userProfile.url ? (
                    <View>
                      {userProfile.synopsis1 ? (
                        <Text style={styles.footerText}>
                          {userProfile.synopsis1}
                        </Text>
                      ) : null}
                      {userProfile.synopsis2 ? (
                        <Text style={styles.footerText}>
                          {userProfile.synopsis2}
                        </Text>
                      ) : null}
                      {userProfile.url ? (
                        <Text
                          style={styles.linkText}
                          onPress={() => this._goToURL(userProfile.url)}
                        >
                          {userProfile.linkText || i18n.t('label.read_more')}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
              </View>
            </View>
          ) : null}

          {/* Recurrent Donations */}
          {recurrentUserContributions.length ? (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>
                {i18n.t('label.active_recurrent_donations')}
              </Text>
              <ContributionCardList
                contributions={recurrentUserContributions}
                deleteContribution={this.props.deleteContribution}
                showAllContributions={showAllRecurrentContributions}
              />
            </View>
          ) : null}

          {/* Competitions */}
          {userProfile.treecounter.competitions.length > 0 ? (
            <MyCompetitions
              onCompetitionClick={this.onCompetitionClick}
              navigation={this.props.navigation}
              competitions={userProfile.treecounter.competitions}
            />
          ) : null}

          {/* Plant Projects of TPO  */}
          {userProfile.plantProjects ? (
            <Text style={styles.sectionTitle}>{i18n.t('label.projects')}</Text>
          ) : null}
          <ScrollView>
            {userProfile.plantProjects ? (
              <FlatList
                data={userProfile.plantProjects}
                renderItem={({ item }) => {
                  let project = item;
                  return (
                    <PlantProjectSnippet
                      key={'projectFull' + project.id}
                      onMoreClick={id =>
                        this.onPlantProjectClick(id, project.name)
                      }
                      plantProject={project}
                      onSelectClickedFeaturedProjects={id =>
                        this.onPlantProjectClick(id, project.name)
                      }
                      showMoreButton={false}
                      tpoName={project.tpo_name}
                      navigation={this.props.navigation}
                    />
                  );
                }}
              />
            ) : null}
          </ScrollView>

          {this.props.userContributions.length ? (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>
                {i18n.t('label.my_trees')}
              </Text>
              {this.getMapComponent(this.props.userContributions, this.mapView)}
              <ContributionCardList
                onPressSingleContribution={this.onPressSingleContribution}
                contributions={this.props.userContributions}
                deleteContribution={this.props.deleteContribution}
                showAllContributions={showAllContributions}
              />
            </View>
          ) : null}

          {this.props.userContributions &&
            this.props.userContributions.length > 3 ? (
              <ToggleButton
                updateFunction={() => this.readMore()}
                showMore={showAllContributions}
              />
            ) : null}

          {/* <RenderIndividualsList
            navigation={this.props.navigation}
            gifts={userProfile.treecounter.gifts}
          /> */}
        </ScrollView>
      </SafeAreaView>
    );
  }

  render() {
    return this.getWholeComponent();
  }
}

UserHome.propTypes = {
  treecounterData: PropTypes.object,
  userProfile: PropTypes.object,
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired,
  deleteContribution: PropTypes.func,
  navigation: PropTypes.any
};

function ToggleButton(props) {
  const showMore = props.showMore;
  return (
    <View style={styles.showMoreView}>
      <TouchableOpacity
        style={styles.showMoreTouchable}
        onPress={() => props.updateFunction()}
      >
        <Image
          source={showMore ? readmoreUp : readmoreDown}
          style={{ height: 8, width: 15, marginRight: 8 }}
          resizeMode={'contain'}
        />
        <Text style={styles.showMoreText}>
          {showMore ? i18n.t('label.show_less') : i18n.t('label.show_all')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function MyCompetitions(props) {
  const competitions = props.competitions;
  return (
    <View style={{ paddingVertical: 20, marginTop: 20 }}>
      <View style={styles.competitionsContainer}>
        <Text style={styles.dedicatedTitle}>
          {i18n.t('label.my_competitions')}
        </Text>
        <TouchableOpacity>
          <Text
            style={styles.dedicatedEdit}
            onPress={() => {
              updateRoute('app_competitions', props.navigation);
            }}
          >
            {i18n.t('label.view_all')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
      >
        {competitions.length > 0 ? (
          <FlatList
            horizontal
            data={competitions}
            renderItem={({ item }) => {
              let competition = item;
              return (
                <CompetitionSnippet
                  key={'competition' + competition.id}
                  onMoreClick={id =>
                    props.onCompetitionClick(id, competition.name)
                  }
                  competition={competition}
                  type="all"
                />
              );
            }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

function DedicatedTrees(props) {
  return (
    <View>
      <View style={styles.dedicatedContainer}>
        <Text style={styles.dedicatedTitle}>
          {i18n.t('label.dedicate_trees')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            updateRoute('pickup_profile_modal', props.navigation);
          }}
        >
          <Text style={styles.dedicatedEdit}>{i18n.t('label.edit')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(getLocalRoute('app_treecounter'), {
            treeCounterId: props.supportedTreecounter.id,
            titleParam: props.supportedTreecounter.displayName
          })
        }
        style={styles.dedicatedContainer2}
      >
        <UserProfileImage
          profileImage={props.supportedTreecounter.avatar}
          imageType="avatar"
          imageStyle={{
            height: 32,
            width: 32,
            borderRadius: 32 / 2
          }}
        />
        <Text style={styles.dedicatedName}>
          {props.supportedTreecounter.displayName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default withNavigation(UserHome);
