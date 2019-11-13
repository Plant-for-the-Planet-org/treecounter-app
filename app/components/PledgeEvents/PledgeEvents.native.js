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
    myPledge: {}
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
        <EventDetails pledges={pledges} />

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
            <Text style={styles.baMessage}>
              {i18n.t('label.pledgeAddedMessage', {
                treeCount: this.props.navigation.getParam('treeCount')
              })}
            </Text>

            <View style={styles.baButtonContainer}>
              <TouchableOpacity
                style={styles.baLaterButton}
                onPress={() => {
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
                    this.props.navigation
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

        {typeof myPledge !== 'undefined' && myPledge !== null ? (
          myPledge.length > 0 ? (
            <FulfillPledgeButton
              myPledge={myPledge[0]}
              pledges={pledges}
              navigation={navigation}
            />
          ) : (
            <MakePledgeButton navigation={navigation} pledges={pledges} />
          )
        ) : (
          <MakePledgeButton navigation={navigation} pledges={pledges} />
        )}
      </View>
    );
  }
}

function MakePledgeButton(props) {
  return (
    <TouchableOpacity
      style={styles.makePledgeButton}
      onPress={() => {
        updateStaticRoute('app_pledge_form', props.navigation, {
          slug: props.pledges.slug,
          plantProject: props.pledges.plantProject
        });
      }}
    >
      <View style={styles.makePledgeButtonView}>
        <Text style={styles.makePledgeButtonText}>
          {i18n.t('label.makePledgeButton')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function FulfillPledgeButton(props) {
  const imageStyle = {
    height: 30
  };
  return (
    <View style={styles.bottomButtonView}>
      <View style={styles.leftSection}>
        <Text style={styles.pledgeTreesAmount}>
          {i18n.t('label.treesPledgedAllPledges', {
            treeCount: props.myPledge.treeCount.toLocaleString()
          })}
        </Text>
        <TouchableOpacity
          onPress={() => {
            updateStaticRoute('app_pledge_update_form', props.navigation, {
              unfulfilledEvent: props.myPledge,
              slug: props.pledges.slug,
              plantProject: props.pledges.plantProject
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
          updateRoute('app_donateTrees', props.navigation);
        }}
      >
        <View style={styles.continueButtonView}>
          <Image
            style={imageStyle}
            source={nextArrowWhite}
            resizeMode="contain"
          />
          <Text style={styles.continueText}>{i18n.t('label.donate')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function EventDetails(props) {
  let pledges = props.pledges;
  return (
    <ScrollView contentContainerStyle={styles.peRootScrollView}>
      <View style={styles.peHeader}>
        {/* Show Event Logo */}
        <Image
          style={styles.peHeaderLogo}
          source={{
            uri: getImageUrl('event', 'thumb', pledges.image)
          }}
          resizeMode="contain"
        />
        {/* Shows Event Name */}
        <Text style={styles.eventTitle}>{pledges.name}</Text>
      </View>

      {pledges &&
      pledges.highestPledgeEvents &&
      pledges.highestPledgeEvents.length > 0 ? (
        // If there are Pledges
        <View>
          <Text style={styles.eventSubTitle}>
            {i18n.t('label.treesPledgedAllPledges', {
              treeCount: pledges.total
            })}
          </Text>
          {/* All the pledges are here */}
          <PledgeTabView pledges={pledges} />
        </View>
      ) : (
        // If there are no Pledges
        <View>
          <Text style={styles.eventSubTitle}>{i18n.t('label.noPledges')}</Text>
        </View>
      )}

      {/* Show Event Images */}
      {pledges &&
      pledges.pledgeEventImages &&
      pledges.pledgeEventImages.length > 0 ? (
        <EventImages pledgeEventImages={pledges.pledgeEventImages} />
      ) : null}

      {/* Show Event description */}
      {pledges.description ? (
        <CardLayout style={styles.peDescriptionView}>
          <Text style={styles.peDescriptionText}>{pledges.description}</Text>
        </CardLayout>
      ) : null}
    </ScrollView>
  );
}

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
