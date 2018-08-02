import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';

import SearchBar from './SearchBar';
import Header from './Header';
import { getSuggestions, profileTypeToImage } from '../../helpers/utils';
import { getImageUrl } from '../../actions/apiRouting';

export default class SearchLayout extends React.Component {
  static SearchBar = SearchBar;
  static Header = Header;

  static defaultProps = {
    debounce: 500,
    headerBackgroundColor: '#b9d384',
    headerTintColor: '#fff'
  };

  state = {
    q: []
  };

  _handleSubmit = q => {
    this.props.onSubmit && this.props.onSubmit(q);
  };

  // TODO: debounce
  _handleChangeQuery = q => {
    getSuggestions(q).then(suggestions => {
      this.setState({ q: suggestions });
      console.log('suggestions', suggestions);
    });
    //this.props.onChangeQuery && this.props.onChangeQuery(q);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={this.props.headerBackgroundColor}
          tintColor={this.props.headerTintColor}
          backButton={Platform.OS === 'android'}
        >
          <SearchBar
            onChangeQuery={this._handleChangeQuery}
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
        </Header>

        {this.state.q ? (
          <View>
            {this.state.q.map((suggestion, i) => {
              return (
                <TouchableOpacity
                  style={styles.searchResult}
                  key={'suggestion' + i}
                  onPress={() => {
                    console.log('click suggestions', suggestion);
                    Linking.openURL(
                      'http://localhost:8080/app_dev.php/en/t/' + suggestion.id
                    );
                  }}
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
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  searchResult: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profileImage: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  profileText: {
    fontSize: 20,
    color: '#b9d384'
  }
});
