import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CountryLoader from '../../Common/ContentLoader/LeaderboardRefresh/CountryLoader';
import styles from '../../../styles/LeaderboardRefresh/Countries/CountryLeaderboardStyle';
import i18n from '../../../locales/i18n';

const CountriesLeaderBoard = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{i18n.t('label.lbr_c_countries')}</Text>
      </View>
      <View>
        <Text style={styles.subHeaderText}>
          {i18n.t('label.lbr_c_leaderboard')}
        </Text>
      </View>
      <View style={styles.timeLineContainer}>
        <View style={styles.activeChipContainer}>
          <Text style={styles.activeChipText}>
            {i18n.t('label.lbr_c_this_week')}
          </Text>
        </View>
        <View style={styles.chipContainer}>
          <Text style={styles.chipText}>{i18n.t('label.lbr_c_year')}</Text>
        </View>
        <View style={styles.chipContainer}>
          <Text style={styles.chipText}>{i18n.t('label.lbr_c_all_time')}</Text>
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
