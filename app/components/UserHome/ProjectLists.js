import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { Link } from 'react-router-dom';
// import * as images from '../../assets';
// import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
// import { getLocalRoute } from '../../actions/apiRouting';
// import TextSpan from '../Common/Text/TextSpan';
// import { updateRoute } from '../../helpers/routerHelper';
// import { formatDate, delimitNumbers } from '../../utils/utils';
// import i18n from '../../locales/i18n.js';

export default class ProjectLists extends React.Component {
  render() {
    let { contributions } = this.props;
    console.log(contributions);
    return <div>Contributors </div>;
  }
}

ProjectLists.propTypes = {
  contributions: PropTypes.any
};
