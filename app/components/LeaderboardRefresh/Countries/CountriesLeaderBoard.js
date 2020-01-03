import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import CountryLoader from '../../Common/ContentLoader/LeaderboardRefresh/CountryLoader';
import styles from '../../../styles/LeaderboardRefresh/Countries/CountryLeaderboardStyle';
import i18n from '../../../locales/i18n';
import Header from '../Header/BackHeader';
import { updateRoute } from '../../../helpers/routerHelper/routerHelper.native';
import {
  ExploreDataAction,
  LeaderBoardDataAction
} from '../../../actions/exploreAction';

const CountriesLeaderBoard = ({ navigation }) => {
  const [queryresult, setQueryResult] = useState(null);
  const [period, setPeriod] = useState('all');
  const [orderBy, setOrderBy] = useState('planted');

  useEffect(
    () => {
      setQueryResult(null);
      const section = navigation.getParam('category');
      LeaderBoardDataAction({
        section,
        orderBy,
        period,
        subSection: undefined
      }).then(
        success => {
          if (
            success.data &&
            success.data instanceof Object &&
            success.data.data
          )
            setQueryResult(success.data.data);
        },
        error => {
          console.log(error);
        }
      );
    },
    [period]
  );
  const _renderCountryList = () => {
    if (queryresult) {
      return (
        <FlatList
          data={queryresult}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => _onPressCountry(item)}
                style={styles.oneContryContainer}
              >
                <View style={styles.indexContainer}>
                  <Text style={styles.indexText}>{index + 1}</Text>
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
                  <Text style={styles.countryNameText}>{item.caption}</Text>
                  <Text style={styles.tressCounter}>
                    {item.planted}{' '}
                    <Text style={styles.tressText}>{' trees'}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      );
    } else {
      return (
        <>
          <CountryLoader />
          <CountryLoader />
          <CountryLoader />
        </>
      );
    }
  };
  const _onPressCountry = item => {
    console.log(item, 'itemitemitem');
    const section = navigation.getParam('category');
    let uriArray = item.uri.split('/');
    let subSection = uriArray[uriArray.length - 1];
    let caption = item.caption;
    updateRoute('country_details_leaderboard', navigation, undefined, {
      section,
      subSection,
      caption
    });
  };
  console.log('queryresult', queryresult);
  return (
    <View style={styles.mainContainer}>
      {/* <Header /> */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{i18n.t('label.lbr_c_countries')}</Text>
      </View>
      <View>
        <Text style={styles.subHeaderText}>
          {i18n.t('label.lbr_c_leaderboard')}
        </Text>
      </View>
      <View style={styles.timeLineContainer}>
        <TouchableOpacity
          onPress={() => setPeriod('')}
          style={styles[period == '' ? 'activeChipContainer' : 'chipContainer']}
        >
          <Text style={styles[period == '' ? 'activeChipText' : 'chipText']}>
            {i18n.t('label.lbr_c_this_week')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPeriod('1-year')}
          style={
            styles[period == '1-year' ? 'activeChipContainer' : 'chipContainer']
          }
        >
          <Text
            style={styles[period == '1-year' ? 'activeChipText' : 'chipText']}
          >
            {i18n.t('label.lbr_c_year')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPeriod('all')}
          style={
            styles[period == 'all' ? 'activeChipContainer' : 'chipContainer']
          }
        >
          <Text style={styles[period == 'all' ? 'activeChipText' : 'chipText']}>
            {i18n.t('label.lbr_c_all_time')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.countriesListContainer}>{_renderCountryList()}</View>
    </View>
  );
};

export default CountriesLeaderBoard;