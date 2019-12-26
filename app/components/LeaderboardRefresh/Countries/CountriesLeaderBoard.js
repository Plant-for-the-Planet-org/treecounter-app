import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CountryLoader from '../../Common/ContentLoader/LeaderboardRefresh/CountryLoader';
import styles from '../../../styles/LeaderboardRefresh/Countries/CountryLeaderboardStyle';

const CountriesLeaderBoard = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Countries</Text>
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
            <Text style={styles.indexText}>1</Text>
          </View>
          <View style={styles.countryFlagContainer}>
            <Image
              style={styles.countryFlagImage}
              source={{
                uri:
                  'https://cdn4.iconfinder.com/data/icons/material-circular-world-flags/180/circle_china_flag_nation_country-512.png'
              }}
            />
          </View>
          <View style={styles.countryBody}>
            <Text style={styles.countryNameText}>China</Text>
            <Text style={styles.tressCounter}>
              2,407,149,343 <Text style={styles.tressText}>{' trees'}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CountriesLeaderBoard;
