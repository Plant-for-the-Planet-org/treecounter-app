import React from 'react';
import { Animated, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { withNavigation, HeaderBackButton } from 'react-navigation';
import styles from '../../styles/common/header.native';

class Header extends React.PureComponent {
  _navigateBack = () => {
    this.props.navigation.goBack(null);
  };

  _maybeRenderBackButton = () => {
    if (!this.props.backButton) {
      return;
    }

    return (
      <HeaderBackButton
        onPress={this._navigateBack}
        pressColorAndroid={this.props.tintColor || '#fff'}
        tintColor={this.props.tintColor}
        title={this.props.backButtonTitle || null}
        truncatedTitle={this.props.backButtonTruncatedTitle || null}
        titleStyle={this.props.backButtonTitleStyle || null}
      />
    );
  };

  render() {
    return (
      <Animated.View style={styles.container}>
        <View style={styles.appBar}>
          <View style={[StyleSheet.absoluteFill, styles.header]}>
            {this._maybeRenderBackButton()}
            {this.props.children}
          </View>
        </View>
      </Animated.View>
    );
  }
}

export default withNavigation(Header);
