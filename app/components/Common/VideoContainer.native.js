import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
const width = Dimensions.get('window').width;

import { PureComponent } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewPropTypes,
  Linking,
  StyleSheet
} from 'react-native';
import { scanFile } from 'react-native-fs';

const DEFAULT_WIDTH = width;
const TYPES = {
  default: 'default',
  high: 'hqdefault',
  medium: 'mqdefault',
  standard: 'sddefault',
  maximum: 'maxresdefault'
};

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
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
  setPlaying = () => {
    this.setState({ playing: true });
  };
  render() {
    if (this.state.videoId) {
      if (!this.state.playing) {
        return (
          <Thumbnail
            type={'high'}
            videoId={this.state.videoId}
            key={0}
            containerStyle={{
              borderRadius: 12,
              height: width * 0.82 * 0.5625,
              width: width * 0.82,
              marginRight: 16,
              marginLeft: 10
            }}
            onPress={this.setPlaying}
          />
        );
      } else {
        return (
          <WebView
            key={1}
            containerStyle={{
              borderRadius: 12,
              height: width * 0.82 * 0.5625,
              width: width * 0.82,
              marginRight: 16,
              marginLeft: 10
            }}
            allowsFullscreenVideo
            javaScriptEnabled
            source={{
              uri: `https://www.youtube.com/embed/${
                this.state.videoId
              }?autoplay=1&rel=0&showinfo=1&controls=1&fullscreen=1`
            }}
            startInLoadingState
            mediaPlaybackRequiresUserAction={false}
            userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
            renderLoading={() => {
              return this.displaySpinner();
            }}
          />
        );
      }
    }
    return null;
  }
}

VideoContainer.propTypes = {
  url: PropTypes.string,
  videoId: PropTypes.string
};

export default VideoContainer;

class Thumbnail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      videoId: props.videoId
    };
  }

  static propTypes = {
    ...ImageBackground.propTypes,
    children: PropTypes.node,
    containerStyle: ViewPropTypes.style,
    imageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    imageWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iconStyle: Image.propTypes.style,
    onPress: PropTypes.func,
    onPressError: PropTypes.func,
    style: ViewPropTypes.style,
    type: PropTypes.oneOf(Object.keys(TYPES)),
    url: PropTypes.string,
    showPlayIcon: PropTypes.bool
  };

  static defaultProps = {
    type: 'high',
    imageHeight: 200,
    imageWidth: DEFAULT_WIDTH,
    onPressError: () => {},
    showPlayIcon: true
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const videoId = nextProps.videoId;

    if (videoId !== prevState.videoId) {
      return { videoId };
    }

    return null;
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.videoId === nextProps.videoId || !nextProps.videoId) {
      return;
    }

    this.setState({
      videoId: nextProps.videoId
    });
  }

  getType = () => TYPES[this.props.type];

  onPress = () => {
    const { videoId, onPress, onPressError } = this.props;

    if (onPress) {
      return onPress(videoId);
    }

    // implement play here without moving to youtube
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          return;
        }

        return Linking.openURL(url);
      })
      .catch(onPressError);
  };

  render() {
    const { videoId } = this.state;

    if (!videoId) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `Invalid "url" could not extract videoId from "${this.props.videoId}"`
        );
      }

      return null;
    }

    const {
      imageWidth,
      imageHeight,
      containerStyle,
      iconStyle,
      children,
      showPlayIcon,
      ...props
    } = this.props;

    const imageURL = `https://img.youtube.com/vi/${videoId}/${this.getType()}.jpg`;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[containerStyle]}
        onPress={this.onPress}
      >
        <ImageBackground
          source={{ uri: imageURL }}
          style={[
            styles.imageContainer,
            {
              height: width * 0.82 * 0.5625,
              width: width * 0.82,
              // transform: [{ scale: 1.2 }]
              borderRadius: 72,
              scaleX: 1.2,
              scaleY: 1.2
            }
          ]}
          imageStyle={{ borderRadius: 72 }}
          testId="thumbnail-image-background"
          {...props}
        >
          {showPlayIcon ? (
            <Image
              source={require('../../assets/images/play.png')}
              style={[
                styles.playIcon,
                iconStyle,
                {
                  borderRadius: 50,
                  resizeMode: 'contain'
                }
              ]}
              testId="thumbnail-image"
            />
          ) : null}

          {children}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  playIcon: {
    width: 75,
    height: 75
  }
});
