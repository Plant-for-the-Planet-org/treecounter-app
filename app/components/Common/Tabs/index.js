import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab ? props.activeTab : props.data[0].id
    };
    if (!props.activeTab) {
      this.emitTabChange(props.data[0].id);
    } else {
      this.emitTabChange(props.activeTab);
    }
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(value) {
    this.setState({ activeTab: value });
    this.emitTabChange(value);
  }

  emitTabChange(tab) {
    this.props.onTabChange(tab);
  }

  render() {
    const { data, children } = this.props;

    return (
      <div className="pftp-tabs">
        <div className="pftp-tabs__type">
          {data.map(ele => {
            return (
              <label
                key={ele.id}
                onClick={() => this.handleTabChange(ele.id)}
                className={
                  'radio pftp-tabs__type--option ' +
                  (this.state.activeTab === ele.id ? 'active' : '')
                }
              >
                <input
                  type="radio"
                  value={ele.id}
                  checked={this.state.activeTab === ele.id}
                  onChange={() => this.handleTabChange(ele.id)}
                />
                <span>{ele.name}</span>
              </label>
            );
          })}
        </div>
        {children}
      </div>
    );
  }
}

Tabs.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node,
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func
};

export default Tabs;
