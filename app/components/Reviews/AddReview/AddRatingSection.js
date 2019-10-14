import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import { TextField } from 'react-native-material-textfield';
import { attach } from './../../../assets';
const { width, height } = Dimensions.get('window');

export default class AddRatingSection extends Component {
  constructor(props) {
    super(props);
    console.log('props got:', props);
    this.state = {
      // images: null,
      // image: null,
      // fileUri: '',
      // fileType: '',
      // fileName: '',
      // fileSize: '',
      plantProject: props.selectedPlantProject.id,
      summary: '',
      reviewIndexScores: {
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
      ...props.review
    };
  }
  setStateAndUpdateParent(data) {
    this.setState(data, () => {
      this.props.onUpdate({ ...this.state });
      console.log('setting', this.state);
    });
  }
  componentDidMount() {}
  // Image Uploading
  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true
    })
      .then(images => {
        this.setState({
          image: null,
          images: images.map(i => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime
            };
          })
        });
      })
      .catch(e => alert(e));
  }

  clickImage(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      includeExif: true,
      mediaType
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => alert(e));
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  renderImage(image) {
    return (
      <Image
        style={{ width: 27, height: 27, marginRight: 5, borderRadius: 2 }}
        source={image}
      />
    );
  }

  // Image Uploading Ends

  // Document picker

  async pickDocument() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        readContent: true
      });
      // console.log(
      //   res.uri,
      //   res.type, // mime type
      //   res.name,
      //   res.size
      // );
      this.setStateAndUpdateParent({ pdfFile: res.content });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  // Document picker ended

  // rating completed
  ratingCompleted(rating, type) {
    let reviewIndexScores = { ...this.state.reviewIndexScores };
    reviewIndexScores[type] = { score: rating };
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
            justifyContent: 'space-around'
          }}
        >
          <View style={styles.singleRatingBox}>
            <Text style={styles.ratingsText}>Land Quality</Text>

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

          {/* <View style={styles.singleRatingBox}>
            <Text style={styles.ratingsText}>Tree Type</Text>

            <AirbnbRating
              defaultRating={0}
              size={20}
              showRating={false}
              style={{ color: '#2ecc71' }}
            />
          </View> */}

          <View style={styles.singleRatingBox}>
            <Text style={styles.ratingsText}>Co Benefits</Text>

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
            <Text style={styles.ratingsText}>Survival Rate</Text>

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
            multiline={true}
            label="BRIEF REVIEW OF PROJECT"
          />

          {/* Document Picking */}
          <View style={{ marginTop: 40 }}>
            <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>
              Upload Report (PDF)
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
              >
                {/* <TextField
                  tintColor={'#89b53a'}
                  titleFontSize={12}
                  lineWidth={1}
                  blurOnSubmit={false}
                  onChangeText={briefReview => this.setState({ briefReview })}
                  value={this.state.briefReview}
                  multiline={true}
                  editable={false}
                  label="Select File"
                /> */}
              </View>
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
          </View>
          {/* Document Picking ends */}

          {/* Image Picking Part */}
          {/* <Text style={{ marginTop: 40, fontSize: 12 }}>ADD PICTURES</Text> */}
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 9,
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          > */}
          {/* <ScrollView
							contentContainerStyle={{
								display: 'flex',
								flexDirection: 'row',
								flexWrap: 'wrap',
								justifyContent: 'flex-start',
								alignItems: 'flex-start'
							}}
						> */}
          {/* {this.state.image ? this.renderAsset(this.state.image) : null}
            {this.state.images
              ? this.state.images.map(i => (
                <View
                  key={i.uri}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  {this.renderAsset(i)}
                </View>
              ))
              : null} */}
          {/* </ScrollView> */}
          {/* <TouchableOpacity
            style={{
              justifyContent: 'center',
              height: 27,
              width: 27,
              marginLeft: 2
            }}
            onPress={this.pickMultiple.bind(this)}
          >
            <Text style={styles.pickImageButtonText}>+</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
              onPress={() => this.clickImage(true)}
              style={styles.pickImageButton2}
            >
              <Text style={styles.pickImageButtonText}>Click Image</Text>
            </TouchableOpacity> */}
        </View>

        {/* Image Picking Part Ends */}

        <Text
          style={{
            marginTop: 30,
            marginBottom: 40,
            fontSize: 13,
            lineHeight: 20
          }}
        >
          Please check the guidelines & only rate indexes you are most familiar
          with. All Indexes are optional.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingsText: {
    fontFamily: 'OpenSans',
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
    fontSize: 24
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
