import React from 'react';
import { payment_credit } from '../../assets';
import PropTypes from 'prop-types';

const SavedPaymentCard = props => {
  return (
    <React.Fragment>
      {props.cards.length != 0 && (
        <div className="payment-option">
          <div className="payment-option-header">
            <span>
              <img className="logo" src={payment_credit} />
              Saved Cards
            </span>
          </div>
          <div className="table-responsive">
            <table className="projects-list">
              <thead>
                <tr>
                  <th className="align-left">Choose</th>
                  <th className="align-left">Card</th>
                  <th className="align-left">Last 4 digits</th>
                </tr>
              </thead>
              <tbody>
                {props.cards ? (
                  props.cards.map((card, index) => (
                    <tr>
                      <td>
                        <input
                          type="radio"
                          name="choose-card"
                          value={index}
                          onChange={() => {
                            props.onChangeSelectedCard(index);
                          }}
                        />
                      </td>
                      <td>{card.brand}</td>
                      <td>{card.last4}</td>
                    </tr>
                  ))
                ) : (
                  <tr />
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SavedPaymentCard;

SavedPaymentCard.propTypes = {
  cards: PropTypes.array,
  onChangeSelectedCard: PropTypes.func
};
