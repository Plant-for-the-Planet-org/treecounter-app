import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import SingleRating from './SingleRating';
import BottomAction from './BottomAction';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import { pushStaticRoute } from './../../helpers/routerHelper';
import { formatDate } from '../../utils/utils';
import { getSuggestions } from '../../helpers/utils';
import i18n from '../../locales/i18n.js';
import UserProfileImage from '../Common/UserProfileImage';
const { width, height } = Dimensions.get('window');

export default class SingleReview extends Component {
  constructor(props) {
    super(props);
    console.log('single props', props);
    this.close = this.close.bind(this);
    this.state = { profileImage: '' };
  }
  componentDidMount() {
    console.log('calling get avatar');
    this.getAvatar();
  }
  close() {
    this.RBSheet.close();
  }
  isReviewer() {
    let { review, currentUserProfile } = this.props;
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
    this.props.review.reviewer &&
      getSuggestions(this.props.review.reviewer.treecounterSlug, true).then(
        suggestions => {
          console.log('got sugession', suggestions);
          suggestions.length &&
            this.setState({ profileImage: suggestions[0].image });
        }
      );
  }
  render() {
    let { review, navigation, currentUserProfile } = this.props;
    console.log('in single props in render', this.props);

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
            {/* <View
              style={{
                backgroundColor: '#e3e3e3',
                borderRadius: 16,
                height: 32,
                width: 32
              }}
            /> */}
            <UserProfileImage
              profileImage={this.state.profileImage}
              imageStyle={{ width: 32, height: 32, borderRadius: 16 }}
            />
          </View>
          <View style={{ marginLeft: 10, flexGrow: 1 }}>
            <Text style={styles.reviewUser}>
              {review.reviewer && review.reviewer.name}
            </Text>
            {review.created && (
              <Text style={styles.reviewDate}>
                {formatDate(review.updated)}
              </Text>
            )}
          </View>
          {this.canModify() && (
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
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
          {/*  {console.log('scores', review.reviewIndexScores, review.reviewIndexScores['co-benefits'], review.reviewIndexScores['land-quality'], review.reviewIndexScores['servival-rate'])} */}
          <SingleRating
            name={'land-quality'}
            indexScore={review.reviewIndexScores['land-quality']}
          />
          <SingleRating
            name={'co-benefits'}
            indexScore={review.reviewIndexScores['co-benefits']}
          />
          <SingleRating
            name={'survival-rate'}
            indexScore={review.reviewIndexScores['survival-rate']}
          />
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

const styles = StyleSheet.create({
  reviewDate: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  headerParent: {
    width: width * 0.88,
    marginLeft: width * 0.06,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textParent: {
    width: width * 0.88,
    marginLeft: width * 0.06,
    marginTop: 16
  },
  reviewText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'justify',
    color: '#4d5153'
  },
  ratingsParent: {
    width: width * 0.88,
    marginLeft: width * 0.06,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  pdfButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153'
  },
  pdfButton: {
    paddingHorizontal: 36,
    paddingVertical: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 24,
    marginTop: 20
  }
});

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
