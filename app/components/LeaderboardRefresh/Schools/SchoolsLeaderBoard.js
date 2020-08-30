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
import { LeaderBoardDataAction } from '../../../actions/exploreAction';
import { getLocalRoute } from '../../../actions/apiRouting';
import { getImageUrl } from '../../../actions/apiRouting';
import Header from '../../Header/BackHeader';
import GetRandomImage from '../../../utils/getRandomImage';

const SchoolsLeaderBoard = ({ navigation }) => {
  const [queryresult, setQueryResult] = useState(null);
  const [period, setPeriod] = useState('1y');
  const [orderBy] = useState('planted');

  useEffect(() => {
    setQueryResult(null);
    const section = navigation.getParam('category');
    LeaderBoardDataAction({
      section,
      orderBy,
      period,
      subSection: undefined
    }).then(
      success => {
        if (success.data && success.data instanceof Object && success.data.data)
          setQueryResult(success.data.data);
      },
      error => {
        debug(error);
      }
    );
  }, [period]);
  const renderSchoolsList = () => {
    if (queryresult) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={queryresult}
          renderItem={({ item, index }) => (
            <CompanyListItem
              onPressListItem={onPressListItem}
              item={item}
              index={index}
            />
          )}
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
  debug('queryresult', queryresult);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headingAndSubHeadeingContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{i18n.t('label.lbr_schools')}</Text>
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
        <View style={styles.countriesListContainer}>{renderSchoolsList()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
const CompanyListItem = ({ onPressListItem, item, index }) => {
  const [isPress, setIsPress] = useState(false);
  const isPrivate = 'mayPublish' in item && !item.mayPublish;
  return (
    <TouchableOpacity
      onPress={() =>
        !isPrivate
          ? onPressListItem(item.treecounterId, item.caption)
          : setIsPress(true)
      }
      style={styles.oneContryContainer}
    >
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <View style={styles.countryFlagContainer}>
        {item.contributorAvatar ? (
          <Image
            style={styles.countryFlagImage}
            source={{
              uri: getImageUrl('profile', 'avatar', item.contributorAvatar)
            }}
          />
        ) : (
            <GetRandomImage name={item.caption} />
          )}
      </View>
      <View style={styles.countryBody}>
        <View style={styles.countryNameCont}>
          <Text
            numberOfLines={2}
            style={[
              styles.countryNameText,
              { maxWidth: isPress ? '50%' : '100%' }
            ]}
          >
            {item.caption}
          </Text>
          {isPress ? (
            <View>
              <Text style={styles.privateText}>{i18n.t('label.private')}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.tressCounter}>
          {delimitNumbers(item.planted)}{' '}
          <Text style={styles.tressText}>{i18n.t('label.trees')}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SchoolsLeaderBoard;
