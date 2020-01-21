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
  FlatList
} from 'react-native';
import { readmoreDown, readmoreUp } from './../../assets/';
import { updateRoute } from './../../helpers/routerHelper';
import CountryLoader from './../Common/ContentLoader/LeaderboardRefresh/CountryLoader';
import { getLocalRoute } from './../../actions/apiRouting';
import { delimitNumbers } from './../../utils/utils';
import { getImageUrl } from './../../actions/apiRouting';

import styles from '../../styles/user-home';
// import tabStyles from '../../styles/common/tabbar';
import * as images from '../../assets';

// import CardLayout from '../Common/Card';
import SvgContainer from '../Common/SvgContainer';
import UserProfileImage from '../Common/UserProfileImage';
import ContributionCardList from '../UserContributions/ContributionCardList';
import PlantProjectSnippet from './../PlantProjects/PlantProjectSnippet';
import i18n from '../../locales/i18n';
import CompetitionSnippet from './app/CompetitionSnippet';
// import NativeMapView from './../Map/NativeMapView'
export default class UserHome extends Component {
  constructor(props) {
    super(props);

    let svgData = {};
    const { treecounterData, userProfile } = props;
    if (treecounterData) {
      svgData = { ...treecounterData, type: userProfile.type };
    }
    this.state = {
      svgData: svgData,
      routes: [
        { key: 'home', title: i18n.t('label.home') },
        { key: 'my-trees', title: i18n.t('label.my_trees') }
      ],
      index: 0,
      showAllContributions: false,
      showAllRecurrentContributions: false,
      recurrentUserContributions: []
    };
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
  componentWillReceiveProps(nextProps) {
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
      nextState.showAllContributions !== this.state.showAllContributions;
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
    Linking.openURL(url).catch(err => console.log('Cannot open URI', err));
  }

  readMore() {
    this.setState(prevState => ({
      showAllContributions: !prevState.showAllContributions
    }));
  }

  showRecurrentMore() {
    this.setState(prevState => ({
      showAllRecurrentContributions: !prevState.showAllRecurrentContributions
    }));
  }

  render() {
    const { userProfile } = this.props;
    const profileType = userProfile.type;
    let {
      svgData,
      showAllContributions,
      showAllRecurrentContributions,
      recurrentUserContributions
    } = this.state;

    console.log(recurrentUserContributions);
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
        <View>
          <View style={styles.header}>
            <View style={styles.userProfileContainer}>
              <UserProfileImage
                imageStyle={styles.userProfileImage}
                profileImage={userProfile.image}
              />

              <View style={styles.userInfo}>
                <View style={styles.userInfoName}>
                  <Text style={styles.nameStyle}>
                    {userProfile.treecounter.displayName}
                  </Text>
                </View>
                <View style={styles.userInfoProfileType}>
                  <Image
                    style={styles.profileTypeImage}
                    resizeMode="contain"
                    source={
                      profileType === 'education'
                        ? images['schoolIcon']
                        : profileType === 'tpo'
                          ? images['tpoIcon']
                          : profileType === 'company'
                            ? images['companyIcon']
                            : images['individualIcon']
                    }
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.svgContainer}>
            <SvgContainer
              {...svgData}
              onToggle={toggleVal => this.updateSvg(toggleVal)}
            />
          </View>
        </View>
        <View style={styles.buttonViewRow}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              updateRoute('app_redeem', this.props.navigation);
            }}
          >
            <Text style={styles.secondaryButtonText}>
              {i18n.t('label.redeem_trees_button')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              updateRoute('app_registerTrees', this.props.navigation);
            }}
          >
            <Text style={styles.primaryButtonText}>
              {i18n.t('label.register_trees')}
            </Text>
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
              <Text style={styles.dedicatedTitle}>{i18n.t('label.about')}</Text>
              <TouchableOpacity
                onPress={() => {
                  updateRoute('app_editProfile', this.props.navigation);
                }}
              >
                <Text style={styles.dedicatedEdit}>{i18n.t('label.edit')}</Text>
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

        {recurrentUserContributions && recurrentUserContributions.length > 3 ? (
          <ToggleButton
            updateFunction={() => this.showRecurrentMore()}
            showMore={showAllRecurrentContributions}
          />
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
          {userProfile.plantProjects
            ? userProfile.plantProjects.map(project => (
                <PlantProjectSnippet
                  key={'projectFull' + project.id}
                  onMoreClick={id => this.onPlantProjectClick(id, project.name)}
                  plantProject={project}
                  onSelectClickedFeaturedProjects={id =>
                    this.onPlantProjectClick(id, project.name)
                  }
                  showMoreButton={false}
                  tpoName={project.tpo_name}
                  navigation={this.props.navigation}
                />
              ))
            : null}
        </ScrollView>

        {this.props.userContributions.length ? (
          <View contentContainerStyle={{ paddingBottom: 72, marginTop: 20 }}>
            <Text style={styles.sectionTitle}>{i18n.t('label.my_trees')}</Text>

            {/* <NativeMapView
              mode={'multiple-trees'}
              mapStyle={{ height: 200 }}
              geometry={null}
              address={parentProps.address}
              geoLocation={geoLocation}
              onPress={() => {
                parentProps.openModel(props);
              }}
            /> */}
            <ContributionCardList
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

        <RenderIndividualsList
          navigation={this.props.navigation}
          gifts={userProfile.treecounter.gifts}
        />
      </ScrollView>
    );
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
          {showMore ? 'Show less' : 'Show all'}
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
        {competitions.length > 0
          ? competitions.map(competition => (
              <CompetitionSnippet
                key={'competition' + competition.id}
                onMoreClick={id =>
                  props.onCompetitionClick(id, competition.name)
                }
                competition={competition}
                type="all"
              />
            ))
          : null}
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
      <TouchableOpacity style={styles.dedicatedContainer2}>
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

function RenderIndividualsList(props) {
  const { gifts, navigation } = props;
  const onPressListItem = (treeCounterId, title) => {
    if (treeCounterId) {
      navigation.navigate(getLocalRoute('app_treecounter'), {
        treeCounterId,
        titleParam: title
      });
    }
  };
  if (gifts) {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>My Supporters</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={gifts}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onPressListItem(item.id, item.giverName);
                }}
                style={styles.oneContryContainer}
              >
                <View style={styles.indexContainer}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View style={styles.countryFlagContainer}>
                  <Image
                    style={styles.countryFlagImage}
                    source={{
                      uri: getImageUrl('profile', 'avatar', item.giverAvatar)
                    }}
                  />
                </View>
                <View style={styles.countryBody}>
                  <Text numberOfLines={2} style={styles.countryNameText}>
                    {item.giverName
                      ? item.giverName
                      : i18n.t('label.anonymous')}
                  </Text>
                  <Text style={styles.treesText}>
                    <Text style={styles.treesCounter}>
                      {delimitNumbers(item.treeCount)}{' '}
                    </Text>
                    {i18n.t('label.trees')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  } else {
    return (
      <>
        <CountryLoader />
        <CountryLoader />
        <CountryLoader />
      </>
    );
  }
}
