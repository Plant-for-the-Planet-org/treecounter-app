/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees } from './../../../assets';
import styles from '../../../styles/competition/competition-master.native';
import i18n from '../../../locales/i18n';
import ContentLoader from 'react-native-content-loader';
import { Rect } from 'react-native-svg';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const AllCompetitions = props => {
  const [showAllCompetitions, setShowAllCompetitions] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const onRefresh = () => {
    setrefreshing(true);
    setPage(1);
    props
      .fetchCompetitions('all', page)
      .then(() => {
        setrefreshing(false);
      })
      .catch(() => {
        setrefreshing(false);
      });
  };
  let CurrentDate = new Date();

  const CompetitionLoader = () => (
    <ContentLoader
      height={HEIGHT}
      width={WIDTH}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <Rect x="30" y="3" rx="10" ry="10" width="85%" height="180" />
      <Rect x="30" y="190" rx="10" ry="10" width="35%" height="20" />
      <Rect x="30" y="215" rx="10" ry="10" width="85%" height="20" />
      <Rect x="30" y="240" rx="10" ry="10" width="75%" height="20" />
      <Rect x="30" y="270" rx="10" ry="10" width="85%" height="180" />
      <Rect x="30" y="460" rx="10" ry="10" width="35%" height="20" />
      <Rect x="30" y="490" rx="10" ry="10" width="85%" height="20" />
      <Rect x="30" y="520" rx="10" ry="10" width="75%" height="20" />
    </ContentLoader>
  );

  const getAllCompetitions = () => {
    props.fetchCompetitions('all', page);
  };

  useEffect(() => {
    if (props.allCompetitions.length < 1) {
      getAllCompetitions();
    }
    let showAllCompetitionsArr = [];
    if (props.allCompetitions.length > 0) {
      props.allCompetitions.forEach(val => {
        if (val.category === 'all') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (endDate > CurrentDate) {
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
      type="all"
    />
  );

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
    getAllCompetitions();
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
      ListEmptyComponent={() => CompetitionLoader()}
      style={{ paddingBottom: 60 }}
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
        return isLoading ? CompetitionLoader() : null;
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
