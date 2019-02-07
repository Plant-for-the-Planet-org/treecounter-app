import React from 'react';
import {
  LayoutAnimation,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { iosSearchGreen } from '../../assets';
import styles, {
  SearchContainerWidth
} from '../../styles/header/search_bar.native';
import PropTypes from 'prop-types';
import TouchableItem from '../../components/Common/TouchableItem.native';

const SearchIcon = () => (
  <View style={styles.searchIconContainer}>
    <Image source={iosSearchGreen} style={styles.searchIcon} />
  </View>
);

class SearchBar extends React.PureComponent {
  state = {
    text: '',
    showCancelButton: false,
    inputWidth: SearchContainerWidth
  };

  _textInput;

  componentDidMount() {
    requestAnimationFrame(() => {
      this._textInput.focus();
    });
    if (this.props.style) {
      if (this.props.style.width) {
        this.setState({ inputWidth: this.props.style.width });
      }
    }
  }

  _handleLayoutCancelButton = e => {
    if (this.state.showCancelButton) {
      return;
    }

    const cancelButtonWidth = e.nativeEvent.layout.width;

    requestAnimationFrame(() => {
      LayoutAnimation.configureNext({
        duration: 200,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.9,
          initialVelocity: 10
        }
      });

      this.setState({
        showCancelButton: true,
        inputWidth: SearchContainerWidth - cancelButtonWidth
      });
    });
  };

  render() {
    let { inputWidth, showCancelButton } = this.state;

    let searchInputStyle = {};
    if (this.props.textColor) {
      searchInputStyle.color = this.props.textColor;
    }
    let inputValue = this.state.text;
    if (
      this.props.inputValue &&
      this.props.inputValue
        .toLowerCase()
        .includes(this.state.text.toLowerCase())
    ) {
      inputValue = this.props.inputValue;
    }

    return (
      <View style={styles.container}>
        <View
          style={[
            this.props.style ? this.props.style : styles.searchContainer,
            this.props.style ? { width: inputWidth } : null
          ]}
        >
          <TextInput
            ref={view => {
              this._textInput = view;
            }}
            clearButtonMode="while-editing"
            onChangeText={this._handleChangeText}
            value={inputValue}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            placeholder="Search"
            placeholderTextColor={this.props.placeholderTextColor || '#ccc'}
            onSubmitEditing={this._handleSubmit}
            style={[styles.searchInput, searchInputStyle]}
          />

          <SearchIcon />
        </View>
        <View
          key={
            showCancelButton
              ? 'visible-cancel-button'
              : 'layout-only-cancel-button'
          }
          style={[
            styles.buttonContainer,
            { opacity: showCancelButton ? 1 : 0 }
          ]}
        >
          {this.props.showCancelSearchButton ? (
            <TouchableItem
              style={styles.button}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 20 }}
              onLayout={this._handleLayoutCancelButton}
              onPress={this._handlePressCancelButton}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: this.props.tintColor || '#007AFF'
                }}
              >
                Cancel
              </Text>
            </TouchableItem>
          ) : null}
        </View>
      </View>
    );
  }

  _handleChangeText = text => {
    this.setState({ text });
    this.props.onChangeQuery && this.props.onChangeQuery(text);
  };

  _handleSubmit = () => {
    let { text } = this.state;
    this.props.onSubmit && this.props.onSubmit(text);
    this._textInput.blur();
  };

  _handlePressCancelButton = () => {
    this.props.navigation.navigate('appStackNavigator');
  };
}

SearchBar.propTypes = {
  onChangeQuery: PropTypes.func,
  onSubmit: PropTypes.func,
  tintColor: PropTypes.any,
  textColor: PropTypes.any,
  inputValue: PropTypes.string,
  navigation: PropTypes.any,
  showCancelSearchButton: PropTypes.boolean
};

export default withNavigation(SearchBar);
