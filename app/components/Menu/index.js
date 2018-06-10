import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Images
import * as images from '../../assets';

export default class Menu extends Component {
  sideNavImage() {
    return (
      <div className="app-container__sidenav--image">
        <img src={images['SideMenuImage']} />
      </div>
    );
  }

  render() {
    return (
      <div
        className={
          'app-container__sidenav ' + (this.props.isOpen ? 'open' : '')
        }
      >
        {this.sideNavImage()}
        {this.props.menuData.map(element => (
          <div key={'div' + element.sequence}>
            <span className="app-container__sidenav--heading">
              {element.caption}
            </span>
            <ul className="app-container__sidenav--list" key={element.sequence}>
              {element.menuItems.map(
                menuItem =>
                  menuItem.enabled ? (
                    <li key={'' + element.sequence + menuItem.sequence}>
                      <img
                        src={
                          menuItem.icon && menuItem.icon !== 'none'
                            ? images[menuItem.icon]
                            : null
                        }
                        className="menu-icon"
                      />
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

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  menuData: PropTypes.array.isRequired
};
