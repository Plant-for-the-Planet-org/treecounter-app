import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
export default class SingleRating extends Component {
  generateStar(fill, score = 0) {
    let repeater = Array(fill ? score : 5 - score).fill(1);
    console.log('repeater', repeater);
    return repeater.map(() => (
      <Icon
        name="star"
        size={12}
        solid={fill ? true : false}
        style={{ color: '#89b53a', marginLeft: 5 }}
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
          <Text style={styles.ratingsText}>{this.props.name}</Text>
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
    fontFamily: 'OpenSans',
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
