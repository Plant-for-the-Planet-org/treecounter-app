import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { debug } from '../../../debug';
import CountryLoader from '../../Common/ContentLoader/LeaderboardRefresh/CountryLoader';
import styles from '../../../styles/LeaderboardRefresh/Countries/CountryLeaderboardStyle';
import i18n from '../../../locales/i18n';
import { delimitNumbers } from '../../../utils/utils';
import { updateRoute } from '../../../helpers/routerHelper/routerHelper.native';
import { LeaderBoardDataAction } from '../../../actions/exploreAction';
import { getCountryFlagImageUrl } from '../../../actions/apiRouting';
import Header from '../../Header/BackHeader';

const CountriesLeaderBoard = ({ navigation }) => {
  const [queryresult, setQueryResult] = useState(null);
  const [period, setPeriod] = useState('1w');
  const [orderBy] = useState('planted');

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
          debug(error);
        }
      );
    },
    [period]
  );
  const renderCountryList = () => {
    if (queryresult) {
      return (
        <FlatList
          initialNumToRender={50}
          showsVerticalScrollIndicator={false}
          data={queryresult}
          renderItem={({ item, index }) => {
            let countryCode = item.uri.split('/')[
              item.uri.split('/').length - 1
            ];
            const isPrivate = 'mayPublish' in item && !item.mayPublish;
            return (
              <TouchableOpacity
                onPress={() => (!isPrivate ? onPressCountry(item) : undefined)}
                style={styles.oneContryContainer}
              >
                <View style={styles.indexContainer}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View style={styles.countryFlagContainer}>
                  <Image
                    style={styles.countryFlagImage}
                    source={{
                      uri: getCountryFlagImageUrl(countryCode, 'png', 256)
                    }}
                  />
                </View>
                <View style={styles.countryBody}>
                  <View style={styles.countryNameCont}>
                    <Text numberOfLines={2} style={[styles.countryNameText]}>
                      {item.caption}
                    </Text>
                    {!isPrivate ? null : (
                      <View>
                        <Text style={styles.privateText}>
                          {i18n.t('label.private')}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.tressCounter}>
                    {delimitNumbers(item.planted)}{' '}
                    <Text style={styles.tressText}>
                      {i18n.t('label.trees')}
                    </Text>
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
  const onPressCountry = item => {
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
  debug('queryresult', queryresult);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
      >
        <View style={styles.headingAndSubHeadeingContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {i18n.t('label.lbr_c_countries')}
            </Text>
          </View>
          <View>
            <Text style={styles.subHeaderText}>
              {i18n.t('label.lbr_c_leaderboard')}
            </Text>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.timeLineContentContainerStyle}
          style={styles.timeLineContainer}
        >
          <TouchableOpacity
            onPress={() => setPeriod('1w')}
            style={
              styles[period == '1w' ? 'activeChipContainer' : 'chipContainer']
            }
          >
            <Text
              style={styles[period == '1w' ? 'activeChipText' : 'chipText']}
            >
              {i18n.t('label.lbr_c_this_week')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPeriod('1y')}
            style={
              styles[period == '1y' ? 'activeChipContainer' : 'chipContainer']
            }
          >
            <Text
              style={styles[period == '1y' ? 'activeChipText' : 'chipText']}
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
            <Text
              style={styles[period == 'all' ? 'activeChipText' : 'chipText']}
            >
              {i18n.t('label.lbr_c_all_time')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.countriesListContainer}>{renderCountryList()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CountriesLeaderBoard;
