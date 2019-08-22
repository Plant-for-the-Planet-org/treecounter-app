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

  renderImage = idx => (
    <Image
      style={StyleSheet.absoluteFill}
      resizeMode="contain"
      source={{
        uri: getImageUrl('project', 'large', this.props.images[idx].image)
      }}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageCarousel
            ref={this.captureImageCarousel}
            renderContent={this.renderImage}
          >
            {this.props.images.map(url => (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  key={url}
                  source={{
                    uri: getImageUrl('project', 'large', url.image)
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

PlantProjectImageCarousel.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeText: {
    color: 'white',
    textAlign: 'right',
    padding: 10
  },
  footerText: {
    color: 'white',
    textAlign: 'center'
  },
  imageContainer: {
    height: 115,
    width: 115,
    maxHeight: 115,
    maxWidth: 115,
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
