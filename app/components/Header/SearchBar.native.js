/* eslint-disable no-underscore-dangle */
import React from 'react';
import { LayoutAnimation, Text, TextInput, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import { iosSearchGreen } from '../../assets';
import styles, {
  SearchContainerWidth
} from '../../styles/header/search_bar.native';
import PropTypes from 'prop-types';
import TouchableItem from '../../components/Common/TouchableItem.native';
import i18n from '../../locales/i18n.js';

const SearchIcon = () => (
  <View style={styles.searchIconContainer}>
    <Image
      source={iosSearchGreen}
      resizeMode="contain"
      style={styles.searchIcon}
    />
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
    if (!this.props.dontFocus) {
      requestAnimationFrame(() => {
        if (this._textInput) {
          this._textInput.focus();
        }
      });
    }
    if (this.props.style) {
      if (this.props.style.width) {
        this.setState({ inputWidth: this.props.style.width });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.inputValue &&
      nextProps.inputValue.toLowerCase().includes(this.state.text.toLowerCase())
    ) {
      this.setState({ text: nextProps.inputValue });
    }
    if (nextProps.resetState) {
      this.setState({ text: '' });
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
            autoCorrect={false}
            returnKeyType="search"
            placeholder={this.props.placeholderValue}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={this.props.placeholderTextColor || '#ccc'}
            onSubmitEditing={this._handleSubmit}
            style={[styles.searchInput, searchInputStyle]}
            autoCapitalize={'sentences'}
          />

          <SearchIcon />
        </View>
        <View
          key={
            showCancelButton
              ? 'visible-cancel-button'
              : 'layout-only-cancel-button'
          }
          style={[{ opacity: showCancelButton ? 1 : 0, width: '22%' }]}
        >
          {this.props.showCancelSearchButton ? (
            <TouchableItem
              style={styles.button}
              hitSlop={{ top: 15, bottom: 15, left: 1, right: 20 }}
              onLayout={this._handleLayoutCancelButton}
              onPress={this._handlePressCancelButton}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: this.props.tintColor || '#007AFF',
                  textAlign: 'center',
                  fontFamily: 'OpenSans-Regular'
                }}
              >
                {i18n.t('label.cancel')}
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
  showCancelSearchButton: PropTypes.bool,
  dontFocus: PropTypes.bool
};

export default withNavigation(SearchBar);
