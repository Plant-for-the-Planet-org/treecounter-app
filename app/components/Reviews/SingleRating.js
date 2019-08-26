import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
export default class SingleRating extends Component {
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
          <Text style={styles.ratingsText}>Land Quality</Text>
          <Icon
            name="star"
            size={12}
            solid
            style={{ color: '#89b53a', marginLeft: 5 }}
          />
          <Icon
            name="star"
            size={12}
            solid
            style={{ color: '#89b53a', marginLeft: 5 }}
          />
          <Icon
            name="star"
            size={12}
            solid
            style={{ color: '#89b53a', marginLeft: 5 }}
          />
          <Icon
            name="star"
            size={12}
            solid
            style={{ color: '#89b53a', marginLeft: 5 }}
          />
          <Icon
            name="star"
            size={12}
            style={{ color: '#4d5153', marginLeft: 5 }}
          />
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
