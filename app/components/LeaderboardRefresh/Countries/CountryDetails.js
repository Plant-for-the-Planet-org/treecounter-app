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
import styles from '../../../styles/LeaderboardRefresh/Countries/CountriesDetailsStyle';
import i18n from '../../../locales/i18n';
import BackHeader from '../Header/BackHeader';
import {
  ExploreDataAction,
  LeaderBoardDataAction
} from '../../../actions/exploreAction';
import { getLocalRoute } from '../../../actions/apiRouting';

const CountryDetails = ({ navigation }) => {
  const [queryresult, setQueryResult] = useState(null);
  const [period, setPeriod] = useState('all');
  const [section, setSection] = useState('');
  const [orderBy, setOrderBy] = useState('planted');

  useEffect(
    () => {
      const section = navigation.getParam('section');
      const subSection = navigation.getParam('subSection');
      const caption = navigation.getParam('caption');
      setQueryResult(null);
      setSection(caption);
      console.log(section, subSection, caption, 'Sections');
      LeaderBoardDataAction({
        section,
        orderBy: orderBy,
        period: period,
        subSection: subSection
      }).then(
        success => {
          if (
            success.data &&
            success.data instanceof Object &&
            success.data.data
          )
            console.log(success.data.data, 'success.data.data Country Details');
          setQueryResult(success.data.data);
        },
        error => {
          console.log(error);
        }
      );
    },
    [period]
  );

  const _renderList = () => {
    if (queryresult) {
      return (
        <FlatList
          data={queryresult}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  _onPressListItem(item.treecounterId, item.caption);
                }}
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
  const _onPressListItem = (treeCounterId, title) => {
    if (treeCounterId) {
      navigation.navigate(getLocalRoute('app_treecounter'), {
        treeCounterId,
        titleParam: title
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* <BackHeader /> */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{section}</Text>
      </View>
      <View>
        <Text style={styles.subHeaderText}>
          {i18n.t('label.lbr_c_d_leaderboard')}
        </Text>
      </View>
      <View style={styles.timeLineContainer}>
        <TouchableOpacity
          onPress={() => setPeriod('')}
          style={styles[period == '' ? 'activeChipContainer' : 'chipContainer']}
        >
          <Text style={styles[period == '' ? 'activeChipText' : 'chipText']}>
            {i18n.t('label.lbr_c_d_this_week')}
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
            {i18n.t('label.lbr_c_d_year')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPeriod('all')}
          style={
            styles[period == 'all' ? 'activeChipContainer' : 'chipContainer']
          }
        >
          <Text style={styles[period == 'all' ? 'activeChipText' : 'chipText']}>
            {i18n.t('label.lbr_c_d_all_time')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.countriesListContainer}>{_renderList()}</View>
    </View>
  );
};

export default CountryDetails;
