import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import { TextField } from 'react-native-material-textfield';
import RNFS from 'react-native-fs';
import { debug } from '../../../debug';
import { attach } from '../../../assets';
import i18n from '../../../locales/i18n.js';
import { getImageUrl } from '../../../actions/apiRouting';
import styles from '../../../styles/review.native';
import AddImage from '../../Common/Forms/AddImage';

const { width } = Dimensions.get('window');

export default class AddRatingSection extends Component {
  constructor(props) {
    super(props);
    //debug('props got in add rating:', props);
    let scoreObj = {};
    this.state = {
      id: props.review.id || undefined,
      plantProject: props.selectedPlantProject.id,
      summary: props.review.summary || '',
      reviewIndexScores: props.review.reviewIndexScores || scoreObj,
      pdfFile: '',
      reviewImages: props.review.reviewImages
        ? [...props.review.reviewImages]
        : []
    };
    this.updateImages = this.updateImages.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    //debug('after merging props in add rating', this.state);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.reviewIndexes &&
      !Object.keys(this.state.reviewIndexScores).length
    ) {
      let scoreObj = {};
      Object.keys(nextProps.reviewIndexes).map(index => {
        //debug(index);
        scoreObj[index] = { score: 0 };
      });
      this.setState({ reviewIndexScores: scoreObj });
      //debug('new props in add rating2', this.state);
    }
  }
  setStateAndUpdateParent(data) {
    this.setState(data, () => {
      this.props.onUpdate({ ...this.state });
      //debug('setting on add rating:', this.state);
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
        //debug('received image', images, images[0].data);
        this.updateImages(images);
      })
      .catch(e => {
        debug('error', e);
      });
  }
  deleteImage(index) {
    let { reviewImages } = this.state;
    let images = [...reviewImages];
    images = images.filter((data, i) => i !== index);
    reviewImages = [];
    //debug(images, index, reviewImages);
    this.setStateAndUpdateParent({
      reviewImages: images
    });
  }
  updateImages(images) {
    let { reviewImages } = this.state;
    if (typeof images == 'string') {
      images = [images];
    }
    images.map(image => {
      return reviewImages.push({
        imageFile: image
      });
    });
    //debug('updating review images:', reviewImages);
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
        //debug('received image', image, image.data);
        this.updateImages([image]);
      })

      .catch(e => {
        debug('error', e);
      });
  }

  renderAsset(image) {
    return this.renderImage(
      image.imageFile
        ? { uri: image.imageFile }
        : getImageUrl(image.image, 'review', 'small')
    );
  }

  renderImage(image) {
    //debug('image', image);
    return (
      <Image
        style={{ width: 200, height: 107, marginRight: 5, borderRadius: 2 }}
        source={image}
      />
    );
  }

  // Image Uploading Ends

  // Document picker
  async readContent(path) {
    RNFS.readFile(path, 'base64')
      .then(encoded => {
        //debug('data', encoded);
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
      /* debug(
        'Found doc:',
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
        res.content
      ); */

      this.readContent(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        //debug('err', err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        //debug('err', err);
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
    //debug('rating', rating, type);
  }
  render() {
    let { reviewIndexes } = this.props;
    let { reviewIndexScores } = this.state;
    //debug('index scores in add rating:', this.props);
    const guideLineUrl =
      'https://startplanting.atlassian.net/wiki/spaces/PA/pages/25559041';
    return (
      <View
        style={{
          width: width * 0.88,
          marginLeft: width * 0.06
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: -20
          }}
        >
          {Object.keys(reviewIndexScores).map(index => {
            return (
              <View style={[styles.singleRatingBox]} key={index}>
                <Text style={styles.ratingsText}>
                  {reviewIndexes[index] && reviewIndexes[index].name}
                </Text>

                <AirbnbRating
                  defaultRating={reviewIndexScores[index].score}
                  size={20}
                  showRating={false}
                  onFinishRating={rating => {
                    this.ratingCompleted(rating, index);
                  }}
                  style={{ color: '#2ecc71' }}
                />
              </View>
            );
          })}
          {this.props.validationError && this.props.validationError.index ? (
            <Text style={{ color: 'red', marginBottom: 20, marginTop: -10 }}>
              {i18n.t('label.at_least_one_index')}
            </Text>
          ) : null}
        </View>
        <View>
          <TextField
            tintColor={'#89b53a'}
            titleFontSize={12}
            returnKeyType="next"
            lineWidth={1}
            blurOnSubmit={false}
            onChangeText={summary => {
              //debug('summary', summary);
              this.setStateAndUpdateParent({ summary: summary });
            }}
            value={this.state.summary}
            multiline
            style={{ paddingBottom: 6 }}
            label={i18n.t('label.brief_review')}
          />
          {this.props.validationError && this.props.validationError.summary ? (
            <Text style={{ color: 'red' }}>
              {i18n.t('label.summary_missing')}
            </Text>
          ) : null}
          {/* Document Picking */}
          <View style={{ marginTop: 25 }} />
          <Text style={{ textTransform: 'uppercase', fontSize: 16 }}>
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
          {/* </View> */}

          {/* Document Picking ends */}
          <AddImage
            title={i18n.t('label.add_pictures')}
            updateImages={this.updateImages}
            deleteImage={this.deleteImage}
            images={this.state.reviewImages.map(data =>
              data.imageFile
                ? data.imageFile
                : getImageUrl('review', 'medium', data.image)
            )}
          />

          {/* Image Picking Part Ends */}
        </View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 13,
            lineHeight: 20
          }}
        >
          {i18n.t('label.guide_line')}
          <Text
            onPress={() => {
              Linking.openURL(guideLineUrl).catch(err => {
                debug(err);
              });
            }}
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
