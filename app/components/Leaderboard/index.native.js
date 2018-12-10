import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import CategoryTypes from './categoryTypes';
import LoadingIndicator from '../Common/LoadingIndicator';
import CardLayout from '../Common/Card';
import styles from '../../styles/leaderboard/leader_board';
import { tick } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem.native';
import ReactNativeTooltipMenu from 'react-native-popover-tooltip';
import ContextMenuItem from './contextMenuItem.native';
import { categoryIcons } from '../../helpers/utils';
import LeaderboardItem from './leaderBoardListItem.native';
import { getLocalRoute } from '../../actions/apiRouting';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: ''
    };
    this._handleItemPress = this._handleItemPress.bind(this);
  }

  _handleCategoryChange = category => {
    this.props.handleSectionChange(category);
    this.setState({ selectedCategory: category });
  };
  _handleItemPress(treeCounterId) {
    this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
      treeCounterId
    });
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
                      // onClick={this.changeCategory}
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
  _getSortView = () => {
    sortView = (
      <View style={styles.sortView}>
        <Text>Sort by time</Text>
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
              <ImageBackground style={styles.contextMenu} source={tick} />
            </TouchableItem>
          }
          items={[
            {
              label: () => {
                return <ContextMenuItem selected>All time</ContextMenuItem>;
              },
              onPress: () => {}
            },
            {
              label: () => {
                return <ContextMenuItem>Last year</ContextMenuItem>;
              },
              onPress: () => {}
            },
            {
              label: () => {
                return <ContextMenuItem>Last 5 years</ContextMenuItem>;
              },
              onPress: () => {}
            }
          ]}
        />
      </View>
    );
    return sortView;
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
