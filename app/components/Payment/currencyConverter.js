/* --------------------
 * Fetching data test
 * --------------------
 */

// ------------------------------
/*fetch('https://api.fixer.io/latest')
	.then( data => data.json() )
	.then( data => {
		const currencies = [];
		//console.log(data.base);
		currencies.push(data.base);
		currencies.push(...Object.entries(data.rates).map(currency => currency[0]));
		currencies.sort();
		//console.log(currencies);
	})
	.catch( err => console.log(err) );*/

/* --------------------
 * Global functions
 * --------------------
 */

// ------------------------------
import i18n from '../../locales/i18n.js';
function multiplay(variable, coefficient) {
  return (Math.round(variable * coefficient * 1000000) / 1000000).toString();
}

// ------------------------------
function tryConvert(value, rate) {
  const variable = parseFloat(value.replace(',', '.'));
  const coefficient = parseFloat(rate);
  return Number.isNaN(variable)
    ? ''
    : multiplay(variable, coefficient).replace('.', ',');
}

/* --------------------
 * Footer
 * --------------------
 */

// ------------------------------
class Footer extends React.Component {
  render() {
    const fixerUrl = 'http://fixer.io';
    return (
      <footer>
        <p>
          {i18n.t('label.data_provided')}{' '}
          <a href={fixerUrl} target="_blank">
            {i18n.t('label.fixer')}
          </a>
        </p>
      </footer>
    );
  }
}

/* --------------------
 * Main - Converter
 * --------------------
 */

// ------------------------------
class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleInputClick(e) {
    this.props.onInputClick(this.props.selected, e.target.value);
  }

  handleInputChange(e) {
    this.props.onInputChange(e.target.value);
  }

  handleCurrencyChange(e) {
    this.props.onCurrencyChange(e.target.value, this.props.position);
  }

  render() {
    const { currencies, selected, value, position } = this.props;
    return (
      <fieldset>
        <legend>{selected}</legend>
        <input
          value={value}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
        />
        <select onChange={this.handleCurrencyChange}>
          {currencies.map(currency => {
            if (currency === selected) {
              return (
                <option key={currency} value={currency} selected>
                  {currency}
                </option>
              );
            } else {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            }
          })}
        </select>
      </fieldset>
    );
  }
}

// ------------------------------
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currencyNo1: 'EUR',
      currencyNo2: 'CZK',
      inputCurrency: '?',
      outputCurrency: '?',
      rate: 0,
      value: '',
      date: 'yyyy-mm-dd'
    };
    this.updateConversion = this.updateConversion.bind(this);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    fetch('https://api.fixer.io/latest')
      .then(data => data.json())
      .then(data => {
        const currencies = [];
        currencies.push(
          data.base,
          ...Object.entries(data.rates).map(rates => rates[0])
        );
        currencies.sort();
        this.setState({ currencies });
      })
      .catch(err => console.log(err));
  }

  updateConversion(inputCurrency, value) {
    const { currencyNo1, currencyNo2 } = this.state;
    const outputCurrency =
      inputCurrency === currencyNo1 ? currencyNo2 : currencyNo1;
    fetch(`https://api.fixer.io/latest?base=${inputCurrency}`)
      .then(data => data.json())
      .then(data => {
        this.setState({
          inputCurrency,
          outputCurrency,
          rate: data.rates[outputCurrency] || 1,
          date: data.date,
          value
        });
      })
      .catch(err => console.log(err));
  }

  updateValue(value) {
    this.setState({ value });
  }

  updateCurrency(currency, position) {
    this.setState({
      value: '',
      rate: 0,
      inputCurrency: '',
      outputCurrency: ''
    });
    if (position === 1) {
      this.setState({ currencyNo1: currency });
    }
    if (position === 2) {
      this.setState({ currencyNo2: currency });
    }
  }

  render() {
    const {
      currencies,
      currencyNo1,
      currencyNo2,
      inputCurrency,
      outputCurrency,
      rate,
      date,
      value
    } = this.state;
    const newValue = value.replace('.', ',');
    const value1 =
      currencyNo1 === inputCurrency ? newValue : tryConvert(value, rate);
    const value2 =
      currencyNo2 === inputCurrency ? newValue : tryConvert(value, rate);
    return (
      <main>
        <CurrencyInput
          position={1}
          currencies={currencies}
          selected={currencyNo1}
          value={value1}
          onInputClick={this.updateConversion}
          onInputChange={this.updateValue}
          onCurrencyChange={this.updateCurrency}
        />
        <CurrencyInput
          position={2}
          currencies={currencies}
          selected={currencyNo2}
          value={value2}
          onInputClick={this.updateConversion}
          onInputChange={this.updateValue}
          onCurrencyChange={this.updateCurrency}
        />
        <section className="conversion-info">
          <p>
            {i18n.t('label.rate')}
            {rate}
          </p>
          <p>
            {i18n.t('label.latest_updates')}
            {date}
          </p>
        </section>
      </main>
    );
  }
}

/* --------------------
 * Header
 * --------------------
 */

// ------------------------------
class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>
          {i18n.t('label.currency_converter')}
          <span className="symbol">&#x21C5;</span>
        </h1>
      </header>
    );
  }
}

/* --------------------
 * App
 * --------------------
 */

// ------------------------------
class App extends React.Component {
  render() {
    return (
      <section className="app">
        <Header />
        <Main />
        <Footer />
      </section>
    );
  }
}

// ------------------------------
ReactDOM.render(<App />, document.querySelector('#root'));
