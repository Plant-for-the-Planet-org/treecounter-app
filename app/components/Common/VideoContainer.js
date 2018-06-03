import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    if (props.url) {
      let url = new URL(props.url);
      if (url.searchParams) {
        this.state = { videoId: url.searchParams.get('v') };
        if (!this.state.videoId) {
          if (url.pathname && url.pathname.includes('embed')) {
            let splitted = url.pathname.split('/');
            this.state.videoId =
              splitted && splitted.length && splitted[splitted.length - 1];
          }
        }
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
        <div className="youtube-video__container">
          <YouTube videoId={this.state.videoId} onReady={this._onReady} />;
        </div>
      );
    }
    return null;
  }
}

VideoContainer.propTypes = {
  url: PropTypes.string
};

export default VideoContainer;
