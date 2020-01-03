import ImageCarousel from 'react-native-image-carousel';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { getImageUrl } from '../../actions/apiRouting';
import PropTypes from 'prop-types';
const width = Dimensions.get('window').width;

class PlantProjectImageCarousel extends Component {
  imageCarousel;

  componentWillMount() {
    // StatusBar.setBarStyle('dark-content');
  }

  captureImageCarousel = imageCarousel => {
    this.imageCarousel = imageCarousel;
  };

  handleHeaderPress = () => this.imageCarousel.close();

  renderHeader = () => (
    <TouchableWithoutFeedback onPress={this.handleHeaderPress}>
      <View style={{ alignItems: 'flex-start', padding: 20 }}>
        <Icon
          name="clear"
          size={24}
          color="white"
          style={{ marginRight: 10, paddingTop: 2, paddingLeft: 5 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  renderFooter = idx => (
    <View style={{ marginBottom: 25 }}>
      <Text style={styles.footerText}>
        {idx + 1}/{this.props.images.length} -{' '}
        {this.props.images[idx].description}
      </Text>
    </View>
  );

  renderImage = idx => {
    return (
      <Image
        key={this.props.images[idx].image}
        style={StyleSheet.absoluteFill}
        resizeMode="contain"
        source={{
          uri: getImageUrl(
            this.props.pictureType,
            'large',
            this.props.images[idx].image
          )
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageCarousel
            ref={this.captureImageCarousel}
            renderContent={this.renderImage}
            renderHeader={this.renderHeader}
            renderFooter={this.renderFooter}
          >
            {this.props.images.map(url => (
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
                  key={url.image}
                  source={{
                    uri: getImageUrl(this.props.pictureType, 'large', url.image)
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
  pictureType: PropTypes.string
};
PlantProjectImageCarousel.defaultProps = {
  pictureType: 'project'
};
const textColor = 'white';
const borderColor = '#29000000';
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footerText: {
    color: textColor,
    textAlign: 'center',
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
