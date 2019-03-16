import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as images from '../../assets';
import i18n from '../../locales/i18n';
import { getLocalRoute } from '../../actions/apiRouting';
import { context } from '../../config';
import { allowedUrls } from '../../config/socialShare';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

export default class Menu extends Component {
  sideNavImage() {
    const route = this.props.userProfile
      ? getLocalRoute('app_userHome')
      : getLocalRoute('app_homepage');
    return (
      <div className="app-container__sidenav--image">
        <Link to={route} onClick={() => this.linkClicked()}>
          {' '}
          <img src={images['SideMenuImage']} />
        </Link>
      </div>
    );
  }

  linkClicked() {
    this.props.toggleSideNavAction();
    this.props.clearSupport();
  }

  renderShareButtons() {
    let { pathname } = this.props;
    if (
      allowedUrls.filter(url => pathname.split('/').includes(url)).length > 0
    ) {
      let redirectPath = '';
      if (pathname.split('/').includes('home')) {
        redirectPath =
          context.scheme +
          '://' +
          context.host +
          getLocalRoute('app_treecounter', {
            treecounter: this.props.userProfile.treecounter.slug
          });
      } else {
        redirectPath = context.scheme + '://' + context.host + pathname;
      }
      return (
        <div className="share_buttons">
          <FacebookShareButton url={redirectPath}>
            <img src={images['facebook']} />
          </FacebookShareButton>
          <TwitterShareButton url={redirectPath}>
            <img src={images['twitter']} />
          </TwitterShareButton>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let { path, pathname } = this.props;
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
              {element.uri ? (
                <Link to={element.uri} onClick={() => this.linkClicked()}>
                  {element.caption}
                </Link>
              ) : (
                element.caption
              )}
            </span>
            <ul className="app-container__sidenav--list" key={element.sequence}>
              {element.menuItems.map(
                menuItem =>
                  menuItem.enabled ? (
                    <li
                      className={
                        menuItem.uri.substr(
                          menuItem.uri.lastIndexOf('/') + 1
                        ) === path ||
                        (pathname.indexOf('leaderboard') + 1 &&
                          menuItem.uri.substr(
                            menuItem.uri.lastIndexOf('/') + 1
                          ) === 'explore')
                          ? 'menu_item_selected'
                          : 'menu_item_unselected'
                      }
                      key={'' + element.sequence + menuItem.sequence}
                    >
                      <img
                        src={
                          menuItem.icon && menuItem.icon !== 'none'
                            ? menuItem.uri.substr(
                                menuItem.uri.lastIndexOf('/') + 1
                              ) === path ||
                              (pathname.indexOf('leaderboard') + 1 &&
                                menuItem.uri.substr(
                                  menuItem.uri.lastIndexOf('/') + 1
                                ) === 'explore')
                              ? images[menuItem.icon + '_red']
                              : images[menuItem.icon]
                            : null
                        }
                        className="menu-icon"
                      />
                      <Link
                        to={menuItem.uri}
                        onClick={() => this.linkClicked()}
                      >
                        {menuItem.caption}
                      </Link>
                    </li>
                  ) : (
                    <li key={'' + element.sequence + menuItem.sequence}>
                      <i className="material-icons">
                        {i18n.t('label.open_folder')}
                      </i>
                      <a>{menuItem.caption}</a>
                    </li>
                  )
              )}
            </ul>
          </div>
        ))}
        {this.renderShareButtons()}
      </div>
    );
  }
}

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  menuData: PropTypes.array.isRequired,
  path: PropTypes.string,
  toggleSideNavAction: PropTypes.func.isRequired,
  clearSupport: PropTypes.func,
  pathname: PropTypes.string,
  userProfile: PropTypes.any
};
