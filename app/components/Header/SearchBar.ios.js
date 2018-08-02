import React from 'react';
import {
  Dimensions,
  LayoutAnimation,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image
} from 'react-native';
import { withNavigation } from 'react-navigation';

import iosSearchWhite from '../../assets';
import { getLocalRoute } from '../../actions/apiRouting';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};
const SearchContainerHorizontalMargin = 10;
const SearchContainerWidth =
  Layout.window.width - SearchContainerHorizontalMargin * 2;

const SearchIcon = () => (
  <View style={styles.searchIconContainer}>
    <Image source={iosSearchWhite} />
  </View>
);

// @withNavigation
// class PlaceholderButtonSearchBar extends React.PureComponent {
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableWithoutFeedback
//           hitSlop={{ top: 10, left: 10, bottom: 5, right: 10 }}
//           onPress={this._handlePress}
//         >
//           <View style={styles.searchContainer}>
//             <TextInput
//               editable={false}
//               placeholder="Search"
//               placeholderTextColor={this.props.placeholderTextColor || '#ccc'}
//               selectionColor={this.props.selectionColor}
//               style={styles.searchInput}
//             />

//             <SearchIcon />
//           </View>
//         </TouchableWithoutFeedback>
//       </View>
//     );
//   }

//   _handlePress = () => {
//     this.props.navigator.push('search');
//   };
// }

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
  }

  _handleLayoutCancelButton = e => {
    if (this.state.showCancelButton) {
      this.props.navigation.goBack();
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

    return (
      <View style={styles.container}>
        <View style={[styles.searchContainer, { width: inputWidth }]}>
          <TextInput
            ref={view => {
              this._textInput = view;
            }}
            clearButtonMode="while-editing"
            onChangeText={this._handleChangeText}
            value={this.state.text}
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
          <TouchableOpacity
            style={styles.button}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 20 }}
            onLayout={this._handleLayoutCancelButton}
            onPress={data => this._handlePressCancelButton()}
          >
            <Text
              style={{
                fontSize: 17,
                color: this.props.tintColor || '#007AFF'
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
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
    console.log('_handlePressCancelButton', this.props.navigation);
    // if (this.props.onCancelPress) {
    //   this.props.onCancelPress(this.props.navigation.goBack);
    // } else {
    this.props.navigation.navigate(getLocalRoute('app_userHome'));
    // }
  };
}

export default withNavigation(SearchBar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingRight: 17,
    paddingLeft: 2
  },
  searchContainer: {
    height: 30,
    width: SearchContainerWidth,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginHorizontal: SearchContainerHorizontalMargin,
    marginTop: 10,
    paddingLeft: 27
  },
  searchIconContainer: {
    position: 'absolute',
    left: 7,
    top: 6,
    bottom: 0
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingTop: 1
  }
});
