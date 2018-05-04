import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Images
import SideMenuImage from '../../web/images/side_menu_image.png';

// Actions
import * as Sidebar from '../actions/menuAction';
import { logoutUser } from '../actions/authActions';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchAndSetMenuState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedIn !== this.props.loggedIn && this.props.loggedIn)
      this.fetchAndSetMenuState();
  }

  fetchAndSetMenuState() {
    Sidebar.MenuAction(this.props.loggedIn)
      .then(({ data }) => {
        this.setState({ data: data });
        console.log('Recieved data for menu- ', data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log('OOPS! JWT Token Expired');
          this.props.logoutUser();
        }
      });
  }

  sideNavImage() {
    return (
      <div className="app-container__sidenav--image">
        <img src={SideMenuImage} />
      </div>
    );
  }

  render() {
    console.log('Menu object', this.state.data);
    return (
      <div
        className={
          'app-container__sidenav ' + (this.props.isOpen ? 'open' : '')
        }
      >
        {this.sideNavImage()}
        {this.state.data.map(element => (
          <div key={'div' + element.sequence}>
            <span className="app-container__sidenav--heading">
              {element.caption}
            </span>
            <ul className="app-container__sidenav--list" key={element.sequence}>
              {element.menu_items.map(
                menuItem =>
                  menuItem.enabled ? (
                    <li key={'' + element.sequence + menuItem.sequence}>
                      <i className="material-icons">folder_open</i>
                      <Link to={menuItem.uri}>{menuItem.caption}</Link>
                    </li>
                  ) : (
                    <li key={'' + element.sequence + menuItem.sequence}>
                      <i className="material-icons">folder_open</i>
                      <a>{menuItem.caption}</a>
                    </li>
                  )
              )}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.sideNav.open
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logoutUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
