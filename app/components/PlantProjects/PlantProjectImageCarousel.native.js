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

const urls = [
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/67003.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/51681.max-620x600.jpg',
  'https://d919ce141ef35c47fc40-b9166a60eccf0f83d2d9c63fa65b9129.ssl.cf5.rackcdn.com/images/66812.max-620x600.jpg',
  'https://myanimelist.cdn-dena.com/s/common/uploaded_files/1438960604-925d1997518b66f8508c749f36810793.jpeg'
];

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
        <Text style={styles.closeText}>Exit</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderFooter = () => <Text style={styles.footerText}>Footer!</Text>;

  renderImage = idx => (
    <Image
      //   style={StyleSheet.absoluteFill}
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
              <Image
                style={styles.image}
                key={url}
                source={{
                  uri: getImageUrl('project', 'large', url.image),
                  width: 100
                }}
                resizeMode="contain"
              />
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
  image: {
    height: 100,
    margin: 5,
    resizeMode: 'contain'
  }
});
export default PlantProjectImageCarousel;
