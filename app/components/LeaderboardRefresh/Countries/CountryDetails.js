import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CountryLoader from '../../Common/ContentLoader/LeaderboardRefresh/CountryLoader';
import styles from '../../../styles/LeaderboardRefresh/Countries/CountriesDetailsStyle';

class CountryDetails extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{'Bosnia and\nHerzegovina'}</Text>
        </View>
        <View>
          <Text style={styles.subHeaderText}>Leaderboard</Text>
        </View>
        <View style={styles.timeLineContainer}>
          <View style={styles.activeChipContainer}>
            <Text style={styles.activeChipText}>This week</Text>
          </View>
          <View style={styles.chipContainer}>
            <Text style={styles.chipText}>1 Year</Text>
          </View>
          <View style={styles.chipContainer}>
            <Text style={styles.chipText}>All Time</Text>
          </View>
        </View>
        <View style={styles.countriesListContainer}>
          <CountryLoader />
          <View style={styles.oneContryContainer}>
            <View style={styles.indexContainer}>
              <Text style={styles.indexText}>{'1'}</Text>
            </View>
            <View style={styles.countryFlagContainer}>
              <Image
                style={styles.countryFlagImage}
                resizeMode={'contain'}
                source={{
                  uri:
                    'https://cdn5.vectorstock.com/i/1000x1000/23/49/new-man-avatar-icon-flat-vector-19152349.jpg'
                }}
              />
            </View>
            <View style={styles.countryBody}>
              <Text style={styles.countryNameText}>Cheryl Carter</Text>
              <Text style={styles.tressCounter}>
                12000 <Text style={styles.tressText}>{' trees'}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CountryDetails;
