import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { PropTypes } from 'prop-types';
import CategoryTypes from './categoryTypes';
import LoadingIndicator from '../Common/LoadingIndicator';
import CardLayout from '../Common/Card';
import styles from '../../styles/leaderboard/leader_board';
import { tick } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem.native';
import ReactNativeTooltipMenu from 'react-native-popover-tooltip';
import ContextMenuItem from './contextMenuItem.native';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  handleCategoryChange = section => {
    this.props.handleSectionChange(section);
  };

  _getTableView = () => {
    console.log(this.props.queryResult);
    let listItemsUI = <LoadingIndicator />;
    const { categoryInfo, sectionInfo } = this.props;
    if (this.props.queryResult)
      listItemsUI = (
        <CardLayout style={styles.cardStyle}>
          <Text>
            Query Results ashdbajs ahsbdajsd habsdjas habs das dkahsd asdhasd
            aahsbdas dihabsdahsd iabsdahsd hiabsdahsd ahsd asd ashjdbajsd ashd
            ahsd ahs dasd
          </Text>
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
              label: data => {
                return <ContextMenuItem selected>All time</ContextMenuItem>;
              },
              onPress: () => {}
            },
            {
              label: data => {
                return <ContextMenuItem>Last year</ContextMenuItem>;
              },
              onPress: () => {}
            },
            {
              label: data => {
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
          handleCategoryChange={this.handleCategoryChange}
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
  sortingQuery: PropTypes.object
};
