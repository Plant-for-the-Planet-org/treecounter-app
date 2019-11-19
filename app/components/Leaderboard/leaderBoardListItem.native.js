import React, { Component, lazy } from 'react';
import { Text, View } from 'react-native';
import { PropTypes } from 'prop-types';

const PlantedProgressBar = lazy(() =>
  import('../PlantProjects/PlantedProgressbar.native')
);
const TouchableItem = lazy(() => import('../Common/TouchableItem.native'));

import styles from '../../styles/leaderboard/leader_board';
import UserProfileImage from '../Common/UserProfileImage.native';

export default class LeaderboardItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.itemView}>
        <View style={styles.numberContainer}>
          <Text style={styles.itemViewText}>{this.props.index + 1}</Text>
        </View>
        <View style={[{ marginLeft: 10, marginRight: 5, width: '75%' }]}>
          <TouchableItem
            onPress={() =>
              this.props.onPress(
                this.props.treeCounterId,
                this.props.uri,
                this.props.title
              )
            }
            style={{ justifyContent: 'center' }}
          >
            <View>
              <Text style={styles.itemViewText}>{this.props.title}</Text>

              <PlantedProgressBar
                countPlanted={this.props.planted}
                countTarget={this.props.target}
                hideTargetImage
              />
            </View>
          </TouchableItem>
        </View>
        <UserProfileImage profileImage={this.props.image} />
      </View>
    );
  }
}

LeaderboardItem.propTypes = {
  index: PropTypes.any,
  onClick: PropTypes.func,
  planted: PropTypes.any,
  target: PropTypes.any,
  image: PropTypes.any,
  title: PropTypes.string,
  treeCounterId: PropTypes.any,
  onPress: PropTypes.func,
  uri: PropTypes.any
};
