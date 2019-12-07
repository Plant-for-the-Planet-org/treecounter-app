import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../../styles/review.native';
// const { width, height } = Dimensions.get('window');

export default class SingleRating extends Component {
  generateStar(fill, score = 0) {
    let repeater = Array(fill ? Number(score) : 5 - Number(score)).fill(1);
    // console.log('repeater', repeater);
    return repeater.map((data, index) => (
      <Icon
        key={index}
        name="star"
        size={12}
        solid={fill}
        style={{ color: '#89b53a', marginLeft: 2 }}
      />
    ));
  }
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
          marginRight: 1
        }}
      >
        {this.props.name ? (
          <Text style={styles.ratingsText}>{this.props.name}</Text>
        ) : null}
        {this.props.indexScore
          ? this.generateStar(true, this.props.indexScore.score)
          : null}
        {this.props.indexScore
          ? this.generateStar(false, this.props.indexScore.score)
          : null}
      </View>
    );
  }
}
