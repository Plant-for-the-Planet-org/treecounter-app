import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import AddRatingSection from './AddRatingSection';
const { width, height } = Dimensions.get('window');
import { forward } from './../../../assets';

export default class AddReview extends Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
          backgroundColor: '#fff',
          flexGrow: 1
        }}
      >
        {/*Header*/}
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 30
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
            <Text style={styles.reviewPageSubTitle}>Add Project Review</Text>
          </View>
        </View>

        {/*All Reviews*/}
        <View>
          <AddRatingSection />
        </View>

        {/* All Reviews Ended */}

        {/*Write Review*/}
        <TouchableOpacity style={styles.pledgeSmallButton}>
          <Image
            source={forward}
            resizeMode="cover"
            style={{ height: 32, width: 32 }}
          />
        </TouchableOpacity>
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
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7,
    marginBottom: 45
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
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#27ae60',
    borderRadius: 72,
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 24
  },
  pledgeSmallButton: {
    backgroundColor: '#89b53a',
    height: 54,
    width: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: '80%'
  }
});
