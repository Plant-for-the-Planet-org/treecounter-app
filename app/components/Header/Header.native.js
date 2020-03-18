/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Animated, StyleSheet, View, BackHandler } from 'react-native';
import { withNavigation, HeaderBackButton } from 'react-navigation';
import styles from '../../styles/common/header.native';
import colors from '../../utils/constants';

class Header extends React.PureComponent {
  _navigateBack = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  _maybeRenderBackButton = () => {
    if (!this.props.backButton) {
      return;
    }

    return (
      <HeaderBackButton
        onPress={this._navigateBack}
        pressColorAndroid={this.props.tintColor || colors.WHITE}
        tintColor={this.props.tintColor}
        title={this.props.backButtonTitle || null}
        truncatedTitle={this.props.backButtonTruncatedTitle || null}
        titleStyle={this.props.backButtonTitleStyle || null}
      />
    );
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._navigateBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._navigateBack);
  }

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
