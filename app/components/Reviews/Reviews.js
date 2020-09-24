import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { debug } from '../../debug';
import SingleReview from './SingleReview';
import { getReviewIndexes } from '../../actions/reviews';
// import { ScrollView } from 'react-native-gesture-handler';
import { pushStaticRoute } from '../../helpers/routerHelper';
import {
  selectedPlantProjectSelector,
  selectedReviewsSelector,
  currentUserProfileSelector
} from '../../selectors';
import { deleteReview } from '../../actions/reviews';
import i18n from '../../locales/i18n.js';
import NumberFormat from '../Common/NumberFormat';
import SingleRating from './SingleRating';
import styles from '../../styles/review.native';

const { width } = Dimensions.get('window');

class Reviews extends Component {
  constructor(props) {
    super(props);
    //debug('reviews props:', props);

    this.state = {
      reviewIndexes: []
    };
  }
  async UNSAFE_componentWillMount() {
    try {
      const { data } = await getReviewIndexes();
      //debug('indexs', data);
      this.setState({ reviewIndexes: data });
    } catch (err) {
      //debug('eror on reviewindex', err);
    }
  }
  isReviewer() {
    return (
      this.props.currentUserProfile && this.props.currentUserProfile.isReviewer
    );
  }
  calculateScore() {
    let { reviewScore } = this.props.project;
    return (reviewScore / 100).toFixed(2);
  }
  render() {
    let { name } = this.props.project;
    const backgroundColor = 'white';
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
          backgroundColor: backgroundColor
        }}
      >
        {/*Header*/}
        <View
          style={{
            backgroundColor: backgroundColor,
            paddingTop: 30,
            paddingBottom: 30
          }}
        >
          <View
            style={{
              width: width * 0.88,
              marginLeft: width * 0.06,
              backgroundColor: backgroundColor
            }}
          >
            <Text style={styles.reviewPageTitle}>
              {i18n.t('label.community_reviews')}
            </Text>
            <Text style={styles.reviewPageSubTitle}>{name}</Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 7,
                alignItems: 'center'
              }}
            >
              <Text style={styles.totalRating}>
                <NumberFormat data={this.calculateScore()} />
              </Text>
              <SingleRating
                indexScore={{ score: Math.round(this.calculateScore()) }}
              />
            </View>
          </View>
        </View>

        {/*All Reviews*/}
        <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
          {this.props.reviews
            .sort((b, a) => a.id - b.id)
            .map(review => {
              return (
                <SingleReview
                  currentUserProfile={this.props.currentUserProfile}
                  deleteReview={this.props.deleteReview}
                  navigation={this.props.navigation}
                  key={review.id}
                  review={review}
                  reviewIndexes={this.state.reviewIndexes}
                />
              );
            })}
        </View>

        {/* All Reviews Ended */}

        {/*Write Review*/}
        {this.isReviewer() && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                pushStaticRoute('app_add_review', this.props.navigation);
              }}
              style={styles.writeReviewButton}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                {i18n.t('label.write_review')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: selectedReviewsSelector(state),
    project: selectedPlantProjectSelector(state),
    currentUserProfile: currentUserProfileSelector(state)
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteReview
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
