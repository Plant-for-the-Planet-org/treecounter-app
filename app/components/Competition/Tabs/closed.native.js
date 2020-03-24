/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import styles from '../../../styles/competition/competition-master.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees, empty } from './../../../assets';
import i18n from '../../../locales/i18n';
import colors from '../../../utils/constants';
import { CompetitionLoader } from './../../Common/ContentLoader'

const ClosedCompetitions = props => {
  const [showAllCompetitions, setShowAllCompetitions] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const onRefresh = () => {
    setrefreshing(true);
    setPage(1);
    props
      .fetchCompetitions('archived', page)
      .then(() => {
        setrefreshing(false);
      })
      .catch(() => {
        setrefreshing(false);
      });
  };
  let CurrentDate = new Date();

  const getAllCompetitions = () => {
    props.fetchCompetitions('archived', page);
  };

  useEffect(() => {
    if (props.allCompetitions.length < 1) {
      getAllCompetitions();
    }
    let showAllCompetitionsArr = [];
    if (props.allCompetitions.length > 0) {
      props.allCompetitions.forEach(val => {
        if (val.category === 'archived') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (CurrentDate > endDate) {
              showAllCompetitionsArr.push(comp);
            }
          });
        }
      });
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
      type="archived"
    />
  );

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
    getAllCompetitions();
  };

  const EmptyContainer = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 64 }}>
        <Image source={empty} style={{ height: 186, width: 240, alignSelf: 'center', opacity: 0.7 }} />
        <Text style={[styles.headerTitle, { marginTop: 12 }]}> {i18n.t('label.no_competitions')}</Text>
      </View>
    )
  }
  return (
    <FlatList
      data={showAllCompetitions}
      keyExtractor={item => _keyExtractor(item)}
      renderItem={item => _renderItem(item)}
      onEndReached={() => handleLoadMore()}
      onEndReachedThreshold={0.05}
      onRefresh={() => onRefresh()}
      refreshing={refreshing}
      ListEmptyComponent={() => EmptyContainer()}
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
        return isLoading ? CompetitionLoader() : null;
      }}
    />
  );
};

export default ClosedCompetitions;

ClosedCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
