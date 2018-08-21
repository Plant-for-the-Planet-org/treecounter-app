import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import PrimaryButton from '../../Common/Button/PrimaryButton';

import SeeMoreToggle from '../../Common/SeeMoreToggle';
import Proptypes from 'prop-types';
import { getImageUrl } from '../../../actions/apiRouting';

export default class ListViewProjects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { projects } = this.props;
    return (
      <ScrollView>
        <View style={styles.listContentContainer}>
          {projects.length !== 0
            ? projects.map(project => (
                <View
                  style={styles.listItemContainer}
                  key={'filtered' + project.id}
                >
                  <View style={styles.projectNameContainer}>
                    {project.image ? (
                      <View style={styles.projectImageContainer}>
                        <Image
                          style={styles.projectImage}
                          source={{
                            uri: getImageUrl('project', 'small', project.image)
                          }}
                        />
                      </View>
                    ) : null}

                    <View style={styles.projectNameTextContainer}>
                      <Text style={styles.projectNameText}>{project.name}</Text>
                      <Text
                        style={[styles.projectNameText, styles.tpoNameText]}
                      >
                        By {project.tpo_name}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.projectMetaContainer}>
                    <View style={styles.projectMetaLabels}>
                      <Text style={styles.textStyle}>Location</Text>
                      <Text style={styles.textStyle}>Planted Trees</Text>
                      <Text style={styles.textStyle}>Survival Rate</Text>
                      <Text style={styles.textStyle}>Cost Per Tree</Text>
                    </View>
                    <View style={styles.projectMetaValue}>
                      <Text style={styles.textStyle}>{project.location}</Text>
                      <Text style={styles.textStyle}>
                        {project.countPlanted}
                      </Text>
                      <Text style={styles.textStyle}>
                        {project.survivalRate} %
                      </Text>
                      <Text style={styles.textStyle}>
                        {project.currency + ' ' + project.treeCost.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.projectButtonContainer}>
                    <View style={{ marginVertical: -10 }}>
                      <SeeMoreToggle seeMore={true} />
                    </View>

                    <PrimaryButton
                      buttonStyle={styles.buttonStyle}
                      textStyle={styles.buttonTextStyle}
                      onClick={() => this.props.selectProject(project.id)}
                    >
                      select project
                    </PrimaryButton>
                  </View>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    );
  }
}

ListViewProjects.propTypes = {
  projects: Proptypes.array.isRequired
};
