import React from 'react';
import {
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';

import SearchBar from './SearchBar';
import Header from './Header.native';
import { getSuggestions, profileTypeToImage } from '../../helpers/utils';
import { getImageUrl } from '../../actions/apiRouting';
import { getLocalRoute } from '../../actions/apiRouting';
import { withNavigation } from 'react-navigation';
import styles from '../../styles/header/search_layout.native';
import _ from 'lodash';
import { updateRoute } from '../../helpers/routerHelper';

class SearchLayout extends React.Component {
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
  constructor(props) {
    super(props);
    this.onChangeTextDelayed = _.debounce(this._handleChangeQuery, 200);
  }

  _handleSubmit = q => {
    this.props.onSubmit && this.props.onSubmit(q);
  };

  // TODO: debounce
  _handleChangeQuery = q => {
    getSuggestions(q).then(suggestions => {
      this.setState({ q: suggestions });
      //console.log('suggestions', suggestions);
    });
  };

  redirectToResult(suggestion) {
    // if(suggestion.type === 'treecounter') {
    //   this.props.navigation.navigate(
    //     getLocalRoute('app_treecounter'),
    //     {
    //       treeCounterId: suggestion.slug || suggestion.id,
    //       suggestion
    //     }
    //   );
    // } else if (suggestion.type === 'leaderboard') {
    //   updateRoute('app_leaderboard', null, null, {
    //     section: suggestion.section
    //   })
    // }
    if (suggestion.category === 'profile') {
      this.props.navigation.navigate(getLocalRoute('app_treecounter'), {
        treeCounterId: suggestion.slug || suggestion.id,
        suggestion,
        titleParam: suggestion.name
      });
    } else if (suggestion.category === 'competition') {
      this.props.navigation.navigate(getLocalRoute('app_competition'), {
        competition: suggestion.id,
        titleParam: suggestion.name
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <SearchBar
            onChangeQuery={this.onChangeTextDelayed}
            onSubmit={this._handleSubmit}
            placeholderTextColor={this.props.searchInputPlaceholderTextColor}
            textColor={this.props.searchInputTextColor}
            selectionColor={this.props.searchInputSelectionColor}
            underlineColorAndroid={
              this.props.searchInputUnderlineColorAndroid ||
              this.props.headerBackgroundColor
            }
            showCancelSearchButton={true}
            tintColor={
              this.props.searchInputTintColor || this.props.headerTintColor
            }
          />
        </Header>

        {this.state.q ? (
          <ScrollView>
            {this.state.q.map((suggestion, i) => {
              return (
                <TouchableOpacity
                  style={styles.searchResult}
                  key={'suggestion' + i}
                  onPress={() => {
                    setTimeout(() => this.redirectToResult(suggestion), 0);
                  }}
                >
                  <Image
                    style={styles.profileImage}
                    source={
                      suggestion.image
                        ? {
                            uri: getImageUrl(
                              suggestion.category,
                              'avatar',
                              suggestion.image
                            )
                          }
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

export default withNavigation(SearchLayout);
