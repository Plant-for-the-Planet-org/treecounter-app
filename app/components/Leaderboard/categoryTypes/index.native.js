import React, { Component } from 'react';
import { ScrollView, Animated } from 'react-native';
import { PropTypes } from 'prop-types';
import { categoryIcons } from '../../../helpers/utils';
import styles from '../../../styles/leaderboard/leader_board';
import CategoryType from './categoryType.native';

export default class CategoryTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.changeCategory = this.changeCategory.bind(this);
  }

  componentDidMount() {
    const _scrollView = this.scrollView;
    _scrollView.scrollToEnd({ animated: true });
  }

  changeCategory(index, category) {
    this.setState({
      selectedIndex: index
    });
    this.props.handleCategoryChange(category);
    if (index === this.props.categoryInfo.categoryKeys.length - 1) {
      this.scrollView.scrollToEnd({ animated: true });
    } else if (index === 0) {
      this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  getCategoryView = () => {
    const { categoryInfo } = this.props;
    let categoryUI = null;
    if (categoryInfo && categoryInfo.categoryKeys) {
      categoryUI = categoryInfo.categoryKeys.map((category, index) => {
        const isSelected = this.state.selectedIndex == index;
        return (
          <CategoryType
            key={'CategoryType' + index}
            iconUrl={
              categoryIcons[category][isSelected ? 'selected' : 'normal']
            }
            category={category}
            selected={isSelected}
            index={index}
            title={categoryInfo.categories[category]}
            onClick={this.changeCategory}
          />
        );
      });
    }
    return categoryUI;
  };

  render() {
    return (
      <Animated.View style={[styles.outerContainer, this.props.style]}>
        <ScrollView
          contentContainerStyle={[styles.innerContainer]}
          horizontal
          ref={ref => {
            this.scrollView = ref;
          }}
        >
          {this.getCategoryView()}
        </ScrollView>
      </Animated.View>
    );
  }
}

CategoryTypes.propTypes = {
  changeCategory: PropTypes.func,
  categoryInfo: PropTypes.object,
  sectionInfo: PropTypes.object
};
