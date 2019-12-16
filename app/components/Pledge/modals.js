import React from 'react';
import { closeBlack } from '../../assets';
import i18n from '../../locales/i18n';
import { delimitNumbers } from '../../utils/utils';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getLocalRoute } from '../../actions/apiRouting';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';

export function AllPledges(props) {
  const pledges = props.pledges;
  let i;
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeAllPledgesModal}
      contentLabel="Pledge Modal"
      overlayClassName="pledge-overlay"
      className="pledge-content"
      appElement={document.getElementById('root')}
    >
      <div className="all-pledges">
        <div className="make-pledge-form-x">
          <span onClick={props.closeAllPledgesModal}>
            <img src={closeBlack} className="close-button" />
          </span>
        </div>
        <div className="all-pledges-table">
          <p className="all-pledges-title">{i18n.t('label.allPledges')}</p>
          <p className="all-pledges-subtitle">
            {i18n.t('label.treesPledgedOn')} {props.name}
          </p>
          <div className="pledges-list">
            {
              ((i = 1),
              // sort by value
              pledges.allEventPledges.sort(function(a, b) {
                return b.treeCount - a.treeCount;
              }),
              pledges.allEventPledges.map(pledge => (
                <div className={'row-list-item '} key={pledge.id}>
                  <span>
                    <span className="row-list-item-rank">{i++}</span>
                    <span className="row-list-item-name">
                      {pledge.isAnonymous
                        ? i18n.t('label.anonymous')
                        : pledge.firstname + ' ' + pledge.lastname}
                    </span>
                  </span>
                  <span className="row-list-item-treeCount">
                    {delimitNumbers(parseInt(pledge.treeCount))}{' '}
                  </span>
                </div>
              )))
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function IncreasePledge(props) {
  const myPledge = props.myPledge;
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeIncreasePledgesModal}
      contentLabel="Pledge Modal"
      overlayClassName="pledge-overlay"
      className="pledge-content"
      appElement={document.getElementById('root')}
    >
      <Fade bottom>
        <div>
          <div className="make-pledge-form-x">
            <span onClick={props.closeIncreasePledgesModal}>
              <img src={closeBlack} className="close-button" />
            </span>
          </div>
          <div className="make-pledge-form-header">
            <p>{i18n.t('label.increasePledge')}</p>
          </div>
          <div className="make-pledge-form-para">
            <p>
              {i18n.t('label.increasePledgeMessage', {
                treeCount: delimitNumbers(parseInt(myPledge[0].treeCount)),
                treeCost: myPledge[0].plantProjectTreeCost,
                currency: myPledge[0].plantProjectCurrency,
                projectName: myPledge[0].plantProjectName
              })}
            </p>
          </div>

          <form
            onSubmit={event =>
              props.onUpdatePledgeSubmit(event, myPledge[0].token)
            }
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <input
              value={props.updatingTreeCount}
              onChange={props.changeTreeCount}
              type="number"
              placeholder="Tree Count"
              min={myPledge[0].treeCount}
            />
            <input
              type="submit"
              className="make-pledge-button-form"
              value="Update Pledge"
              style={{ margin: 'auto', marginTop: '54px' }}
            />
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export function MakePledge(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="Pledge Modal"
      overlayClassName="pledge-overlay"
      className="submit-pledge-buttons-modal"
      appElement={document.getElementById('root')}
    >
      <Pulse>
        <div className="submit-pledge-container">
          <div className="submit-pledge-form-para">
            <p>
              {i18n.t('label.pledgeAddedMessage', {
                treeCount: delimitNumbers(props.treeCount)
              })}
            </p>
          </div>
          <div className="submit-pledge-buttons">
            <div
              onClick={props.closeSubmitPledgeModal}
              className="submit-pledge-later-button"
            >
              {i18n.t('label.pledgeAddedLaterButton')}
            </div>
            <Link
              to={getLocalRoute('app_donateTrees')}
              className="submit-pledge-donate-button"
            >
              {i18n.t('label.pledgeAddedContinueButton')}
            </Link>
          </div>
        </div>
      </Pulse>
    </Modal>
  );
}

export function UpdatePledge(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="Pledge Modal"
      overlayClassName="pledge-overlay"
      className="submit-pledge-buttons-modal"
      appElement={document.getElementById('root')}
    >
      <Pulse>
        <div className="submit-pledge-container">
          <div className="submit-pledge-form-para">
            <p>
              {i18n.t('label.pledgeAddedMessage', {
                treeCount: delimitNumbers(props.treeCount)
              })}
            </p>
          </div>
          <div className="submit-pledge-buttons">
            <div
              onClick={props.closeSubmitUpdateModal}
              className="submit-pledge-later-button"
            >
              {i18n.t('label.pledgeAddedLaterButton')}
            </div>
            <Link
              to={getLocalRoute('app_donateTrees')}
              className="submit-pledge-donate-button"
            >
              {i18n.t('label.pledgeAddedContinueButton')}
            </Link>
          </div>
        </div>
      </Pulse>
    </Modal>
  );
}
