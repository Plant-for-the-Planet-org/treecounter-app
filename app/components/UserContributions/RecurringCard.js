import React from 'react';
import PropTypes from 'prop-types';
import * as images from '../../assets';

// eslint-disable-next-line no-unused-vars
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
