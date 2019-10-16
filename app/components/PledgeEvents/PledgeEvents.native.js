import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import i18n from '../../locales/i18n';
import PledgeTabView from './PledgeTabView.native';
import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
import { bindActionCreators } from 'redux';
import { updateStaticRoute } from '../../helpers/routerHelper';
import CardLayout from '../Common/Card';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import {
  fetchPledgesAction,
  postPledge,
  clearTimeoutAction
} from '../../actions/pledgeAction';
import { pledgesSelector, pledgeEventSelector } from '../../selectors';
import RBSheet from 'react-native-raw-bottom-sheet';
import LoadingIndicator from './../Common/LoadingIndicator';
class PledgeEvents extends Component {
  state = {
    loading: true,
    openSheet: true
  };
  componentDidMount() {
    const eventSlug = this.props.navigation.getParam('slug');
    this.props.fetchPledgesAction(eventSlug);
  }

  componentDidUpdate() {
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

  componentWillUnmount() {
    this.props.clearTimeoutAction(this.props.pledges.timeoutID);
  }

  render() {
    const { navigation } = this.props;
    return this.state.loading ? (
      <LoadingIndicator />
    ) : (
      <View style={styles.peRootView}>
        <ScrollView contentContainerStyle={styles.peRootScrollView}>
          <View style={styles.peHeader}>
            <Image
              style={styles.peHeaderLogo}
              source={{
                uri: getImageUrl(
                  'event',
                  'thumb',
                  this.props.navigation.getParam('eventImage')
                )
              }}
              resizeMode="contain"
            />
            <Text style={styles.eventTitle}>
              {this.props.navigation.getParam('eventName')}
            </Text>
          </View>

          {this.props.pledges &&
          this.props.pledges.highestPledgeEvents &&
          this.props.pledges.highestPledgeEvents.length > 0 ? (
            // If there are Pledges
            <View>
              <Text style={styles.eventSubTitle}>
                {i18n.t('label.treesPledgedAllPledges', {
                  treeCount: this.props.navigation
                    .getParam('totalTrees')
                    .toLocaleString()
                })}
              </Text>
              <PledgeTabView pledges={this.props.pledges} />
            </View>
          ) : (
            // If there are no Pledges
            <View>
              <Text style={styles.eventSubTitle}>
                {i18n.t('label.noPledges')}
              </Text>
            </View>
          )}
          {this.props.pledges &&
          this.props.pledges.pledgeEventImages &&
          this.props.pledges.pledgeEventImages.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.peSliderScrollView}
            >
              {/* {pledgeImages} */}
              {this.props.pledges.pledgeEventImages.map(
                (pledgeImage, index) => (
                  <Image
                    key={`pledgeImage-${index}`}
                    style={styles.peSliderImage}
                    source={{
                      uri: getImageUrl(
                        'eventGallery',
                        'default',
                        pledgeImage.image
                      )
                    }}
                    resizeMode="contain"
                  />
                )
              )}
            </ScrollView>
          ) : null}
          <CardLayout style={styles.peDescriptionView}>
            <Text style={styles.peDescriptionText}>
              {this.props.navigation.getParam('description')}
            </Text>
          </CardLayout>
        </ScrollView>

        <TouchableOpacity
          style={styles.makePledgeButton}
          onPress={() => {
            updateStaticRoute('app_pledge_form', navigation, {
              slug: this.props.pledges.slug,
              plantProject: this.props.pledges.plantProject,
              eventName: this.props.navigation.getParam('eventName'),
              eventDate: this.props.navigation.getParam('eventDate'),
              totalTrees: this.props.navigation.getParam('totalTrees'),
              eventImage: this.props.navigation.getParam('eventImage'),
              description: this.props.navigation.getParam('description')
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
                treeCount: this.props.navigation.getParam('treeCount')
              })}
            </Text>

            <View style={styles.baButtonContainer}>
              <TouchableOpacity
                style={styles.baLaterButton}
                onPress={() => {
                  let unfulfilledEvent = {
                    eventSlug: this.props.pledges.slug,
                    treeCount: this.props.navigation.getParam('treeCount')
                  };
                  updateStaticRoute(
                    'app_unfulfilled_pledge_events',
                    this.props.navigation,
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

        {/* <View style={styles.bottomButtonView}>
          <View style={styles.leftSection}>
            <Text style={styles.pledgeTreesAmount}>500 Trees Planted</Text>
            <Text style={styles.pledgeTreesAction}>View my trees</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              updateStaticRoute('app_donate_detail2', this.props.navigation);
            }}
          >
            <View style={styles.continueButtonView}>
              <Icon name="arrow-right" size={30} color="#fff" />
              <Text style={styles.continueText}>Plant More</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pledges: pledgesSelector(state),
  pledgeEvents: pledgeEventSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchPledgesAction, postPledge, clearTimeoutAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeEvents);
