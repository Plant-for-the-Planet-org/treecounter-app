import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import CountryLoader from '../../Common/ContentLoader/LeaderboardRefresh/CountryLoader';
import styles from '../../../styles/LeaderboardRefresh/Countries/CountryLeaderboardStyle';
import i18n from '../../../locales/i18n';
import { getLocalRoute } from '../../../actions/apiRouting';
import { LeaderBoardDataAction } from '../../../actions/exploreAction';
import { getImageUrl } from '../../../actions/apiRouting';
import Header from '../../Header/BackHeader';

const IndividualsLeaderBoard = ({ navigation }) => {
  const [queryresult, setQueryResult] = useState(null);
  const [period, setPeriod] = useState('all');
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
          console.log(success.data.data, 'success.data.data');
        },
        error => {
          console.log(error);
        }
      );
    },
    [period]
  );
  const renderIndividualsList = () => {
    if (queryresult) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={queryresult}
          renderItem={({ item, index }) => {
            const isPrivate =
              item.hasOwnProperty('mayPublish') && !item.mayPublish;
            return (
              <TouchableOpacity
                onPress={() => {
                  !isPrivate
                    ? onPressListItem(item.treecounterId, item.caption)
                    : undefined;
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
                      uri: getImageUrl(
                        'profile',
                        'avatar',
                        item.contributorAvatar
                      )
                    }}
                  />
                </View>
                <View style={styles.countryBody}>
                  <Text numberOfLines={2} style={styles.countryNameText}>
                    {item.caption}
                  </Text>
                  <Text style={styles.tressCounter}>
                    {item.planted
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
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

  const onPressListItem = (treeCounterId, title) => {
    if (treeCounterId) {
      navigation.navigate(getLocalRoute('app_treecounter'), {
        treeCounterId,
        titleParam: title
      });
    }
  };
  console.log('queryresult', queryresult);
  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {i18n.t('label.lbr_individuals')}
          </Text>
        </View>
        <View>
          <Text style={styles.subHeaderText}>
            {i18n.t('label.lbr_c_leaderboard')}
          </Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.timeLineContentContainerStyle}
          style={styles.timeLineContainer}
        >
          <TouchableOpacity
            disabled
            onPress={() => setPeriod('')}
            style={
              styles[period == '' ? 'activeChipContainer' : 'chipContainer']
            }
          >
            <Text style={styles[period == '' ? 'activeChipText' : 'chipText']}>
              {i18n.t('label.lbr_c_this_week')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            onPress={() => setPeriod('1-year')}
            style={
              styles[
                period == '1-year' ? 'activeChipContainer' : 'chipContainer'
              ]
            }
          >
            <Text
              style={styles[period == '1-year' ? 'activeChipText' : 'chipText']}
            >
              {i18n.t('label.lbr_c_year')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
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
        <View style={styles.countriesListContainer}>
          {renderIndividualsList()}
        </View>
      </ScrollView>
    </View>
  );
};

export default IndividualsLeaderBoard;
