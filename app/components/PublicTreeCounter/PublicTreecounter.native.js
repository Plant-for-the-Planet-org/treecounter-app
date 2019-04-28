import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Linking } from 'react-native';
import SupportButton from './SupportButton';
import TreecounterHeader from './TreecounterHeader';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import PlantProjectCarousel from '../PlantProjects/PlantProjectCarousel';
import SvgContainer from '../Common/SvgContainer';
import CardLayout from '../Common/Card';
import stylesHome from '../../styles/user-home';
import stylesPublicPage from '../../styles/public-page.native';

import {
  getProfileTypeName,
  isMyself,
  isUserFollower,
  amISupporting
} from './utils';
import PlantProjectSnippet from '../PlantProjects/PlantProjectSnippet.native';
import { updateRoute, updateStaticRoute } from '../../helpers/routerHelper';

class PublicTreeCounter extends React.Component {
  constructor(props) {
    super(props);

    this.onFollowChanged = this.onFollowChanged.bind(this);
    this.onPlantProjectSelected = this.onPlantProjectSelected.bind(this);
    this.onRegisterSupporter = this.onRegisterSupporter.bind(this);
    this.state = {
      svgData: {}
    };
  }

  //------------------------------------------------------------------------------------------------------------
  // ACTION METHODS
  //------------------------------------------------------------------------------------------------------------
  onFollowChanged() {
    if (null !== this.props.currentUserProfile) {
      isUserFollower(this.props.treecounter, this.props.currentUserProfile)
        ? this.props.unfollowSubscribeAction(this.props.treecounter.id)
        : this.props.followSubscribeAction(this.props.treecounter.id);
    } else {
      this.props.route('app_login');
    }
  }

  onPlantProjectSelected(selectedPlantProjectId) {
    this.props.selectPlantProjectIdAction(selectedPlantProjectId);
    this.props.route('app_donateTrees');
  }

  onRegisterSupporter() {
    this.props.supportTreecounterAction(this.props.treecounter);
    updateRoute('app_donateTrees', this.props.navigation, 0, {
      titleParam: 'Support Trees To ' + this.props.treecounter.displayName
    });
  }

  componentWillReceiveProps(nextProps) {
    const treecounter = nextProps.treecounter;
    if (treecounter) {
      let svgData = {
        id: treecounter.id,
        target: treecounter.countTarget,
        planted: treecounter.countPlanted,
        community: treecounter.countReceived,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: treecounter.userProfile.type
      };
      this.setState({ svgData });
    }
  }
  updateSvg(toggle) {
    if (toggle) {
      const treecounter = this.props.treecounter;
      let svgData = {
        id: treecounter.id,
        target: treecounter.countReceived + treecounter.countPersonal, // light color
        planted: treecounter.countPersonal, //dark color
        community: treecounter.countReceived,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: treecounter.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    } else {
      const treecounter = this.props.treecounter;
      let svgData = {
        id: treecounter.id,
        target: treecounter.countTarget,
        planted: treecounter.countPlanted,
        community: treecounter.countReceived,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: treecounter.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    }
  }
  onMoreClick(id, name) {
    this.props.selectPlantProjectIdAction(id);
    const { navigation } = this.props;
    //console.log('OnMore');
    updateRoute('app_selectProject', navigation, null, { titleParam: name });
  }

  onSelectClickedFeaturedProjects = id => {
    this.props.selectPlantProjectIdAction(id);
    const { navigation } = this.props;
    updateStaticRoute('app_donate_detail', navigation);
  };
  render() {
    const { treecounter, currentUserProfile } = this.props;
    if (null === treecounter) {
      return <LoadingIndicator />;
    }

    const { userProfile, displayName: caption } = treecounter;
    const { type: profileType, image: logo } = userProfile;
    const isUserFollowerBool = isUserFollower(treecounter, currentUserProfile);
    const isUserLoggedIn = null !== currentUserProfile;
    const showFollow = !isMyself(treecounter, currentUserProfile);

    const supportProps = {
      active: !amISupporting(treecounter, currentUserProfile),
      isUserLoggedIn,
      caption
    };
    const headerProps = {
      caption,
      profileType: getProfileTypeName(profileType),
      logo,
      isUserFollowerBool,
      isUserLoggedIn,
      showFollow
    };
    const tpoProps = {
      plantProjects: userProfile.plantProjects,
      defaultPlantProjectId: null,
      tpoName: caption
    };

    return (
      <ScrollView>
        <View style={stylesPublicPage.header}>
          <TreecounterHeader
            {...headerProps}
            containerStyle={{ width: '70%' }}
            followChanged={this.onFollowChanged}
          />
          {'tpo' !== userProfile.type &&
          !isMyself(treecounter, currentUserProfile) ? (
            <SupportButton
              {...supportProps}
              onRegisterSupporter={this.onRegisterSupporter}
            />
          ) : null}
        </View>
        <View style={stylesHome.svgContainer}>
          {Object.keys(this.state.svgData).length !== 0 ? (
            <SvgContainer
              {...this.state.svgData}
              onToggle={toggleVal => this.updateSvg(toggleVal)}
            />
          ) : null}
        </View>
        <View>
          {userProfile.synopsis1 ||
          userProfile.synopsis2 ||
          userProfile.linkText ||
          userProfile.url ? (
            <CardLayout>
              {userProfile.synopsis1 ? (
                <Text style={stylesHome.footerText}>
                  {userProfile.synopsis1}
                </Text>
              ) : null}
              {userProfile.synopsis2 ? (
                <Text style={stylesHome.footerText}>
                  {userProfile.synopsis2}
                </Text>
              ) : null}
              {userProfile.linkText ? (
                <Text style={stylesHome.footerText}>
                  {userProfile.linkText}
                </Text>
              ) : null}
              {userProfile.url ? (
                <Text
                  style={stylesHome.linkText}
                  onPress={() => this._goToURL(userProfile.url)}
                >
                  {userProfile.url}
                </Text>
              ) : null}
            </CardLayout>
          ) : null}
        </View>
        <View>
          {'tpo' === userProfile.type && 1 <= tpoProps.plantProjects.length ? (
            <View>
              {tpoProps.plantProjects.map(project => (
                <PlantProjectSnippet
                  key={'trillion' + project.id}
                  onMoreClick={id => this.onMoreClick(id, project.name)}
                  plantProject={project}
                  onSelectClickedFeaturedProjects={id =>
                    this.onSelectClickedFeaturedProjects(id)
                  }
                  showMoreButton={false}
                  tpoName={project.tpo_name}
                />
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }

  _goToURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }
}

PublicTreeCounter.propTypes = {
  treecounter: PropTypes.object,
  currentUserProfile: PropTypes.object,
  followSubscribeAction: PropTypes.func,
  unfollowSubscribeAction: PropTypes.func,
  selectPlantProjectIdAction: PropTypes.func,
  supportTreecounterAction: PropTypes.func,
  route: PropTypes.func,
  navigation: PropTypes.any
};

export default PublicTreeCounter;
