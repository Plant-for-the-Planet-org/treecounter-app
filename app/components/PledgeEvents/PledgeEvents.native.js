import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import LoadingIndicator from '../Common/LoadingIndicator';
import PledgeTabView from './PledgeTabView.native';
import { getImageUrl } from '../../actions/apiRouting';
import { bindActionCreators } from 'redux';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import CardLayout from '../Common/Card';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import {
  fetchPledgesAction,
  postPledge,
  clearTimeoutAction
} from '../../actions/pledgeAction';
import { pledgesSelector, pledgeEventSelector } from '../../selectors';

class PledgeEvents extends Component {
  state = {
    loading: true,
    openSheet: true
  };
  componentDidMount() {
    const eventSlug = this.props.navigation.getParam('slug');
    this.props.fetchPledgesAction(eventSlug);
  }

  componentWillUnmount() {
    this.props.clearTimeoutAction(this.props.pledges.timeoutID);
  }

  render() {
    const { navigation } = this.props;
    return (
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
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.peSliderScrollView}
            >
              {/* {pledgeImages} */}
              {this.props.pledges.pledgeEventImages.map(pledgeImage => (
                <Image
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
              ))}
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
