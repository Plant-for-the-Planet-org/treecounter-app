import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextBlock from '../Common/Text/TextBlock';
// import { debug } from '../../debug';
import i18n from '../../locales/i18n.js';
import { currencySort } from './utils';
import { getCurrency } from '../../selectors';

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);
    let { selectedCurrency, globalCurrency } = props;
    this.state = {
      currenciesArray: [],
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
    let { currencies } = this.props;
    this.setState({ currenciesArray: currencySort(Object.keys(currencies)) });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // debug('next props currency', nextProps);
    if (
      nextProps.globalCurrency &&
      nextProps.globalCurrency.currency !== this.state.selectedCurrency
    ) {
      this.handleChange(nextProps.globalCurrency.currency);
    }
  }
  handleChange(value) {
    // debug('changed locally', value);
    this.setState({ selectedCurrency: value });
    this.props.onChange(value);
    // debug('changed locally', this.state.selectedCurrency);
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
          {this.state.currenciesArray.map(value => {
            return (
              <option
                className="pftp-selectfield__option"
                value={value}
                key={value}
              >
                {this.props.currencies[value]} [{value}]
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
  currencies: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  globalCurrency: PropTypes.any
};

const mapStateToProps = state => ({
  globalCurrency: getCurrency(state)
});

export default connect(mapStateToProps)(CurrencySelector);
