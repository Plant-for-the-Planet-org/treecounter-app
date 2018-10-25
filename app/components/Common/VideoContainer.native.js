import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-native-youtube';
import { View } from 'react-native';

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      } else {
        ID = url;
        this.setState({ videoId: ID });
      }
    }
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    //  event.target.pauseVideo();
  }
  render() {
    if (this.state.videoId) {
      return (
        <YouTube
          play={true}
          videoId={this.state.videoId}
          style={{ height: 200, width: 100 }}
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
