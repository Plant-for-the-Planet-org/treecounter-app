import React, { Component } from 'react';

import * as constants from '../../SupportedLanguages/en';

class SearchProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProjectName: '',
      Price: '',
      SearchProject: '',
      SearchPrice: '',
      SelectSearchFunction: -1,
      show: false
    };
    this.ShowData = this.ShowData.bind(this);
    this.ProjectSearch = this.ProjectSearch.bind(this);
    this.PriceSearch = this.PriceSearch.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.SelectValue = this.SelectValue.bind(this);
    this.handleFunction = this.handleFunction.bind(this);
  }
  ShowData() {
    if (this.state.SelectSearchFunction == 1) {
      return this.state.SearchProject;
    } else if (this.state.SelectSearchFunction == 2) {
      return this.state.SearchPrice;
    }
  }
  handleFunction(handleData) {
    this.SelectSearch(handleData);
    if (handleData == 1) {
      $('#ProjectSearch')
        .removeClass()
        .addClass('indiviual');
      $('#PriceSearch')
        .removeClass()
        .addClass('many');
      $('#projectSearchTab').show();
    } else if (handleData == 2) {
      $('#ProjectSearch')
        .removeClass()
        .addClass('many');
      $('#PriceSearch')
        .removeClass()
        .addClass('indiviual');
      $('#projectSearchTab').show();
    }
  }

  SelectValue() {
    if (this.state.SelectSearchFunction == 1) {
      return this.state.ProjectName;
    } else if (this.state.SelectSearchFunction == 2) {
      return this.state.Price;
    }
  }

  updateInputValue(evt) {
    if (this.state.SelectSearchFunction == 1) {
      this.setState({
        ProjectName: evt.target.value
      });
    } else if (this.state.SelectSearchFunction == 2) {
      this.setState({
        Price: `${evt.target.value}`
      });
    }
  }

  SelectSearch(SelectSearch) {
    switch (SelectSearch) {
      case 1: {
        this.ProjectSearch();
        break;
      }
      case 2: {
        this.PriceSearch();
        break;
      }
    }
  }

  ProjectSearch() {
    let projects = this.props.plantProjects.map(arr => arr);
    let Searchedproject = [];
    projects.sort((a, b) => a.name > b.name);
    projects.map((value, index) => {
      if (value != undefined) {
        Searchedproject.push(
          <tr key={index}>
            <td>{value.name}</td>
            <td>{this.props.userTpos[value.tpo_id].name}</td>
            <td>{value.count_planted}</td>
            <td>{value.tree_cost}</td>
          </tr>
        );
      }
    });
    this.setState({
      SearchProject: Searchedproject,
      SelectSearchFunction: 1
    });
  }

  PriceSearch() {
    let projects = this.props.plantProjects.map(arr => arr);
    let Searchedproject = [];
    projects.sort((a, b) => a.tree_cost - b.tree_cost);
    projects.map((value, index) => {
      if (value != undefined) {
        Searchedproject.push(
          <tr key={index}>
            <td>{value.name}</td>
            <td>{this.props.userTpos[value.tpo_id].name}</td>
            <td>{value.count_planted}</td>
            <td>{value.tree_cost}</td>
          </tr>
        );
      }
    });
    this.setState({
      SearchPrice: Searchedproject,
      SelectSearchFunction: 2
    });
  }

  render() {
    return (
      <div className="xs-project-search">
        <div className="text-center">
          <h3 className="cs-subHeading">Project Search</h3>
        </div>
        <div className="row flex-row f-center">
          <input
            type="button"
            value="Project Search"
            className="indiviual"
            onClick={() => this.handleFunction(1)}
            id="ProjectSearch"
          />
          <input
            type="button"
            value="Price Search"
            className="many"
            onClick={() => this.handleFunction(2)}
            id="PriceSearch"
          />
        </div>
        {this.state.SelectSearchFunction != -1 ? (
          <div>
            <div
              className="row flex-row f-center"
              id="projectSearchTab"
              style={this.props.style}
            >
              <div className="col-md-12 projectSearchTable">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>{constants.formStrings.project}</th>
                      <th>{constants.formStrings.organisation}</th>
                      <th>{constants.formStrings.plantedTrees}</th>
                      <th>{constants.formStrings.Cost}</th>
                    </tr>
                  </thead>
                  <tbody>{this.ShowData()}</tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SearchProjects;
