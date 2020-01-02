import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
const width = Dimensions.get('window').width;

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        // eslint-disable-next-line no-useless-escape
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
        videoId = ID;
      } //Don't set URl into ID because it s causing crash on android
    } else if (this.props.videoId) {
      videoId = this.props.videoId;
    }
    if (videoId) {
      this.setState({ videoId });
      console.log(this.state);
    }
  }

  displaySpinner() {
    return (
      <ActivityIndicator
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}
        size="large"
      />
    );
  }

  render() {
    if (this.state.videoId) {
      return (
        <WebView
          containerStyle={{
            borderRadius: 9,
            height: 150,
            width: 265,
            marginRight: 12
          }}
          allowsFullscreenVideo
          javaScriptEnabled
          source={{
            uri: `https://www.youtube.com/embed/${
              this.state.videoId
            }?rel=0&autoplay=0&showinfo=0&controls=1&fullscreen=0`
          }}
          startInLoadingState
          renderLoading={() => {
            return this.displaySpinner();
          }}
        />
      );
    }
    return null;
  }
}

VideoContainer.propTypes = {
  url: PropTypes.string,
  videoId: PropTypes.string
};

export default VideoContainer;
