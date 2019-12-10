import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import i18n from '../../locales/i18n';
import PledgeTabView from './PledgeTabView.native';
import { getImageUrl } from '../../actions/apiRouting';
import { bindActionCreators } from 'redux';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import CardLayout from '../Common/Card';
import styles from '../../styles/pledgeevents/pledgeevents.native';
import {
  fetchPledgesAction,
  postPledge,
  clearTimeoutAction
} from '../../actions/pledgeAction';
import {
  pledgesSelector,
  pledgeEventSelector,
  entitiesSelector
} from '../../selectors';
import LoadingIndicator from '../Common/LoadingIndicator';
import PropTypes from 'prop-types';
import { nextArrowWhite } from '../../assets';
import { delimitNumbers } from './../../utils/utils';

class UnfulfilledPledgeEvents extends Component {
  state = {
    loading: true
  };

  imageStyle = {
    height: 30
  };

  componentDidMount() {
    const eventSlug = this.props.navigation.getParam('unfulfilledEvent')
      .eventSlug;
    this.props.fetchPledgesAction(eventSlug, true);
  }

  componentDidUpdate() {
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
    const unfulfilledEvent = this.props.navigation.getParam('unfulfilledEvent');
    return this.state.loading ? (
      <LoadingIndicator />
    ) : (
      <View style={styles.peRootView}>
        <ScrollView contentContainerStyle={styles.peRootScrollView}>
          <View style={styles.peHeader}>
            <Image
              style={styles.peHeaderLogo}
              source={{
                uri: getImageUrl('event', 'thumb', this.props.pledges.image)
              }}
              resizeMode="contain"
            />
            <Text style={styles.eventTitle}>{this.props.pledges.name}</Text>
          </View>

          {this.props.pledges &&
          this.props.pledges.highestPledgeEvents &&
          this.props.pledges.highestPledgeEvents.length > 0 ? (
            // If there are Pledges
            <View>
              <Text style={styles.eventSubTitle}>
                {i18n.t('label.treesPledgedAllPledges', {
                  treeCount: delimitNumbers(this.props.pledges.total)
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.peSliderScrollView}
          >
            {/* {pledgeImages} */}
            {this.props.pledges.pledgeEventImages.map((pledgeImage, index) => (
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

          <CardLayout style={styles.peDescriptionView}>
            <Text style={styles.peDescriptionText}>
              {this.props.pledges.description}
            </Text>
          </CardLayout>
        </ScrollView>

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

        <View style={styles.bottomButtonView}>
          <View style={styles.leftSection}>
            <Text style={styles.pledgeTreesAmount}>
              {unfulfilledEvent
                ? i18n.t('label.treesPledgedAllPledges', {
                    treeCount: delimitNumbers(unfulfilledEvent.treeCount)
                  })
                : null}
            </Text>
            <TouchableOpacity
              onPress={() => {
                updateStaticRoute(
                  'app_pledge_update_form',
                  this.props.navigation,
                  {
                    unfulfilledEvent: unfulfilledEvent
                  }
                );
              }}
            >
              <Text style={styles.pledgeTreesAction}>
                {i18n.t('label.increaseMyPledge')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              updateRoute('app_donateTrees', this.props.navigation);
            }}
          >
            <View style={styles.continueButtonView}>
              <Image
                style={this.imageStyle}
                source={nextArrowWhite}
                resizeMode="contain"
              />
              <Text style={styles.continueText}>Donate</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pledges: pledgesSelector(state),
  pledgeEvents: pledgeEventSelector(state),
  entities: entitiesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchPledgesAction, postPledge, clearTimeoutAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UnfulfilledPledgeEvents
);

UnfulfilledPledgeEvents.propTypes = {
  fetchPledgesAction: PropTypes.func
};
