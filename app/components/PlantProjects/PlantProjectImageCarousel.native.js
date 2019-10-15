import ImageCarousel from 'react-native-image-carousel';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import React, { Component } from 'react';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n';
import PropTypes from 'prop-types';

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
      <View>
        <Text style={styles.closeText}>{i18n.t('label.exit')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderFooter = () => <Text style={styles.footerText} />;

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
          >
            {this.props.images.map(url => (
              <View key={`viewof-${url}`} style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  key={url.image}
                  source={{
                    uri: getImageUrl(this.props.pictureType, 'large', url.image)
                  }}
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
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeText: {
    color: textColor,
    textAlign: 'right',
    padding: 10
  },
  footerText: {
    color: textColor,
    textAlign: 'center'
  },
  imageContainer: {
    height: 100,
    width: 100,
    maxHeight: 100,
    maxWidth: 100,
    marginLeft: 5,
    marginRight: 5
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});
export default PlantProjectImageCarousel;
