/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getStyles } from './style';
import { foldin, foldout } from '../../../../../assets';

import { withHover } from '../../Utils/HOCs/withHover';

const ExpandLess = () => {
  return <img src={foldin} style={{ height: 15, width: 25 }} />;
};
const ExpandMore = () => {
  return <img src={foldout} style={{ height: 15, width: 25 }} />;
};
/**
 * A Reusable DropDown Component
 * It requires Theme object otherwise we can also use it outside Calendar context
 *
 */
const HoveredLI = withHover('li');
class DropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this._selectedRef = React.createRef();
    this._listItemsParent = React.createRef();
    this._searchArray = [];
    this.state = {
      listOpen: false,
      headerTitle:
        this.props.list[this.props.selected] || Object.keys(this.props.list)[0]
    };
    this.close = this.close.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      headerTitle: props.list[props.selected] || Object.keys(props.list)[0]
    };
  }
  /**
   * A React life cycle Method
   * We are adding and removing global click event listener here to
   * close drop down if click happens outside drop down.
   * Also this will scroll the drop down list to selected element
   *
   */
  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close);
        //Scroll to the selected Item in drop List
        if (this._selectedRef.current) {
          const target = this._selectedRef.current;
          this._listItemsParent.current.scrollTop = target.offsetTop;
        }
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  /**
   * A React life cycle Method
   * removing global click event listener here
   *
   */
  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  /**
   * A Global Click handler
   * Here we changing drop down picker listOpen state
   * @private
   * @param {Event} evt - A Click event
   **/
  close(evt) {
    this.setState({
      listOpen: false
    });
  }

  /**
   * Drop down item click handler
   * @private
   * @param {String} title - item value or title
   * @param {String} id - item id : which is index +1
   * @param {String} stateKey - item index in an array
   * @param {Event} event - A Click event
   **/
  selectItem(title, id, stateKey, event) {
    console.log('selectItem', event.nativeEvent);
    if (event) {
      //Why we need to call stopImmediatePropagation ?
      //on item click we are closing drop down list UI, soo all child of list gets removed from DOM
      //after this, global click handler of calendar will take it as click outside calendar
      event.nativeEvent && event.nativeEvent.stopImmediatePropagation();
      event && event.preventDefault();
    }
    this.setState(
      {
        headerTitle: title,
        listOpen: false
      },
      this.props.onChange(title, id, stateKey)
    );
  }

  /**
   * Toggle drop down picker
   * @private
   * @param {MouseEvent} evt -mouse click event
   **/
  toggleList(evt) {
    event.stopImmediatePropagation();
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  /**
   * it will handle key press on drop down header when picker will be active
   * It will search the item list where value will be the key pressed by the user
   * It will wait for 1 sec before forgetting the previous entered keys or
   * it will search whatever user has typed in last 1 sec
   * Eg: if user has entered 1991 in 1 sec the it will search the complete 1991 else it will search the last context
   * and clear the old context after that
   * @private
   * @param {KeyboardEvent} event - keyboard event
   **/
  handleKeyPress = event => {
    try {
      if (
        (this.state.listOpen && (event.keyCode >= 48 && event.keyCode <= 57)) ||
        (event.keyCode >= 65 && event.keyCode <= 90)
      ) {
        this._searchArray.push(event.key);
        const found = this.props.list.find(item => {
          return (item + '')
            .toLocaleLowerCase()
            .startsWith(this._searchArray.join('').toLocaleLowerCase());
        });
        const listItem = document.getElementById(
          this.props.key + 'wizzio.calendar.dropdown.item.' + found + ''
        );
        if (listItem) {
          this._listItemsParent.current.scrollTop = listItem.offsetTop;
        }

        if (!this._searchTimeout) {
          this._searchTimeout = setTimeout(() => {
            this._searchArray = [];
            this._searchTimeout = undefined;
          }, 1000);
        }
      }
    } catch (err) {
      console.err('calendar_dropDown_err', err);
    }
  };

  /**
   * A React life cycle Method
   * Rendering drop down UI here
   *
   */
  render() {
    const { selected, calendarTheme, headerStyle, key } = this.props;
    console.log('__toggleList', selected);
    let list = null;
    if (this.props.list) {
      list =
        this.props.list instanceof Array
          ? this.props.list
          : Object.keys(this.props.list);
    }
    const { listOpen, headerTitle } = this.state;
    let styles = getStyles(calendarTheme, listOpen);

    return (
      <div style={styles.root} index={-4}>
        <div
          onClick={event => this.toggleList(event)}
          style={{ ...styles.header, ...headerStyle }}
          tabIndex={'-1'}
          onKeyDown={this.handleKeyPress}
        >
          <div style={styles.headerTitle}>{headerTitle}</div>
          {listOpen ? (
            <ExpandLess style={styles.icon} />
          ) : (
            <ExpandMore style={styles.icon} />
          )}
        </div>
        {
          <ul
            style={{
              ...styles.list,
              visibility: listOpen ? 'visible' : 'hidden'
            }}
            ref={this._listItemsParent}
          >
            {listOpen &&
              list.map((item, index) => (
                <HoveredLI
                  id={key + 'wizzio.calendar.dropdown.item.' + item}
                  hoveredBackgroundColor={calendarTheme.selectItemHoverColor}
                  style={{
                    ...styles.listItem,
                    backgroundColor:
                      index == this.props.selected
                        ? calendarTheme.secondary
                        : calendarTheme.selectItemBackgroundColor
                  }}
                  ref={
                    index == this.props.selected ? this._selectedRef : undefined
                  }
                  key={headerTitle + index}
                  onClick={event =>
                    this.selectItem(item, index + 1, index, event)
                  }
                >
                  {item}
                </HoveredLI>
              ))}
          </ul>
        }
      </div>
    );
  }
}

DropDown.propTypes = {
  list: PropTypes.any,
  onChange: PropTypes.func,
  theme: PropTypes.object,
  calendarTheme: PropTypes.object,
  title: PropTypes.string,
  selected: PropTypes.any,
  headerStyle: PropTypes.object,
  key: PropTypes.any
};

export default DropDown;
