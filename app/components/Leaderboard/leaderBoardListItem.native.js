import React, { Component } from 'react';
import { Text, View } from 'react-native';
import TouchableItem from '../Common/TouchableItem.native';
import { PropTypes } from 'prop-types';
// import styles from '../../../styles/leaderboard/leader_board';
import PlantedProgressBar from '../PlantProjects/PlantedProgressbar.native';

export default class LeaderboardItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('handle click here');
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <View>
          <Text>{this.props.index + 1}</Text>
        </View>
        <View
          style={{
            marginLeft: 10
          }}
        >
          <TouchableItem
            onPress={this.handleClick}
            style={{ justifyContent: 'center' }}
          >
            <Text
              style={{
                marginBottom: 10
              }}
            >
              {this.props.title}
            </Text>
            <PlantedProgressBar
              countPlanted={this.props.planted}
              countTarget={this.props.target}
            />
          </TouchableItem>
        </View>
      </View>
    );
  }
}

LeaderboardItem.propTypes = {
  index: PropTypes.any,
  onClick: PropTypes.func,
  planted: PropTypes.any,
  target: PropTypes.any,
  iconUrl: PropTypes.any,
  title: PropTypes.string
};
