import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import ModalDialog from './ModalDialog';

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videoId: null };
  }
  componentWillMount() {
    if (this.props.url) {
      let ID = '';
      let url;
      url = this.props.url
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
        this.setState({ videoId: ID });
      }
    }
  }
  _onReady = event => {
    // access to player in all event handlers via event.target
    this.props.onViewMoreClick();
    event.target.pauseVideo();
  };
  render() {
    if (this.state.videoId) {
      return (
        <div className="youtube-video__container">
          <YouTube videoId={this.state.videoId} onReady={this._onReady} />
        </div>
      );
    }
    return null;
  }
}

VideoContainer.propTypes = {
  url: PropTypes.string,
  onViewMoreClick: PropTypes.func
};

export default VideoContainer;
