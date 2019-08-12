import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-native-youtube';
import { View, StyleSheet } from 'react-native';

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moduleMargin: StyleSheet.hairlineWidth * 2 };
  }
  componentWillMount() {
    let videoId = undefined;
    if (this.props.url) {
      let ID = '';
      let url;
      url = this.props.url
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
        videoId = ID;
      } //Don't set URl into ID because it s causing crash on android
    } else if (!!this.props.videoId) {
      videoId = this.props.videoId;
    }
    // Periodically triggeting a forced unnoticable layout rendering until onReady to make sure the
    // native loading progress is shown
    if (!!videoId) {
      this.setState({ videoId });
      this._interval = setInterval(() => {
        this.setState({ moduleMargin: Math.random() / 2 });
      }, 250);
    }
  }
  _onReady = event => {
    clearInterval(this._interval);

    // The Android YouTube native module is pretty problematic when it comes to mounting correctly
    // and rendering inside React-Native's views hierarchy. For now we must trigger some layout
    // changes to force a real render on it so it will smoothly appear after ready and show
    // controls. We also use the minimal margin to avoid `UNAUTHORIZED_OVERLAY` error from the
    // native module that is very sensitive to being covered or even touching its containing view.
    setTimeout(() => {
      this.setState({ moduleMargin: StyleSheet.hairlineWidth });
    }, 250);
    if (this.props.onReady) this.props.onReady(event.nativeEvent);
  };
  render() {
    if (this.state.videoId) {
      return (
        <YouTube
          apiKey="AIzaSyC0sO3FQX-DYNRsBW1-Hc8BBnhwnwvZQ2Y"
          ref={component => {
            this._youTubeRef = component;
          }}
          style={[{ height: 300 }, { margin: this.state.moduleMargin }]}
          onReady={this._onReady}
          videoId={this.state.videoId}
          play={false}
        />
      );
    }
    // console.log(this.state);
    return null;
  }
}

VideoContainer.propTypes = {
  url: PropTypes.string,
  videoId: PropTypes.string
};

export default VideoContainer;
