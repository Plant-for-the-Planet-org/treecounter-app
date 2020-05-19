/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import i18n from '../../../locales/i18n';
import styles from '../../../styles/competition/competition-master.native';
import colors from '../../../utils/constants';
import CompetitionSnippet from './CompetitionSnippet.native';
import { empty, trees } from '../../../assets';
import { CompetitionLoader } from './../../Common/ContentLoader';

const CompetitionFinishedMessage = showFinishedMessage => {
  if (showFinishedMessage) {
    return (
      <View style={styles.caughtUpMessageContainer}>
        <View style={[styles.caughtUpLine, { marginRight: 10 }]} />
        <Text style={styles.caughtUpMessage}>
          {i18n.t('label.you_are_all_caught_up')}
        </Text>
        <View style={[styles.caughtUpLine, { marginLeft: 10 }]} />
      </View>
    );
  }
  return null;
};

const CompetitionsList = props => {
  const [showCompetitions, setShowCompetitions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [isCompetitionFinished, setCompetitionFinished] = useState(false);
  const [showFinishedMessage, setShowFinishedMessage] = useState(false);
  let onEndReachedCalledDuringMomentum = true;

  /**
   * * On user refresh
   * 1. Sets refreshing to {true}
   * 2. Empties the competition loaded
   * 3. Sets competition finished to {false}
   * 4. Fetches competition starting from page 1
   * 5. Sets refreshing to {false} after api call is completed
   */
  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setShowCompetitions([]);
    props.clearCurrentCompetitions(props.tabType);
    setCompetitionFinished(false);
    await props.fetchCompetitions(props.tabType, page);
    setRefreshing(false);
  };

  let CurrentDate = new Date();

  /**
   * * Fetches the competition from api using current page number
   * @requires @param {Number} pageNo =>
   */
  const getAllCompetitions = pageNo => {
    props.fetchCompetitions(props.tabType, pageNo);
  };

  /**
   * * This lifecycle method is called everytime there is change in competitionsArr
   * * which is being fetched from API.
   *
   * * Pushes the newly loaded competitions from API to showCompetitons array state
   * 1. If the competiton type is {all} and {featured} then checks
   *    if end date of competition is greater than current date only then
   *    pushes to showCompetitions array state
   * 2. If the competiton type is {archived} then checks
   *    if end date of competition is smaller than current date only then
   *    pushes to showCompetitions array state
   * 3. If the competiton type is {mine}
   *    then directly pushes to showCompetitons array state
   * 4. Sets loading to {false}
   * 5. Sets competition finished to {true} in there is no remaining competition
   * 6. if currentPage and prevPage both are same then we will set showCompetitons empty array because it's adding duplicate data in showCompetitons array
   */
  useEffect(() => {
    let showCompetitionsArr = [];
    if (props.competitionsArr.length > 0) {
      // * Checks if current page from api is not equal to current page value of state
      // 1. If not then set the current page to same as API's loaded competiton current page
      // 2. Also concats the competition array to be shown with redux currentCompetition state
      // 3. Set's loading to false
      if( props.competitionsArr[0].currentPage === prevPage){
        setShowCompetitions([])
      }
      if (
        props.competitionsArr[0].currentPage !== page &&
        props.currentCompetitionsArr?.length > 0
      ) {
        setPage(props.competitionsArr[0].currentPage);
        showCompetitionsArr = showCompetitionsArr.concat(
          props.currentCompetitionsArr
        );
        setLoading(false);

        // * If no more pages are left to be shown for competition then
        //    sets competionFinished to be true
        if (
          props.tabType !== 'mine' &&
          // eslint-disable-next-line no-prototype-builtins
          props.competitionsArr[0].hasOwnProperty('nbRemaining') &&
          props.competitionsArr[0].nbRemaining === 0
        ) {
          setCompetitionFinished(true);
        }
      } else {
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
            setCompetitionFinished(true);
          }
          setLoading(false);
        }
      }
    }
    setShowCompetitions(showCompetitions =>
      showCompetitions.concat(showCompetitionsArr)
    );
    if (props.tabType !== 'mine') {
      props.setCurrentCompetitions(
        props.tabType,
        showCompetitions.concat(showCompetitionsArr)
      );
    }
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

  /**
   * * Function called when user scrolls to the bottom of the list
   * 1. Sets loading to {true}
   * 2. Increments the current page no. and sets page no.
   * 3. calls @function getAllCompetitions(pageNo) with @param {Number} pageNo
   */
  const handleLoadMore = () => {
    setLoading(true);
    setPrevPage(page)
    setPage(prevPage => prevPage + 1);
    getAllCompetitions(page + 1);
  };

  /**
   * * Returns Empty container View with and Image and Text
   */
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
      data={
        props.tabType !== 'mine'
          ? props.currentCompetitionsArr
          : showCompetitions
      }
      keyExtractor={item => _keyExtractor(item)}
      renderItem={item => _renderItem(item)}
      /**
       * * Only if competition is not finished and no new competition is loading
       *   calls @function handleLoadMore()
       */
      onEndReached={({ distanceFromEnd }) => {
        if (distanceFromEnd <= 0) {
          setShowFinishedMessage(true);
        } else {
          setShowFinishedMessage(false);
        }
        if (
          !onEndReachedCalledDuringMomentum &&
          props.tabType !== 'mine' &&
          !isCompetitionFinished &&
          !isLoading
        ) {
          handleLoadMore();
          onEndReachedCalledDuringMomentum = true;
        }
      }}
      onEndReachedThreshold={0.05}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum = false;
      }}
      onRefresh={() => onRefresh()}
      refreshing={refreshing}
      /**
       * 1. If competiton is loading then shows {CompetitionLoader} component
       * 2. Else if competiton is  not loading and not refreshing then shows {EmptyContainer} component
       */
      ListEmptyComponent={() =>
        !isLoading && !refreshing ? EmptyContainer() : null
      }
      style={{ paddingBottom: 60, backgroundColor: colors.WHITE }}
      ListHeaderComponent={() => {
        // * Returns the header for the competiitons
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
        /**
         * * Returns the footer for the competiitons
         * 1. If competition is loading then shows the Competition Content Loader.
         * 2. Else if competition is not loading and competitions are finished
         *    then shows Competion Finished Message
         */
        return isLoading ? (
          <View style={{ marginTop: 16 }}>{CompetitionLoader()}</View>
        ) : props.tabType !== 'mine' && isCompetitionFinished ? (
          CompetitionFinishedMessage(showFinishedMessage)
        ) : null;
      }}
    />
  );
};

export default CompetitionsList;

CompetitionsList.propTypes = {
  competitionsArr: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
