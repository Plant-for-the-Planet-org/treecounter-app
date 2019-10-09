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
import { reverse } from 'dns';

const { width, height } = Dimensions.get('window');

export default class SingleReview extends Component {
  constructor(props) {
    super(props);
    console.log('sinle', props.review);
  }
  render() {
    let { review } = this.props;
    console.log('review', review);

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
            <View
              style={{
                backgroundColor: '#e3e3e3',
                borderRadius: 16,
                height: 32,
                width: 32
              }}
            />
          </View>
          <View style={{ marginLeft: 10, flexGrow: 1 }}>
            <Text style={styles.reviewUser}>
              {review.reviewer && review.reviewer.name}
            </Text>
            {/* <Text style={styles.reviewDate}>15 April 2019</Text> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              this.RBSheet.open();
            }}
          >
            <Icon
              name="ellipsis-v"
              solid
              size={20}
              style={{ color: '#9E9E9E' }}
            />
          </TouchableOpacity>
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
            name={'co-benefits'}
            indexScore={review.reviewIndexScores['co-benefits']}
          />
          <SingleRating
            name={'land-quality'}
            indexScore={review.reviewIndexScores['land-quality']}
          />
          <SingleRating
            name={'servival-rate'}
            indexScore={review.reviewIndexScores['servival-rate']}
          />
        </View>
        {/* Review Rating Ended */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddReview')}
            style={styles.pdfButton}
          >
            <Text style={styles.pdfButtonText}>View PDF</Text>
          </TouchableOpacity>
        </View>
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
          <BottomAction />
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reviewDate: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  reviewUser: {
    fontFamily: 'OpenSans',
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
    fontFamily: 'OpenSans',
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
    fontFamily: 'OpenSans',
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
