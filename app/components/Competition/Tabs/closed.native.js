/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import styles from '../../../styles/competition/competition-master.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees, empty } from './../../../assets';
import i18n from '../../../locales/i18n';
import colors from '../../../utils/constants';
import { CompetitionLoader } from './../../Common/ContentLoader';
const CompetitionFinishedMessage = () => {
  return (
    <View style={styles.caughtUpMessageContainer}>
      <View style={[styles.caughtUpLine, { marginRight: 10 }]} />
      <Text style={styles.caughtUpMessage}>You're all caught up</Text>
      <View style={[styles.caughtUpLine, { marginLeft: 10 }]} />
    </View>
  );
};
const ClosedCompetitions = props => {
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
      .fetchCompetitions('archived', 1)
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

  const getAllCompetitions = async pageNo => {
    await props.fetchCompetitions('archived', pageNo);
  };

  useEffect(() => {
    let showAllCompetitionsArr = [];
    if (props.archivedCompetitions.length > 0) {
      for (let i = 0; i < props.archivedCompetitions.length; i++) {
        if (props.archivedCompetitions[i].category === 'archived') {
          for (
            let j = 0;
            j < props.archivedCompetitions[i].competitions.length;
            j++
          ) {
            let endDate = props.archivedCompetitions[i].competitions[j].endDate;
            endDate = new Date(endDate);
            if (CurrentDate > endDate) {
              showAllCompetitionsArr.push(
                props.archivedCompetitions[i].competitions[j]
              );
            }
          }
        }
        if (props.allCompetitions[i].nbRemaining === 0) {
          setCompetitionFinished(true);
        }
      }
    }
    setShowAllCompetitions(showAllCompetitions =>
      showAllCompetitions.concat(showAllCompetitionsArr)
    );
    setLoading(false);
    setShowLoader(false);
  }, [props.archivedCompetitions]);

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
      type="archived"
    />
  );

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
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
      onEndReached={() => handleLoadMore()}
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
              {i18n.t('label.archived_compeition_tab_header')}
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

export default ClosedCompetitions;

ClosedCompetitions.propTypes = {
  archivedCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
