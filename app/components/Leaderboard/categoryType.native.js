import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Dimensions
} from 'react-native';
import TouchableItem from '../Common/TouchableItem.native';
import { PropTypes } from 'prop-types';

import { categoryIcons } from '../../helpers/utils';

class CategoryType extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.index, this.props.category);
  }
  render() {
    return (
      <View style={{ margin: 5 }}>
        <View>
          <TouchableItem onPress={this.handleClick}>
            <ImageBackground
              style={styles.imageStyle}
              source={this.props.iconUrl}
            >
              <View style={styles.circle} />
            </ImageBackground>
          </TouchableItem>
        </View>
        <View>
          <Text
            style={
              this.props.selected
                ? styles.selectedBottomTypeLabel
                : styles.bottomTypeLabel
            }
          >
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

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
    if (index === this.props.categoryInfo.categoryKeys.length) {
      this.scrollView.scrollToEnd({ animated: true });
    } else if (index === 0) {
      this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }
  }
  getCategoryView = () => {
    const { categoryInfo, sectionInfo } = this.props;
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
      <View style={styles.outerContainer}>
        <ScrollView
          horizontal={true}
          ref={ref => {
            this.scrollView = ref;
          }}
        >
          <View style={styles.innerContainer}>{this.getCategoryView()}</View>
        </ScrollView>
      </View>
    );
  }
}

CategoryTypes.propTypes = {
  changeCategory: PropTypes.func,
  categoryInfo: PropTypes.object,
  sectionInfo: PropTypes.object
};

CategoryType.propTypes = {
  index: PropTypes.any,
  onClick: PropTypes.func,
  selected: PropTypes.any,
  iconUrl: PropTypes.any,
  title: PropTypes.string
};

export const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'stretch',
    width: Dimensions.get('window').width,
    marginBottom: 10
  },
  innerContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  imageStyle: {
    width: 60,
    height: 60
  },
  selectedImageStyle: {
    width: 99,
    height: 99
  },
  circle: {
    borderRadius: 25,
    borderWidth: 0,

    height: 60
  },
  selectedBottomTypeLabel: {
    color: '#95c243',
    fontSize: 11,
    maxWidth: 80
  },
  bottomTypeLabel: {
    color: '#9c9b9b',
    fontSize: 11,
    maxWidth: 80
  },
  selectedSeprater: {
    backgroundColor: '#95c243',
    width: '100%',
    height: 2,
    marginTop: 3,
    marginBottom: 3
  },
  seprater: {
    backgroundColor: '#9c9b9b',
    width: '100%',
    height: 2,
    marginTop: 3,
    marginBottom: 3
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginBottom: 10
  }
});
