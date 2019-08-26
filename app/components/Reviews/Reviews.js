import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SingleReview from './SingleReview';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import { updateStaticRoute } from './../../helpers/routerHelper';
export default class Reviews extends Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
          backgroundColor: '#ecf0f1'
        }}
      >
        {/*Header*/}
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 30,
            paddingBottom: 30
          }}
        >
          <View
            style={{
              width: width * 0.88,
              marginLeft: width * 0.06,
              backgroundColor: 'white'
            }}
          >
            <Text style={styles.reviewPageTitle}>
              20 Million Trees for Kenya's Forests ...
            </Text>
            <Text style={styles.reviewPageSubTitle}>Community Reviews</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 7,
                alignItems: 'center'
              }}
            >
              <Text style={styles.totalRating}>4.2</Text>
              <Icon name="star" solid size={12} style={{ color: '#4d5153' }} />
            </View>
          </View>
        </View>

        {/*All Reviews*/}
        <View style={{ paddingTop: 20, backgroundColor: '#ecf0f1' }}>
          <SingleReview />
          <SingleReview />
          <SingleReview />
        </View>

        {/* All Reviews Ended */}

        {/*Write Review*/}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ecf0f1'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              updateStaticRoute('app_add_review', this.props.navigation);
            }}
            style={styles.writeReviewButton}
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Write a Review
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  reviewPageTitle: {
    fontSize: 27,
    lineHeight: 40,
    color: '#4d5153',
    fontFamily: 'OpenSans',
    fontWeight: '800',
    fontStyle: 'normal'
  },
  reviewPageSubTitle: {
    fontFamily: 'OpenSans',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: '#4d5153',
    marginTop: 7
  },
  totalRating: {
    opacity: 0.8,
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    color: '#4d5153',
    marginRight: 5
  },
  writeReviewButton: {
    paddingHorizontal: 36,
    backgroundColor: '#89b53a',
    height: 52,
    borderRadius: 24,
    marginTop: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
