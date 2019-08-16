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
import { fetchPledgesAction } from './../../actions/pledgeAction';
import { pledgesSelector } from './../../selectors';
import PledgeTabView from './PledgeTabView.native';
import { getImageUrl } from '../../actions/apiRouting';
import { bindActionCreators } from 'redux';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import { eventCover } from './../../assets';
import CardLayout from '../Common/Card';
import styles from './../../styles/pledgeevents/pledgeevents.native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class PledgeEvents extends Component {
  state = {
    allPledgeImagesNew: [],
    pledges: {}
  };

  componentDidMount() {
    const eventSlug = this.props.navigation.getParam('slug');
    this.props.fetchPledgesAction(eventSlug);
  }

  componentDidUpdate() {
    if (
      Object.keys(this.state.pledges).length === 0 &&
      this.state.pledges.constructor === Object
    ) {
      this.setState({
        pledges: this.props.pledges.pledges
      });
    }
  }
  render() {
    const { navigation, userProfile, isLoggedIn } = this.props;
    //console.log(this.state.pledges.description);
    console.log(this.state.pledges.pledgeEventImages);

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

          {this.state.pledges && this.state.pledges.highestPledgeEvents ? (
            // If there are Pledges
            <View>
              <Text style={[styles.eventSubTitle, { marginHorizontal: 20 }]}>
                {i18n.t('label.treesPledgedAllPledges', {
                  treeCount: this.props.navigation
                    .getParam('totalTrees')
                    .toLocaleString()
                })}
              </Text>
              <PledgeTabView pledges={this.state.pledges} />
            </View>
          ) : (
            // If there are no Pledges
            <View style={{ marginHorizontal: 20 }}>
              <Text style={styles.eventSubTitle}>
                {i18n.t('label.noPledges')}
              </Text>
            </View>
          )}

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.peSliderScrollView}
          >
            {/* {pledgeImages} */}
            {this.state.pledges && this.state.pledges.pledgeEventImages
              ? this.state.pledges.pledgeEventImages.map(pledgeImage => (
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
                ))
              : null}
          </ScrollView>
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
              slug: this.state.pledges.slug,
              plantProject: this.state.pledges.plantProject
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
  pledges: state.pledges
});

PledgeEvents.propTypes = {
  pledges: PropTypes.object.isRequired,
  navigation: PropTypes.any
};
export default connect(mapStateToProps, { fetchPledgesAction })(PledgeEvents);
