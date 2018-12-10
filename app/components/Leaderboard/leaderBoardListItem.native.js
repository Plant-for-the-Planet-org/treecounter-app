import React, { Component } from 'react';
import { Text, View } from 'react-native';
import TouchableItem from '../Common/TouchableItem.native';
import { PropTypes } from 'prop-types';
import PlantedProgressBar from '../PlantProjects/PlantedProgressbar.native';

export default class LeaderboardItem extends Component {
  constructor(props) {
    super(props);
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
            onPress={() => this.props.onPress(this.props.treeCounterId)}
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
              hideTargetImage
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
  title: PropTypes.string,
  treeCounterId: PropTypes.any,
  onPress: PropTypes.func
};
