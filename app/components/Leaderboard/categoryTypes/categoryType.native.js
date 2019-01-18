import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import TouchableItem from '../../Common/TouchableItem.native';
import { PropTypes } from 'prop-types';
import styles from '../../../styles/leaderboard/leader_board';

export default class CategoryType extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.index, this.props.category);
  }
  render() {
    return (
      <View style={styles.categoryType}>
        <View>
          <TouchableItem
            onPress={this.handleClick}
            style={{
              justifyContent: 'center',
              paddingTop: 4,
              paddingBottom: 4
            }}
          >
            <Text
              style={
                this.props.selected
                  ? styles.selectedBottomTypeLabel
                  : styles.bottomTypeLabel
              }
            >
              {this.props.title}
            </Text>
          </TouchableItem>
        </View>
        <View />
      </View>
    );
  }
}

CategoryType.propTypes = {
  index: PropTypes.any,
  onClick: PropTypes.func,
  selected: PropTypes.any,
  iconUrl: PropTypes.any,
  title: PropTypes.string
};
