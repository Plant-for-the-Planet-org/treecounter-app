import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

import SearchBar from '../../../components/Header/SearchBar.native';
import Header from '../../../components/Header/Header.native';
import { getSuggestions } from '../../../helpers/utils';
import { withNavigation } from 'react-navigation';
import styles from '../../../styles/header/search_layout.native';
import _ from 'lodash';
import i18n from '../../../locales/i18n';
import searchBarStyles from '../../../styles/header/search_bar.native';
import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';
import UserProfileImage from '../../Common/UserProfileImage';

class SearchUser extends React.Component {
  static SearchBar = SearchBar;
  static Header = Header;

  static defaultProps = {
    debounce: 500,
    headerBackgroundColor: '#b9d384',
    headerTintColor: '#fff'
  };
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-underscore-dangle
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
    this.setState({ searchResultClicked: false });
    getSuggestions(q)
      .then(suggestions => {
        this.setState({ q: suggestions });
      })
      .catch(error => console.log(error));
  };

  _onNavigationClick(suggestion) {
    if (
      this.props.onSearchResultClick &&
      !this.isMyself(suggestion, this.props.currentUserProfile) &&
      (this.props.alreadyInvited &&
        !this.alreadyInvitedUser(suggestion, this.props.alreadyInvited))
    ) {
      this.props.onSearchResultClick(suggestion);
      this.setState({
        searchResultClicked: true
      });
      this.setState({
        selectedSuggestionName: this.props.clearTextOnClick
          ? ''
          : suggestion.name
      });
    } else {
      NotificationManager.error(
        i18n.t('label.could_not_add_user'),
        i18n.t('label.error'),
        5000
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchSuggestion === '') {
      this.setState({
        selectedSuggestionName: ''
      });
    }
  }
  isMyself(treecounter, currentUserProfile) {
    return (
      !!currentUserProfile &&
      currentUserProfile.treecounter.id === treecounter.id
    );
  }
  alreadyInvitedUser(treecounter, alreadyInvited) {
    if (alreadyInvited.length > 0) {
      for (let i = 0; i < alreadyInvited.length; i++) {
        if (treecounter.slug === alreadyInvited[i].treecounterSlug) {
          return true;
        }
      }
    } else {
      return false;
    }
  }
  render() {
    const backgroundColor = 'transparent';
    return (
      <View style={{ width: '100%', ...this.props.addstyles }}>
        <SearchBar
          dontFocus
          onChangeQuery={this.onChangeTextDelayed}
          inputValue={this.state.selectedSuggestionName}
          resetState={this.props.resetState}
          // eslint-disable-next-line no-underscore-dangle
          onSubmit={this._handleSubmit}
          placeholderTextColor={this.props.searchInputPlaceholderTextColor}
          placeholderValue={i18n.t('label.enter_a_user')}
          textColor={this.props.searchInputTextColor}
          selectionColor={this.props.searchInputSelectionColor}
          underlineColorAndroid={
            this.props.searchInputUnderlineColorAndroid ||
            this.props.headerBackgroundColor
          }
          showCancelSearchButton={false}
          style={{
            ...searchBarStyles.searchContainer,
            width: '100%',
            backgroundColor: backgroundColor
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
                      // eslint-disable-next-line no-underscore-dangle
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
                    // eslint-disable-next-line no-underscore-dangle
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
