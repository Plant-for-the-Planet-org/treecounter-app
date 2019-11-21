import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
        style={{ color: '#89b53a', marginLeft: 3 }}
      />
    ));
  }
  render() {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingsText: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginRight: 7
  }
});
