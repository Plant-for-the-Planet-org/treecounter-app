import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import i18n from '../../locales/i18n';
import PledgeTabView from './PledgeTabView.native';
import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
import { bindActionCreators } from 'redux';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import CardLayout from '../Common/Card';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { fetchPublicPledgesAction } from '../../actions/pledgeEventsAction';
import { loadUserProfile } from './../../actions/loadUserProfileAction';
import { fetchItem } from './../../stores/localStorage';

import {
  fetchPledgesAction,
  postPledge,
  clearTimeoutAction
} from '../../actions/pledgeAction';
import {
  pledgesSelector,
  pledgeEventSelector,
  entitiesSelector,
  currentUserProfileSelector
} from '../../selectors';
import RBSheet from 'react-native-raw-bottom-sheet';
import LoadingIndicator from './../Common/LoadingIndicator';
import { nextArrowWhite } from '../../assets';

class PledgeEvents extends Component {
  state = {
    loading: true,
    openSheet: true,
    myPledge: {}
  };

  imageStyle = {
    height: 30
  };
  componentDidMount() {
    this.props.fetchPledgesAction(this.props.navigation.getParam('slug'));
    this.getMyPledge();
    if (this.props.currentUserProfile) {
      this.setState({
        loggedIn: true
      });
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
    this.getMyPledge();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pledges !== this.props.pledges) {
      if (this.props.currentUserProfile) {
        this.setState({
          loggedIn: true
        });
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
      this.getMyPledge();
    }
    if (this.props.navigation.getParam('plantProject').id !== -1) {
      this.RBSheet.open();
      this.props.navigation.getParam('plantProject').id = -1;
    }
    if (this.props.pledges && this.props.pledges.image && this.state.loading) {
      this.setState({
        loading: false
      });
    }
  }

  getMyPledge = () => {
    let userPledges =
      this.props.entities && this.props.entities.eventPledge
        ? this.props.pledges &&
          this.props.pledges.allEventPledges &&
          this.props.pledges.allEventPledges.length > 0 // Checking if we have all the pledges
          ? typeof this.props.entities.eventPledge !== 'undefined'
            ? ((userPledges = Object.values(this.props.entities.eventPledge)), // convert object to array
              userPledges.filter(pledge => {
                return this.props.pledges.allEventPledges.some(f => {
                  return f.token === pledge.token && f.email === pledge.email;
                });
              }))
            : null
          : null
        : null;
    this.setState({
      myPledge: userPledges
    });
  };

  componentWillUnmount() {
    this.props.clearTimeoutAction(this.props.pledges.timeoutID);
  }

  render() {
    let myPledge = this.state.myPledge;
    let pledges =
      this.props.pledges && this.props.pledges.total !== undefined
        ? this.props.pledges
        : null;
    const navigation = this.props.navigation;
    return this.state.loading ? (
      <LoadingIndicator />
    ) : (
      <View style={styles.peRootView}>
        <ScrollView contentContainerStyle={styles.peRootScrollView}>
          <View style={styles.peHeader}>
            {/* Show Event Logo */}
            <Image
              style={styles.peHeaderLogo}
              source={{
                uri: getImageUrl(
                  'event',
                  'thumb',
                  navigation.getParam('eventImage')
                )
              }}
              resizeMode="contain"
            />
            {/* Shows Event Name */}
            <Text style={styles.eventTitle}>
              {navigation.getParam('eventName')}
            </Text>
          </View>

          {pledges &&
          pledges.highestPledgeEvents &&
          pledges.highestPledgeEvents.length > 0 ? (
            // If there are Pledges
            <View>
              <Text style={styles.eventSubTitle}>
                {i18n.t('label.treesPledgedAllPledges', {
                  treeCount: navigation.getParam('totalTrees').toLocaleString()
                })}
              </Text>
              <PledgeTabView pledges={pledges} />
            </View>
          ) : (
            // If there are no Pledges
            <View>
              <Text style={styles.eventSubTitle}>
                {i18n.t('label.noPledges')}
              </Text>
            </View>
          )}

          {/* Show Event Images */}
          {pledges &&
          pledges.pledgeEventImages &&
          pledges.pledgeEventImages.length > 0 ? (
            <EventImages pledgeEventImages={pledges.pledgeEventImages} />
          ) : null}

          {/* Show Event description */}
          <CardLayout style={styles.peDescriptionView}>
            <Text style={styles.peDescriptionText}>
              {navigation.getParam('description')}
            </Text>
          </CardLayout>
        </ScrollView>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={354}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center'
            }
          }}
        >
          <View style={styles.baContainer}>
            {/* <Image
            source={successAnimated}
            style={styles.baSuccessImage}
            resizeMode="cover"
          /> */}
            <Text style={styles.baMessage}>
              {i18n.t('label.pledgeAddedMessage', {
                treeCount: navigation.getParam('treeCount')
              })}
            </Text>

            <View style={styles.baButtonContainer}>
              <TouchableOpacity
                style={styles.baLaterButton}
                onPress={() => {
                  let unfulfilledEvent = {
                    eventSlug: pledges.slug,
                    treeCount: navigation.getParam('treeCount')
                  };
                  updateStaticRoute(
                    'app_unfulfilled_pledge_events',
                    navigation,
                    {
                      unfulfilledEvent: unfulfilledEvent
                    }
                  );
                  this.RBSheet.close();
                }}
              >
                <Text style={styles.baLaterText}>LATER</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.baContinueButton}
                onPress={() => {
                  updateStaticRoute(
                    getLocalRoute('app_donateTrees'),
                    navigation
                  );
                }}
              >
                <Text style={styles.baContinueText}>
                  {i18n.t('label.pledgeAddedContinueButton')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        {/* <View style={styles.bottomButtonView}>
          <View style={styles.leftSection}>
            <Text style={styles.pledgeTreesAmount}>500 Trees Planted</Text>
            <Text style={styles.pledgeTreesAction}>View my trees</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              updateStaticRoute('app_donate_detail2', navigation);
            }}
          >
            <View style={styles.continueButtonView}>
              <Icon name="arrow-right" size={30} color="#fff" />
              <Text style={styles.continueText}>Plant More</Text>
            </View>
          </TouchableOpacity>
        </View> */}

        {typeof myPledge !== 'undefined' && myPledge !== null ? (
          myPledge.length > 0 ? (
            <View style={styles.bottomButtonView}>
              <View style={styles.leftSection}>
                <Text style={styles.pledgeTreesAmount}>
                  {i18n.t('label.treesPledgedAllPledges', {
                    treeCount: myPledge[0].treeCount.toLocaleString()
                  })}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    updateStaticRoute('app_pledge_update_form', navigation, {
                      unfulfilledEvent: myPledge[0]
                    });
                  }}
                >
                  <Text style={styles.pledgeTreesAction}>
                    {i18n.t('label.increaseMyPledge')}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  updateRoute('app_donateTrees', navigation);
                }}
              >
                <View style={styles.continueButtonView}>
                  <Image
                    style={this.imageStyle}
                    source={nextArrowWhite}
                    resizeMode="contain"
                  />
                  <Text style={styles.continueText}>
                    {i18n.t('label.donate')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.makePledgeButton}
              onPress={() => {
                updateStaticRoute('app_pledge_form', navigation, {
                  slug: pledges.slug,
                  plantProject: pledges.plantProject,
                  eventName: navigation.getParam('eventName'),
                  eventDate: navigation.getParam('eventDate'),
                  totalTrees: navigation.getParam('totalTrees'),
                  eventImage: navigation.getParam('eventImage'),
                  description: navigation.getParam('description')
                });
              }}
            >
              <View style={styles.makePledgeButtonView}>
                <Text style={styles.makePledgeButtonText}>
                  {' '}
                  {i18n.t('label.makePledgeButton')}
                </Text>
              </View>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            style={styles.makePledgeButton}
            onPress={() => {
              updateStaticRoute('app_pledge_form', navigation, {
                slug: pledges.slug,
                plantProject: pledges.plantProject,
                eventName: navigation.getParam('eventName'),
                eventDate: navigation.getParam('eventDate'),
                totalTrees: navigation.getParam('totalTrees'),
                eventImage: navigation.getParam('eventImage'),
                description: navigation.getParam('description')
              });
            }}
          >
            <View style={styles.makePledgeButtonView}>
              <Text style={styles.makePledgeButtonText}>
                {' '}
                {i18n.t('label.makePledgeButton')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pledges: pledgesSelector(state),
  pledgeEvents: pledgeEventSelector(state),
  entities: entitiesSelector(state),
  currentUserProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPledgesAction,
      postPledge,
      clearTimeoutAction,
      fetchPublicPledgesAction,
      loadUserProfile
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeEvents);

// What this page Does
/*
1. Display Event Details - Event name, event image, event description and Total Trees
2. Recent and Highest Pledges
3. Buttons -
3.1 If there is no pledge made from this event by the user - Show Make a pledge button
3.2 If the user has pledged but not fulfilled show Donate/Increase pledge button
3.3 If the user has pledges and fulfilled show Plant More button

4. Show all Pledges (Not Added)
*/

function EventImages(props) {
  const pledgeImages = props.pledgeEventImages;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.peSliderScrollView}
    >
      {pledgeImages.map((pledgeImage, index) => (
        <Image
          key={`pledgeImage-${index}`}
          style={styles.peSliderImage}
          source={{
            uri: getImageUrl('eventGallery', 'default', pledgeImage.image)
          }}
          resizeMode="contain"
        />
      ))}
    </ScrollView>
  );
}
