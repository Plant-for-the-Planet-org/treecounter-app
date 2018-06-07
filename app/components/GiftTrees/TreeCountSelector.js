import React from 'react';
import PropTypes from 'prop-types';
import TextBlock from '../Common/Text/TextBlock';

class TreeCountSelector extends React.Component {
  constructor(props) {
    super(props);

    const {
      fixedDefaultTreeCount,
      variableDefaultTreeCount
    } = props.treeCountOptions;

    this.state = {
      isFixed: true,
      fixedTreeCount: fixedDefaultTreeCount,
      variableTreeCount: variableDefaultTreeCount,
      variableAmount: props.treeCountToAmount(variableDefaultTreeCount)
    };

    this.handleFixedTreeCountChange = this.handleFixedTreeCountChange.bind(
      this
    );
    this.handleVariableTreeCountChange = this.handleVariableTreeCountChange.bind(
      this
    );
    this.handleVariableAmountChange = this.handleVariableAmountChange.bind(
      this
    );
    this.handleVariableTreeCountSelected = this.handleVariableTreeCountSelected.bind(
      this
    );
  }

  componentWillReceiveProps(nextProps) {
    // TODO: seems to be a deprecated life cycle method
    if (this.props.currency !== nextProps.currency) {
      console.log(
        '########### currency has changed',
        this.props.currency,
        nextProps.currency
      );
      this.handleVariableTreeCountChange(this.state.variableTreeCount);
    }
  }

  handleFixedTreeCountChange(treeCount) {
    this.setState({ fixedTreeCount: parseInt(treeCount), isFixed: true });
    this.props.onChange(treeCount);
  }

  handleVariableTreeCountChange(treeCount) {
    this.setState({
      variableTreeCount: parseInt(treeCount),
      variableAmount: this.props.treeCountToAmount(treeCount)
    });
    this.props.onChange(treeCount);
  }

  handleVariableAmountChange(amount) {
    const treeCount = this.props.amountToTreeCount(amount);
    this.setState({
      variableAmount: parseInt(amount),
      variableTreeCount: treeCount
    });

    this.props.onChange(treeCount);
  }

  handleVariableTreeCountSelected() {
    this.setState({ isFixed: false });
    this.props.onChange(this.state.variableTreeCount);
  }

  render() {
    const { treeCountOptions, currency, treeCountToAmount } = this.props;

    return (
      <div className={'treecount-container'}>
        <TextBlock strong={true}>Number of Trees</TextBlock>
        {treeCountOptions.fixedTreeCountOptions.map(treeCount => {
          return (
            <div className="treecount-price-conversion" key={treeCount}>
              <label key={treeCount}>
                <input
                  type="radio"
                  value={treeCount}
                  checked={
                    treeCount === this.state.fixedTreeCount &&
                    true === this.state.isFixed
                  }
                  onChange={evt =>
                    this.handleFixedTreeCountChange(evt.target.value)
                  }
                />
                {treeCount} Trees
              </label>
              <span>=</span>
              <span>
                {treeCountToAmount(treeCount)} {currency}
              </span>
            </div>
          );
        })}

        <div className="treecount-price-conversion">
          <label key="variable">
            <input
              type="radio"
              value={this.state.variableTreeCount}
              checked={!this.state.isFixed}
              onChange={evt =>
                this.handleVariableTreeCountSelected(evt.target.value)
              }
            />
            <input
              type="text"
              disabled={this.state.isFixed}
              value={this.state.variableTreeCount}
              onChange={evt =>
                this.handleVariableTreeCountChange(evt.target.value)
              }
            />{' '}
            Trees
          </label>
          <span>=</span>
          <span>
            <input
              type="text"
              disabled={this.state.isFixed}
              value={this.state.variableAmount}
              onChange={evt =>
                this.handleVariableAmountChange(evt.target.value)
              }
            />{' '}
            {currency}
          </span>
        </div>
      </div>
    );
  }
}

TreeCountSelector.propTypes = {
  treeCountOptions: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  treeCountToAmount: PropTypes.func.isRequired,
  amountToTreeCount: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  defaultTreeCount: PropTypes.number.isRequired
};

export default TreeCountSelector;
