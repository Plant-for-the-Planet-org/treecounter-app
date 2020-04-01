/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees, empty } from './../../../assets';
import styles from '../../../styles/competition/competition-master.native';
import i18n from '../../../locales/i18n';
import colors from '../../../utils/constants';
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
const AllCompetitions = props => {
  const [showAllCompetitions, setShowAllCompetitions] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [isCompetitionFinished, setCompetitionFinished] = useState(false);

  const onRefresh = () => {
    setShowLoader(true);
    setrefreshing(true);
    setPage(1);
    setShowAllCompetitions([]);
    setCompetitionFinished(false);
    props
      .fetchCompetitions('all', 1)
      .then(() => {
        setrefreshing(false);
        setShowLoader(false);
      })
      .catch(() => {
        setrefreshing(false);
        setShowLoader(false);
      });
  };
  let CurrentDate = new Date();

  const getAllCompetitions = pageNo => {
    props.fetchCompetitions('all', pageNo);
  };

  useEffect(() => {
    let showAllCompetitionsArr = [];
    if (props.allCompetitions.length > 0) {
      for (let i = 0; i < props.allCompetitions.length; i++) {
        if (props.allCompetitions[i].category === 'all') {
          for (
            let j = 0;
            j < props.allCompetitions[i].competitions.length;
            j++
          ) {
            let endDate = props.allCompetitions[i].competitions[j].endDate;
            endDate = new Date(endDate);
            if (endDate > CurrentDate) {
              showAllCompetitionsArr.push(
                props.allCompetitions[i].competitions[j]
              );
            }
          }
        }
        if (
          // eslint-disable-next-line no-prototype-builtins
          props.allCompetitions[i].hasOwnProperty('nbRemaining') &&
          props.allCompetitions[i].nbRemaining === 0
        ) {
          setShowLoader(false);
          setCompetitionFinished(true);
        }
      }
    }
    setShowAllCompetitions(showAllCompetitions =>
      showAllCompetitions.concat(showAllCompetitionsArr)
    );
    setLoading(false);
  }, [props.allCompetitions]);

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
      type="all"
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
      data={showAllCompetitions}
      keyExtractor={item => _keyExtractor(item)}
      renderItem={item => _renderItem(item)}
      onEndReached={
        isCompetitionFinished
          ? null
          : () => {
              !isLoading && handleLoadMore();
            }
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
              {i18n.t('label.all_compeition_tab_header')}
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
          : isCompetitionFinished
          ? CompetitionFinishedMessage()
          : null;
      }}
    />
  );
};

export default AllCompetitions;

AllCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
