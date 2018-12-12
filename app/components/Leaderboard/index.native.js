import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import CategoryTypes from './categoryTypes';
import LoadingIndicator from '../Common/LoadingIndicator';
import CardLayout from '../Common/Card';
import styles from '../../styles/leaderboard/leader_board';
import { selector_menu } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem.native';
import ReactNativeTooltipMenu from 'react-native-popover-tooltip';
import ContextMenuItem from './contextMenuItem.native';
import { categoryIcons } from '../../helpers/utils';
import LeaderboardItem from './leaderBoardListItem.native';
import { getLocalRoute } from '../../actions/apiRouting';
import i18n from '../../locales/i18n';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      timeSorting: ''
    };
    this._handleItemPress = this._handleItemPress.bind(this);
  }

  _handleCategoryChange = category => {
    this.props.handleSectionChange(category);
    this.setState({ selectedCategory: category });
  };

  _handleSortingChange = sortValue => {
    console.log('call sort here', sortValue);
    this.props.handleSectionChange(
      this.state.selectedCategory || this.props.categoryInfo.categoryKeys[0],
      undefined,
      sortValue
    );
    this.setState({ timeSorting: sortValue });
  };

  _handleItemPress(treeCounterId, uri) {
    console.log(treeCounterId);
    if (treeCounterId) {
      this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
        treeCounterId
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

  _getTableView = () => {
    console.log(this.props.queryResult);
    let listItemsUI = <LoadingIndicator />;
    const { categoryInfo, sectionInfo } = this.props;
    const selectedCategory =
      this.state.selectedCategory ||
      (categoryInfo &&
        categoryInfo.categoryKeys &&
        categoryInfo.categoryKeys[0]);
    if (selectedCategory)
      listItemsUI = (
        <CardLayout style={styles.cardStyle}>
          <Image
            source={categoryIcons[selectedCategory]['selected']}
            style={styles.cardImageStyle}
          />
          {this.props.queryResult ? (
            <ScrollView contentContainerStyle={{}} horizontal={false}>
              <View style={{ width: '95%', padding: 10 }}>
                {this.props.queryResult.map((result, index) => {
                  return (
                    <LeaderboardItem
                      key={'LeaderboardItem' + index}
                      onPress={this._handleItemPress}
                      // iconUrl={
                      //   categoryIcons[category][isSelected ? 'selected' : 'normal']
                      // }
                      planted={result.planted}
                      target={result.target}
                      index={index}
                      title={result.caption}
                      treeCounterId={result.treecounterId}
                      uri={result.uri}
                    />
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <LoadingIndicator />
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
    sortView = (
      <View style={styles.sortView}>
        <Text style={styles.itemViewText}>Sort by time</Text>
        <ReactNativeTooltipMenu
          ref={'tooltip'}
          labelContainerStyle={{
            width: 150
          }}
          tooltipContainerStyle={styles.tooltipContainerStyle}
          setBelow
          labelSeparatorColor="transparent"
          overlayStyle={{ backgroundColor: 'transparent' }} // set the overlay invisible
          buttonComponent={
            <TouchableItem
              onPress={event => {
                this.refs['tooltip'].toggle();
              }}
            >
              <Image style={styles.contextMenu} source={selector_menu} />
            </TouchableItem>
          }
          items={this._getContextMenuItems()}
        />
      </View>
    );
    return sortView;
  };
  render() {
    return (
      <View style={styles.leaderBoardContainer}>
        <CategoryTypes
          categoryInfo={this.props.categoryInfo}
          sectionInfo={this.props.sectionInfo}
          handleCategoryChange={this._handleCategoryChange}
        />
        {this._getSortView()}
        {this._getTableView()}
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
  navigation: PropTypes.navigation
};
