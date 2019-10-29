import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextBlock from '../Common/Text/TextBlock';
import i18n from '../../locales/i18n.js';
import { getCurrency } from '../../selectors';
import supportedCurrency from '../../assets/supportedCurrency.json';

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);
    let { selectedCurrency, globalCurrency } = props;
    this.state = {
      selectedCurrency:
        (globalCurrency && globalCurrency.currency) || selectedCurrency
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.props.globalCurrency) {
      this.setState({ selectedCurrency: this.props.globalCurrency.currency });
      this.props.onChange(this.state.selectedCurrency);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.globalCurrency &&
      nextProps.globalCurrency.currency !== this.state.selectedCurrency
    ) {
      this.handleChange(nextProps.globalCurrency.currency);
    }
  }
  handleChange(value) {
    this.setState({ selectedCurrency: value });
    this.props.onChange(value);
  }
  render() {
    return (
      <div className="pftp-selectfield">
        <TextBlock strong>{i18n.t('label.currency')}</TextBlock>
        <select
          className="pftp-selectfield__select"
          required="required"
          value={this.state.selectedCurrency}
          onChange={evt => this.handleChange(evt.target.value)}
        >
          {supportedCurrency.map(currency => {
            return (
              <option
                className="pftp-selectfield__option"
                value={currency.Symbol}
                key={currency.Symbol}
              >
                {currency.Name} [{currency.Symbol}]
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  globalCurrency: PropTypes.any
};

const mapStateToProps = state => ({
  globalCurrency: getCurrency(state)
});

export default connect(mapStateToProps)(CurrencySelector);
