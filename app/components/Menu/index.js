import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

import * as images from '../../assets';
import i18n from '../../locales/i18n';
import { getLocalRoute } from '../../actions/apiRouting';
import { context } from '../../config';
import { allowedUrls } from '../../config/socialShare';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { saveItem } from '../../stores/localStorage';
import { getLocale } from '../../actions/getLocale';

const { Option, SingleValue } = components;
const IconOption = props => (
  <Option {...props}>
    {props.data.icon && <img className="menu-icon" src={props.data.icon} />}
    <span className="dropdown-label">{props.data.label}</span>
  </Option>
);
const singleValue = props => (
  <SingleValue {...props}>
    {props.data.icon && <img className="menu-icon" src={props.data.icon} />}
    <span className="dropdown-label">{props.data.label}</span>
  </SingleValue>
);

const customStyles = {
  control: () => ({
    // none of react-select's styles are passed to <Control />
    display: 'flex',
    width: '100%',
    cursor: 'pointer'
  }),
  container: provided => ({
    ...provided,
    width: '135px',
    display: 'flex',
    cursor: 'pointer'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  option: () => ({
    display: 'flex',
    padding: '10px',
    width: '100px'
  }),
  menu: provided => ({
    ...provided,
    width: '150px'
  }),
  singleValue: (provided, state) => {
    return {
      ...provided,
      border: 0,
      width: '150px',
      display: 'flex',
      marginLeft: 0,
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '17px'
    };
  },
  valueContainer: provided => {
    return { ...provided, padding: 0 };
  }
};

const statusOptions = [
  { value: 'en', label: 'English', icon: images.worldImg },
  { value: 'de', label: 'Deutsch', icon: images.germany }
];

let userLang = getLocale(); // en|de
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: null
    };
  }
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

  async componentWillMount() {
    let language = await getLocale();
    let option = statusOptions.filter(option => option.value === language)[0];
    this.setState({ selectedLanguage: option });
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
          {/* <Link
            to={getLocalRoute('app_widgetBuilder')}
            onClick={() => console.log('redirect_widget_share')}
          >
            <img src={images.webProgramming} />
          </Link> */}
        </div>
      );
    } else {
      return null;
    }
  }

  onSelectLanguageChange = selectedOption => {
    this.setState({
      selectedLanguage: selectedOption
    });
    saveItem('language', selectedOption.value);
    location.reload();
  };

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
                (menuItem, index) =>
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
                      key={index + ' ' + element.sequence + menuItem.sequence}
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
                      <i className="material-icons">{'folder_open'}</i>
                      <a>{menuItem.caption}</a>
                    </li>
                  )
              )}
            </ul>
          </div>
        ))}

        {this.props.userProfile ? this.renderShareButtons() : null}

        <div className="li-select">
          <Select
            defaultValue={this.state.selectedLanguage}
            value={this.state.selectedLanguage}
            options={statusOptions}
            styles={customStyles}
            onChange={this.onSelectLanguageChange}
            isSearchable={false}
            components={{ Option: IconOption, SingleValue: singleValue }}
          />
        </div>
        <div className="bottom-banner">
          <a
            target="_blank"
            href="https://apps.apple.com/app/plant-for-the-planet/id1444740626"
          >
            <img src={images['appleStoreBadge_' + userLang]} />
          </a>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=org.pftp"
          >
            <img src={images['googlePlayBadge_' + userLang]} />
          </a>
        </div>
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
