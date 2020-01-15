/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import LoadingIndicator from '../Common/LoadingIndicator';
import CardLayout from '../Common/Card';
import styles from '../../styles/leaderboard/leader_board';
import { filter } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem.native';
import ReactNativeTooltipMenu from 'react-native-popover-tooltip';
import ContextMenuItem from './contextMenuItem.native';
import LeaderboardItem from './leaderBoardListItem.native';
import LeaderboardRefresh from '../LeaderboardRefresh/LeaderBoard/leaderboard';
import { getLocalRoute } from '../../actions/apiRouting';
import i18n from '../../locales/i18n';
import _ from 'lodash';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      timeSorting: '',
      sortedCategories: []
    };
    this._handleItemPress = this._handleItemPress.bind(this);
  }

  _handleCategoryChange = category => {
    this.props.handleSectionChange(category);
    this.setState({ selectedCategory: category });
  };

  _handleSortingChange = sortValue => {
    // console.log('call sort here', sortValue);
    this.props.handleSectionChange(
      this.state.selectedCategory || this.props.categoryInfo.categoryKeys[0],
      undefined,
      sortValue
    );
    this.setState({ timeSorting: sortValue });
  };

  _handleItemPress(treeCounterId, uri, title) {
    console.log(treeCounterId, uri, title, 'treeCounterId , uri, title ');
    if (treeCounterId) {
      this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
        treeCounterId,
        titleParam: title
      });
    } else if (uri) {
      const pathComponent = uri.split('/');
      const selectedSorting =
        this.state.timeSorting || this.props.timePeriodsInfo.timePeriodsKeys[0];
      this.props.handleSectionChange(
        this.state.selectedCategory || this.props.categoryInfo.categoryKeys[0],
        undefined,
        selectedSorting,
        pathComponent[pathComponent.length - 1]
      );
    }
  }
  _getQueryResult = selectedCategory => {
    this.props.handleSectionChange(selectedCategory);
  };
  _getTableView = selectedCategory => {
    //console.log(this.props.queryResult);
    let listItemsUI = <LoadingIndicator contentLoader screen="LeaderBoard" />;
    let maxPlanted = 0;
    if (this.props.queryResult) {
      const sortedQueryResults = _.sortBy(this.props.queryResult, ['planted']);
      maxPlanted = sortedQueryResults[sortedQueryResults.length - 1].planted;
    }
    if (selectedCategory)
      listItemsUI = (
        <CardLayout style={styles.cardStyle}>
          {this.props.queryResult ? (
            <View style={{ width: '98%', padding: 10, marginTop: 15 }}>
              {this.props.queryResult.map((result, index) => {
                const isPrivate =
                  // eslint-disable-next-line no-prototype-builtins
                  result.hasOwnProperty('mayPublish') && !result.mayPublish;
                // console.log(isPrivate, result, maxPlanted, "Resultsssss")
                return (
                  <LeaderboardItem
                    key={'LeaderboardItem' + index}
                    onPress={
                      isPrivate
                        ? () => {
                            return;
                          }
                        : this._handleItemPress
                    }
                    image={result.image}
                    planted={result.planted}
                    target={maxPlanted}
                    index={index}
                    title={
                      isPrivate ? i18n.t('label.tree_planter') : result.caption
                    }
                    treeCounterId={result.treecounterId}
                    uri={result.uri}
                  />
                );
              })}
            </View>
          ) : (
            <LoadingIndicator contentLoader screen="LeaderBoard" />
          )}
        </CardLayout>
      );

    return listItemsUI;
  };

  _getContextMenuItems = () => {
    let contextMenuItems = [];
    if (
      this.props.timePeriodsInfo &&
      this.props.timePeriodsInfo.timePeriodsKeys
    ) {
      const selectedSorting =
        this.state.timeSorting || this.props.timePeriodsInfo.timePeriodsKeys[0];
      contextMenuItems = this.props.timePeriodsInfo.timePeriodsKeys.map(
        option => {
          return {
            label: () => {
              return (
                <ContextMenuItem selected={selectedSorting === option}>
                  {i18n.t(this.props.timePeriodsInfo.timePeriods[option])}
                </ContextMenuItem>
              );
            },
            onPress: () => {
              this._handleSortingChange(option);
            }
          };
        }
      );
    }

    return contextMenuItems;
  };

  _getSortView = () => {
    if (!this.props.categoryInfo) {
      return null;
    }
    const backgroundColor = 'transparent';
    const selectedSorting =
      this.state.timeSorting ||
      (this.props.timePeriodsInfo &&
        this.props.timePeriodsInfo.timePeriodsKeys[0]);
    const sortView = (
      <View style={styles.sortView}>
        <Text style={styles.itemViewText}>
          {i18n.t('label.sortBy')}
          {': '}
          <Text style={styles.plantedTextStyle}>
            {this.props.timePeriodsInfo.timePeriods[selectedSorting]}
          </Text>
        </Text>
        <ReactNativeTooltipMenu
          ref={'tooltip'}
          labelContainerStyle={{ width: 150 }}
          tooltipContainerStyle={styles.tooltipContainerStyle}
          setBelow
          labelSeparatorColor="transparent"
          overlayStyle={{ backgroundColor: backgroundColor }} // set the overlay invisible
          buttonComponent={
            <TouchableItem
              onPress={
                (/* event */) => {
                  this.refs['tooltip'].toggle();
                }
              }
            >
              <Image
                resizeMode="contain"
                style={styles.contextMenu}
                source={filter}
              />
            </TouchableItem>
          }
          items={this._getContextMenuItems()}
        />
      </View>
    );
    return sortView;
  };
  render() {
    // const { categoryInfo } = this.props;
    // const selectedCategory = this.state.selectedCategory || (categoryInfo && categoryInfo.categoryKeys && categoryInfo.categoryKeys[0]);
    return (
      <View style={styles.leaderBoardContainer}>
        {/* <CategoryTypes
          categoryInfo={this.props.categoryInfo}
          sectionInfo={this.props.sectionInfo}
          handleCategoryChange={this._handleCategoryChange}
        /> */}
        <LeaderboardRefresh navigation={this.props.navigation} />
        {/* <ScrollView
          contentContainerStyle={{ justifyContent: 'flex-start', flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
        >
          {this._getSortView()}

          {this._getTableView(selectedCategory)}
          {selectedCategory && (
            <View style={[styles.cardImageStyle, { top: 45 }]}>
              <Image
                source={categoryIcons[selectedCategory]['selected']}
                style={[{ height: '100%', width: '100%' }]}
              />
            </View>
          )}
        </ScrollView> */}
      </View>
    );
  }
}

Leaderboard.propTypes = {
  categoryInfo: PropTypes.object,
  orderByOptionsInfo: PropTypes.object,
  timePeriodsInfo: PropTypes.object,
  sectionInfo: PropTypes.object,
  tabInfo: PropTypes.object,
  handleSectionChange: PropTypes.func,
  handleTabChange: PropTypes.func,
  queryResult: PropTypes.array,
  mapInfo: PropTypes.object,
  sortingQuery: PropTypes.object,
  navigation: PropTypes.any
};
