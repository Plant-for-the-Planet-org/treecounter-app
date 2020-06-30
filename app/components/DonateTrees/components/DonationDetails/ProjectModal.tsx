/* eslint-disable react-native/no-color-literals */
import React, { Component } from "react";
import { Platform, View } from "react-native";
import Modal from "react-native-modalbox";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TouchableItem from "./../../../Common/TouchableItem.native";
import SelectPlantProjectContainer from "../../../../containers/SelectPlantProject";
import { getProgressModelState } from "../../../../reducers/modelDialogReducer";
const backgroundColor = "#e4e4e4";
const activeColor = "#74ba00";
const defaultColor = "#4d5153";

class ProjectModal extends Component {
  state = {
    focus: 0,
    search: ""
  };
  async componentDidMount() {}

  setSearch = (text = "") => {
    this.state.search !== text && this.setState({ search: text });
  };
  // first close any open search, then close modal dialog
  onClosed = () => {
    this.state.search ? this.setSearch() : this.props.hideModal(false);
  };

  render() {
    let { show, navigation } = this.props;
    return (
      <Modal
        isOpen={show}
        position={"left"}
        onClosed={this.onClosed}
        backdropPressToClose
        coverScreen
        keyboardTopOffset={0}
        swipeToClose
      >
        <View
          style={{
            backgroundColor: backgroundColor,
            flex: 1,
            marginBottom: 20
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              flex: 1
            }}
          >
            <View
              style={{
                opacity: 1,
                flexDirection: "row",
                alignItems: "center",
                marginTop: Platform.OS === "ios" ? 54 : 20
              }}
            >
              <TouchableItem style={{ marginLeft: 24 }} onPress={this.onClosed}>
                {this.state.search ? (
                  <Icon name="arrow-back" size={30} color="black" />
                ) : (
                  <Icon name="close" size={30} color="#4d5153" />
                )}
              </TouchableItem>
            </View>
            <SelectPlantProjectContainer
              navigation={navigation}
              alreadySelected={true}
              supportTreecounter={() => {}}
              hideTitle={true}
              search={this.state.search}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    progressModelState: getProgressModelState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
