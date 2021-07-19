/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Image
  // FlatList
} from 'react-native';
import { backArrow } from './../../assets';
import { debug } from '../../debug';
import TreecounterHeader from './TreecounterHeader';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SvgContainer from '../Common/SvgContainer';
import CardLayout from '../Common/Card';
import stylesHome from '../../styles/user-home';
import { delimitNumbers } from '../../utils/utils';
import stylesPublicPage from '../../styles/public-page';
import i18n from '../../locales/i18n.js';
// import HeaderNew from './../Header/HeaderNew.native';
import { isMyself, isUserFollower } from './utils';
import PlantProjectSnippet from '../PlantProjects/PlantProjectSnippet';
import { updateRoute, updateStaticRoute } from '../../helpers/routerHelper';
import { white_heart } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem';
// import styles from '../../styles/user-home';
// import { getImageUrl } from './../../actions/apiRouting';

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
    //debug('on plant project seected', selectedPlantProjectId);
    this.props.clearSupport();
    this.props.selectPlantProjectIdAction(selectedPlantProjectId);
    this.props.route('app_donateTrees');
  }

  onRegisterSupporter() {
    this.props.supportTreecounterAction(this.props.treecounter);
    updateRoute('app_supportTrees', this.props.navigation, 44, {
      titleParam: i18n.t('label.support_trees_to', {
        user: this.props.treecounter.displayName
      })
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const treecounter = nextProps.treecounter;
    if (treecounter) {
      if ('tpo' === treecounter.userProfile.type) {
        this.props.clearSupport();
      }
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
    this.props.clearSupport();
    this.props.selectPlantProjectIdAction(id);
    const { navigation } = this.props;
    updateRoute('app_selectedProject', navigation, null, {
      titleParam: name,
      id: id
    });
  }

  onSelectClickedFeaturedProjects = id => {
    this.props.clearSupport();
    this.props.selectPlantProjectIdAction(id);
    const { navigation } = this.props;
    updateStaticRoute('app_donate_detail', navigation);
  };

  render() {
    const { treecounter, currentUserProfile, navigation } = this.props;
    if (null === treecounter) {
      return (
        <LoadingIndicator
          contentLoader
          screen="PublicTreeCounterContentLoader"
        />
      );
    }

    const { userProfile, displayName: caption } = treecounter;
    const { type: profileType, image: logo } = userProfile;
    const isUserFollowerBool = isUserFollower(treecounter, currentUserProfile);
    const isUserLoggedIn = null !== currentUserProfile;
    const showFollow = !isMyself(treecounter, currentUserProfile);

    // const supportProps = {
    //   active: !amISupporting(treecounter, currentUserProfile),
    //   isUserLoggedIn,
    //   caption
    // };
    const headerProps = {
      caption,
      profileType: profileType,
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
      <SafeAreaView style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            height: 36,
            zIndex: 1001,
            width: 36,
            left: 24,
            top: Platform.OS === 'ios' ? 36 : 12,
            justifyContent: 'center',
            position: 'absolute'
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={backArrow}
              resizeMode="contain"
              style={{ height: 18, width: 18.48, alignSelf: 'flex-start' }}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {/* <HeaderNew title={''} navigation={this.props.navigation} /> */}

          <View style={stylesPublicPage.header}>
            <TreecounterHeader
              {...headerProps}
              containerStyle={{ width: '100%' }}
              followChanged={this.onFollowChanged}
            />
            {/* {'tpo' !== userProfile.type &&
            !isMyself(treecounter, currentUserProfile) ? (
              <SupportButton
                {...supportProps}
                onRegisterSupporter={this.onRegisterSupporter}
              />
            ) : null} */}
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
                {userProfile.url ? (
                  <Text
                    style={stylesHome.linkText}
                    onPress={() => this._goToURL(userProfile.url)}
                  >
                    {userProfile.linkText || i18n.t('label.read_more')}
                  </Text>
                ) : null}
              </CardLayout>
            ) : null}
          </View>
          <View>
            {'tpo' === userProfile.type &&
              1 <= tpoProps.plantProjects.length ? (
              <View style={{ marginBottom: 20 }}>
                {tpoProps.plantProjects.map(project => (
                  <PlantProjectSnippet
                    key={'trillion' + project.id}
                    onMoreClick={id => this.onMoreClick(id, project.name)}
                    plantProject={project}
                    onSelectClickedFeaturedProjects={id =>
                      this.onSelectClickedFeaturedProjects(id)
                    }
                    selectProject={id => this.onPlantProjectSelected(id)}
                    showMoreButton={false}
                    tpoName={project.tpo_name}
                    navigation={navigation}
                  />
                ))}
              </View>
            ) : null}
          </View>

          <View>
            {treecounter.directChildren ? (
              <CardLayout>
                <View>
                  <View style={stylesPublicPage.tableHeader}>
                    <Text style={stylesPublicPage.firstColumn}>
                      {i18n.t('label.contributor')}
                    </Text>
                    <Text style={stylesPublicPage.secondColumn}>
                      {i18n.t('label.plantedTrees')}
                    </Text>
                    <Text style={stylesPublicPage.thirdColumn}>
                      {i18n.t('label.target')}
                    </Text>
                    <View style={stylesPublicPage.fourthColumn} />
                  </View>
                  <View>
                    {Object.keys(treecounter.directChildren).map(childrenId => {
                      return (
                        <View
                          key={childrenId}
                          style={stylesPublicPage.tableHeader}
                        >
                          <Text style={stylesPublicPage.firstColumn}>
                            {treecounter.directChildren[childrenId].displayName}
                          </Text>
                          <Text style={stylesPublicPage.secondColumn}>
                            {delimitNumbers(
                              parseInt(
                                treecounter.directChildren[childrenId]
                                  .countPlanted
                              )
                            )}
                          </Text>
                          <Text style={stylesPublicPage.thirdColumn}>
                            {delimitNumbers(
                              parseInt(
                                treecounter.directChildren[childrenId]
                                  .countTarget
                              )
                            )}
                          </Text>
                          <View style={stylesPublicPage.fourthColumn}>
                            <TouchableOpacity
                              onPress={() =>
                                this.onRegisterSupporter(
                                  treecounter.directChildren[childrenId]
                                )
                              }
                            >
                              <Text
                                numberOfLines={1}
                                style={stylesPublicPage.supportText}
                              >
                                {i18n.t('label.support')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </CardLayout>
            ) : null}
          </View>
          {/* {
            treecounter.directChildren ? (
              <GroupTreeCounter
                navigation={this.props.navigation}
                // gifts={userProfile.treecounter.gifts}
                children={treecounter.directChildren}
              />
            ) : null
          } */}
        </ScrollView>
        {'tpo' !== userProfile.type ? (
          <View
            style={[
              stylesPublicPage.bottomActionArea,
              { position: 'absolute', bottom: 0, right: 0, left: 0 }
            ]}
          >
            <Text style={[stylesPublicPage.supportUserText]}>
              {i18n.t('label.supportUser', {
                displayName: this.props.treecounter.displayName
              })}
            </Text>
            <TouchableItem activeOpacity={0.6} onPress={this.onRegisterSupporter}>
              <View style={stylesPublicPage.fullHeightButton}>
                <Image
                  source={white_heart}
                  style={
                    white_heart
                      ? { width: 20, height: 20, marginRight: 12 }
                      : { width: 0 }
                  }
                />
                <Text style={[stylesPublicPage.primaryButtonText]}>
                  {i18n.t('label.donate')}
                </Text>
              </View>
            </TouchableItem>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }

  _goToURL(url) {
    /*
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        //debug("Don't know how to open URI: " + url);
      }
    });
*/
    Linking.openURL(url).catch(err => debug('Cannot open URI', err));
  }
}

PublicTreeCounter.propTypes = {
  treecounter: PropTypes.object,
  currentUserProfile: PropTypes.object,
  followSubscribeAction: PropTypes.func,
  unfollowSubscribeAction: PropTypes.func,
  selectPlantProjectIdAction: PropTypes.func,
  supportTreecounterAction: PropTypes.func,
  clearSupport: PropTypes.func,
  route: PropTypes.func,
  navigation: PropTypes.any
};

export default PublicTreeCounter;

// function GroupTreeCounter(props) {
//   const { children, navigation } = props;
//   const onPressListItem = (treeCounterId) => {
//     if (treeCounterId) {
//       navigation.navigate(getLocalRoute('app_treecounter'), {
//         treeCounterId: treeCounterId,
//       });
//     }
//   };
//   let index = 0;

//   //debug('Children', children)
//   if (children) {
//     return (
//       <View style={{ marginTop: 20 }}>
//         <Text style={styles.sectionTitle}>My Supporters</Text>
//         {Object.keys(children).map(childrenId => {
//           return (
//             index++ ,
//             <TouchableOpacity
//               onPress={() => {
//                 onPressListItem(childrenId);
//               }}
//               style={styles.oneContryContainer}
//             >
//               <View style={styles.indexContainer}>
//                 <Text style={styles.indexText}>{index}</Text>
//               </View>
//               <View style={styles.countryFlagContainer}>
//                 <Image
//                   style={styles.countryFlagImage}
//                   source={{
//                     uri: getImageUrl('profile', 'avatar', children[childrenId].displayName)
//                   }}
//                 />
//               </View>
//               <View style={styles.countryBody}>
//                 <Text numberOfLines={2} style={styles.countryNameText}>
//                   {children[childrenId].displayName
//                     ? children[childrenId].displayName
//                     : i18n.t('label.anonymous')}
//                 </Text>
//                 <Text style={styles.treesText}>
//                   <Text style={styles.treesCounter}>
//                     {delimitNumbers(
//                       parseInt(
//                         children[childrenId]
//                           .countPlanted
//                       )
//                     )}{' '}
//                   </Text>
//                   {i18n.t('label.trees')}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           );
//         })}

//       </View>
//     );
//   } else {
//     return (
//       <>
//         <CountryLoader />
//         <CountryLoader />
//         <CountryLoader />
//       </>
//     );
//   }
// }
