import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-native-youtube';

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.url) {
      let videoid = this.props.url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      );
      if (videoid != null) {
        console.log('video id = ', videoid[1]);

        if (videoid[1] && videoid[1].indexOf('embed') !== -1) {
          let splitted = videoid[1].split('/');
          this.state.videoId =
            splitted && splitted.length && splitted[splitted.length - 1];
        }
      } else {
        console.log('The youtube url is not valid.');
      }
    }
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  render() {
    if (this.state.videoId) {
      return (
        <YouTube
          ref={component => {
            this._youTubeRef = component;
          }}
          videoId={this.state.videoId}
          style={{ height: '100%' }}
        />
      );
    }
    return null;
  }
}

VideoContainer.propTypes = {
  url: PropTypes.string
};

export default VideoContainer;
