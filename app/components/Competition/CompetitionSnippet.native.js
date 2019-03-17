import React from 'react';
import CardLayout from '../Common/Card';
import styles from '../../styles/selectplantproject/selectplantproject-snippet';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
import PlantedProgressBar from '../PlantProjects/PlantedProgressbar.native';
import tick from '../../assets/images/icons/tick.png';
import i18n from '../../locales/i18n';
import PrimaryButton from '../Common/Button/PrimaryButton';

class CompetitionSnippet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => this.containerPress(id)}
      >
        <CardLayout style={[styles.projectSnippetContainer]}>
          {/*{projectImage ? (*/}
          {/*<View style={styles.projectImageContainer}>*/}
          {/*<Image*/}
          {/*style={styles.teaser__projectImage}*/}
          {/*source={{*/}
          {/*uri: getImageUrl(*/}
          {/*'project',*/}
          {/*'large',*/}
          {/*teaserProps.projectImage.image*/}
          {/*)*/}
          {/*}}*/}
          {/*resizeMode={'cover'}*/}
          {/*/>*/}
          {/*</View>*/}
          {/*) : null}*/}

          <View style={styles.projectSpecsContainer}>
            <PlantedProgressBar countPlanted={1000} countTarget={1000} />
            <View style={styles.projectNameContainer}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.project_teaser__contentText}
              >
                project name
              </Text>
              {/*{teaserProps.isCertified ? (*/}
              {/*<Image*/}
              {/*source={tick}*/}
              {/*style={{*/}
              {/*width: 15,*/}
              {/*height: 15,*/}
              {/*marginLeft: 5,*/}
              {/*maxWidth: '10%'*/}
              {/*}}*/}
              {/*/>*/}
              {/*) : null}*/}
            </View>
            <View style={styles.projectdetailsContainer}>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>delhi</Text>
                <View>
                  <Text style={styles.survivalText}>
                    {i18n.t('label.survival_rate')} {':'} 100%
                  </Text>
                </View>
              </View>

              <View style={styles.costContainer}>
                <Text style={styles.costText}>sadsada</Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <View style={styles.byOrgContainer}>
                <Text
                  style={styles.byOrgText}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  'tpo name'
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <PrimaryButton
                  style={styles.buttonItem}
                  buttonStyle={styles.buttonStyle}
                  textStyle={styles.buttonTextStyle}
                  // onClick={() =>
                  //   this.props.onSelectClickedFeaturedProjects(id)
                  // }
                >
                  <Text> {i18n.t('label.donate')}</Text>
                </PrimaryButton>
              </View>
            </View>
          </View>
        </CardLayout>
      </TouchableHighlight>
    );
  }
}

export default CompetitionSnippet;
