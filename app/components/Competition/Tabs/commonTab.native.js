/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import i18n from '../../../locales/i18n';
import styles from '../../../styles/competition/competition-master.native';
import colors from '../../../utils/constants';
import CompetitionSnippet from '../CompetitionSnippet.native';
import { empty, trees } from './../../../assets';
import { CompetitionLoader } from './../../Common/ContentLoader';

const CompetitionFinishedMessage = () => {
  return (
    <View style={styles.caughtUpMessageContainer}>
      <View style={[styles.caughtUpLine, { marginRight: 10 }]} />
      <Text style={styles.caughtUpMessage}>
        {i18n.t('label.you_are_all_caught_up')}
      </Text>
      <View style={[styles.caughtUpLine, { marginLeft: 10 }]} />
    </View>
  );
};
const CommonTab = props => {
  const [showCompetitions, setShowCompetitions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [isCompetitionFinished, setCompetitionFinished] = useState(false);

  const onRefresh = async () => {
    setShowLoader(true);
    setRefreshing(true);
    if (props.tabType !== 'mine') {
      setPage(1);
      setShowCompetitions([]);
      setCompetitionFinished(false);
    }
    await props.fetchCompetitions(props.tabType, 1);
    setRefreshing(false);
    setShowLoader(false);
  };

  let CurrentDate = new Date();

  const getAllCompetitions = pageNo => {
    props.fetchCompetitions(props.tabType, pageNo);
  };

  useEffect(() => {
    let showCompetitionsArr = [];
    if (props.competitionsArr.length > 0) {
      for (let i = 0; i < props.competitionsArr.length; i++) {
        if (props.competitionsArr[i].category === props.tabType) {
          for (
            let j = 0;
            j < props.competitionsArr[i].competitions.length;
            j++
          ) {
            if (props.tabType !== 'mine') {
              let endDate = props.competitionsArr[i].competitions[j].endDate;
              endDate = new Date(endDate);
              if (props.tabType === 'archived') {
                if (CurrentDate > endDate) {
                  showCompetitionsArr.push(
                    props.competitionsArr[i].competitions[j]
                  );
                }
              } else {
                if (endDate > CurrentDate) {
                  showCompetitionsArr.push(
                    props.competitionsArr[i].competitions[j]
                  );
                }
              }
            } else {
              showCompetitionsArr.push(
                props.competitionsArr[i].competitions[j]
              );
            }
          }
        }
        if (
          props.tabType !== 'mine' &&
          // eslint-disable-next-line no-prototype-builtins
          props.competitionsArr[i].hasOwnProperty('nbRemaining') &&
          props.competitionsArr[i].nbRemaining === 0
        ) {
          setShowLoader(false);
          setCompetitionFinished(true);
        } else {
          setShowLoader(false);
        }
      }
    }
    setShowCompetitions(showCompetitions =>
      showCompetitions.concat(showCompetitionsArr)
    );
    setLoading(false);
  }, [props.competitionsArr]);

  const _keyExtractor = item => item.id.toString();
  const _renderItem = ({ item }) => (
    <CompetitionSnippet
      key={'competition' + item.id}
      cardStyle={styles.cardStyle}
      onMoreClick={id => props.onMoreClick(id, item.name)}
      leaveCompetition={id => props.leaveCompetition(id)}
      enrollCompetition={id => props.enrollCompetition(id)}
      editCompetition={props.editCompetition}
      competition={item}
      type={props.tabType}
    />
  );

  const handleLoadMore = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
    getAllCompetitions(page + 1);
  };

  const EmptyContainer = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 64
        }}
      >
        <Image
          source={empty}
          style={{ height: 186, width: 240, alignSelf: 'center', opacity: 0.7 }}
        />
        <Text style={[styles.headerTitle, { marginTop: 12 }]}>
          {' '}
          {i18n.t('label.no_competitions')}
        </Text>
      </View>
    );
  };
  return (
    <FlatList
      data={showCompetitions}
      keyExtractor={item => _keyExtractor(item)}
      renderItem={item => _renderItem(item)}
      onEndReached={
        props.tabType !== 'mine'
          ? isCompetitionFinished
            ? null
            : () => {
                !isLoading && handleLoadMore();
              }
          : null
      }
      onEndReachedThreshold={0.05}
      onRefresh={() => onRefresh()}
      refreshing={refreshing}
      ListEmptyComponent={() =>
        showLoader ? (
          <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        ) : (
          EmptyContainer()
        )
      }
      style={{ paddingBottom: 60, backgroundColor: colors.WHITE }}
      ListHeaderComponent={() => {
        return (
          <View style={styles.headerView}>
            <Text style={styles.headerTitle}>
              {props.tabType === 'mine' && showCompetitions.length === 0
                ? props.nullTabHeader
                : props.tabHeader}
            </Text>
            <Image
              source={trees}
              style={{ height: 60, flex: 1 }}
              resizeMode="contain"
            />
          </View>
        );
      }}
      ListFooterComponent={() => {
        return isLoading
          ? CompetitionLoader()
          : props.tabType !== 'mine' && isCompetitionFinished
          ? CompetitionFinishedMessage()
          : null;
      }}
    />
  );
};

export default CommonTab;

CommonTab.propTypes = {
  competitionsArr: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
