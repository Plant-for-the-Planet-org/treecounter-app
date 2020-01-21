import React from 'react';
import styles from '../../../styles/user-home';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { getImageUrl } from './../../../actions/apiRouting';
import { delimitNumbers } from './../../../utils/utils';

import { Dimensions } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import i18n from '../../../locales/i18n.js';

class CompetitionSnippet extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleExpanded(id) {
    this.props.onMoreClick(id);
  }

  containerPress(id) {
    if (this.props.onMoreClick) {
      console.log(this.props.onMoreClick, 'this.props.onMoreClick');
      this.props.onMoreClick(id);
    }
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => this.containerPress(this.props.competition.id)}
      >
        <View
          style={{
            borderColor: '#d5d5d5',
            borderWidth: 1,
            borderRadius: 4,
            width: width * 0.44,
            marginRight: 20,
            marginTop: 20
          }}
        >
          {this.props.competition && this.props.competition.image ? (
            <View
              style={{
                height: width * 0.44 * 0.5625,
                width: '100%',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                overflow: 'hidden'
              }}
            >
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: getImageUrl(
                    'competition',
                    'medium',
                    this.props.competition.image
                  )
                }}
                resizeMode={'cover'}
              />
            </View>
          ) : (
            <View
              style={{
                height: width * 0.44 * 0.5625,
                width: '100%',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                overflow: 'hidden',
                backgroundColor: '#000'
              }}
            />
          )}

          <View style={{ padding: 6 }}>
            <View style={styles.projectNameContainer}>
              {this.props.competition ? (
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={3}
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 10,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 14,
                    letterSpacing: 0,
                    textAlign: 'left',
                    color: '#4d5153'
                  }}
                >
                  {this.props.competition.name}
                </Text>
              ) : null}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 4
                }}
              >
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 10,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 14,
                    letterSpacing: 0,
                    textAlign: 'left',
                    color: '#4d5153'
                  }}
                >
                  Goal {delimitNumbers(this.props.competition.goal)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 10,
                    lineHeight: 14,
                    letterSpacing: 0,
                    textAlign: 'right',
                    color: '#87b738'
                  }}
                >
                  Active
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default CompetitionSnippet;
