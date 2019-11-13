/***
 * We inherited the real SmartBanner class from npm pakcgae to do our modidifaction on render method to enable click on the items shown on banner..
 *
 */

/**
 * Licence information : from https://github.com/patw0929/react-smartbanner/blob/master/LICENSE
 * 
 * 
 * The MIT License (MIT)

Copyright (c) 2017 Patrick Wang (patw)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 * 
 *  
 */

import React from 'react';
import SmartBanner from 'react-smartbanner';
import cookie from 'cookie-cutter';
import { context } from '../../config';
class SmartBannerClickable extends SmartBanner {
  constructor(props) {
    super(props);
  }
  parseAppId() {
    context[this.state.type] &&
      this.setState({ appId: context[this.state.type].appId });
    return context[this.state.type];
  }
  componentDidMount() {
    this.parseAppId();
  }

  render() {
    // Don't show banner when:
    // 1) if device isn't iOS or Android
    // 2) website is loaded in app,
    // 3) user dismissed banner,
    // 4) or we have no app id in meta
    if (
      !this.state.type ||
      window.navigator.standalone ||
      cookie.get('smartbanner-closed') ||
      cookie.get('smartbanner-installed')
    ) {
      return <div />;
    }

    if (!this.state.appId) {
      return <div />;
    }

    this.show();

    const { icon, link, inStore } = this.retrieveInfo();
    const wrapperClassName = `smartbanner smartbanner-${
      this.state.type
    } smartbanner-${this.props.position}`;
    const iconStyle = {
      backgroundImage: `url(${icon})`
    };

    return (
      <div className={wrapperClassName}>
        <div className="smartbanner-container">
          <button
            type="button"
            className="smartbanner-close"
            aria-label="close"
            onClick={this.close}
          >
            &times;
          </button>
          <a href={link} onClick={this.install}>
            <span className="smartbanner-icon" style={iconStyle} />
            <div className="smartbanner-info">
              <div className="smartbanner-title">{this.props.title}</div>
              <div className="smartbanner-author">{this.props.author}</div>
              <div className="smartbanner-description">{inStore}</div>
            </div>
            <div className="smartbanner-wrapper">
              <span className="smartbanner-button">
                <span className="smartbanner-button-text">
                  {this.props.button}
                </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default SmartBannerClickable;
