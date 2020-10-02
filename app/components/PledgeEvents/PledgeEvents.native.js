import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debug } from '../../debug';
import i18n from '../../locales/i18n';
import PledgeTabView from './PledgeTabView.native';
import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import CardLayout from '../Common/Card';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { fetchPublicPledgesAction } from '../../actions/pledgeEventsAction';
import { loadUserProfile } from './../../actions/loadUserProfileAction';
import { fetchItem } from './../../stores/localStorage';
import { delimitNumbers } from './../../utils/utils';
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
import LoadingIndicator from './../Common/LoadingIndicator';
import { nextArrowWhite } from '../../assets';
import HeaderAnimatedImage from './../Header/HeaderAnimatedImage.native';

class PledgeEvents extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    loading: true,
    myPledge: {},
    slug: null,
    scrollY: new Animated.Value(0)
  };

  componentDidMount() {
    this.props.fetchPledgesAction(this.props.navigation.getParam('slug'), true);
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
        .catch(error => debug(error));
    }
    this.getMyPledge();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.pledges) !== JSON.stringify(this.props.pledges)
    ) {
      this.setState({
        slug: this.props.navigation.getParam('slug')
      });
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
          .catch(error => debug(error));
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

    let slug = this.state.slug;
    return this.state.loading ? (
      <LoadingIndicator contentLoader screen={'PledgeEvents'} />
    ) : (
      <SafeAreaView style={styles.peRootView}>
        <View>
          <HeaderAnimatedImage
            navigation={navigation}
            title={pledges.name}
            scrollY={this.state.scrollY}
            titleStyle={styles.eventTitle}
            imageStyle={styles.peHeaderLogo}
            imageSource={{
              uri: getImageUrl('event', 'thumb', pledges.image)
            }}
          />

          <EventDetails pledges={pledges} scrollY={this.state.scrollY} />

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
                  treeCount: this.props.navigation
                    .getParam('treeCount')
                    .toLocaleString()
                })}
              </Text>

              <View style={styles.baButtonContainer}>
                <TouchableOpacity
                  style={styles.baLaterButton}
                  onPress={() => {
                    this.props.fetchPledgesAction(slug);
                    this.RBSheet.close();
                  }}
                >
                  <Text style={styles.baLaterText}>
                    {i18n.t('label.pledgeAddedLaterButton')}
                  </Text>
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
      </SafeAreaView>
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
            treeCount: delimitNumbers(props.myPledge.treeCount)
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
    <Animated.ScrollView
      contentContainerStyle={styles.peRootScrollView}
      scrollEnabled
      scrollEventThrottle={16}
      onScroll={Animated.event([
        { nativeEvent: { contentOffset: { y: props.scrollY } } }
      ], { useNativeDriver: true })}
    >
      {/* <View style={styles.peHeader}>

      </View> */}

      {pledges &&
      pledges.highestPledgeEvents &&
      pledges.highestPledgeEvents.length > 0 ? (
        // If there are Pledges
        <View>
          <Text style={styles.eventSubTitle}>
            {i18n.t('label.treesPledgedAllPledges', {
              treeCount: delimitNumbers(pledges.total)
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
    </Animated.ScrollView>
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
