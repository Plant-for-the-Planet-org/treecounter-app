import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import {
  selectedPlantProjectSelector,
  selectedReviewsSelector
} from '../../../selectors';
// import { ScrollView } from 'react-native-gesture-handler';
import AddRatingSection from './AddRatingSection';
const { width } = Dimensions.get('window');
import { forward } from './../../../assets';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import { connect } from 'react-redux';
import {
  addReview,
  updateReview,
  getReviewIndexes
} from '../../../actions/reviews';
import { bindActionCreators } from 'redux';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/review.native';
// import { find } from 'lodash';
class AddReview extends Component {
  constructor(props) {
    super(props);
    console.log('props in add reviews', props);
    this.state = {
      validationError: {},
      reviewIndexes: {},
      review:
        (props.navigation.state.params &&
          props.navigation.state.params.review) ||
        {}
    };
    this.create = this.create.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  onUpdate(data) {
    this.setState({ review: data }, () => {
      console.log('submitted', this.submitted);
      this.submitted && this.validate();
    });
  }
  async componentWillMount() {
    try {
      const { data } = await getReviewIndexes();
      console.log('indexs', data);
      let obj = {};
      data.map(i => {
        obj[i.slug] = i;
      });
      this.setState({ reviewIndexes: obj });
    } catch (err) {
      console.log('eror on reviewindex', err);
    }
  }
  validate() {
    const { review } = this.state;
    console.log('validating', review, !review.reviewIndexScores);
    if (
      !review.reviewIndexScores ||
      !Object.keys(review.reviewIndexScores).filter(index =>
        Number(review.reviewIndexScores[index].score)
      ).length
    ) {
      this.setState({ validationError: { index: true } });
      return false;
    } else {
      this.setState({ validationError: { index: false } });
    }
    if (!review.summary) {
      this.setState({ validationError: { summary: true } });
      return false;
    } else {
      this.setState({ validationError: { summary: false } });
    }
    return true;
  }
  async create() {
    this.submitted = true;
    if (!this.validate()) return;
    const { review } = this.state;

    console.log('review before submitting', review);
    try {
      if (this.state.review.id) {
        let {
          id,
          reviewIndexScores,
          summary,
          pdfFile,
          reviewImages
        } = this.state.review;
        const plantProject = this.props.selectedPlantProject.id;
        await this.props.updateReview(
          {
            id,
            plantProject,
            summary,
            reviewIndexScores,
            pdfFile,
            reviewImages
          },
          this.props.selectedPlantProject
        );
      } else {
        await this.props.addReview(
          this.state.review,
          this.props.selectedPlantProject
        );
      }
      updateStaticRoute('app_reviews', this.props.navigation);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    console.log('state', this.state);
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
          backgroundColor: '#fff',
          flexGrow: 1
        }}
      >
        {/*Header*/}
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 30
          }}
        >
          <View
            style={{
              width: width * 0.88,
              marginLeft: width * 0.06,
              backgroundColor: 'white'
            }}
          >
            <Text style={styles.reviewPageTitle}>
              {this.state.review.id
                ? i18n.t('label.edit_project_review')
                : i18n.t('label.add_project_review')}
            </Text>
            <Text style={styles.reviewPageSubTitle}>
              {this.props.selectedPlantProject.name}
            </Text>
          </View>
        </View>

        {/*All Reviews*/}
        <View>
          <AddRatingSection
            review={this.state.review}
            selectedPlantProject={this.props.selectedPlantProject}
            onUpdate={this.onUpdate}
            reviewIndexes={this.state.reviewIndexes}
            validationError={this.state.validationError}
          />
        </View>

        {/* All Reviews Ended */}

        {/*Write Review*/}
        <TouchableOpacity
          style={styles.pledgeSmallButton}
          onPress={() => {
            console.log('plant project', this.props.selectedPlantProject);
            this.create();
          }}
        >
          <Image
            source={forward}
            resizeMode="cover"
            style={{ height: 32, width: 32 }}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: selectedReviewsSelector(state),
    selectedPlantProject: selectedPlantProjectSelector(state)
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addReview,
      updateReview
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
