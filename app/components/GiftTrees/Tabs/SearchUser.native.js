/* eslint-disable no-underscore-dangle */
import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import _ from 'lodash';
import SearchBar from '../../../components/Header/SearchBar';
import Header from '../../../components/Header/Header';
import { getSuggestions } from '../../../helpers/utils';
import { debug } from '../../../debug';
import i18n from '../../../locales/i18n';
import styles from '../../../styles/header/search_layout';
import searchBarStyles from '../../../styles/header/search_bar';
import UserProfileImage from '../../Common/UserProfileImage';
import colors from '../../../utils/contants';

class SearchUser extends React.Component {
  static SearchBar = SearchBar;
  static Header = Header;

  static defaultProps = {
    debounce: 500,
    headerBackgroundColor: '#b9d384',
    headerTintColor: colors.WHITE
  };
  constructor(props) {
    super(props);

    this.onChangeTextDelayed = _.debounce(this._handleChangeQuery, 200);
  }

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
    this.setState({ searchResultClicked: false, selectedSuggestionName: q });
    getSuggestions(q)
      .then(suggestions => {
        this.setState({ q: suggestions });
      })
      .catch(error => debug(error));
    this.setState({ selectedSuggestionName: null });
  };

  _onNavigationClick(suggestion) {
    if (
      this.props.onSearchResultClick &&
      !this.isMyself(suggestion, this.props.currentUserProfile)
    ) {
      this.props.onSearchResultClick(suggestion);
      this.setState({
        searchResultClicked: true
      });
      this.setState({
        selectedSuggestionName: suggestion.name
      });
    }
  }
  isMyself(treecounter, currentUserProfile) {
    return (
      null !== currentUserProfile &&
      currentUserProfile.treecounter.id === treecounter.id
    );
  }
  render() {
    const backgroundColor = 'transparent';
    return (
      <View style={{ width: '100%' }}>
        <SearchBar
          dontFocus
          onChangeQuery={this.onChangeTextDelayed}
          inputValue={this.state.selectedSuggestionName}
          onSubmit={this._handleSubmit}
          placeholderValue={i18n.t('label.enter_a_user')}
          placeholderTextColor={this.props.searchInputPlaceholderTextColor}
          textColor={this.props.searchInputTextColor}
          selectionColor={this.props.searchInputSelectionColor}
          underlineColorAndroid={
            this.props.searchInputUnderlineColorAndroid ||
            this.props.headerBackgroundColor
          }
          showCancelSearchButton={false}
          style={{
            ...searchBarStyles.searchContainer,
            width: '95%',
            backgroundColor: backgroundColor,
            marginTop: 10
          }}
          tintColor={
            this.props.searchInputTintColor || this.props.headerTintColor
          }
        />

        {this.state.q && !this.state.searchResultClicked ? (
          <ScrollView style={{ paddingBottom: 15 }}>
            {this.state.q.map((suggestion, i) => {
              if (this.props.hideCompetitions) {
                if (suggestion.category !== 'competition') {
                  return (
                    <TouchableOpacity
                      style={styles.searchResult}
                      key={'suggestion' + i}
                      onPress={this._onNavigationClick.bind(this, suggestion)}
                    >
                      <UserProfileImage
                        profileImage={suggestion.image}
                        imageCategory={suggestion.category}
                        imageType="avatar"
                        imageStyle={{
                          height: 30,
                          width: 30,
                          borderRadius: 30 / 2
                        }}
                        defaultType={suggestion.type}
                      />

                      <Text style={styles.profileText}>{suggestion.name}</Text>
                    </TouchableOpacity>
                  );
                }
              } else {
                return (
                  <TouchableOpacity
                    style={styles.searchResult}
                    key={'suggestion' + i}
                    onPress={this._onNavigationClick.bind(this, suggestion)}
                  >
                    <UserProfileImage
                      profileImage={suggestion.image}
                      imageCategory={suggestion.category}
                      imageType="avatar"
                      imageStyle={{
                        height: 30,
                        width: 30,
                        borderRadius: 30 / 2
                      }}
                      defaultType={suggestion.type}
                    />
                    <Text style={styles.profileText}>{suggestion.name}</Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

export default withNavigation(SearchUser);
