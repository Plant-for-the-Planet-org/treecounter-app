import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import SingleRating from './SingleRating';
import BottomAction from './BottomAction';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import { pushStaticRoute } from './../../helpers/routerHelper';
import { formatDate } from '../../utils/utils';
import i18n from '../../locales/i18n.js';
import UserProfileImage from '../Common/UserProfileImage';
import { getLocalRoute } from '../../actions/apiRouting';
import { find } from 'lodash';
import styles from '../../styles/review.native';
export default class SingleReview extends Component {
  constructor(props) {
    super(props);
    console.log('single props', props);
    this.close = this.close.bind(this);
    this.state = {
      reviewIndexes: props.reviewIndexes
    };
  }
  componentWillReceiveProps(nextProps) {
    nextProps.reviewIndexes
      ? this.setState({ reviewIndexes: nextProps.reviewIndexes })
      : '';
    console.log('got new indexes', nextProps.reviewIndexes);
  }
  close() {
    this.RBSheet.close();
  }
  isReviewer() {
    let { currentUserProfile } = this.props;
    return currentUserProfile.isReviewer;
  }
  canModify() {
    let { review, currentUserProfile } = this.props;
    return (
      review.reviewer &&
      currentUserProfile &&
      currentUserProfile.id == review.reviewer.userProfileId
    );
  }
  getAvatar() {
    return this.props.review.reviewer ? this.props.review.reviewer.avatar : '';
  }
  getAllIndexes() {
    let { reviewIndexScores } = this.props.review;
    return Object.keys(reviewIndexScores);
  }
  render() {
    let { review, navigation } = this.props;
    // console.log('in single props in render', this.props);
    const { reviewIndexScores } = review;
    const { reviewIndexes } = this.state;
    return (
      <View
        style={{
          paddingBottom: 20,
          backgroundColor: 'white',
          marginBottom: 20,
          paddingTop: 20
        }}
      >
        {/* Review Header */}
        <View style={styles.headerParent}>
          <View>
            <TouchableOpacity
              onPress={() =>
                review.reviewer &&
                navigation.navigate(getLocalRoute('app_treecounter'), {
                  treeCounterId: review.reviewer.treecounterSlug
                })
              }
            >
              <UserProfileImage
                profileImage={this.getAvatar()}
                imageStyle={{ width: 32, height: 32, borderRadius: 16 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 5, flexGrow: 1 }}>
            <TouchableOpacity
              onPress={() =>
                review.reviewer &&
                navigation.navigate(getLocalRoute('app_treecounter'), {
                  treeCounterId: review.reviewer.treecounterSlug
                })
              }
            >
              <Text style={styles.reviewUser}>
                {review.reviewer &&
                  review.reviewer.name +
                    (review.reviewer.organization ? ', ' : '') +
                    review.reviewer.organization}
              </Text>
              {review.created && (
                <Text style={styles.reviewDate}>
                  {formatDate(review.updated)}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {this.canModify() && (
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{ width: 30 }}
            >
              <Icon
                name="ellipsis-v"
                solid
                size={24}
                style={{ color: '#9E9E9E' }}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Review Header Ended */}
        {/* Review Content */}
        <View style={styles.textParent}>
          <Text style={styles.reviewText}>{review.summary}</Text>
        </View>
        {/* Review Content Ended */}

        {/* Review Rating */}
        <View style={styles.ratingsParent}>
          {reviewIndexes.length
            ? this.getAllIndexes().map(index => {
                return reviewIndexScores[index].score > 0 ? (
                  <SingleRating
                    key={index}
                    name={find(reviewIndexes, { slug: index }).name}
                    indexScore={reviewIndexScores[index]}
                  />
                ) : null;
              })
            : null}
        </View>
        {/* Review Rating Ended */}
        {review.pdf && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() =>
                pushStaticRoute('app_view_pdf', this.props.navigation, {
                  url: review.pdf
                })
              }
              style={styles.pdfButton}
            >
              <Text style={styles.pdfButtonText}>
                {i18n.t('label.view_pdf')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={128}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center'
            }
          }}
        >
          <BottomAction
            delete={this.props.deleteReview}
            close={this.close}
            review={review}
            navigation={navigation}
          />
        </RBSheet>
      </View>
    );
  }
}

{
  /* <View style={{ flex: 1 }}>
                {this.props.plantProjects
                  .filter(filterProj => filterProj.allowDonations)
                  .map(project => (
                    <PlantProjectSnippet
                      key={'trillion' + project.id}
                      onMoreClick={id => this.onMoreClick(id, project.name)}
                      plantProject={project}
                      onSelectClickedFeaturedProjects={id =>
                        this.onSelectClickedFeaturedProjects(id)
                      }
                      showMoreButton={false}
                      tpoName={project.tpo_name}
                    />
                  ))}
              </View> */
}
