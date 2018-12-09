import React from 'react';
import {
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import SearchBar from '../../../components/Header/SearchBar.native';
import Header from '../../../components/Header/Header.native';
import { getSuggestions, profileTypeToImage } from '../../../helpers/utils';
import { getImageUrl } from '../../../actions/apiRouting';
import { getLocalRoute } from '../../../actions/apiRouting';
import { withNavigation } from 'react-navigation';
import styles from '../../../styles/header/search_layout.native';

class SearchUser extends React.Component {
  static SearchBar = SearchBar;
  static Header = Header;

  static defaultProps = {
    debounce: 500,
    headerBackgroundColor: '#b9d384',
    headerTintColor: '#fff'
  };

  state = {
    q: [],
    searchResultClicked: false,
    selectedSuggestionName: ''
  };

  _handleSubmit = q => {
    this.props.onSubmit && this.props.onSubmit(q);
  };

  // TODO: debounce
  _handleChangeQuery = q => {
    this.setState({ searchResultClicked: false });
    getSuggestions(q).then(suggestions => {
      this.setState({ q: suggestions });
    });
  };

  _onNavigationClick(suggestion) {
    if (this.props.onSearchResultClick) {
      this.props.onSearchResultClick(suggestion);
      this.setState({
        searchResultClicked: true,
        selectedSuggestionName: suggestion.name
      });
    } else {
      this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
        treeCounterId: suggestion.slug || suggestion.id,
        suggestion
      });
      this.setState({
        searchResultClicked: true,
        selectedSuggestionName: suggestion.name
      });
    }
  }

  render() {
    return (
      <View>
        <SearchBar
          onChangeQuery={this._handleChangeQuery}
          inputValue={this.state.selectedSuggestionName}
          onSubmit={this._handleSubmit}
          placeholderTextColor={this.props.searchInputPlaceholderTextColor}
          textColor={this.props.searchInputTextColor}
          selectionColor={this.props.searchInputSelectionColor}
          underlineColorAndroid={
            this.props.searchInputUnderlineColorAndroid ||
            this.props.headerBackgroundColor
          }
          tintColor={
            this.props.searchInputTintColor || this.props.headerTintColor
          }
        />

        {this.state.q && !this.state.searchResultClicked ? (
          <ScrollView>
            {this.state.q.map((suggestion, i) => {
              return (
                <TouchableOpacity
                  style={styles.searchResult}
                  key={'suggestion' + i}
                  onPress={this._onNavigationClick.bind(this, suggestion)}
                >
                  <Image
                    style={styles.profileImage}
                    source={
                      suggestion.image
                        ? getImageUrl('profile', 'avatar', suggestion.image)
                        : profileTypeToImage[suggestion.type]
                    }
                  />
                  <Text style={styles.profileText}>{suggestion.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

export default withNavigation(SearchUser);
