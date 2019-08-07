import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Lightbox from 'react-images';
import { Link } from 'react-router-dom';
import * as images from '../../assets';
import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
import TextSpan from '../Common/Text/TextSpan';
import ConfirmDeletion from './ConfirmDelete';
import { updateRoute } from '../../helpers/routerHelper';
import { delimitNumbers } from '../../utils/utils';
import moment from 'moment';
import 'moment/min/locales';
import i18n from '../../locales/i18n.js';
import { getDateFromMySQL } from '../../helpers/utils';

const RecurringCard = ({ cardData, deleteContribution }) => {
  return (
    <div className="card" key={cardData.id}>
      <div className="currency">€ 150.00</div>
      <div className="headline">
        <span>150 Trees </span>
        <span> • </span>{' '}
        <span>
          {' '}
          <small>every month</small>
        </span>
      </div>
      <div className="card-text">
        <img className="menu-icon icon" src={images.tree_outline_green} />20
        Million Trees for Kenya’s Forests by International Tree Foundation
      </div>
      <div className="bottom-with-button">
        <div className="card-text">
          <div>
            <img className="menu-icon icon" src={images.gift_green} />Gift to
            Sagar Aryal
          </div>
          <div>
            <img className="menu-icon icon" src={images.calender_green} />Renews
            on March 7, 2019
          </div>
        </div>
        <div>
          <span>
            <i className="material-icons">delete_outline</i>
          </span>
          <span>
            <i className="material-icons">edit</i>
          </span>
        </div>
      </div>
    </div>
  );
};

RecurringCard.propTypes = {
  cardData: PropTypes.object.isRequired,
  deleteContribution: PropTypes.func
};
export default RecurringCard;
