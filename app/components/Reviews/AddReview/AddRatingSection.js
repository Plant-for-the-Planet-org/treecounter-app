import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AirbnbRating } from 'react-native-ratings';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import { TextField } from 'react-native-material-textfield';
import { attach } from './../../../assets';
import RNFS from 'react-native-fs';
import i18n from '../../../locales/i18n.js';
import { getImageUrl } from '../../../actions/apiRouting';
const { width } = Dimensions.get('window');

export default class AddRatingSection extends Component {
  constructor(props) {
    super(props);
    console.log('props got in add rating:', props);
    this.state = {
      id: props.review.id || undefined,
      plantProject: props.selectedPlantProject.id,
      summary: props.review.summary || '',
      reviewIndexScores: props.review.reviewIndexScores || {
        'co-benefits': {
          score: 0
        },
        'land-quality': {
          score: 0
        },
        'survival-rate': {
          score: 0
        }
      },
      pdfFile: '',
      reviewImages: props.review.reviewImages
        ? [...props.review.reviewImages]
        : []
    };

    console.log('after merging got props in addrating', this.state);
  }

  setStateAndUpdateParent(data) {
    this.setState(data, () => {
      this.props.onUpdate({ ...this.state });
      console.log('setting on add rating:', this.state);
    });
  }

  // Image Uploading
  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      includeBase64: true,
      forceJpg: true
    })
      .then(images => {
        console.log('received image', images, images[0].data);
        this.updateImages(images);
      })
      .catch(e => alert(e));
  }
  updateImages(images) {
    let { reviewImages } = this.state;
    images.map(image => {
      return reviewImages.push({
        imageFile: 'data:application/jpeg;base64,' + image.data
      });
    });
    console.log('data', reviewImages);
    this.setStateAndUpdateParent({
      reviewImages: reviewImages
    });
  }
  clickImage(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
      includeBase64: true
    })
      .then(image => {
        console.log('received image', image, image.data);
        this.updateImages([image]);
      })

      .catch(e => alert(e));
  }

  renderAsset(image) {
    return this.renderImage(
      image.imageFile
        ? { uri: image.imageFile }
        : getImageUrl(image.image, 'review', 'small')
    );
  }

  renderImage(image) {
    console.log('image', image);
    return (
      <Image
        style={{ width: 27, height: 27, marginRight: 5, borderRadius: 2 }}
        source={image}
      />
    );
  }

  // Image Uploading Ends

  // Document picker
  async readContent(path) {
    RNFS.readFile(path, 'base64')
      .then(encoded => {
        console.log('data', encoded);
        this.setStateAndUpdateParent({
          pdfFile: 'data:application/pdf;base64,' + encoded
        });
      })
      .catch(error => console.error(error));
  }
  async pickDocument() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        readContent: false
      });
      console.log(
        'Found doc:',
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
        res.content
      );

      this.readContent(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('err', err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log('err', err);
      }
    }
  }

  // Document picker ended

  // rating completed
  ratingCompleted(rating, type) {
    let reviewIndexScores = { ...this.state.reviewIndexScores };
    reviewIndexScores[type] = {
      score: reviewIndexScores[type].score == rating ? 0 : rating
    };
    this.setStateAndUpdateParent({ reviewIndexScores });
    console.log('rating', rating, type);
  }

  render() {
    console.log('add', this.state);
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'flex-start'
          }}
        >
          <View style={styles.singleRatingBox}>
            <Text style={styles.ratingsText}>
              {i18n.t('label.land_quality')}
            </Text>

            <AirbnbRating
              defaultRating={this.state.reviewIndexScores['land-quality'].score}
              size={20}
              showRating={false}
              onFinishRating={rating => {
                this.ratingCompleted(rating, 'land-quality');
              }}
              style={{ color: '#2ecc71' }}
            />
          </View>

          <View style={styles.singleRatingBox}>
            <Text style={styles.ratingsText}>
              {i18n.t('label.co_benefits')}
            </Text>

            <AirbnbRating
              defaultRating={this.state.reviewIndexScores['co-benefits'].score}
              size={20}
              showRating={false}
              onFinishRating={rating => {
                this.ratingCompleted(rating, 'co-benefits');
              }}
              style={{ color: '#2ecc71' }}
            />
          </View>

          <View style={styles.singleRatingBox}>
            <Text style={styles.ratingsText}>
              {i18n.t('label.survival_rate')}
            </Text>

            <AirbnbRating
              defaultRating={
                this.state.reviewIndexScores['survival-rate'].score
              }
              size={20}
              showRating={false}
              onFinishRating={rating => {
                this.ratingCompleted(rating, 'survival-rate');
              }}
              style={{ color: '#2ecc71' }}
            />
          </View>
          <View style={styles.singleRatingBox}>
            <Text style={styles.ratingsText} />
          </View>
        </View>
        <View
          style={{
            width: width * 0.88,
            marginLeft: width * 0.06
          }}
        >
          <TextField
            tintColor={'#89b53a'}
            titleFontSize={12}
            returnKeyType="next"
            lineWidth={1}
            blurOnSubmit={false}
            onChangeText={summary => {
              console.log('summary', summary);
              this.setStateAndUpdateParent({ summary: summary });
            }}
            value={this.state.summary}
            multiline
            label={i18n.t('label.brief_review')}
          />

          {/* Document Picking */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>
              {i18n.t('label.upload_report')}
            </Text>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: -20
              }}
              onPress={() => this.pickDocument()}
            >
              <View
                style={{ flexGrow: 1, width: '100%', justifyContent: 'center' }}
              />
              <Image
                source={attach}
                style={{
                  height: 24,
                  width: 24,
                  marginLeft: -24,
                  marginBottom: -12
                }}
              />
            </TouchableOpacity>
            {this.state.pdfFile ? (
              <View style={{ marginTop: 15 }}>
                <Text>{i18n.t('label.file_selected')}</Text>
              </View>
            ) : null}
            {this.props.review && this.props.review.pdf ? (
              <View style={{ marginTop: 15 }}>
                <Text>{i18n.t('label.file_already_upload')}</Text>
              </View>
            ) : null}
          </View>

          {/* Document Picking ends */}

          {/* Image Picking Part */}
          <Text style={{ marginTop: 40, fontSize: 12 }}>
            {i18n.t('label.add_pictures')}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 9,
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <ScrollView
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}
            >
              {this.state.reviewImages
                ? this.state.reviewImages.map((i, index) => (
                    <View
                      key={index}
                      style={{ display: 'flex', flexDirection: 'row' }}
                    >
                      {this.renderAsset(i)}
                    </View>
                  ))
                : null}

              <TouchableOpacity
                style={{
                  height: 37,
                  width: 37,
                  marginLeft: 5,
                  display: 'flex'
                }}
                onPress={this.pickMultiple.bind(this)}
              >
                <Text style={{ margin: 1 }}>
                  <Icon name={'plus'} solid size={18} />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 37,
                  width: 37
                }}
                onPress={() => this.clickImage(true)}
              >
                <Text style={{ margin: 1 }}>
                  <Icon name={'camera'} size={18} />
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Image Picking Part Ends */}
        </View>
        <Text
          style={{
            margin: 30,
            marginBottom: 40,
            fontSize: 13,
            lineHeight: 20
          }}
        >
          {i18n.t('label.guide_line')}
          <Text
            style={{
              color: '#89b53a'
            }}
          >
            {'\n'}
            {i18n.t('label.view_guidelines')}
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingsText: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginBottom: 14,
    textTransform: 'uppercase'
  },
  singleRatingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 32,
    minWidth: width * 0.4
  },
  pickImageButton1: {
    flex: 1,
    backgroundColor: '#03A9F4',
    padding: 12,
    alignItems: 'center',
    borderTopLeftRadius: 4,
    marginTop: 12,
    borderRightWidth: 1,
    borderRightColor: 'white'
  },
  pickImageButton2: {
    flex: 1,
    backgroundColor: '#03A9F4',
    padding: 12,
    alignItems: 'center',
    borderTopRightRadius: 4,
    marginTop: 12
  },
  pickImageButtonText: {
    fontSize: 37
  },
  briefReview: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    paddingTop: 12,
    borderRadius: 4,
    marginTop: 5,
    textAlign: 'left',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
