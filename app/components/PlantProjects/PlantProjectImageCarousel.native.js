import ImageCarousel from 'react-native-image-carousel';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { getImageUrl } from '../../actions/apiRouting';
import PropTypes from 'prop-types';
const width = Dimensions.get('window').width;

class PlantProjectImageCarousel extends Component {
  imageCarousel;

  constructor(props) {
    super(props);
    this.state={
      images: props.images || []
    }
  }


  UNSAFE_componentWillMount() {
    // StatusBar.setBarStyle('dark-content');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.images !== nextProps.images) {
      this.setState({
        images: nextProps.images,
      })
    }
  }

  captureImageCarousel = imageCarousel => {
    this.imageCarousel = imageCarousel;
  };

  handleHeaderPress = () => this.imageCarousel.close();

  renderHeader = () => (
    <TouchableWithoutFeedback onPress={this.handleHeaderPress}>
      <View style={{ alignItems: 'flex-end', padding: 20 }}>
        <Icon
          name="clear"
          size={24}
          color="white"
          style={{ marginRight: 0, paddingTop: 10, paddingLeft: 5 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  renderFooter = (idx, images) => (
    <View style={[{ height: 150 }]}>
      <Text style={[styles.footerText, {}]}>
        {idx + 1}/{images.length}{' '}
        {images[idx].description ? '-' : ''}{' '}
        {images[idx].description}
      </Text>
    </View>
  );

  renderImage = (idx, images) => {
    return (
      <Image
        key={images && images[idx].image}
        style={[StyleSheet.absoluteFill]}
        resizeMode="contain"
        source={{
          uri: getImageUrl(
            this.props.pictureType,
            this.props.pictureSize,
            images && images[idx].image
          )
        }}
      />
    );
  };

  render() {
    const {images}=this.state;
    return (
      images && images.length > 0 &&
      <View style={styles.container}>
        <View>
          <ImageCarousel
            ref={this.captureImageCarousel}
            renderContent={(idx)=>this.renderImage(idx,images)}
            renderHeader={(idx)=>this.renderHeader(idx,images)}
            renderFooter={(idx)=>this.renderFooter(idx,images)}
          >
            {images && images.map(url => (
              <View
                key={`viewof-${url}`}
                style={[
                  styles.imageContainer,
                  { marginLeft: this.props.videoUrl ? null : 20 }
                ]}
              >
                <Image
                  style={[
                    styles.image,
                    this.props.style ? this.props.style : ''
                  ]}
                  aspectRatio={this.props.aspectRatio}
                  key={url && url.image}
                  source={{
                    uri: url && getImageUrl(this.props.pictureType, this.props.pictureSize, url && url.image)
                  }}
                  resizeMode={this.props.resizeMode}
                />
              </View>
            ))}
          </ImageCarousel>
        </View>
      </View>
    );
  }
}

PlantProjectImageCarousel.propTypes = {
  pictureType: PropTypes.string,
  pictureSize: PropTypes.string
};
PlantProjectImageCarousel.defaultProps = {
  pictureType: 'project',
  pictureSize: 'large'
};
const textColor = 'white';
const borderColor = '#29000000';
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footerText: {
    color: textColor,
    textAlign: 'left',
    marginLeft: 24,
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0
  },
  imageContainer: {
    height: width * 0.82 * 0.5625,
    width: width * 0.82,
    maxHeight: width * 0.82 * 0.5625,
    maxWidth: width * 0.82,
    marginLeft: 0,
    marginRight: 16,
    borderColor: borderColor,
    borderWidth: 1,
    borderRadius: 7,
    padding: 0
  },
  image: {
    flex: 1,
    width: width * 0.82,
    height: width * 0.82 * 0.5625,
    borderRadius: 7
  }
});
export default PlantProjectImageCarousel;
