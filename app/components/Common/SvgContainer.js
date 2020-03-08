import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { svgBackground } from '../../assets';

import PropTypes from 'prop-types';
// import TargetComment from '../TreecounterGraphics/TargetComment';
// import PlantDetails from '../TreecounterGraphics/PlantDetails';

export default class SvgContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { exposeMissing } = this.props;

    //------------------------------------------------------------------------------------------------------------------
    // define circle sections
    // - type:  defines whether a tree or a pot should be rendered
    // - group: the CSS group name that styles each tree/pot (must match SASS definitions)
    // - value: an amount of trees
    this.sections = {
      planted: {
        type: 'tree',
        group: 'g1'
      }
      // community: {
      //   type: "tree",
      //   group: "g2"
      // },
    };

    if (exposeMissing) {
      this.sections['target'] = {
        type: 'pot',
        group: 'default'
      };
    }

    this.renderedTreeIds = [];
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.id) {
      return;
    }

    const total = Math.max(nextProps.target, nextProps.planted);
    const values = { planted: nextProps.planted, target: total };

    this.renderReset();

    //------------------------------------------------------------------------------------------------------------------
    // build a map with all SVG d-attributes indexed by treeId
    const prefix = 't-stem-';
    let svgMap = {};
    this.getAllTreeIds().map(function(treeId) {
      svgMap[treeId] = ReactDOM.findDOMNode(
        this.refs[prefix + treeId]
      ).getAttribute('d');
    }, this);

    //------------------------------------------------------------------------------------------------------------------
    // determine for each section's tree value the range of angles in degrees of a 360° circle
    const sectionAngleDegreeRanges = this.getSectionAngleRanges(
      this.sections,
      values,
      total,
      360
    );

    //------------------------------------------------------------------------------------------------------------------
    // get section name for each treeId
    const treeSectionNames = Object.values(svgMap) // treeId => SVG::d
      .map(this.determineAngle({ x: 425, y: 0 }, { x: 425, y: 425 })) // SVG::d => angle
      .map(this.getSectionNameForAngle(sectionAngleDegreeRanges)); // angle => sectionName

    const treeIds = Object.keys(svgMap);

    //------------------------------------------------------------------------------------------------------------------
    // group all treeIds by sectionName
    const sectionTrees = {};
    treeSectionNames.map(function(sectionName, idx) {
      if (!sectionTrees[sectionName]) {
        sectionTrees[sectionName] = [];
      }
      sectionTrees[sectionName].push(treeIds[idx]);
    });

    this.renderSections(sectionTrees, values, total); // sectionTrees = { planted: ['23', '24', ... ], community: ['12','13,'18',...]}
  }

  componentDidMount() {
    let props = this.props;

    if (!props.id) {
      return;
    }

    const total = Math.max(props.target, props.planted);
    const values = { planted: props.planted, target: total };

    this.renderReset();

    //------------------------------------------------------------------------------------------------------------------
    // build a map with all SVG d-attributes indexed by treeId
    const prefix = 't-stem-';
    let svgMap = {};
    this.getAllTreeIds().map(function(treeId) {
      svgMap[treeId] = ReactDOM.findDOMNode(
        this.refs[prefix + treeId]
      ).getAttribute('d');
    }, this);

    //------------------------------------------------------------------------------------------------------------------
    // determine for each section's tree value the range of angles in degrees of a 360° circle
    const sectionAngleDegreeRanges = this.getSectionAngleRanges(
      this.sections,
      values,
      total,
      360
    );

    //------------------------------------------------------------------------------------------------------------------
    // get section name for each treeId
    const treeSectionNames = Object.values(svgMap) // treeId => SVG::d
      .map(this.determineAngle({ x: 425, y: 0 }, { x: 425, y: 425 })) // SVG::d => angle
      .map(this.getSectionNameForAngle(sectionAngleDegreeRanges)); // angle => sectionName

    const treeIds = Object.keys(svgMap);

    //------------------------------------------------------------------------------------------------------------------
    // group all treeIds by sectionName
    const sectionTrees = {};
    treeSectionNames.map(function(sectionName, idx) {
      if (!sectionTrees[sectionName]) {
        sectionTrees[sectionName] = [];
      }
      sectionTrees[sectionName].push(treeIds[idx]);
    });

    this.renderSections(sectionTrees, values, total);
  }

  //********************************************************************************************************************
  // RESET
  //********************************************************************************************************************
  renderReset() {
    //------------------------------------------------------------------------------------------------------------------
    // define class names for all trees and pots, set all trees visible, pots hidden
    this.getAllTreeIds().map(function(treeId) {
      this.resetType(treeId, 'p', 'hide', [
        'stem',
        'shadow',
        'pot',
        'leaf1',
        'leaf2',
        'leaf3'
      ]);
      this.resetType(treeId, 't', 'default', ['stem', 'shadow', 'crown']);
    }, this);
  }

  resetType(treeId, type, className, names) {
    names.map(function(part) {
      let ref = type + '-' + part + '-' + treeId;
      let classes = type + ' ' + part + ' ' + className;
      ReactDOM.findDOMNode(this.refs[ref]).setAttribute('class', classes);
    }, this);
  }

  //********************************************************************************************************************
  // RENDER Tees/Pots
  //********************************************************************************************************************
  renderSections(sectionTrees, values, total) {
    const maxTicks = 125;
    const maxAngleLength = 1477;
    const interval = 30;

    let currentTick = 0;
    let currentAngleLength = 0;
    let lastSectionName = null;

    //------------------------------------------------------------------------------------------------------------------
    // determine for each section's tree value the range of angles in degrees of a 1477 pixel circle
    const sectionConfigs = this.sections;
    const sectionAngleLengthRanges = this.getSectionAngleRanges(
      sectionConfigs,
      values,
      total,
      maxAngleLength
    );

    const timer = window.setInterval(() => {
      currentAngleLength = (currentTick / maxTicks) * maxAngleLength;
      let sectionName = this.getSectionNameForAngle(sectionAngleLengthRanges)(
        currentAngleLength
      );

      if (null !== sectionName) {
        //--------------------------------------------------------------------------------------------------------------
        // render last tree when section changes (might be missing due to rounding inaccuracies)
        if (lastSectionName && lastSectionName !== sectionName) {
          const sectionConfig = sectionConfigs[lastSectionName];
          this.renderTreesById(
            sectionTrees[lastSectionName],
            sectionConfig.type,
            sectionConfig.group
          );
        }

        //--------------------------------------------------------------------------------------------------------------
        // render new trees after angle increment
        let angleLengthRange = sectionAngleLengthRanges.get(sectionName);
        let sectionPercentageComplete = this.getSectionPercentageComplete(
          currentAngleLength,
          angleLengthRange
        );
        let treeIds = this.getTreeIdsFromPercentage(
          sectionTrees[sectionName],
          sectionPercentageComplete
        );

        let { type, group } = sectionConfigs[sectionName];
        this.renderTreesById(treeIds, type, group);

        //--------------------------------------------------------------------------------------------------------------
        // update circle that corresponds to the section type
        const classNames = type + ' ' + group + ' circle';
        const circleEle = document.getElementsByClassName(classNames);
        if (!circleEle.length) {
          window.clearInterval(timer);
          return;
        }
        const circle = circleEle.item(0);
        circle.setAttribute('stroke-dasharray', currentAngleLength + ', 20000');

        lastSectionName = sectionName;
      }

      currentTick++;

      if (currentTick > maxTicks) {
        if (null !== lastSectionName) {
          this.renderTreesById(
            sectionTrees[lastSectionName],
            sectionConfigs[lastSectionName].type,
            sectionConfigs[lastSectionName].group
          );
        }
        window.clearInterval(timer);
      }
    }, interval);
  }

  getSectionAngleRanges(sectionConfig, values, total, maxAngle) {
    const sectionAngleRanges = new Map();
    let currentMax = 0;
    Object.keys(sectionConfig).map(
      function(sectionName) {
        let value = Math.round(
          this.convertTreesToAngle(values[sectionName], total, maxAngle)
        );
        sectionAngleRanges.set(sectionName, { min: currentMax, max: value });
        currentMax = value;
      }.bind(this)
    );

    return sectionAngleRanges;
  }

  getSectionPercentageComplete(currentAngleLength, angleLengthRange) {
    return (
      (currentAngleLength - angleLengthRange.min) /
      (angleLengthRange.max - angleLengthRange.min)
    );
  }

  getTreeIdsFromPercentage(treeIds, percentage) {
    if (treeIds) {
      const countIndexes = treeIds.length - 1;
      const index = Math.round(percentage * countIndexes);

      return treeIds.slice(0, index);
    } else {
      return null;
    }
  }

  renderTreesById(treeIds, type, group) {
    if (treeIds) {
      // filter out already rendered trees
      let newTreeIds = treeIds.filter(
        treeId => !this.renderedTreeIds.includes(treeId)
      );

      newTreeIds.map(function(treeId) {
        this.renderedTreeIds.push(treeId); // mark tree as rendered
        this.setTreeStatus(treeId, type, group); // update tree state
      }, this);
    }
  }

  convertTreesToAngle(trees, total, maxAngle) {
    return (trees / total) * maxAngle;
  }

  /**
   * Creates a function that converts SVG coordinates into angles
   * @param origin point
   * @param center point
   */
  determineAngle(origin, center) {
    return svgInstruction =>
      this.getAngle(origin, this.getCoordinate(svgInstruction), center);
  }

  /**
   * Creates a function that classifies angles by looking up the angle in the provided list of classes
   *
   * @param sectionAnglesMap a Map, keys being angle values in increasing order, values being arbitrary classification strings
   */
  getSectionNameForAngle(sectionAnglesMap) {
    return angle => {
      for (let [key, range] of sectionAnglesMap) {
        if (range.min < angle && angle <= range.max) {
          return key;
        }
      }

      return null;
    };
  }

  /**
   * Returns the angle between the lines (p1,c) and (p2,c)
   *
   * @param p1 an arbitrary first point
   * @param p2 an arbitrary second point
   * @param c the center point
   * @returns {number}
   */
  getAngle(p1, p2, c) {
    const p1c = Math.sqrt(Math.pow(c.x - p1.x, 2) + Math.pow(c.y - p1.y, 2)); // p1->c (b)
    const p2c = Math.sqrt(Math.pow(c.x - p2.x, 2) + Math.pow(c.y - p2.y, 2)); // p2->c (a)
    const p1p2 = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)); // p1->p2 (c)
    const angle =
      Math.acos((p2c * p2c + p1c * p1c - p1p2 * p1p2) / (2 * p2c * p1c)) *
      (180 / Math.PI);

    return p2.x < c.x ? 360 - angle : angle;
  }

  /**
   * extracts the first coordinate from a SVG d attribute
   * @param svgD string
   * @returns {{x: string, y: string}}
   */
  getCoordinate(svgD) {
    svgD = svgD.toLowerCase();

    const minPosition = Math.min(
      this.getCharacterPosition(svgD, 'c', 100),
      this.getCharacterPosition(svgD, 'a', 101),
      this.getCharacterPosition(svgD, 'v', 103),
      this.getCharacterPosition(svgD, 'l', 102)
    );
    const initialPoint = svgD.substr(1, minPosition - 1);
    const divider = svgD.indexOf(',');

    const xAxis = initialPoint.substr(0, divider - 1);
    const yAxis = initialPoint.substr(divider);

    return { x: xAxis, y: yAxis };
  }

  getCharacterPosition(text, character, defaultValue) {
    const pos = Number(text.indexOf(character));

    return pos <= 0 || isNaN(pos) ? defaultValue : pos;
  }

  getAllTreeIds() {
    return new Array(72)
      .fill(0)
      .map((v, i) => ('00' + (i + 1).toString(10)).slice(-2));
  }

  //********************************************************************************************************************
  // SHOW/HIDE Trees and Pots
  //********************************************************************************************************************
  /**
   *
   * @param treeNumber string the ID of the tree (01, 02, ...)
   * @param type string either tree|pot
   * @param group string one of default|g1|g2|...
   */
  setTreeStatus(treeNumber, type, group) {
    switch (type) {
      case 'tree':
        this.hidePot(treeNumber);
        this.showTree(treeNumber, group);
        break;

      case 'pot':
        this.showPot(treeNumber, group);
        this.hideTree(treeNumber);
        break;
    }
  }

  showTree(treeNumber, group) {
    this.updateElements(treeNumber, group, 't');
  }

  hideTree(treeNumber) {
    this.updateElements(treeNumber, 'hide', 't');
  }

  showPot(treeNumber, group) {
    this.updateElements(treeNumber, group, 'p');
  }

  hidePot(treeNumber) {
    this.updateElements(treeNumber, 'hide', 'p');
  }

  updateElements(treeNumber, group, type) {
    const typeParts = {
      t: ['stem', 'shadow', 'crown'],
      p: ['stem', 'shadow', 'pot', 'leaf1', 'leaf2', 'leaf3']
    };

    typeParts[type].map(function(part) {
      let ref = type + '-' + part + '-' + treeNumber;
      let el = ReactDOM.findDOMNode(this.refs[ref]);

      if (!el) return;
      el.setAttribute(
        'class',
        el.getAttribute('class').replace(/default|hide|g[0-9]+/g, group)
      );
    }, this);
  }

  render() {
    return (
      <svg
        ref="canvas"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 850 850"
      >
        <image
          style={visibleOverflowStyle}
          width="1100"
          height="1100"
          xlinkHref={svgBackground}
          transform="matrix(0.7776 0 0 0.7733 0 0)"
        />
        <g ref="Cloud1">
          <animateTransform
            accumulate="none"
            additive="replace"
            attributeName="transform"
            attributeType="XML"
            calcMode="linear"
            dur="250s"
            fill="remove"
            from="0 425 425"
            repeatCount="indefinite"
            restart="always"
            to="360 425 425"
            type="rotate"
          />
          <path
            ref="CloudSmall01"
            className="st8"
            d="M732.9,299.7c6.3-3.4,3.9-20.4-11-20.4c0.5-3.2-1.4-7.5-6.7-6.2c-5.4,1.3-10.8,17.1-0.7,18c-0.4,3.7,0.2,7.4,6.2,10.2c-0.7,7.6,4.4,7.5,4.4,7.6c-2.7,10,12.1,6.4,6.8,1.1C735,305.5,734.3,303.5,732.9,299.7z"
          />
          <path
            ref="CloudBig01"
            className="st8"
            d="M697,284.8c-0.8,8.5,6.9,17.6,15.6,12.2c8.7-5.4-0.6-15.1-2.1-15.4c3.6-2.3,5.4-12.9-1.2-19.8c-10.3-9.9-14.6-7.6-15.9-6.1c-1.9-4.5-6.3-8.6-10.3-3.5c-0.2-5.5-4.7-7.8-7.6-4.7c-3.1,3.1-1.2,9.3,3.8,9.8c0.3,3.9,0.2,8.9,7.8,10.2C686,272.2,687.3,281.1,697,284.8z"
          />
          <path
            ref="CloudSmall02"
            className="st8"
            d="M699,574.7c4.6,2.7,14.8-5.4,8.9-15c2.3-0.8,4.3-3.9,1.4-6.8c-2.9-3-15.2-0.4-11.9,6.5c-2.5,1.1-4.7,3.1-4.2,8c-5.2,2.5-3.2,5.6-3.2,5.6c-7.5,2.1,0.6,10.2,1.9,4.8C696,578.4,697.1,577.1,699,574.7z"
          />
          <path
            ref="CloudBig02"
            className="st8"
            d="M694.8,545.8c-5.8,2.8-8.8,11.3-1.9,14.9c6.8,3.6,9.6-6.2,9.1-7.3c2.9,1.3,10.4-1.4,12.4-8.4c2.5-10.4-0.8-12.5-2.2-12.7c2.1-3,3.2-7.4-1.7-8c3.6-2.3,3.3-6,0.1-6.8s-6.5,2.8-4.9,6.2c-2.4,1.7-5.7,3.7-3.7,9C698.6,533.6,693.2,538,694.8,545.8z"
          />
          <path
            ref="CloudSmall03"
            className="st8"
            d="M382.4,741.9c-1.2,6.5,12.3,14.9,21.1,4.2c1.9,2.3,6.1,3.5,8.5-1.1c2.3-4.6-5.8-17.9-12.4-11.1c-2.4-2.5-5.5-4.2-10.9-1.6c-5.1-5-7.9-1.3-7.9-1.4c-5.5-7.9-11.7,4.8-4.8,4.2C376.9,739.9,378.8,740.7,382.4,741.9z"
          />
          <path
            ref="CloudBig03"
            className="st8"
            d="M414.3,725.1c-5.5-5.5-16.7-5.5-18,3.9s11.1,8.6,12.3,7.7c-0.5,3.9,5.9,11.5,14.8,10.9c13.3-1.4,14.1-5.9,13.8-7.8c4.4,1.2,9.9,0.6,8.6-5.2c4.1,3.2,8.4,1.3,8-2.7s-5.9-6.3-9.3-3.2c-3-2.1-6.5-5.2-12-0.6C429.9,724.8,422.7,720.4,414.3,725.1z"
          />
          <path
            ref="CloudSmall04"
            className="st8"
            d="M125.4,552.2c-4.1,1.7-3.6,12.2,5.4,13.1c-0.6,1.8,0.3,4.6,3.7,4.2c3.4-0.4,7.6-9.6,1.6-10.8c0.5-2.2,0.3-4.5-3.1-6.6c0.9-4.5-2.1-4.8-2.1-4.8c2.2-5.8-6.9-4.7-4-1C124.5,548.4,124.8,549.8,125.4,552.2z"
          />
          <path
            ref="CloudBig04"
            className="st8"
            d="M146.2,563.2c1.1-5.1-3-11.1-8.7-8.4c-5.6,2.7-0.6,9.2,0.3,9.5c-2.2,1.2-4.1,7.5-0.5,12.1c5.5,6.6,8.4,5.5,9.3,4.7c0.9,2.8,3.3,5.6,5.9,2.7c-0.2,3.4,2.4,5,4.4,3.4s1.3-5.5-1.7-6.1c0-2.3,0.4-5.5-4.1-6.7C152,571.7,151.8,566.1,146.2,563.2z"
          />
          <path
            ref="CloudSmall05"
            className="st8"
            d="M191,189.2c-5-3.7-19.1,3.8-14.1,15.4c-3,0.6-6,3.6-3.1,7.4c2.9,3.8,18.3,2.7,15.7-5.4c3.4-0.9,6.4-2.6,6.9-8.2c6.8-2,4.9-5.8,5-5.8c9.5-1.3,1.6-11.5-1.3-5.6C195.5,185.7,193.9,186.9,191,189.2z"
          />
          <path
            ref="CloudBig05"
            className="st8"
            d="M190,222.1c7.7-2.2,13.1-11.3,5.6-16.1s-13.1,5.5-12.8,6.9c-3-2-13,0-16.8,7.6c-5.3,11.3-1.8,13.9,0,14.5c-3.3,3.1-5.4,7.7,0.3,9.1c-4.8,2-5.3,6.2-1.7,7.6c3.7,1.4,8.5-2.2,7.3-6.3c3.3-1.6,7.8-3.1,6.4-9.5C182.6,235.1,189.8,231.1,190,222.1z"
          />
          <path
            ref="CloudSmall06"
            className="st8"
            d="M474.4,108.9c0.8-4.3-8.2-9.7-13.9-2.7c-1.2-1.5-4-2.2-5.5,0.8c-1.4,3.1,3.9,11.7,8.2,7.2c1.5,1.6,3.6,2.7,7.2,1c3.4,3.3,5.2,0.8,5.2,0.8c3.8,5.1,7.7-3.3,3.1-2.8C478.1,110.2,476.7,109.6,474.4,108.9z"
          />
          <path
            ref="CloudBig06"
            className="st8"
            d="M453.6,120.1c3.8,3.7,11,3.6,11.8-2.6c0.8-6.1-7.4-5.5-8.1-4.9c0.3-2.5-4-7.5-9.8-7c-8.6,1-9.2,4-9,5.2c-2.9-0.8-6.4-0.3-5.5,3.5c-2.7-2-5.5-0.8-5.3,1.8c0.2,2.7,3.9,4.1,6.1,2c1.9,1.3,4.3,3.4,7.9,0.3C443.3,120.4,448.1,123.3,453.6,120.1z"
          />
        </g>
        <g ref="Cloud2">
          <animateTransform
            accumulate="none"
            additive="replace"
            attributeName="transform"
            attributeType="XML"
            calcMode="linear"
            dur="120s"
            fill="remove"
            from="0 425 425"
            repeatCount="indefinite"
            restart="always"
            to="360 425 425"
            type="rotate"
          />
          <path
            ref="Cloud01"
            className="st9"
            d="M126.6,384.3c5.6-5.9,5.4-17.5-4.4-18.6s-8.6,11.8-7.6,12.9c-4-0.4-11.8,6.5-11,15.6c1.8,13.6,6.5,14.5,8.5,14.1c-1.2,4.6-0.4,10.2,5.6,8.7c-3.2,4.3-1.2,8.6,3,8.3c4.2-0.4,6.5-6.3,3-9.7c2.1-3.1,5.2-7,0.3-12.4C127.4,400.6,131.8,393.1,126.6,384.3z"
          />
          <path
            ref="Cloud02"
            className="st9"
            d="M147.1,293.5c4.5-2.2,6.8-8.7,1.5-11.5c-5.4-2.7-7.4,4.9-7.1,5.7c-2.2-1-8.1,1.1-9.6,6.5c-1.9,8.2,0.6,9.7,1.8,9.8c-1.7,2.4-2.4,5.7,1.3,6.2c-2.7,1.8-2.5,4.7-0.1,5.3c2.4,0.7,5-2.2,3.8-4.9c1.9-1.3,4.4-2.8,2.8-7C144.1,302.9,148.2,299.5,147.1,293.5z"
          />
          <path
            ref="Cloud03"
            className="st9"
            d="M289.5,149.6c4.9,1,10.6-2.9,8.1-8.2s-8.8-0.6-9.1,0.2c-1.1-2.2-7.1-3.9-11.6-0.6c-6.4,5.4-5.3,8-4.5,8.8c-2.7,0.9-5.4,3.1-2.7,5.7c-3.3-0.2-4.8,2.2-3.2,4.1c1.6,1.9,5.4,1.2,6-1.6c2.3,0.1,5.3,0.4,6.5-3.9C281.4,155.3,286.7,155.1,289.5,149.6z"
          />
          <path
            ref="Cloud03"
            className="st9"
            d="M599,177.6c1.1,5.9,8.7,9.4,12.8,3.8c2.2-3.6-0.3-9.3-6-8.8c2.6-4.9,0.4-9.7-4.9-11.9c-3.5-1.4-7.9-1.4-9.1,2c-2-4.8-5.9-4.2-6.9-0.4c-1.4-3.1-5.8-2.8-6.9-0.3c-1,2.4,1.5,5.5,4.4,4.6c1.7,1.5,2.3,5,6.8,3.9C589,173.9,591.1,178.2,599,177.6z"
          />
          <path
            ref="Cloud04"
            className="st9"
            d="M732.4,439.2c-2.8,4.2-1.3,11.2,4.7,10.8s3.9-8.1,3.2-8.6c2.4-0.2,6.4-5.3,4.9-10.7c-2.6-8.1-5.5-8.1-6.7-7.6c0.2-2.9-0.9-6.2-4.3-4.7c1.4-3-0.3-5.4-2.7-4.6s-3.2,4.5-0.8,6.2c-0.9,2.2-2.4,4.8,1.2,7.5C730,429.4,728.2,434.6,732.4,439.2z"
          />
          <path
            ref="Cloud05"
            className="st9"
            d="M586.9,672.6c-4.1-0.1-8.3,3.9-5.5,7.8c2.8,4,7.2-0.8,7.3-1.5c1.2,1.6,6.3,2.2,9.5-1.1c4.4-5.3,3.2-7.2,2.4-7.8c2.1-1.1,3.9-3.3,1.3-5c2.6-0.3,3.6-2.4,2.1-3.9c-1.6-1.4-4.5-0.3-4.6,2.2c-1.9,0.3-4.3,0.4-4.7,4C592.6,667,588.3,667.8,586.9,672.6z"
          />
          <path
            ref="Cloud06"
            className="st9"
            d="M298.9,698.3c-1.9-3.5-7.2-5.1-9.2-0.7c-2,4.3,4.1,5.7,4.8,5.4c-0.8,1.8,1.2,6.4,5.5,7.3c6.6,1.1,7.6-0.8,7.7-1.8c2,1.2,4.6,1.7,4.8-1.3c1.5,2.1,3.9,1.8,4.2-0.2c0.4-2-2-3.9-4-2.8c-1.1-1.4-2.4-3.4-5.6-2C306.5,700.4,303.7,697.3,298.9,698.3z"
          />
          <path
            ref="Cloud07"
            className="st9"
            d="M198.6,625.4c-0.9-5-6.9-9.2-11-4.6c-4.2,4.5,2.8,8.7,3.8,8.6c-1.6,1.9-1.1,8.4,3.9,11.3c7.6,4.1,9.8,2.1,10.3,0.9c1.9,2.3,5,4,6.5,0.4c1,3.2,4,3.8,5.2,1.5c1.3-2.3-0.8-5.6-3.9-5.1c-0.8-2.2-1.6-5.2-6.2-4.7C207.1,631,204.8,626,198.6,625.4z"
          />
        </g>
        <g ref="Baloons">
          <animateTransform
            accumulate="none"
            additive="replace"
            attributeName="transform"
            attributeType="XML"
            calcMode="linear"
            dur="300s"
            fill="remove"
            from="0 425 425"
            repeatCount="indefinite"
            restart="always"
            to="360 425 425"
            type="rotate"
          />
          <polygon
            className="st10"
            points="421.7,46.8 423.6,46.8 428.9,64.2 423.8,90.4 420.5,90.4 417.4,58.5"
          />
          <path
            className="st11"
            d="M422.9,46.8c10.4,0,19.2,8.1,19.2,17.7s-5,13.1-8.3,16.5s-3.2,9.5-4.7,9.5s-6.2,0-6.2,0s0.9-15.7,0.9-25.7S422.9,46.8,422.9,46.8z"
          />
          <path
            className="st12"
            d="M421.7,46.8c-6.1,0-18,6-18,17.6s3.8,13.5,7.1,16.9s5.2,9.1,7,9.1s3.8,0,3.8,0s0.2-19,0.2-25.3S421.7,46.8,421.7,46.8z"
          />
          <line className="st13" x1="429.1" y1="89.5" x2="428.3" y2="96.2" />
          <circle className="st14" cx="417.7" cy="89.5" r="1.3" />
          <line className="st15" x1="418.9" y1="96.6" x2="417.7" y2="89.5" />
          <polygon
            className="st16"
            points="417.3,95.6 419.6,95.6 429.5,95.6 428.2,103.4 418.6,103.4"
          />
          <circle className="st17" cx="429.1" cy="89.5" r="1.3" />
          <path className="st18" d="M422.9,46.8c1.4,10.3,1,26,0,43.7" />
          <path
            className="st19"
            d="M421.7,49.1c-3.9,0-11.4,5.4-11.4,15.8s2.4,12.1,4.6,15.1s3.4,8.2,4.5,8.2s2.4,0,2.4,0s0.1-17,0.1-22.7C421.9,59.9,421.7,49.1,421.7,49.1z"
          />
          <polygon
            className="st20"
            points="420.2,97.7 419.6,95.6 429.5,95.6 429.2,97.7"
          />
          <polygon
            className="st10"
            points="694.5,692.6 693.2,694.1 676.9,686.1 661.3,664.5 663.5,662.1 688.9,681.6"
          />
          <path
            className="st21"
            d="M693.7,693.5c-7,7.5-19,8.4-26,1.9s-6.2-12.5-6.3-17.3c-0.2-4.8-4.8-8.7-3.8-9.9c1.1-1.1,4.3-4.6,4.3-4.6s10.8,11.4,18.1,18.1C687.3,688.8,693.7,693.5,693.7,693.5z"
          />
          <line className="st22" x1="658.3" y1="669" x2="654.1" y2="663.8" />
          <line className="st23" x1="660.2" y1="656.7" x2="666.1" y2="660.7" />
          <polygon
            className="st24"
            points="662,656.3 660.5,657.9 653.7,665.2 648.8,658.8 655.3,651.9"
          />
          <path
            className="st25"
            d="M694.5,692.6c6.7-7.1,6.3-18.7-0.7-25.2s-12.7-5.5-17.4-5.4c-4.6,0-8.9-4.3-10-3.2c-1,1.1-3.8,4.1-3.8,4.1s8.5,5.8,15.9,12.6C685.9,682.3,694.5,692.6,694.5,692.6z"
          />
          <path
            className="st26"
            d="M694.5,692.6c2.6-2.8,5.5-9,4.6-14.6c-1.2-7.3-6-1.8-14.4-5.5c-9.2-4-18.4-13.5-20.5-11.1c-0.8,0.8-1.4,1.5-1.4,1.5s12,9,16.2,12.9C683,679.7,694.5,692.6,694.5,692.6z"
          />
          <polygon
            className="st27"
            points="658.5,657 660.5,657.9 653.7,665.2 652.4,663.5"
          />
          <path
            className="st28"
            d="M693.7,693.5c-6,6.4-17,7.5-23.9,1c-7-6.5-7.9-11.9-8.4-16.3c-0.5-4.4-4.7-8.8-3.8-9.9c0.9-1,4.3-4.6,4.3-4.6s10.9,11.3,18.2,18C687.4,688.6,693.7,693.5,693.7,693.5z"
          />
          <path
            className="st29"
            d="M661.9,663.8c12.6,13.8,23.9,24.9,31.8,29.7c0,0-13.6-14.2-17.9-18.1C671.6,671.4,661.9,663.8,661.9,663.8z"
          />
        </g>
        <g ref="Baum_Klein">
          <path
            ref="t-crown-01"
            className="t crown hide"
            d="M525.1,174.1c-2,4.6-7.5,6.7-12.1,4.7c-4.6-2-6.7-7.5-4.7-12.1s7.5-6.7,12.1-4.7C525.1,164.1,527.1,169.5,525.1,174.1L525.1,174.1z"
          />
          <path
            ref="t-shadow-01"
            className="t shadow hide"
            d="M512.7,162.1c-2.3,3.3-3.1,8.1,0,11.4c3.1,3.3,8.2,4.6,11.5,2.1c-2.9,4.1-8.6,5.1-12.7,2.2c-3.5-2.4-4.8-6.9-3.3-10.8C509,164.8,510.6,163.1,512.7,162.1z"
          />
          <path
            id="Stamm-01"
            ref="t-stem-01"
            data-seq="01"
            className="t stem hide"
            d="M512.4,182.2l2.7-6.1l5.3-2.6l-1.5-0.7l-2.9,1.1l1.8-4.1l-1.7,0.1l-2.1,4.8l-1.7-2.8l-1.5,0.8l1.6,3.5c0,0-0.8,1.7-2.2,4.8C508.8,184.2,511.2,184.9,512.4,182.2z"
          />
          <polygon
            ref="p-pot-01"
            className="p pot hide"
            points="508.3,174.7 519.2,178.4 515.2,183.8 508.3,181.5"
          />
          <path
            ref="p-shadow-01"
            className="p shadow hide"
            d="M512.8,176.9l5.3,1.8l-2.6,3.7c0,0,2-3.4,1.4-3.7L512.8,176.9z"
          />
          <path
            ref="p-leaf1-01"
            className="p leaf1 hide"
            d="M514.8,174.6c0.2-1,1-1.7,2-1.8C516.5,173.8,515.7,174.5,514.8,174.6z"
          />
          <path
            ref="p-stem-01"
            className="p stem hide"
            d="M513.9,176.6c0.6-1.2,2-2.7,0.9-5.4c0.4,1.9,0,3.8-1.2,5.3L513.9,176.6L513.9,176.6"
          />
          <path
            ref="p-leaf2-01"
            className="p leaf2 hide"
            d="M515,171.9c0.2-1.5,1.2-2.8,2.5-3.5C517.1,170.5,516.2,171.7,515,171.9z"
          />
          <path
            ref="p-leaf3-01"
            className="p leaf3 hide"
            d="M515,171.9c1.5-1.5,0.6-4.8-0.5-5.7C513.9,167.5,513.5,171.1,515,171.9z"
          />
          <path
            ref="t-crown-02"
            className="t crown hide"
            d="M485.7,159.8c-0.7,5-5.3,8.5-10.3,7.9c-5-0.7-8.5-5.3-7.9-10.3c0.7-5,5.3-8.5,10.3-7.9l0,0C482.8,150.2,486.3,154.8,485.7,159.8z"
          />
          <path
            ref="t-shadow-02"
            className="t shadow hide"
            d="M470.4,151.9c-1.3,3.8-0.7,8.6,3.2,10.9c3.9,2.3,9.1,2.1,11.7-1.2c-1.6,4.8-6.8,7.4-11.6,5.8c-4-1.4-6.6-5.3-6.2-9.5C467.6,155.5,468.7,153.4,470.4,151.9z"
          />
          <path
            id="Stamm-02"
            ref="t-stem-02"
            data-seq="02"
            className="t stem hide"
            d="M475.8,171.1l0.9-6.6l4.4-4l-1.6-0.2l-2.5,1.9l0.6-4.5l-1.6,0.6l-0.7,5.2l-2.5-2.2l-1.2,1.2l2.5,3c0,0-0.3,1.8-0.7,5.2C472.9,174.2,475.4,174.1,475.8,171.1z"
          />
          <polygon
            ref="p-pot-02"
            className="p pot hide"
            points="469.6,165 480.9,167.1 477.7,173 470.5,171.6"
          />
          <path
            ref="p-shadow-02"
            className="p shadow hide"
            d="M474.4,166.5l5.5,1.1l-2.1,4.1c0,0,1.5-3.7,0.8-3.9L474.4,166.5z"
          />
          <path
            ref="p-leaf1-02"
            className="p leaf1 hide"
            d="M476,164c0-1,0.8-1.8,1.8-2C477.7,163,477,163.8,476,164z"
          />
          <path
            ref="p-stem-02"
            className="p stem hide"
            d="M475.5,166c0.4-1.2,1.7-3,0.1-5.5c0.6,1.8,0.5,3.8-0.5,5.4L475.5,166L475.5,166"
          />
          <path
            ref="p-leaf2-02"
            className="p leaf2 hide"
            d="M475.9,161.2c0-1.5,0.8-2.9,2-3.8C477.8,159.6,477.1,160.9,475.9,161.2z"
          />
          <path
            ref="p-leaf3-02"
            className="p leaf3 hide"
            d="M475.9,161.2c1.3-1.7,0-4.8-1.2-5.5C474.2,157,474.3,160.8,475.9,161.2z"
          />
          <path
            ref="t-crown-03"
            className="t crown hide"
            d="M388.4,156.6c1.3,5.3-1.9,10.7-7.2,12s-10.7-1.9-12-7.2s1.9-10.6,7.1-12C381.6,148.1,387,151.3,388.4,156.6L388.4,156.6z"
          />
          <path
            ref="t-shadow-03"
            className="t shadow hide"
            d="M369.8,154.7c0.3,4.4,2.8,9,7.6,9.7c4.8,0.8,10-1.6,11.2-5.9c0.5,5.4-3.5,10.2-9,10.7c-4.8,0.4-9.2-2.7-10.4-7.3C368,157.5,369.8,154.7,369.8,154.7z"
          />
          <path
            id="Stamm-03"
            ref="t-stem-03"
            data-seq="03"
            className="t stem hide"
            d="M383,172l-1.8-6.9l2.8-5.8l-1.7,0.4l-1.7,2.9l-1.2-4.7l-1.3,1.2l1.3,5.5l-3.4-1.2l-0.8,1.7l3.7,2c0,0,0.5,2,1.4,5.6C381.3,176.3,383.7,175.1,383,172z"
          />
          <polygon
            ref="p-pot-03"
            className="p pot hide"
            points="374.4,166.2 385.7,164.2 384.8,170.9 377.6,172.1"
          />
          <path
            ref="p-shadow-03"
            className="p shadow hide"
            d="M379.4,165.9l5.5-1l-0.4,4.5c0,0,0.1-4-0.6-4L379.4,165.9z"
          />
          <path
            ref="p-leaf1-03"
            className="p leaf1 hide"
            d="M380,163c-0.3-1,0.1-2,1-2.5C381.2,161.4,380.8,162.4,380,163z"
          />
          <path
            ref="p-stem-03"
            className="p stem hide"
            d="M380.3,165.1c0-1.3,0.5-3.4-1.8-5.2c1.3,1.4,1.8,3.4,1.5,5.2H380.3L380.3,165.1"
          />
          <path
            ref="p-leaf2-03"
            className="p leaf2 hide"
            d="M378.9,160.5c-0.5-1.4-0.3-3,0.5-4.3C380.1,158.2,379.9,159.8,378.9,160.5z"
          />
          <path
            ref="p-leaf3-03"
            className="p leaf3 hide"
            d="M379,160.5c0.6-2-1.7-4.5-3.1-4.7C375.8,157.1,377.2,160.6,379,160.5z"
          />
          <path
            ref="t-crown-04"
            className="t crown hide"
            d="M301.8,183.1c2.9,4.6,1.5,10.7-3.1,13.6c-4.6,2.9-10.7,1.5-13.6-3.1s-1.6-10.7,3-13.6C292.7,177.1,298.8,178.5,301.8,183.1L301.8,183.1z"
          />
          <path
            ref="t-shadow-04"
            className="t shadow hide"
            d="M283.6,187.2c1.6,4.1,5.4,7.6,10.3,6.8s9-4.7,8.8-9.2c2.2,5-0.1,10.8-5.1,13c-4.4,2-9.6,0.4-12.3-3.7C282.7,190.4,283.6,187.2,283.6,187.2z"
          />
          <path
            id="Stamm-04"
            ref="t-stem-04"
            data-seq="04"
            className="t stem hide"
            d="M301.5,199.4l-3.9-6l0.8-6.4l-1.5,1l-0.7,3.3l-2.6-4.1l-0.9,1.6l3.1,4.8l-3.6-0.1l-0.2,1.9l4.1,0.7c0,0,1.1,1.7,3.1,4.8S303.3,202.2,301.5,199.4z"
          />
          <polygon
            ref="p-pot-04"
            className="p pot hide"
            points="292.4,197.4 302.4,191.7 303.8,198.3 297.4,201.9"
          />
          <path
            ref="p-shadow-04"
            className="p shadow hide"
            d="M297,195.4l4.9-2.8l1.1,4.4c0,0-1.2-3.8-1.9-3.5L297,195.4z"
          />
          <path
            ref="p-leaf1-04"
            className="p leaf1 hide"
            d="M296.6,192.5c-0.6-0.8-0.6-1.9,0-2.7C297.2,190.6,297.2,191.7,296.6,192.5z"
          />
          <path
            ref="p-stem-04"
            className="p stem hide"
            d="M297.6,194.4c-0.5-1.2-0.7-3.3-3.5-4.3c1.7,0.9,2.8,2.6,3.1,4.4L297.6,194.4L297.6,194.4"
          />
          <path
            ref="p-leaf2-04"
            className="p leaf2 hide"
            d="M294.9,190.5c-1-1.2-1.3-2.7-0.9-4.2C295.2,188,295.4,189.4,294.9,190.5z"
          />
          <path
            ref="p-leaf3-04"
            className="p leaf3 hide"
            d="M294.9,190.5c-0.1-2.1-3.1-3.7-4.5-3.4C290.8,188.4,293.2,191.1,294.9,190.5z"
          />
          <path
            ref="t-crown-05"
            className="t crown hide"
            d="M317.1,175.8c2.6,4.8,0.8,10.8-4,13.4c-4.8,2.6-10.8,0.8-13.4-4s-0.8-10.8,3.9-13.4C308.4,169.3,314.5,171,317.1,175.8L317.1,175.8z"
          />
          <path
            ref="t-shadow-05"
            className="t shadow hide"
            d="M298.7,178.6c1.4,4.2,4.9,8,9.8,7.5s9.3-4,9.4-8.5c1.8,5.1-0.9,10.8-6,12.6c-4.5,1.6-9.6-0.3-11.9-4.5C297.6,181.7,298.7,178.6,298.7,178.6z"
          />
          <path
            id="Stamm-05"
            ref="t-stem-05"
            data-seq="05"
            className="t stem hide"
            d="M315.7,192.1l-3.4-6.3l1.3-6.3l-1.6,0.8l-1,3.2l-2.3-4.3l-1,1.5l2.7,5l-3.6-0.3l-0.3,1.9l4.1,1c0,0,0.9,1.8,2.7,5C315.2,196.6,317.3,194.9,315.7,192.1z"
          />
          <polygon
            ref="p-pot-05"
            className="p pot hide"
            points="306.6,189.6 316.9,184.6 317.9,191.2 311.3,194.4"
          />
          <path
            ref="p-shadow-05"
            className="p shadow hide"
            d="M311.3,188l5.1-2.5l0.8,4.5c0,0-1-3.9-1.7-3.6L311.3,188z"
          />
          <path
            ref="p-leaf1-05"
            className="p leaf1 hide"
            d="M311.1,185c-0.6-0.8-0.5-2,0.2-2.7C311.8,183.2,311.7,184.2,311.1,185z"
          />
          <path
            ref="p-stem-05"
            className="p stem hide"
            d="M311.9,187c-0.4-1.2-0.5-3.4-3.2-4.5c1.6,1,2.6,2.7,2.9,4.6L311.9,187L311.9,187"
          />
          <path
            ref="p-leaf2-05"
            className="p leaf2 hide"
            d="M309.3,182.9c-0.9-1.2-1.2-2.8-0.7-4.2C309.9,180.4,310.1,181.9,309.3,182.9z"
          />
          <path
            ref="p-leaf3-05"
            className="p leaf3 hide"
            d="M309.4,182.9c0-2.1-2.9-3.8-4.3-3.7C305.4,180.6,307.8,183.5,309.4,182.9z"
          />
          <path
            ref="t-crown-06"
            className="t crown hide"
            d="M261.6,208.7c3.7,4,3.5,10.3-0.5,14s-10.3,3.5-14-0.5s-3.5-10.2,0.5-13.9C251.5,204.5,257.8,204.7,261.6,208.7C261.6,208.6,261.6,208.7,261.6,208.7z"
          />
          <path
            ref="t-shadow-06"
            className="t shadow hide"
            d="M244.4,215.9c2.4,3.7,6.7,6.5,11.3,4.9c4.6-1.7,8-6.2,7-10.6c3.1,4.5,2.1,10.6-2.4,13.8c-4.1,2.9-9.6,2.3-13-1.4C244.1,219.2,244.4,215.9,244.4,215.9z"
          />
          <path
            id="Stamm-06"
            ref="t-stem-06"
            data-seq="06"
            className="t stem hide"
            d="M264.3,224.7l-4.9-5.2l-0.3-6.4l-1.3,1.2l-0.1,3.3l-3.4-3.6l-0.6,1.7l3.9,4.2l-3.5,0.6l0.2,1.9h4.2c0,0,1.4,1.5,3.9,4.2C264.9,229.3,266.5,227.1,264.3,224.7z"
          />
          <polygon
            ref="p-pot-06"
            className="p pot hide"
            points="254.4,223.7 263.5,216.6 265.8,222.8 260.1,227.4"
          />
          <path
            ref="p-shadow-06"
            className="p shadow hide"
            d="M258.8,221.1l4.4-3.5l1.8,4.2c0,0-1.8-3.5-2.4-3.2L258.8,221.1z"
          />
          <path
            ref="p-leaf1-06"
            className="p leaf1 hide"
            d="M258,218.3c-0.8-0.7-0.9-1.8-0.4-2.7C258.2,216.3,258.3,217.4,258,218.3z"
          />
          <path
            ref="p-stem-06"
            className="p stem hide"
            d="M259.1,220c-0.7-1.1-1.2-3.2-4.1-3.7c1.8,0.7,3.2,2.1,3.8,3.9L259.1,220L259.1,220"
          />
          <path
            ref="p-leaf2-06"
            className="p leaf2 hide"
            d="M255.7,216.6c-1.2-1-1.7-2.5-1.6-4C255.7,214,256.2,215.4,255.7,216.6z"
          />
          <path
            ref="p-leaf3-06"
            className="p leaf3 hide"
            d="M255.7,216.6c-0.4-2-3.7-3.1-5-2.7C251.4,215.1,254.3,217.4,255.7,216.6z"
          />
          <path
            ref="t-crown-07"
            className="t crown hide"
            d="M218.8,246.4c4.5,3.1,5.6,9.2,2.6,13.7c-3.1,4.5-9.2,5.6-13.7,2.6c-4.5-3.1-5.6-9.2-2.6-13.7C208.1,244.5,214.2,243.3,218.8,246.4L218.8,246.4z"
          />
          <path
            ref="t-shadow-07"
            className="t shadow hide"
            d="M203.7,257.3c3.1,3.1,8,4.9,12.1,2.2s6.5-7.8,4.5-11.9c3.9,3.8,4,10.1,0.2,14c-3.3,3.4-8.5,4-12.5,1.4C204.2,260.6,203.7,257.3,203.7,257.3z"
          />
          <path
            id="Stamm-07"
            ref="t-stem-07"
            data-seq="07"
            className="t stem hide"
            d="M225,261.5l-5.9-4l-1.8-6.2l-1,1.5l0.6,3.3l-4.1-2.8l-0.2,1.8l4.7,3.2l-3.3,1.3l0.6,1.8l4.1-1c0,0,1.7,1.2,4.7,3.2C226.6,265.8,227.7,263.3,225,261.5z"
          />
          <polygon
            ref="p-pot-07"
            className="p pot hide"
            points="216.5,263.8 223.6,254.8 227.4,260.4 222.8,266.1"
          />
          <path
            ref="p-shadow-07"
            className="p shadow hide"
            d="M220,260.3l3.5-4.4l2.7,3.7c0,0-2.6-3.1-3.1-2.5L220,260.3z"
          />
          <path
            ref="p-leaf1-07"
            className="p leaf1 hide"
            d="M218.6,257.7c-0.9-0.5-1.3-1.6-1-2.5C218.4,255.7,218.8,256.7,218.6,257.7z"
          />
          <path
            ref="p-stem-07"
            className="p stem hide"
            d="M220.2,259.1c-0.9-1-1.9-2.8-4.8-2.7c1.9,0.3,3.6,1.3,4.6,3L220.2,259.1L220.2,259.1"
          />
          <path
            ref="p-leaf2-07"
            className="p leaf2 hide"
            d="M216.1,256.6c-1.3-0.7-2.3-2-2.4-3.5C215.5,254.1,216.3,255.3,216.1,256.6z"
          />
          <path
            ref="p-leaf3-07"
            className="p leaf3 hide"
            d="M216.1,256.5c-0.9-1.9-4.3-2.2-5.5-1.5C211.5,256.1,214.9,257.7,216.1,256.5z"
          />
          <path
            ref="t-crown-08"
            className="t crown hide"
            d="M205.3,263.4c4.6,3,5.8,9.1,2.8,13.7s-9.1,5.8-13.7,2.8c-4.5-3-5.8-9.1-2.9-13.6C194.6,261.7,200.7,260.4,205.3,263.4L205.3,263.4z"
          />
          <path
            ref="t-shadow-08"
            className="t shadow hide"
            d="M190.4,274.6c3.2,3,8.1,4.7,12.2,2c4.1-2.7,6.3-8,4.2-12c4.1,3.7,4.4,9.9,0.7,14c-3.2,3.6-8.6,4.3-12.7,1.7C190.9,277.9,190.4,274.6,190.4,274.6z"
          />
          <path
            id="Stamm-08"
            ref="t-stem-08"
            data-seq="08"
            className="t stem hide"
            d="M211.8,278.4l-6-4l-1.9-6.1l-1,1.5l0.7,3.3l-4.1-2.6l-0.1,1.8l4.8,3.1l-3.3,1.4l0.6,1.8l4.1-1c0,0,1.7,1.1,4.8,3.1C213.4,282.6,214.5,280.2,211.8,278.4z"
          />
          <polygon
            ref="p-pot-08"
            className="p pot hide"
            points="203.7,281.8 210.3,272.3 214.3,277.7 210.1,283.7"
          />
          <path
            ref="p-shadow-08"
            className="p shadow hide"
            d="M207,278l3.2-4.6l2.9,3.5c0,0-2.7-2.9-3.2-2.4L207,278z"
          />
          <path
            ref="p-leaf1-08"
            className="p leaf1 hide"
            d="M205.4,275.5c-0.9-0.4-1.4-1.5-1.1-2.5C205.2,273.6,205.6,274.5,205.4,275.5z"
          />
          <path
            ref="p-stem-08"
            className="p stem hide"
            d="M207.1,276.9c-1-0.9-2-2.7-4.9-2.4c1.9,0.1,3.6,1.1,4.8,2.7L207.1,276.9L207.1,276.9"
          />
          <path
            ref="p-leaf2-08"
            className="p leaf2 hide"
            d="M202.9,274.6c-1.4-0.6-2.4-1.9-2.6-3.4C202.1,272.1,203,273.3,202.9,274.6z"
          />
          <path
            ref="p-leaf3-08"
            className="p leaf3 hide"
            d="M202.9,274.5c-1-1.8-4.4-2-5.6-1.1C198.3,274.4,201.7,275.8,202.9,274.5z"
          />
          <path
            ref="t-crown-09"
            className="t crown hide"
            d="M179.1,306.1c5,2.2,7.2,8.1,5,13.1s-8.1,7.2-13.1,5s-7.2-8-5-13S174,303.9,179.1,306.1C179,306.1,179.1,306.1,179.1,306.1z"
          />
          <path
            ref="t-shadow-09"
            className="t shadow hide"
            d="M166.1,319.6c3.6,2.5,8.8,3.4,12.3,0c3.6-3.4,4.9-8.9,2.3-12.5c4.6,3,5.9,9.1,2.9,13.7c-2.6,4.1-7.8,5.6-12.2,3.7C167.2,322.7,166.1,319.6,166.1,319.6z"
          />
          <path
            id="Stamm-09"
            ref="t-stem-09"
            data-seq="09"
            className="t stem hide"
            d="M187.9,319.9l-6.6-2.9l-2.8-5.8l-0.7,1.6l1.2,3.1l-4.5-2l0.1,1.8l5.2,2.3l-3.1,1.9l0.9,1.7l3.8-1.7c0,0,1.8,0.8,5.2,2.3S190.8,321.2,187.9,319.9z"
          />
          <polygon
            ref="p-pot-09"
            className="p pot hide"
            points="181.2,324.5 185.8,314 190.8,318.4 187.9,325"
          />
          <path
            ref="p-shadow-09"
            className="p shadow hide"
            d="M183.7,320.2l2.3-5.1l3.5,2.9c0,0-3.3-2.3-3.6-1.7L183.7,320.2z"
          />
          <path
            ref="p-leaf1-09"
            className="p leaf1 hide"
            d="M181.7,318c-1-0.2-1.7-1.2-1.6-2.2C181,316.2,181.7,317,181.7,318z"
          />
          <path
            ref="p-stem-09"
            className="p stem hide"
            d="M183.6,319c-1.1-0.7-2.5-2.3-5.3-1.3c1.9-0.2,3.8,0.4,5.1,1.7L183.6,319L183.6,319"
          />
          <path
            ref="p-leaf2-09"
            className="p leaf2 hide"
            d="M179,317.5c-1.5-0.3-2.7-1.4-3.3-2.8C177.8,315.4,178.9,316.2,179,317.5z"
          />
          <path
            ref="p-leaf3-09"
            className="p leaf3 hide"
            d="M179,317.5c-1.3-1.6-4.7-1.1-5.7,0C174.5,318.2,178.1,319,179,317.5z"
          />
          <path
            ref="t-crown-10"
            className="t crown hide"
            d="M158.5,366.4c5.4,0.9,9,6,8.1,11.4s-6,9-11.4,8.1c-5.3-0.9-9-5.9-8.1-11.3C147.9,369.2,153,365.5,158.5,366.4L158.5,366.4z"
          />
          <path
            ref="t-shadow-10"
            className="t shadow hide"
            d="M149.4,382.6c4.1,1.5,9.3,1,11.9-3.1s2.5-9.9-1-12.7c5.2,1.7,8,7.3,6.3,12.5c-1.5,4.6-6.1,7.4-10.9,6.7C151.3,385.4,149.4,382.6,149.4,382.6z"
          />
          <path
            id="Stamm-10"
            ref="t-stem-10"
            data-seq="10"
            className="t stem hide"
            d="M170.5,377.5l-7.1-1.1l-4.2-4.9l-0.2,1.7l2,2.7l-4.8-0.8l0.6,1.7l5.6,0.9l-2.5,2.6l1.3,1.4l3.3-2.6c0,0,2,0.4,5.7,0.9C173.8,380.6,173.7,378,170.5,377.5z"
          />
          <polygon
            ref="p-pot-10"
            className="p pot hide"
            points="165,383.3 166.9,371.9 172.9,375 171.7,382.2"
          />
          <path
            ref="p-shadow-10"
            className="p shadow hide"
            d="M166.4,378.5l0.9-5.6l4.1,2c0,0-3.7-1.4-3.9-0.7L166.4,378.5z"
          />
          <path
            ref="p-leaf1-10"
            className="p leaf1 hide"
            d="M163.9,376.9c-1,0-1.9-0.7-2.1-1.7C162.8,375.3,163.7,376,163.9,376.9z"
          />
          <path
            ref="p-stem-10"
            className="p stem hide"
            d="M166,377.4c-1.2-0.4-3-1.6-5.5,0c1.8-0.7,3.8-0.6,5.4,0.3L166,377.4L166,377.4"
          />
          <path
            ref="p-leaf2-10"
            className="p leaf2 hide"
            d="M161.2,377.1c-1.5,0-3-0.7-3.9-1.9C159.5,375.2,160.8,375.9,161.2,377.1z"
          />
          <path
            ref="p-leaf3-10"
            className="p leaf3 hide"
            d="M161.2,377.1c-1.7-1.2-4.8,0.1-5.5,1.4C157,378.9,160.7,378.7,161.2,377.1z"
          />
          <path
            ref="t-crown-11"
            className="t crown hide"
            d="M154,388.9c5.4,0.8,9.1,5.8,8.4,11.2s-5.8,9.1-11.2,8.4c-5.4-0.8-9.1-5.7-8.4-11.1C143.6,391.9,148.6,388.1,154,388.9L154,388.9z"
          />
          <path
            ref="t-shadow-11"
            className="t shadow hide"
            d="M145.2,405.3c4.2,1.4,9.3,0.8,11.9-3.4c2.5-4.2,2.3-9.9-1.2-12.7c5.2,1.6,8.2,7.1,6.6,12.3c-1.4,4.7-6,7.6-10.8,6.9C147.1,408.1,145.2,405.3,145.2,405.3z"
          />
          <path
            id="Stamm-11"
            ref="t-stem-11"
            data-seq="11"
            className="t stem hide"
            d="M166.2,399.7l-7.1-1l-4.3-4.8l-0.2,1.7l2,2.7l-4.9-0.7l0.6,1.7l5.7,0.8l-2.4,2.6l1.3,1.4l3.2-2.7c0,0,2,0.3,5.7,0.8C169.5,402.8,169.4,400.1,166.2,399.7z"
          />
          <polygon
            ref="p-pot-11"
            className="p pot hide"
            points="162,406.2 163.1,394.8 169.3,397.4 168.5,404.6"
          />
          <path
            ref="p-shadow-11"
            className="p shadow hide"
            d="M163,401.4l0.6-5.6l4.2,1.7c0,0-3.8-1.2-4-0.5L163,401.4z"
          />
          <path
            ref="p-leaf1-11"
            className="p leaf1 hide"
            d="M160.4,399.9c-1,0.1-1.9-0.6-2.2-1.6C159.2,398.4,160.1,398.9,160.4,399.9z"
          />
          <path
            ref="p-stem-11"
            className="p stem hide"
            d="M162.6,400.2c-1.3-0.3-3.1-1.4-5.5,0.4c1.7-0.8,3.7-0.8,5.4,0L162.6,400.2L162.6,400.2"
          />
          <path
            ref="p-leaf2-11"
            className="p leaf2 hide"
            d="M157.7,400.4c-1.5,0.1-3-0.5-4-1.7C155.9,398.5,157.3,399.1,157.7,400.4z"
          />
          <path
            ref="p-leaf3-11"
            className="p leaf3 hide"
            d="M157.7,400.2c-1.8-1.1-4.8,0.4-5.4,1.7C153.6,402.4,157.3,401.9,157.7,400.2z"
          />
          <path
            ref="t-crown-12"
            className="t crown hide"
            d="M177.8,537.3c5.1-2.1,10.8,0.4,12.9,5.4c2.1,5.1-0.4,10.8-5.4,12.9c-5,2-10.8-0.4-12.8-5.4C170.3,545.2,172.6,539.4,177.8,537.3C177.7,537.3,177.7,537.3,177.8,537.3z"
          />
          <path
            ref="t-shadow-12"
            className="t shadow hide"
            d="M178.5,556c4.3-0.9,8.5-4,8.6-8.9s-3-9.7-7.5-10.3c5.3-1.4,10.7,1.7,12.1,6.9c1.3,4.9-1.3,10-6,11.8C181.5,557.4,178.5,556,178.5,556z"
          />
          <path
            id="Stamm-12"
            ref="t-stem-12"
            data-seq="12"
            className="t stem hide"
            d="M193.8,540.5l-6.6,2.7l-6.1-2l0.7,1.7l3.1,1.3l-4.5,1.9l1.4,1.1l5.3-2.2l-0.7,3.5l1.8,0.5l1.4-4c0,0,1.9-0.7,5.3-2.2C198.2,541.5,196.7,539.3,193.8,540.5z"
          />
          <polygon
            ref="p-pot-12"
            className="p pot hide"
            points="192.2,548.4 187,538.2 193.7,537.1 196.9,543.6"
          />
          <path
            ref="p-shadow-12"
            className="p shadow hide"
            d="M190.5,543.8l-2.5-5l4.5-0.9c0,0-3.8,1.1-3.6,1.7L190.5,543.8z"
          />
          <path
            ref="p-leaf1-12"
            className="p leaf1 hide"
            d="M187.5,544c-0.8,0.6-2,0.5-2.7-0.2C185.7,543.3,186.8,543.3,187.5,544z"
          />
          <path
            ref="p-stem-12"
            className="p stem hide"
            d="M189.5,543.1c-1.2,0.4-3.4,0.5-4.4,3.3c1-1.6,2.7-2.7,4.6-3L189.5,543.1L189.5,543.1"
          />
          <path
            ref="p-leaf2-12"
            className="p leaf2 hide"
            d="M185.5,545.7c-1.2,0.9-2.8,1.2-4.2,0.7C183,545.2,184.4,545,185.5,545.7z"
          />
          <path
            ref="p-leaf3-12"
            className="p leaf3 hide"
            d="M185.4,545.7c-2.1,0-3.8,3-3.6,4.4C183.1,549.7,186,547.3,185.4,545.7z"
          />
          <path
            ref="t-crown-13"
            className="t crown hide"
            d="M214.7,601c4.1-3.6,10.4-3.1,13.9,1c3.6,4.1,3.1,10.4-1,13.9c-4.1,3.6-10.3,3.2-13.9-0.9C210.1,610.9,210.5,604.6,214.7,601C214.6,601,214.6,601,214.7,601z"
          />
          <path
            ref="t-shadow-13"
            className="t shadow hide"
            d="M221.4,618.4c3.8-2.2,6.7-6.5,5.2-11.2s-5.9-8.2-10.4-7.3c4.6-2.9,10.7-1.6,13.6,3c2.6,4.1,1.8,9.5-1.8,12.7C224.7,618.7,221.4,618.4,221.4,618.4z"
          />
          <path
            id="Stamm-13"
            ref="t-stem-13"
            data-seq="13"
            className="t stem hide"
            d="M230.8,598.8l-5.4,4.7l-6.4,0.2l1.2,1.3l3.3,0.2l-3.7,3.2l1.7,0.6l4.3-3.8l0.4,3.5l1.9-0.1l0.1-4.2c0,0,1.5-1.3,4.3-3.8C235.4,598.3,233.2,596.7,230.8,598.8z"
          />
          <polygon
            ref="p-pot-13"
            className="p pot hide"
            points="233.2,605.9 225.6,597.3 231.7,594.6 236.5,600.1"
          />
          <path
            ref="p-shadow-13"
            className="p shadow hide"
            d="M230.3,601.8l-3.7-4.2l4.1-2c0,0-3.5,2-3,2.6L230.3,601.8z"
          />
          <path
            ref="p-leaf1-13"
            className="p leaf1 hide"
            d="M227.5,602.7c-0.6,0.8-1.8,1-2.6,0.5C225.5,602.6,226.6,602.4,227.5,602.7z"
          />
          <path
            ref="p-stem-13"
            className="p stem hide"
            d="M229.2,601.4c-1.1,0.7-3.1,1.4-3.5,4.3c0.6-1.8,1.9-3.2,3.7-4L229.2,601.4L229.2,601.4"
          />
          <path
            ref="p-leaf2-13"
            className="p leaf2 hide"
            d="M226,605c-0.9,1.2-2.4,1.9-4,1.8C223.4,605.1,224.8,604.6,226,605z"
          />
          <path
            ref="p-leaf3-13"
            className="p leaf3 hide"
            d="M225.9,605c-2,0.5-3,3.8-2.4,5.1C224.7,609.4,226.9,606.4,225.9,605z"
          />
          <path
            ref="t-crown-14"
            className="t crown hide"
            d="M245.5,632c3.3-4.4,9.5-5.2,13.8-1.9c4.4,3.3,5.2,9.5,1.9,13.8c-3.3,4.3-9.4,5.2-13.8,2C243.1,642.7,242.2,636.5,245.5,632C245.5,632.1,245.5,632.1,245.5,632z"
          />
          <path
            ref="t-shadow-14"
            className="t shadow hide"
            d="M255.7,647.7c3.2-3,5.3-7.8,2.8-12s-7.5-6.8-11.7-5c3.9-3.8,10.2-3.7,14,0.2c3.4,3.5,3.7,8.9,0.8,12.8C259,647.4,255.7,647.7,255.7,647.7z"
          />
          <path
            id="Stamm-14"
            ref="t-stem-14"
            data-seq="14"
            className="t stem hide"
            d="M260.9,626.6l-4.3,5.7l-6.3,1.5l1.4,1.1l3.3-0.5l-3,4l1.8,0.3l3.4-4.6l1.2,3.4l1.8-0.5l-0.8-4.1c0,0,1.2-1.6,3.5-4.6C265.2,625.2,262.8,624,260.9,626.6z"
          />
          <polygon
            ref="p-pot-14"
            className="p pot hide"
            points="264,633.8 255,626.7 260.5,622.9 266.2,627.4"
          />
          <path
            ref="p-shadow-14"
            className="p shadow hide"
            d="M260.5,630.2l-4.4-3.5l3.7-2.7c0,0-3,2.6-2.5,3.1L260.5,630.2z"
          />
          <path
            ref="p-leaf1-14"
            className="p leaf1 hide"
            d="M257.9,631.7c-0.5,0.9-1.6,1.3-2.5,1C255.9,631.8,256.9,631.4,257.9,631.7z"
          />
          <path
            ref="p-stem-14"
            className="p stem hide"
            d="M259.2,630c-1,0.9-2.8,1.9-2.6,4.8c0.3-1.9,1.3-3.6,3-4.6L259.2,630L259.2,630"
          />
          <path
            ref="p-leaf2-14"
            className="p leaf2 hide"
            d="M256.7,634.2c-0.7,1.3-2,2.3-3.5,2.4C254.3,634.8,255.5,633.9,256.7,634.2z"
          />
          <path
            ref="p-leaf3-14"
            className="p leaf3 hide"
            d="M256.7,634.2c-1.9,0.9-2.2,4.3-1.5,5.5C256.2,638.8,257.9,635.3,256.7,634.2z"
          />
          <path
            ref="t-crown-15"
            className="t crown hide"
            d="M281,650.6c2.9-4.6,8.9-6.1,13.6-3.2c4.6,2.9,6.1,8.9,3.2,13.6c-2.8,4.6-8.9,6.1-13.5,3.3C279.6,661.5,278.1,655.4,281,650.6C281,650.7,281,650.7,281,650.6z"
          />
          <path
            ref="t-shadow-15"
            className="t shadow hide"
            d="M292.7,665.2c3-3.3,4.5-8.3,1.6-12.2s-8.2-6-12.1-3.8c3.5-4.2,9.8-4.7,13.9-1.2c3.7,3.1,4.6,8.4,2.1,12.6C296,664.5,292.7,665.2,292.7,665.2z"
          />
          <path
            id="Stamm-15"
            ref="t-stem-15"
            data-seq="15"
            className="t stem hide"
            d="M295.8,643.7l-3.7,6.1l-6.1,2.1l1.5,0.9l3.3-0.8l-2.5,4.2l1.8,0.1l3-4.9l1.5,3.3l1.8-0.7l-1.2-4c0,0,1.1-1.7,3-4.9C299.9,641.8,297.5,640.9,295.8,643.7z"
          />
          <polygon
            ref="p-pot-15"
            className="p pot hide"
            points="297.9,653.3 288.2,647 293.4,642.8 299.5,646.7"
          />
          <path
            ref="p-shadow-15"
            className="p shadow hide"
            d="M294,650.1l-4.7-3.1l3.4-3c0,0-2.8,2.8-2.2,3.3L294,650.1z"
          />
          <path
            ref="p-leaf1-15"
            className="p leaf1 hide"
            d="M291.6,651.7c-0.4,0.9-1.4,1.5-2.4,1.2C289.6,652.1,290.6,651.6,291.6,651.7z"
          />
          <path
            ref="p-stem-15"
            className="p stem hide"
            d="M292.8,650c-0.9,1-2.6,2.1-2.2,5c0.1-1.9,1-3.7,2.5-4.8L292.8,650L292.8,650"
          />
          <path
            ref="p-leaf2-15"
            className="p leaf2 hide"
            d="M290.7,654.3c-0.6,1.4-1.8,2.4-3.3,2.8C288.3,655.2,289.4,654.2,290.7,654.3z"
          />
          <path
            ref="p-leaf3-15"
            className="p leaf3 hide"
            d="M290.6,654.3c-1.8,1.1-1.8,4.4-1,5.6C290.6,658.9,291.9,655.4,290.6,654.3z"
          />
          <path
            ref="t-crown-16"
            className="t crown hide"
            d="M311.9,675c1.1-5.3,6.3-8.8,11.7-7.7c5.3,1.1,8.8,6.3,7.7,11.7c-1.1,5.3-6.3,8.8-11.6,7.7C314.3,685.6,310.8,680.4,311.9,675L311.9,675z"
          />
          <path
            ref="t-shadow-16"
            className="t shadow hide"
            d="M327.8,684.7c1.6-4.1,1.4-9.3-2.7-12.1c-4-2.8-9.7-2.9-12.7,0.5c1.9-5.1,7.6-7.7,12.7-5.8c4.5,1.7,7.2,6.4,6.3,11.1C330.7,683,327.8,684.7,327.8,684.7z"
          />
          <path
            id="Stamm-16"
            ref="t-stem-16"
            data-seq="16"
            className="t stem hide"
            d="M323.4,663.4l-1.4,7l-5,4l1.7,0.3l2.8-1.9l-1,4.8l1.7-0.5l1.1-5.6l2.5,2.5l1.4-1.2l-2.5-3.4c0,0,0.4-2,1.1-5.6C326.8,660.3,324,660.3,323.4,663.4z"
          />
          <polygon
            ref="p-pot-16"
            className="p pot hide"
            points="329.2,669.4 318.6,664.9 323,659.8 329.7,662.6"
          />
          <path
            ref="p-shadow-16"
            className="p shadow hide"
            d="M324.9,666.9l-5.2-2.2l2.8-3.6c0,0-2.2,3.3-1.6,3.6L324.9,666.9z"
          />
          <path
            ref="p-leaf1-16"
            className="p leaf1 hide"
            d="M322.8,669c-0.2,1-1.1,1.7-2.2,1.6C320.9,669.7,321.8,669,322.8,669z"
          />
          <path
            ref="p-stem-16"
            className="p stem hide"
            d="M323.7,667c-0.7,1.1-2.2,2.6-1.3,5.3c-0.3-1.9,0.3-3.8,1.6-5.2L323.7,667L323.7,667"
          />
          <path
            ref="p-leaf2-16"
            className="p leaf2 hide"
            d="M322.4,671.7c-0.3,1.5-1.4,2.7-2.8,3.3C320.1,672.9,321.1,671.8,322.4,671.7z"
          />
          <path
            ref="p-leaf3-16"
            className="p leaf3 hide"
            d="M322.3,671.7c-1.6,1.4-1,4.7,0.1,5.7C323.1,676.2,323.8,672.5,322.3,671.7z"
          />
          <path
            ref="t-crown-17"
            className="t crown hide"
            d="M365.4,690.4c1-5.4,6.1-8.9,11.5-8c5.4,1,8.9,6.1,8,11.5c-1,5.4-6.1,8.9-11.5,8C368.1,700.9,364.5,695.8,365.4,690.4L365.4,690.4z"
          />
          <path
            ref="t-shadow-17"
            className="t shadow hide"
            d="M381.6,699.8c1.6-4.1,1.2-9.3-2.9-12s-9.8-2.7-12.7,0.8c1.8-5.2,7.4-7.9,12.6-6.1c4.6,1.6,7.3,6.3,6.5,11.1C384.3,698,381.6,699.8,381.6,699.8z"
          />
          <path
            id="Stamm-17"
            ref="t-stem-17"
            data-seq="17"
            className="t stem hide"
            d="M376.7,678.6l-1.3,7l-4.9,4.1l1.7,0.3l2.7-1.9l-0.8,4.8l1.7-0.6l1-5.6l2.6,2.5l1.4-1.3l-2.5-3.3c0,0,0.4-2,1-5.6C379.9,675.3,377.3,675.4,376.7,678.6z"
          />
          <polygon
            ref="p-pot-17"
            className="p pot hide"
            points="382.2,685 370.8,683.1 373.9,677.1 381.1,678.3"
          />
          <path
            ref="p-shadow-17"
            className="p shadow hide"
            d="M377.4,683.6l-5.6-0.9l1.9-4.1c0,0-1.4,3.7-0.7,4L377.4,683.6z"
          />
          <path
            ref="p-leaf1-17"
            className="p leaf1 hide"
            d="M375.8,686.1c0,1-0.7,1.9-1.7,2.1C374.2,687.2,374.9,686.4,375.8,686.1z"
          />
          <path
            ref="p-stem-17"
            className="p stem hide"
            d="M376.3,684c-0.4,1.2-1.6,3,0,5.5c-0.7-1.8-0.6-3.8,0.3-5.4L376.3,684L376.3,684"
          />
          <path
            ref="p-leaf2-17"
            className="p leaf2 hide"
            d="M376.1,688.8c0,1.5-0.7,3-1.9,3.9C374.2,690.5,374.9,689.2,376.1,688.8z"
          />
          <path
            ref="p-leaf3-17"
            className="p leaf3 hide"
            d="M376,688.8c-1.2,1.7,0.1,4.8,1.4,5.5C377.9,693.1,377.7,689.3,376,688.8z"
          />
          <path
            ref="t-crown-18"
            className="t crown hide"
            d="M396.5,694.9c0.6-5.4,5.5-9.3,11-8.7c5.4,0.6,9.3,5.5,8.7,11c-0.6,5.4-5.5,9.3-10.9,8.7C399.9,705.3,395.9,700.4,396.5,694.9C396.5,695,396.5,695,396.5,694.9z"
          />
          <path
            ref="t-shadow-18"
            className="t shadow hide"
            d="M413.2,703.3c1.3-4.2,0.6-9.4-3.7-11.8c-4.3-2.4-10-2.1-12.6,1.6c1.4-5.3,6.9-8.4,12.1-6.9c4.7,1.3,7.8,5.8,7.2,10.6C415.9,701.3,413.2,703.3,413.2,703.3z"
          />
          <path
            id="Stamm-18"
            ref="t-stem-18"
            data-seq="18"
            className="t stem hide"
            d="M407.1,682.4l-0.8,7.1l-4.7,4.4l1.8,0.2l2.6-2.1l-0.6,4.9l1.7-0.7l0.6-5.7l2.7,2.3l1.3-1.4l-2.8-3.2c0,0,0.3-2,0.7-5.7S407.4,679.3,407.1,682.4z"
          />
          <polygon
            ref="p-pot-18"
            className="p pot hide"
            points="413,688.5 401.5,687.7 404,681.5 411.2,682"
          />
          <path
            ref="p-shadow-18"
            className="p shadow hide"
            d="M408,687.6l-5.6-0.4l1.5-4.3c0,0-1,3.9-0.3,4L408,687.6z"
          />
          <path
            ref="p-leaf1-18"
            className="p leaf1 hide"
            d="M406.8,690.2c0.1,1-0.5,2-1.5,2.2C405.3,691.5,405.9,690.6,406.8,690.2z"
          />
          <path
            ref="p-stem-18"
            className="p stem hide"
            d="M407.1,688.1c-0.3,1.3-1.3,3.2,0.6,5.5c-0.9-1.7-1-3.7-0.2-5.4L407.1,688.1L407.1,688.1"
          />
          <path
            ref="p-leaf2-18"
            className="p leaf2 hide"
            d="M407.3,692.9c0.2,1.5-0.4,3-1.5,4C405.6,694.8,406.1,693.4,407.3,692.9z"
          />
          <path
            ref="p-leaf3-18"
            className="p leaf3 hide"
            d="M407.2,692.9c-1,1.8,0.6,4.8,2,5.3C409.5,696.9,408.9,693.2,407.2,692.9z"
          />
          <path
            ref="t-crown-19"
            className="t crown hide"
            d="M379.7,694.9c0.7-5.4,5.7-9.2,11.1-8.5s9.2,5.7,8.5,11.1c-0.7,5.4-5.7,9.2-11,8.5C382.9,705.3,379,700.4,379.7,694.9L379.7,694.9z"
          />
          <path
            ref="t-shadow-19"
            className="t shadow hide"
            d="M396.3,703.5c1.4-4.2,0.8-9.4-3.5-11.9c-4.2-2.5-9.9-2.2-12.6,1.4c1.6-5.2,7.1-8.2,12.3-6.7c4.6,1.4,7.6,5.9,7,10.7C399,701.6,396.3,703.5,396.3,703.5z"
          />
          <path
            id="Stamm-19"
            ref="t-stem-19"
            data-seq="19"
            className="t stem hide"
            d="M390.5,682.6l-1,7.1l-4.7,4.3l1.8,0.2l2.7-2l-0.6,4.9l1.7-0.7l0.8-5.7l2.7,2.4l1.3-1.3l-2.7-3.2c0,0,0.3-2,0.8-5.7S390.9,679.4,390.5,682.6z"
          />
          <polygon
            ref="p-pot-19"
            className="p pot hide"
            points="396.7,687.2 385.3,685.8 388.1,679.7 395.3,680.6"
          />
          <path
            ref="p-shadow-19"
            className="p shadow hide"
            d="M391.9,686l-5.6-0.7l1.7-4.2c0,0-1.2,3.8-0.6,4L391.9,686z"
          />
          <path
            ref="p-leaf1-19"
            className="p leaf1 hide"
            d="M390.4,688.6c0.1,1-0.6,1.9-1.6,2.1C388.8,689.7,389.5,688.9,390.4,688.6z"
          />
          <path
            ref="p-stem-19"
            className="p stem hide"
            d="M390.8,686.4c-0.3,1.3-1.4,3.1,0.3,5.5c-0.8-1.7-0.7-3.7,0.1-5.4L390.8,686.4L390.8,686.4"
          />
          <path
            ref="p-leaf2-19"
            className="p leaf2 hide"
            d="M390.8,691.3c0.1,1.5-0.5,3-1.7,4C389,693.1,389.6,691.7,390.8,691.3z"
          />
          <path
            ref="p-leaf3-19"
            className="p leaf3 hide"
            d="M390.7,691.3c-1.1,1.7,0.4,4.8,1.6,5.4C392.8,695.4,392.4,691.7,390.7,691.3z"
          />
          <path
            ref="t-crown-20"
            className="t crown hide"
            d="M471.2,694.4c-1.1-5.4,2.4-10.6,7.7-11.6c5.4-1.1,10.6,2.4,11.6,7.7c1.1,5.3-2.4,10.5-7.7,11.6C477.5,703.3,472.3,699.8,471.2,694.4C471.2,694.5,471.2,694.4,471.2,694.4z"
          />
          <path
            ref="t-shadow-20"
            className="t shadow hide"
            d="M489.6,697.2c-0.1-4.4-2.4-9.1-7.2-10.1c-4.8-1-10.1,1.1-11.5,5.4c-0.3-5.5,3.9-10.1,9.4-10.4c4.9-0.3,9.2,3.1,10.2,7.9C491.6,694.5,489.6,697.2,489.6,697.2z"
          />
          <path
            id="Stamm-20"
            ref="t-stem-20"
            data-seq="20"
            className="t stem hide"
            d="M477.2,679.3l1.4,7l-3,5.7l1.7-0.4l1.8-2.8l1,4.8l1.4-1.2l-1.1-5.6l3.3,1.4l0.8-1.7l-3.6-2.1c0,0-0.4-2-1.1-5.6C479.1,675.1,476.6,676.2,477.2,679.3z"
          />
          <polygon
            ref="p-pot-20"
            className="p pot hide"
            points="484.9,681.5 473.7,684.1 474.2,677.4 481.3,675.8"
          />
          <path
            ref="p-shadow-20"
            className="p shadow hide"
            d="M479.9,682.1l-5.5,1.3l0.2-4.5c0,0,0.1,4,0.8,3.9L479.9,682.1z"
          />
          <path
            ref="p-leaf1-20"
            className="p leaf1 hide"
            d="M479.4,685c0.4,0.9,0.1,2-0.8,2.6C478.3,686.6,478.6,685.6,479.4,685z"
          />
          <path
            ref="p-stem-20"
            className="p stem hide"
            d="M479.1,682.9c0.1,1.3-0.3,3.4,2.1,5.1c-1.3-1.4-2-3.3-1.8-5.1H479.1L479.1,682.9"
          />
          <path
            ref="p-leaf2-20"
            className="p leaf2 hide"
            d="M480.7,687.4c0.6,1.4,0.5,3-0.3,4.3C479.6,689.7,479.7,688.2,480.7,687.4z"
          />
          <path
            ref="p-leaf3-20"
            className="p leaf3 hide"
            d="M480.6,687.4c-0.5,2,2,4.4,3.4,4.6C483.9,690.6,482.3,687.3,480.6,687.4z"
          />
          <path
            ref="t-crown-21"
            className="t crown hide"
            d="M514.2,684.8c-2.9-4.6-1.5-10.7,3.1-13.6c4.6-2.9,10.7-1.5,13.6,3.1c2.9,4.6,1.5,10.7-3.1,13.6C523.3,690.8,517.2,689.4,514.2,684.8L514.2,684.8z"
          />
          <path
            ref="t-shadow-21"
            className="t shadow hide"
            d="M532.4,680.8c-1.6-4.1-5.4-7.7-10.2-6.9s-9.1,4.6-8.8,9.1c-2.2-5,0.1-10.8,5.1-13c4.4-1.9,9.6-0.3,12.2,3.7C533.3,677.6,532.4,680.8,532.4,680.8z"
          />
          <path
            id="Stamm-21"
            ref="t-stem-21"
            data-seq="21"
            className="t stem hide"
            d="M514.6,668.4l3.8,6.1l-0.8,6.4l1.5-1l0.7-3.3l2.6,4.2l0.9-1.6l-3.1-4.8l3.6,0.1l0.2-1.9l-4.1-0.7c0,0-1.1-1.7-3.1-4.9C514.8,663.9,512.8,665.7,514.6,668.4z"
          />
          <polygon
            ref="p-pot-21"
            className="p pot hide"
            points="524.1,669.7 513.3,673.6 513,666.9 519.8,664.4"
          />
          <path
            ref="p-shadow-21"
            className="p shadow hide"
            d="M519.2,670.9l-5.3,2l-0.3-4.5c0,0,0.6,4,1.3,3.8L519.2,670.9z"
          />
          <path
            ref="p-leaf1-21"
            className="p leaf1 hide"
            d="M519.1,673.8c0.5,0.9,0.3,2-0.5,2.7C518.2,675.6,518.4,674.5,519.1,673.8z"
          />
          <path
            ref="p-stem-21"
            className="p stem hide"
            d="M518.5,671.8c0.3,1.3,0.1,3.4,2.7,4.8c-1.5-1.2-2.4-3-2.4-4.9L518.5,671.8L518.5,671.8"
          />
          <path
            ref="p-leaf2-21"
            className="p leaf2 hide"
            d="M520.6,676.1c0.8,1.3,0.9,2.9,0.2,4.3C519.8,678.5,519.8,677,520.6,676.1z"
          />
          <path
            ref="p-leaf3-21"
            className="p leaf3 hide"
            d="M520.6,676.1c-0.2,2.1,2.5,4.1,4,4.1C524.3,678.8,522.2,675.7,520.6,676.1z"
          />
          <path
            ref="t-crown-22"
            className="t crown hide"
            d="M548.4,662.9c-3.5-4.2-3-10.4,1.2-13.9s10.4-3,13.9,1.2s3,10.4-1.2,13.9C558.2,667.6,552,667.1,548.4,662.9C548.4,663,548.4,662.9,548.4,662.9z"
          />
          <path
            ref="t-shadow-22"
            className="t shadow hide"
            d="M565.9,656.5c-2.2-3.8-6.4-6.9-11.1-5.4c-4.7,1.4-8.4,5.8-7.5,10.3c-2.8-4.7-1.2-10.8,3.5-13.5c4.1-2.4,9.3-1.6,12.4,2C566.3,653.2,565.9,656.5,565.9,656.5z"
          />
          <path
            id="Stamm-22"
            ref="t-stem-22"
            data-seq="22"
            className="t stem hide"
            d="M546.5,646.7l4.6,5.5v6.4l1.4-1.1l0.3-3.3l3.2,3.8l0.7-1.7l-3.7-4.4l3.6-0.4l-0.1-1.9l-4.2-0.2c0,0-1.3-1.6-3.7-4.4C546.1,642.2,544.4,644.3,546.5,646.7z"
          />
          <polygon
            ref="p-pot-22"
            className="p pot hide"
            points="557,648.2 547,653.9 545.7,647.3 552,643.7"
          />
          <path
            ref="p-shadow-22"
            className="p shadow hide"
            d="M552.4,650.1l-4.9,2.8l-1.1-4.4c0,0,1.2,3.8,1.9,3.5L552.4,650.1z"
          />
          <path
            ref="p-leaf1-22"
            className="p leaf1 hide"
            d="M552.8,653.1c0.7,0.8,0.7,1.9,0,2.7C552.2,654.9,552.2,653.9,552.8,653.1z"
          />
          <path
            ref="p-stem-22"
            className="p stem hide"
            d="M551.8,651.1c0.5,1.2,0.7,3.3,3.5,4.3c-1.7-0.9-2.8-2.6-3.2-4.4L551.8,651.1L551.8,651.1"
          />
          <path
            ref="p-leaf2-22"
            className="p leaf2 hide"
            d="M554.7,655c1,1.2,1.3,2.7,0.9,4.2C554.3,657.6,554,656.1,554.7,655z"
          />
          <path
            ref="p-leaf3-22"
            className="p leaf3 hide"
            d="M554.6,655.1c0.1,2.1,3.1,3.6,4.5,3.4C558.7,657.2,556.2,654.4,554.6,655.1z"
          />
          <path
            ref="t-crown-23"
            className="t crown hide"
            d="M582.4,647.5c-3.8-3.9-3.8-10.1,0.1-14c3.9-3.8,10.1-3.8,14,0.1c3.8,3.9,3.8,10.1,0,13.9C592.6,651.4,586.3,651.4,582.4,647.5L582.4,647.5z"
          />
          <path
            ref="t-shadow-23"
            className="t shadow hide"
            d="M599.2,639.6c-2.5-3.6-7-6.3-11.5-4.4c-4.5,1.8-7.8,6.5-6.6,10.9c-3.2-4.5-2.1-10.6,2.3-13.8c3.9-2.7,9.1-2.3,12.6,0.9C599.4,636.3,599.2,639.6,599.2,639.6z"
          />
          <path
            id="Stamm-23"
            ref="t-stem-23"
            data-seq="23"
            className="t stem hide"
            d="M579.1,631.5l5.1,5.1l0.6,6.4l1.2-1.3v-3.4l3.5,3.5l0.5-1.7l-4.1-4l3.5-0.7l-0.2-1.9l-4.2,0.2c0,0-1.4-1.5-4.1-4.1C578.3,627,576.8,629.2,579.1,631.5z"
          />
          <polygon
            ref="p-pot-23"
            className="p pot hide"
            points="589.1,631.6 579.9,638.6 577.7,632.3 583.5,627.9"
          />
          <path
            ref="p-shadow-23"
            className="p shadow hide"
            d="M584.8,634.2l-4.5,3.4l-1.7-4.2c0,0,1.7,3.6,2.3,3.2L584.8,634.2z"
          />
          <path
            ref="p-leaf1-23"
            className="p leaf1 hide"
            d="M585.5,637c0.7,0.7,0.9,1.8,0.3,2.7C585.2,639,585.1,637.9,585.5,637z"
          />
          <path
            ref="p-stem-23"
            className="p stem hide"
            d="M584.3,635.3c0.6,1.1,1.1,3.2,4,3.8c-1.8-0.7-3.1-2.2-3.7-4L584.3,635.3L584.3,635.3"
          />
          <path
            ref="p-leaf2-23"
            className="p leaf2 hide"
            d="M587.7,638.7c1.1,1,1.7,2.5,1.5,4C587.6,641.3,587.1,639.9,587.7,638.7z"
          />
          <path
            ref="p-leaf3-23"
            className="p leaf3 hide"
            d="M587.6,638.8c0.4,2.1,3.6,3.2,4.9,2.8C592,640.3,589.1,637.9,587.6,638.8z"
          />
          <path
            ref="t-crown-24"
            className="t crown hide"
            d="M636.1,599.8c-4.7-2.8-6.1-8.9-3.3-13.6c2.8-4.7,8.9-6.1,13.6-3.3c4.6,2.8,6.1,8.9,3.4,13.5C646.9,601.1,640.8,602.7,636.1,599.8L636.1,599.8z"
          />
          <path
            ref="t-shadow-24"
            className="t shadow hide"
            d="M650.6,588.1c-3.3-2.9-8.3-4.4-12.2-1.6s-6,8.2-3.8,12.1c-4.2-3.5-4.7-9.7-1.2-13.9c3.1-3.7,8.4-4.6,12.6-2.1C649.9,584.9,650.6,588.1,650.6,588.1z"
          />
          <path
            id="Stamm-24"
            ref="t-stem-24"
            data-seq="24"
            className="t stem hide"
            d="M629.1,585.1l6.1,3.7l2.1,6.1l0.9-1.5l-0.8-3.3l4.2,2.5l0.1-1.8l-4.9-3l3.2-1.5l-0.7-1.8l-3.9,1.2c0,0-1.7-1.1-4.9-3S626.3,583.4,629.1,585.1z"
          />
          <polygon
            ref="p-pot-24"
            className="p pot hide"
            points="637,581.6 630.2,590.9 626.3,585.4 630.6,579.6"
          />
          <path
            ref="p-shadow-24"
            className="p shadow hide"
            d="M633.6,585.2l-3.4,4.5l-2.8-3.5c0,0,2.7,3,3.1,2.4L633.6,585.2z"
          />
          <path
            ref="p-leaf1-24"
            className="p leaf1 hide"
            d="M635.1,587.8c0.9,0.5,1.4,1.5,1,2.5C635.3,589.8,634.9,588.8,635.1,587.8z"
          />
          <path
            ref="p-stem-24"
            className="p stem hide"
            d="M633.5,586.4c0.9,0.9,2,2.8,4.9,2.5c-1.9-0.2-3.6-1.2-4.7-2.8L633.5,586.4L633.5,586.4"
          />
          <path
            ref="p-leaf2-24"
            className="p leaf2 hide"
            d="M637.6,588.9c1.4,0.7,2.3,2,2.5,3.5C638.3,591.3,637.5,590.1,637.6,588.9z"
          />
          <path
            ref="p-leaf3-24"
            className="p leaf3 hide"
            d="M637.6,588.9c1,1.9,4.3,2.1,5.5,1.3C642.2,589.2,638.8,587.7,637.6,588.9z"
          />
          <path
            ref="t-crown-25"
            className="t crown hide"
            d="M624.5,609.4c-4.4-3.2-5.5-9.4-2.3-13.8c3.2-4.4,9.4-5.5,13.8-2.3c4.4,3.2,5.4,9.3,2.3,13.7C635.2,611.5,629,612.6,624.5,609.4C624.5,609.5,624.5,609.4,624.5,609.4z"
          />
          <path
            ref="t-shadow-25"
            className="t shadow hide"
            d="M639.8,598.8c-3.1-3.2-7.9-5-12.1-2.5s-6.6,7.7-4.7,11.8c-3.9-3.8-4-10.1-0.2-14c3.4-3.5,8.8-4,12.8-1.2C639.4,595.6,639.8,598.8,639.8,598.8z"
          />
          <path
            id="Stamm-25"
            ref="t-stem-25"
            data-seq="25"
            className="t stem hide"
            d="M618.6,594.2l5.8,4.2l1.6,6.2l1-1.4l-0.6-3.3l4,2.8l0.2-1.8l-4.7-3.3l3.3-1.3l-0.6-1.8l-4.1,0.9c0,0-1.6-1.2-4.7-3.3C617.1,589.9,616,592.4,618.6,594.2z"
          />
          <polygon
            ref="p-pot-25"
            className="p pot hide"
            points="628.5,592.9 621,601.6 617.5,595.9 622.2,590.4"
          />
          <path
            ref="p-shadow-25"
            className="p shadow hide"
            d="M624.8,596.3l-3.7,4.3l-2.5-3.8c0,0,2.4,3.2,3,2.7L624.8,596.3z"
          />
          <path
            ref="p-leaf1-25"
            className="p leaf1 hide"
            d="M626.1,598.9c0.9,0.5,1.2,1.6,0.9,2.6C626.2,600.9,625.8,599.9,626.1,598.9z"
          />
          <path
            ref="p-stem-25"
            className="p stem hide"
            d="M624.6,597.4c0.8,1,1.8,2.9,4.7,2.8c-1.9-0.3-3.5-1.5-4.5-3.1L624.6,597.4L624.6,597.4"
          />
          <path
            ref="p-leaf2-25"
            className="p leaf2 hide"
            d="M628.6,600.1c1.3,0.8,2.2,2.1,2.3,3.6C629,602.6,628.3,601.4,628.6,600.1z"
          />
          <path
            ref="p-leaf3-25"
            className="p leaf3 hide"
            d="M628.5,600.2c0.8,2,4.2,2.4,5.4,1.7C633.1,600.8,629.8,599.1,628.5,600.2z"
          />
          <path
            ref="t-crown-26"
            className="t crown hide"
            d="M670.4,545.7c-5.1-2.1-7.5-7.8-5.4-12.9c2.1-5.1,7.8-7.5,12.9-5.4c5,2.1,7.4,7.8,5.4,12.8C681.3,545.3,675.5,547.8,670.4,545.7L670.4,545.7z"
          />
          <path
            ref="t-shadow-26"
            className="t shadow hide"
            d="M682.9,531.9c-3.7-2.4-8.9-3.1-12.3,0.4c-3.4,3.5-4.7,9-1.9,12.6c-4.7-2.8-6.2-8.9-3.4-13.6c2.5-4.2,7.6-5.9,12.1-4.1C681.7,528.8,682.9,531.9,682.9,531.9z"
          />
          <path
            id="Stamm-26"
            ref="t-stem-26"
            data-seq="26"
            className="t stem hide"
            d="M661.2,532.3l6.6,2.7l3,5.7l0.7-1.6l-1.3-3.1l4.5,1.8l-0.2-1.8l-5.3-2.1l3-2l-1-1.6l-3.8,1.8c0,0-1.9-0.8-5.3-2.2S658.2,531.1,661.2,532.3z"
          />
          <polygon
            ref="p-pot-26"
            className="p pot hide"
            points="667.9,527.4 663.2,537.9 658.2,533.4 661.2,526.8"
          />
          <path
            ref="p-shadow-26"
            className="p shadow hide"
            d="M665.4,531.7l-2.3,5.1l-3.5-2.9c0,0,3.3,2.3,3.6,1.7L665.4,531.7z"
          />
          <path
            ref="p-leaf1-26"
            className="p leaf1 hide"
            d="M667.4,533.8c1,0.3,1.7,1.2,1.6,2.2C668,535.7,667.4,534.8,667.4,533.8z"
          />
          <path
            ref="p-stem-26"
            className="p stem hide"
            d="M665.5,532.9c1.1,0.7,2.5,2.3,5.3,1.4c-1.9,0.2-3.8-0.4-5.2-1.7L665.5,532.9L665.5,532.9"
          />
          <path
            ref="p-leaf2-26"
            className="p leaf2 hide"
            d="M670.1,534.3c1.5,0.4,2.7,1.4,3.2,2.8C671.3,536.6,670.1,535.6,670.1,534.3z"
          />
          <path
            ref="p-leaf3-26"
            className="p leaf3 hide"
            d="M670,534.4c1.3,1.6,4.7,1.1,5.7,0C674.6,533.6,670.9,532.9,670,534.4z"
          />
          <path
            ref="t-crown-27"
            className="t crown hide"
            d="M685.3,507c-5.3-1.1-8.7-6.4-7.6-11.7c1.1-5.3,6.4-8.7,11.7-7.6s8.7,6.3,7.6,11.7C696,504.7,690.8,508.2,685.3,507C685.4,507,685.4,507,685.3,507z"
          />
          <path
            ref="t-shadow-27"
            className="t shadow hide"
            d="M695.2,491.2c-4.1-1.7-9.3-1.5-12.1,2.5s-3,9.7,0.4,12.7c-5.1-1.9-7.7-7.6-5.8-12.7c1.7-4.5,6.5-7.2,11.2-6.2C693.5,488.4,695.2,491.2,695.2,491.2z"
          />
          <path
            id="Stamm-27"
            ref="t-stem-27"
            data-seq="27"
            className="t stem hide"
            d="M673.9,495.4l7,1.5l4,5.1l0.4-1.7l-1.8-2.8l4.8,1l-0.5-1.7l-5.6-1.2l2.6-2.5l-1.2-1.4l-3.4,2.4c0,0-2-0.5-5.6-1.2C670.8,492.1,670.8,494.7,673.9,495.4z"
          />
          <polygon
            ref="p-pot-27"
            className="p pot hide"
            points="680.4,489.6 677.4,500.7 671.7,497.1 673.6,490.1"
          />
          <path
            ref="p-shadow-27"
            className="p shadow hide"
            d="M678.5,494.3l-1.5,5.4l-3.9-2.3c0,0,3.6,1.8,3.8,1.1L678.5,494.3z"
          />
          <path
            ref="p-leaf1-27"
            className="p leaf1 hide"
            d="M680.8,496.1c1,0.1,1.8,0.9,1.9,2C681.7,497.9,681,497.1,680.8,496.1z"
          />
          <path
            ref="p-stem-27"
            className="p stem hide"
            d="M678.8,495.4c1.2,0.5,2.9,1.9,5.5,0.5c-1.8,0.5-3.8,0.2-5.4-0.9L678.8,495.4L678.8,495.4"
          />
          <path
            ref="p-leaf2-27"
            className="p leaf2 hide"
            d="M683.6,496.1c1.5,0.1,2.9,1,3.6,2.3C685.1,498.2,683.9,497.4,683.6,496.1z"
          />
          <path
            ref="p-leaf3-27"
            className="p leaf3 hide"
            d="M683.6,496.2c1.6,1.4,4.8,0.4,5.6-0.8C688,494.8,684.2,494.6,683.6,496.2z"
          />
          <path
            ref="t-crown-28"
            className="t crown hide"
            d="M695.6,434.4c-5.5,0.1-10-4.2-10.1-9.6c-0.1-5.5,4.2-10,9.6-10.1c5.4-0.1,9.9,4.1,10.1,9.5C705.5,429.6,701.2,434.2,695.6,434.4C695.7,434.4,695.7,434.4,695.6,434.4z"
          />
          <path
            ref="t-shadow-28"
            className="t shadow hide"
            d="M701.5,416.6c-4.3-0.7-9.4,0.8-11.1,5.3c-1.8,4.6-0.6,10.1,3.4,12.2c-5.4-0.7-9.2-5.6-8.5-11.1c0.6-4.8,4.6-8.4,9.4-8.6C699.2,414.3,701.5,416.6,701.5,416.6z"
          />
          <path
            id="Stamm-28"
            ref="t-stem-28"
            data-seq="28"
            className="t stem hide"
            d="M681.8,425.8l7.2-0.2l5.1,4l-0.1-1.8l-2.4-2.3l4.9-0.2l-0.9-1.6l-5.7,0.2l1.9-3l-1.5-1.1l-2.7,3.2c0,0-2,0-5.7,0.2S678.6,425.9,681.8,425.8z"
          />
          <polygon
            ref="p-pot-28"
            className="p pot hide"
            points="688.2,418.7 688.6,430.2 682.1,428.3 681.9,421.1"
          />
          <path
            ref="p-shadow-28"
            className="p shadow hide"
            d="M687.7,423.7l0.2,5.6l-4.4-1.1c0,0,4,0.7,4,0L687.7,423.7z"
          />
          <path
            ref="p-leaf1-28"
            className="p leaf1 hide"
            d="M690.5,424.7c1-0.2,2,0.3,2.4,1.3C691.9,426.1,691,425.6,690.5,424.7z"
          />
          <path
            ref="p-stem-28"
            className="p stem hide"
            d="M688.4,424.7c1.3,0.2,3.3,1,5.4-1.1c-1.6,1-3.6,1.3-5.4,0.7V424.7L688.4,424.7"
          />
          <path
            ref="p-leaf2-28"
            className="p leaf2 hide"
            d="M693.2,424c1.5-0.3,3,0.1,4.2,1.1C695.2,425.5,693.8,425.1,693.2,424z"
          />
          <path
            ref="p-leaf3-28"
            className="p leaf3 hide"
            d="M693.2,424c1.9,0.9,4.7-1.1,5.1-2.4C696.9,421.4,693.3,422.3,693.2,424z"
          />
          <path
            ref="t-crown-29"
            className="t crown hide"
            d="M688.5,361.5c-5.3,1.4-10.7-1.7-12.1-7s1.7-10.7,7-12.1c5.2-1.4,10.6,1.7,12.1,6.9C696.9,354.6,693.9,360,688.5,361.5C688.6,361.5,688.5,361.5,688.5,361.5z"
          />
          <path
            ref="t-shadow-29"
            className="t shadow hide"
            d="M690.1,342.9c-4.4,0.4-8.9,3-9.6,7.8s1.8,10,6.1,11.1c-5.4,0.6-10.3-3.3-10.9-8.8c-0.5-4.8,2.5-9.3,7.2-10.6C687.3,341.1,690.1,342.9,690.1,342.9z"
          />
          <path
            id="Stamm-29"
            ref="t-stem-29"
            data-seq="29"
            className="t stem hide"
            d="M673,356.4l6.9-1.9l5.8,2.7l-0.5-1.7l-2.9-1.7l4.7-1.3l-1.3-1.3l-5.5,1.5l1.2-3.4l-1.8-0.7l-1.9,3.7c0,0-2,0.5-5.5,1.5S669.9,357.2,673,356.4z"
          />
          <polygon
            ref="p-pot-29"
            className="p pot hide"
            points="676.9,348.3 680.2,359.3 673.5,359.2 671.4,352.2"
          />
          <path
            ref="p-shadow-29"
            className="p shadow hide"
            d="M677.8,353.2l1.6,5.4l-4.5,0.1c0,0,4-0.4,3.8-1.1L677.8,353.2z"
          />
          <path
            ref="p-leaf1-29"
            className="p leaf1 hide"
            d="M680.7,353.5c0.9-0.5,2-0.2,2.6,0.6C682.4,354.5,681.4,354.2,680.7,353.5z"
          />
          <path
            ref="p-stem-29"
            className="p stem hide"
            d="M678.6,354c1.3-0.2,3.4,0.1,4.9-2.5c-1.3,1.4-3.1,2.2-5,2.1L678.6,354L678.6,354"
          />
          <path
            ref="p-leaf2-29"
            className="p leaf2 hide"
            d="M683.1,352.1c1.3-0.7,3-0.7,4.3,0C685.4,353,684,353,683.1,352.1z"
          />
          <path
            ref="p-leaf3-29"
            className="p leaf3 hide"
            d="M683.1,352.1c2.1,0.3,4.2-2.2,4.3-3.7C686,348.6,682.8,350.4,683.1,352.1z"
          />
          <path
            ref="t-crown-30"
            className="t crown hide"
            d="M674.7,319.6c-4.8,2.6-10.8,0.8-13.4-4.1c-2.6-4.8-0.8-10.8,4.1-13.4c4.8-2.6,10.7-0.8,13.3,4C681.4,310.9,679.6,316.9,674.7,319.6C674.8,319.6,674.8,319.6,674.7,319.6z"
          />
          <path
            ref="t-shadow-30"
            className="t shadow hide"
            d="M672,301.1c-4.2,1.3-8,4.9-7.6,9.7c0.5,4.9,4,9.3,8.5,9.4c-5.1,1.8-10.8-0.9-12.6-6c-1.6-4.6,0.3-9.6,4.6-11.9C669,300,672,301.1,672,301.1z"
          />
          <path
            id="Stamm-30"
            ref="t-stem-30"
            data-seq="30"
            className="t stem hide"
            d="M658.5,318.1l6.3-3.4l6.3,1.3l-0.8-1.5l-3.2-1l4.3-2.3l-1.5-1l-5,2.7l0.4-3.6l-1.9-0.3l-1,4.1c0,0-1.8,0.9-5.1,2.7S655.7,319.6,658.5,318.1z"
          />
          <polygon
            ref="p-pot-30"
            className="p pot hide"
            points="661.3,308.7 666.1,319.1 659.4,319.9 656.4,313.3"
          />
          <path
            ref="p-shadow-30"
            className="p shadow hide"
            d="M662.8,313.4l2.3,5.1l-4.5,0.7c0,0,3.9-0.9,3.6-1.6L662.8,313.4z"
          />
          <path
            ref="p-leaf1-30"
            className="p leaf1 hide"
            d="M665.8,313.3c0.8-0.6,2-0.5,2.7,0.3C667.6,314.1,666.6,314,665.8,313.3z"
          />
          <path
            ref="p-stem-30"
            className="p stem hide"
            d="M663.8,314.1c1.3-0.4,3.4-0.4,4.5-3.1c-1.1,1.6-2.8,2.6-4.7,2.7L663.8,314.1L663.8,314.1"
          />
          <path
            ref="p-leaf2-30"
            className="p leaf2 hide"
            d="M668,311.6c1.2-0.9,2.8-1.1,4.3-0.6C670.4,312.2,669,312.4,668,311.6z"
          />
          <path
            ref="p-leaf3-30"
            className="p leaf3 hide"
            d="M668,311.7c2.1,0.1,4-2.8,3.8-4.2C670.4,307.8,667.5,310,668,311.7z"
          />
          <path
            ref="t-crown-31"
            className="t crown hide"
            d="M650.5,286.8c-4.6,3-10.7,1.7-13.7-2.9s-1.7-10.7,2.9-13.7c4.6-3,10.6-1.7,13.6,2.8C656.3,277.6,655.1,283.7,650.5,286.8C650.5,286.7,650.5,286.8,650.5,286.8z"
          />
          <path
            ref="t-shadow-31"
            className="t shadow hide"
            d="M646.2,268.7c-4,1.7-7.6,5.5-6.7,10.4c0.9,4.8,4.8,9,9.3,8.7c-5,2.2-10.8,0-13.1-5c-2-4.4-0.5-9.6,3.5-12.3C643,267.8,646.2,268.7,646.2,268.7z"
          />
          <path
            id="Stamm-31"
            ref="t-stem-31"
            data-seq="31"
            className="t stem hide"
            d="M634.1,286.7l6-4l6.4,0.7l-1-1.5l-3.3-0.7l4.1-2.7l-1.6-0.9l-4.8,3.1l0.1-3.6l-1.9-0.1l-0.7,4.1c0,0-1.7,1.1-4.8,3.1C629.6,286.5,631.5,288.5,634.1,286.7z"
          />
          <polygon
            ref="p-pot-31"
            className="p pot hide"
            points="637.6,276.6 644.4,285.9 638,288 633.7,282.2"
          />
          <path
            ref="p-shadow-31"
            className="p shadow hide"
            d="M640,281l3.3,4.5l-4.3,1.6c0,0,3.6-1.7,3.3-2.3L640,281z"
          />
          <path
            ref="p-leaf1-31"
            className="p leaf1 hide"
            d="M642.9,280.3c0.7-0.7,1.8-0.8,2.7-0.3C644.8,280.6,643.8,280.8,642.9,280.3z"
          />
          <path
            ref="p-stem-31"
            className="p stem hide"
            d="M641.1,281.4c1.2-0.6,3.2-1.1,3.8-4c-0.7,1.8-2.2,3.1-4,3.7L641.1,281.4L641.1,281.4"
          />
          <path
            ref="p-leaf2-31"
            className="p leaf2 hide"
            d="M644.6,278.2c1-1.1,2.6-1.6,4.1-1.4C647.2,278.3,645.8,278.7,644.6,278.2z"
          />
          <path
            ref="p-leaf3-31"
            className="p leaf3 hide"
            d="M644.7,278.2c2.1-0.3,3.3-3.5,2.9-4.9C646.3,273.9,643.9,276.7,644.7,278.2z"
          />
          <path
            ref="t-crown-32"
            className="t crown hide"
            d="M633,254c-3.9,3.8-10.1,3.8-14-0.1s-3.8-10.1,0.1-14c3.9-3.8,10.1-3.8,13.9,0C636.9,243.8,636.9,250.1,633,254C633.1,254,633.1,254,633,254z"
          />
          <path
            ref="t-shadow-32"
            className="t shadow hide"
            d="M625.1,237.1c-3.6,2.5-6.3,7-4.4,11.5c1.8,4.5,6.5,7.8,10.9,6.6c-4.5,3.1-10.6,2.1-13.8-2.4c-2.7-3.9-2.3-9.1,0.9-12.5C621.8,237,625.1,237.1,625.1,237.1z"
          />
          <path
            id="Stamm-32"
            ref="t-stem-32"
            data-seq="32"
            className="t stem hide"
            d="M617.1,257.3l5.1-5.1l6.4-0.6l-1.3-1.2h-3.4l3.5-3.5l-1.7-0.5l-4,4.1L621,247l-1.9,0.2l0.2,4.2c0,0-1.5,1.4-4.1,4.1C612.6,258,614.8,259.6,617.1,257.3z"
          />
          <polygon
            ref="p-pot-32"
            className="p pot hide"
            points="617.9,246.7 625.7,255.2 619.6,258 614.7,252.6"
          />
          <path
            ref="p-shadow-32"
            className="p shadow hide"
            d="M620.9,250.7l3.8,4.1l-4.1,2.1c0,0,3.4-2.1,3-2.6L620.9,250.7z"
          />
          <path
            ref="p-leaf1-32"
            className="p leaf1 hide"
            d="M623.6,249.7c0.6-0.8,1.7-1.1,2.6-0.6C625.6,249.9,624.6,250.1,623.6,249.7z"
          />
          <path
            ref="p-stem-32"
            className="p stem hide"
            d="M622,251.1c1.1-0.7,3.1-1.4,3.4-4.3c-0.5,1.8-1.9,3.3-3.6,4.1L622,251.1L622,251.1"
          />
          <path
            ref="p-leaf2-32"
            className="p leaf2 hide"
            d="M625.1,247.4c0.9-1.2,2.4-1.9,3.9-1.9C627.7,247.2,626.3,247.9,625.1,247.4z"
          />
          <path
            ref="p-leaf3-32"
            className="p leaf3 hide"
            d="M625.2,247.5c2-0.6,2.8-3.9,2.3-5.2C626.3,243,624.2,246.1,625.2,247.5z"
          />
          <path
            ref="t-crown-33"
            className="t crown hide"
            d="M592.1,215.4c-3.3,4.3-9.5,5.1-13.9,1.8c-4.3-3.3-5.1-9.5-1.8-13.9c3.3-4.3,9.5-5.1,13.8-1.9C594.6,204.8,595.4,211,592.1,215.4L592.1,215.4z"
          />
          <path
            ref="t-shadow-33"
            className="t shadow hide"
            d="M582,199.7c-3.3,3-5.3,7.7-2.9,12c2.4,4.3,7.5,6.9,11.6,5.1c-4,3.7-10.3,3.5-14-0.5c-3.2-3.5-3.5-8.7-0.7-12.6C578.7,200,582,199.7,582,199.7z"
          />
          <path
            id="Stamm-33"
            ref="t-stem-33"
            data-seq="33"
            className="t stem hide"
            d="M576.7,220.8l4.3-5.7l6.3-1.4l-1.4-1.1l-3.3,0.4l3-4l-1.8-0.3l-3.5,4.5l-1.1-3.4l-1.8,0.5l0.7,4.2c0,0-1.3,1.6-3.5,4.5S574.7,223.3,576.7,220.8z"
          />
          <polygon
            ref="p-pot-33"
            className="p pot hide"
            points="576.2,210.5 585.4,217.3 579.9,221.2 574.1,216.9"
          />
          <path
            ref="p-shadow-33"
            className="p shadow hide"
            d="M579.8,213.9l4.5,3.4l-3.6,2.8c0,0,3-2.7,2.5-3.1L579.8,213.9z"
          />
          <path
            ref="p-leaf1-33"
            className="p leaf1 hide"
            d="M582.3,212.4c0.5-0.9,1.5-1.3,2.5-1C584.3,212.2,583.3,212.6,582.3,212.4z"
          />
          <path
            ref="p-stem-33"
            className="p stem hide"
            d="M581,214c0.9-0.9,2.8-2,2.5-4.9c-0.2,1.9-1.2,3.6-2.8,4.7L581,214L581,214"
          />
          <path
            ref="p-leaf2-33"
            className="p leaf2 hide"
            d="M583.4,209.9c0.7-1.4,2-2.3,3.5-2.5C585.9,209.2,584.6,210.1,583.4,209.9z"
          />
          <path
            ref="p-leaf3-33"
            className="p leaf3 hide"
            d="M583.4,209.9c1.9-0.9,2.1-4.3,1.3-5.5C583.7,205.3,582.2,208.7,583.4,209.9z"
          />
          <path
            ref="t-crown-34"
            className="t crown hide"
            d="M580.9,204.9c-2.9,4.6-9,6.1-13.6,3.2c-4.6-2.9-6.1-9-3.2-13.6c2.9-4.6,8.9-6,13.5-3.2C582.3,194.1,583.7,200.2,580.9,204.9C580.9,204.8,580.9,204.9,580.9,204.9z"
          />
          <path
            ref="t-shadow-34"
            className="t shadow hide"
            d="M569.3,190.2c-3,3.3-4.5,8.2-1.7,12.2s8.1,6.1,12.1,4c-3.5,4.2-9.8,4.7-13.9,1.1c-3.7-3.2-4.6-8.5-2-12.7C566.1,190.9,569.3,190.2,569.3,190.2z"
          />
          <path
            id="Stamm-34"
            ref="t-stem-34"
            data-seq="34"
            className="t stem hide"
            d="M566.1,211.7l3.8-6.1l6.1-2l-1.5-0.9l-3.3,0.8l2.6-4.2l-1.8-0.1l-3,4.9l-1.5-3.2l-1.8,0.7l1.1,4c0,0-1.1,1.7-3,4.9C561.9,213.5,564.4,214.5,566.1,211.7z"
          />
          <polygon
            ref="p-pot-34"
            className="p pot hide"
            points="564.8,201.3 574.3,207.7 569.1,211.9 563,207.9"
          />
          <path
            ref="p-shadow-34"
            className="p shadow hide"
            d="M568.6,204.6l4.7,3.1l-3.5,3c0,0,2.8-2.8,2.3-3.3L568.6,204.6z"
          />
          <path
            ref="p-leaf1-34"
            className="p leaf1 hide"
            d="M571,202.9c0.4-0.9,1.4-1.4,2.4-1.2C573,202.6,572,203.1,571,202.9z"
          />
          <path
            ref="p-stem-34"
            className="p stem hide"
            d="M569.7,204.7c0.9-1,2.7-2.1,2.2-5c-0.1,1.9-1,3.7-2.5,4.8L569.7,204.7L569.7,204.7"
          />
          <path
            ref="p-leaf2-34"
            className="p leaf2 hide"
            d="M571.9,200.4c0.6-1.4,1.8-2.4,3.3-2.7C574.4,199.6,573.2,200.5,571.9,200.4z"
          />
          <path
            ref="p-leaf3-34"
            className="p leaf3 hide"
            d="M572,200.4c1.8-1,1.9-4.4,1-5.6C572,195.8,570.7,199.3,572,200.4z"
          />
        </g>
        <g ref="Baum_Mittel">
          <path
            ref="t-crown-35"
            className="t crown hide"
            d="M463.2,151.6c-0.5,7.2-6.8,12.7-14,12.2s-12.7-6.8-12.2-14s6.8-12.7,14-12.2l0,0C458.3,138.1,463.7,144.4,463.2,151.6z"
          />
          <path
            ref="t-shadow-35"
            className="t shadow hide"
            d="M440.7,141.6c-1.5,5.6-0.2,12.4,5.6,15.4s13.3,2.1,16.6-2.8c-2,7-9.2,11-16.2,9.1c-5.7-1.6-9.6-6.9-9.6-12.8C437.3,144.3,440.7,141.6,440.7,141.6z"
          />
          <path
            id="Stamm-35"
            ref="t-stem-35"
            data-seq="35"
            className="t stem hide"
            d="M450.1,168.7l0.7-9.5l5.9-6.1l-2.3-0.2l-3.3,2.9l0.4-6.5l-2.2,1l-0.5,7.5L445,155l-1.7,1.9l3.8,4c0,0-0.2,2.7-0.5,7.6C446.3,173.4,449.8,173,450.1,168.7z"
          />
          <polygon
            ref="p-pot-35"
            className="p pot hide"
            points="441.1,159 457.1,160.4 453.5,169 443.3,168.2"
          />
          <path
            ref="p-shadow-35"
            className="p shadow hide"
            d="M447.9,160.4l7.8,0.7l-2.2,5.9c0,0,1.6-5.3,0.6-5.5L447.9,160.4z"
          />
          <path
            ref="p-leaf1-35"
            className="p leaf1 hide"
            d="M449.8,156.8c0.1-1.3,0.5-2.7,2.2-3.1C452,155.1,451.1,156.3,449.8,156.8z"
          />
          <path
            ref="p-stem-35"
            className="p stem hide"
            d="M449.4,159.7c0.4-1.8,1.8-4.4-0.6-7.6c1.2,2.4,1.2,5.2,0.1,7.6H449.4L449.4,159.7"
          />
          <path
            ref="p-leaf2-35"
            className="p leaf2 hide"
            d="M449.2,153c-0.2-2.1,0.6-4.2,2.2-5.6C451.6,150.4,450.8,152.4,449.2,153z"
          />
          <path
            ref="p-leaf3-35"
            className="p leaf3 hide"
            d="M449.3,153c1.5-2.5-0.7-6.7-2.5-7.5C446.2,147.3,446.9,152.5,449.3,153z"
          />
          <path
            ref="t-crown-36"
            className="t crown hide"
            d="M413.6,150.3c1,7.8-4.5,14.9-12.2,15.9c-7.8,1-14.9-4.5-15.9-12.2c-1-7.8,4.5-14.9,12.2-15.9l0,0C405.5,137.1,412.6,142.5,413.6,150.3L413.6,150.3z"
          />
          <path
            ref="t-shadow-36"
            className="t shadow hide"
            d="M387.6,144.4c-0.3,6.2,2.4,13.2,9.1,15.1s14.5-0.5,16.9-6.5c-0.5,7.8-7.2,13.7-15,13.2c-6.5-0.4-11.9-5.3-13-11.7C384.6,148.1,387.6,144.4,387.6,144.4z"
          />
          <path
            id="Stamm-36"
            ref="t-stem-36"
            data-seq="36"
            className="t stem hide"
            d="M403.3,171.2l-1.3-10.1l4.9-7.7l-2.5,0.3l-3,3.8l-0.9-6.9l-2.1,1.5l1,8.1l-4.6-2.3l-1.4,2.3l4.9,3.4c0,0,0.3,2.9,1,8.1C400.2,177,403.9,175.8,403.3,171.2z"
          />
          <polygon
            ref="p-pot-36"
            className="p pot hide"
            points="392.8,160.7 408.7,159.2 406.7,168.3 396.6,169.3"
          />
          <path
            ref="p-shadow-36"
            className="p shadow hide"
            d="M399.7,160.9l7.8-0.8l-1.1,6.2c0,0,0.6-5.5-0.4-5.5L399.7,160.9z"
          />
          <path
            ref="p-leaf1-36"
            className="p leaf1 hide"
            d="M401,156.9c-0.1-1.3,0-2.7,1.6-3.4C402.8,154.9,402.1,156.2,401,156.9z"
          />
          <path
            ref="p-stem-36"
            className="p stem hide"
            d="M401.1,159.9c0.1-1.8,1-4.6-2-7.4c1.6,2.1,2.1,4.9,1.5,7.4H401.1L401.1,159.9"
          />
          <path
            ref="p-leaf2-36"
            className="p leaf2 hide"
            d="M399.7,153.3c-0.6-2.1-0.2-4.3,1.2-5.9C401.6,150.4,401.1,152.4,399.7,153.3z"
          />
          <path
            ref="p-leaf3-36"
            className="p leaf3 hide"
            d="M399.8,153.3c1-2.7-1.9-6.4-3.8-6.9C395.7,148.3,397.4,153.2,399.8,153.3z"
          />
          <path
            ref="t-crown-37"
            className="t crown hide"
            d="M366.4,155.5c1.8,6.9-2.3,14-9.2,15.8s-14-2.3-15.8-9.2s2.3-14,9.2-15.8C357.5,144.4,364.6,148.5,366.4,155.5L366.4,155.5z"
          />
          <path
            ref="t-shadow-37"
            className="t shadow hide"
            d="M342.2,153.2c0.4,5.7,3.7,11.7,10,12.6c6.3,0.9,13.1-2.2,14.6-7.9c0.4,7.1-5,13.3-12.1,13.7c-5.9,0.4-11.3-3.4-13.1-9C339.8,156.9,342.2,153.2,342.2,153.2z"
          />
          <path
            id="Stamm-37"
            ref="t-stem-37"
            data-seq="37"
            className="t stem hide"
            d="M359.6,175.6l-2.4-9l3.6-7.6l-2.2,0.6l-2.2,3.8l-1.6-6.2l-1.7,1.6l1.9,7.2l-4.4-1.5l-1,2.3l4.8,2.5c0,0,0.6,2.6,1.9,7.2S360.6,179.7,359.6,175.6z"
          />
          <polygon
            ref="p-pot-37"
            className="p pot hide"
            points="348.8,169.7 364.2,165.6 363.8,174.9 354,177.5"
          />
          <path
            ref="p-shadow-37"
            className="p shadow hide"
            d="M355.6,168.7l7.6-2l-0.1,6.3c0,0-0.3-5.6-1.3-5.4L355.6,168.7z"
          />
          <path
            ref="p-leaf1-37"
            className="p leaf1 hide"
            d="M356.2,164.6c-0.3-1.3-0.5-2.7,1-3.6C357.6,162.3,357.2,163.7,356.2,164.6z"
          />
          <path
            ref="p-stem-37"
            className="p stem hide"
            d="M356.9,167.6c-0.2-1.8,0.3-4.7-3.2-7c1.9,1.9,2.9,4.5,2.7,7.1L356.9,167.6L356.9,167.6"
          />
          <path
            ref="p-leaf2-37"
            className="p leaf2 hide"
            d="M354.4,161.3c-0.9-1.9-0.8-4.2,0.2-6C355.9,158,355.6,160.1,354.4,161.3z"
          />
          <path
            ref="p-leaf3-37"
            className="p leaf3 hide"
            d="M354.5,161.3c0.6-2.9-2.9-6-4.9-6.2C349.6,156.9,352.1,161.5,354.5,161.3z"
          />
          <path
            ref="t-crown-38"
            className="t crown hide"
            d="M284.4,187.7c4.5,6.2,3.1,14.9-3.1,19.4s-14.9,3.1-19.4-3.1c-4.5-6.2-3.1-14.9,3.1-19.4C271.1,180.1,279.8,181.4,284.4,187.7L284.4,187.7z"
          />
          <path
            ref="t-shadow-38"
            className="t shadow hide"
            d="M259.2,194.9c2.6,5.6,8.3,10.2,15,8.7s12.3-7.3,11.5-13.6c3.3,7,0.2,15.2-6.7,18.5c-5.8,2.7-12.8,1.1-16.8-4C258.3,199.4,259.2,194.9,259.2,194.9z"
          />
          <path
            id="Stamm-38"
            ref="t-stem-38"
            data-seq="38"
            className="t stem hide"
            d="M285.4,210.5l-5.9-8.1l0.6-9l-2,1.5l-0.7,4.6l-4.1-5.6l-1.1,2.3l4.7,6.5l-5,0.2l-0.1,2.7l5.8,0.6c0,0,1.6,2.3,4.7,6.5S288,214.2,285.4,210.5z"
          />
          <polygon
            ref="p-pot-38"
            className="p pot hide"
            points="271.7,207.7 284.9,198.7 287.6,207.6 279.2,213.4"
          />
          <path
            ref="p-shadow-38"
            className="p shadow hide"
            d="M277.8,204.5l6.5-4.4l2,6c0,0-2.2-5.1-3-4.6L277.8,204.5z"
          />
          <path
            ref="p-leaf1-38"
            className="p leaf1 hide"
            d="M277,200.4c-0.7-1.1-1.3-2.3-0.3-3.8C277.6,197.8,277.7,199.3,277,200.4z"
          />
          <path
            ref="p-stem-38"
            className="p stem hide"
            d="M278.5,203c-0.8-1.6-1.3-4.6-5.3-5.5c2.4,1.1,4.2,3.2,4.9,5.8L278.5,203L278.5,203"
          />
          <path
            ref="p-leaf2-38"
            className="p leaf2 hide"
            d="M274.1,197.9c-1.5-1.5-2.2-3.6-1.8-5.7C274.4,194.4,274.9,196.4,274.1,197.9z"
          />
          <path
            ref="p-leaf3-38"
            className="p leaf3 hide"
            d="M274.2,197.9c-0.4-2.9-4.8-4.7-6.7-4.2C268.2,195.4,272,199,274.2,197.9z"
          />
          <path
            ref="t-crown-39"
            className="t crown hide"
            d="M166.6,322.2c7.2,2.8,10.7,10.8,8,18s-10.8,10.7-18,8c-7.2-2.8-10.7-10.8-8-18C151.4,323,159.4,319.4,166.6,322.2L166.6,322.2z"
          />
          <path
            ref="t-shadow-39"
            className="t shadow hide"
            d="M149.4,341.9c5.2,3.2,12.5,4.1,17.3-0.8s6.3-12.8,2.3-17.7c6.5,4.1,8.5,12.6,4.5,19.2c-3.4,5.5-10.2,7.9-16.4,5.8C151.1,346.2,149.4,341.9,149.4,341.9z"
          />
          <path
            id="Stamm-39"
            ref="t-stem-39"
            data-seq="39"
            className="t stem hide"
            d="M179.8,340.8l-9.4-3.6l-4.4-7.9l-0.9,2.3l1.9,4.3l-6.4-2.5l0.3,2.6l7.5,2.9l-4.1,2.9l1.4,2.3l5.3-2.6c0,0,2.6,1.1,7.5,2.9C183.3,346.2,184,342.4,179.8,340.8z"
          />
          <polygon
            ref="p-pot-39"
            className="p pot hide"
            points="170.8,346.7 175.8,331.5 183.4,337 180.2,346.6"
          />
          <path
            ref="p-shadow-39"
            className="p shadow hide"
            d="M173.7,340.4l2.5-7.5l5.3,3.5c0,0-4.8-2.7-5.2-1.8L173.7,340.4z"
          />
          <path
            ref="p-leaf1-39"
            className="p leaf1 hide"
            d="M170.6,337.7c-1.3-0.4-2.5-1-2.5-2.8C169.5,335.2,170.5,336.3,170.6,337.7z"
          />
          <path
            ref="p-stem-39"
            className="p stem hide"
            d="M173.4,338.8c-1.6-0.8-3.8-2.8-7.6-1.1c2.6-0.6,5.3,0,7.4,1.6L173.4,338.8L173.4,338.8"
          />
          <path
            ref="p-leaf2-39"
            className="p leaf2 hide"
            d="M166.8,337.4c-2.1-0.3-4-1.6-4.9-3.5C164.8,334.5,166.5,335.7,166.8,337.4z"
          />
          <path
            ref="p-leaf3-39"
            className="p leaf3 hide"
            d="M166.9,337.4c-2.1-2.1-6.6-0.8-7.9,0.7C160.6,339,165.8,339.5,166.9,337.4z"
          />
          <path
            ref="t-crown-40"
            className="t crown hide"
            d="M146.2,438.1c7.7-0.2,14.1,5.9,14.2,13.6c0.2,7.7-5.9,14.1-13.6,14.2c-7.7,0.2-14-5.9-14.2-13.6C132.4,444.7,138.5,438.3,146.2,438.1L146.2,438.1z"
          />
          <path
            ref="t-shadow-40"
            className="t shadow hide"
            d="M137.8,462.9c6.1,1,13.1-1,15.7-7.4c2.5-6.4,1-14.2-4.6-17.2c7.6,1.3,12.7,8.5,11.4,16.1c-1.1,6.4-6.4,11.1-12.8,11.5C141,466.3,137.8,462.9,137.8,462.9z"
          />
          <path
            id="Stamm-40"
            ref="t-stem-40"
            data-seq="40"
            className="t stem hide"
            d="M174.4,450.2l-18.8,0.4l-7.1-5.7l0.1,2.5l3.4,3.2l-6.9,0.2l1.3,2.2l8-0.2l-2.7,4.2l2.2,1.6l3.9-4.4c0,0,12-0.2,17.2-0.4C180,453.6,178.9,450.1,174.4,450.2z"
          />
          <polygon
            ref="p-pot-40"
            className="p pot hide"
            points="160.9,459.7 159.6,443.8 168.8,445.9 169.5,456"
          />
          <path
            ref="p-shadow-40"
            className="p shadow hide"
            d="M161.2,452.8l-0.8-7.8l6.2,1.2c0,0-5.5-0.6-5.5,0.3v6.3H161.2z"
          />
          <path
            ref="p-leaf1-40"
            className="p leaf1 hide"
            d="M157.3,451.5c-1.3,0.1-2.7,0-3.4-1.6C155.3,449.7,156.5,450.3,157.3,451.5z"
          />
          <path
            ref="p-stem-40"
            className="p stem hide"
            d="M160.3,451.4c-1.8-0.1-4.6-1.1-7.4,1.9c2.2-1.6,4.9-2.1,7.5-1.4L160.3,451.4L160.3,451.4"
          />
          <path
            ref="p-leaf2-40"
            className="p leaf2 hide"
            d="M153.6,452.8c-2,0.6-4.2,0.1-5.9-1.3C150.6,450.8,152.8,451.3,153.6,452.8z"
          />
          <path
            ref="p-leaf3-40"
            className="p leaf3 hide"
            d="M153.6,452.7c-2.7-1.1-6.4,1.8-7,3.8C148.5,456.6,153.5,455.1,153.6,452.7z"
          />
          <path
            ref="t-crown-41"
            className="t crown hide"
            d="M158.3,509.1c7.3-2.4,15.2,1.5,17.6,8.8c2.4,7.3-1.5,15.2-8.8,17.6c-7.3,2.4-15.2-1.5-17.6-8.8C147,519.4,151,511.6,158.3,509.1L158.3,509.1z"
          />
          <path
            ref="t-shadow-41"
            className="t shadow hide"
            d="M157.5,535.3c6.1-0.8,12.3-4.8,12.8-11.6c0.6-6.9-3.2-13.9-9.5-15.1c7.6-1,14.6,4.4,15.6,12c0.8,6.4-2.8,12.5-8.8,14.8C161.5,537.6,157.5,535.3,157.5,535.3z"
          />
          <path
            id="Stamm-41"
            ref="t-stem-41"
            data-seq="41"
            className="t stem hide"
            d="M188.6,512.4l-17.9,5.9l-8.4-3.3l0.8,2.4l4.2,2.1l-6.5,2.2l1.9,1.7l7.6-2.5l-1.4,4.8l2.5,0.9l2.4-5.4c0,0,11.4-3.7,16.3-5.4C195.1,514.2,193,511,188.6,512.4z"
          />
          <polygon
            ref="p-pot-41"
            className="p pot hide"
            points="178.2,525.2 172.6,510.2 182,509.8 185.5,519.3"
          />
          <path
            ref="p-shadow-41"
            className="p shadow hide"
            d="M176.6,518.5l-2.7-7.4l6.3-0.5c0,0-5.5,0.8-5.2,1.8L176.6,518.5z"
          />
          <path
            ref="p-leaf1-41"
            className="p leaf1 hide"
            d="M172.4,518.3c-1.3,0.4-2.6,0.7-3.7-0.7C170,517,171.5,517.3,172.4,518.3z"
          />
          <path
            ref="p-stem-41"
            className="p stem hide"
            d="M175.3,517.4c-1.8,0.4-4.8,0.2-6.7,3.8c1.7-2.1,4.2-3.3,6.8-3.3L175.3,517.4L175.3,517.4"
          />
          <path
            ref="p-leaf2-41"
            className="p leaf2 hide"
            d="M169.3,520.4c-1.8,1.1-4.1,1.2-6,0.3C165.9,519.3,168,519.3,169.3,520.4z"
          />
          <path
            ref="p-leaf3-41"
            className="p leaf3 hide"
            d="M169.3,520.4c-2.9-0.3-5.7,3.5-5.7,5.5C165.4,525.5,169.8,522.7,169.3,520.4z"
          />
          <path
            ref="t-crown-42"
            className="t crown hide"
            d="M192.6,578.2c5.9-5,14.6-4.2,19.6,1.6c5,5.9,4.2,14.6-1.6,19.6c-5.9,5-14.6,4.2-19.6-1.6S186.7,583.2,192.6,578.2L192.6,578.2z"
          />
          <path
            ref="t-shadow-42"
            className="t shadow hide"
            d="M201.6,602.8c5.3-3.1,9.6-9,7.6-15.6s-8.2-11.7-14.4-10.5c6.7-3.8,15.2-1.4,18.9,5.3c3.2,5.6,2,12.7-2.7,17C206.3,603.4,201.6,602.8,201.6,602.8z"
          />
          <path
            id="Stamm-42"
            ref="t-stem-42"
            data-seq="42"
            className="t stem hide"
            d="M222,569.9L207.6,582l-9,0.1l1.6,1.9l4.7,0.4l-5.3,4.5l2.4,0.9l6.1-5.2l0.5,4.9l2.7-0.1l0.2-5.9c0,0,9.2-7.7,13.1-11.1S225.5,567,222,569.9z"
          />
          <polygon
            ref="p-pot-42"
            className="p pot hide"
            points="215.3,588.6 205.7,575.7 214.5,572.7 220.6,580.8"
          />
          <path
            ref="p-shadow-42"
            className="p shadow hide"
            d="M211.8,582.5l-4.7-6.3l5.9-2.3c0,0-4.9,2.4-4.5,3.2L211.8,582.5z"
          />
          <path
            ref="p-leaf1-42"
            className="p leaf1 hide"
            d="M207.8,583.6c-1.1,0.8-2.3,1.5-3.7,0.4C205.1,583.1,206.6,582.9,207.8,583.6z"
          />
          <path
            ref="p-stem-42"
            className="p stem hide"
            d="M210.3,581.9c-1.6,0.9-4.5,1.5-5.3,5.5c1-2.5,3.1-4.3,5.6-5.1L210.3,581.9L210.3,581.9"
          />
          <path
            ref="p-leaf2-42"
            className="p leaf2 hide"
            d="M205.4,586.5c-1.4,1.6-3.5,2.3-5.6,2C201.8,586.4,203.8,585.8,205.4,586.5z"
          />
          <path
            ref="p-leaf3-42"
            className="p leaf3 hide"
            d="M205.3,586.4c-2.9,0.5-4.5,4.9-3.9,6.8C203.1,592.5,206.5,588.5,205.3,586.4z"
          />
          <path
            ref="t-crown-43"
            className="t crown hide"
            d="M218.6,616.4c4.7-6.1,13.4-7.3,19.5-2.7c6.1,4.7,7.3,13.4,2.7,19.5c-4.7,6.1-13.4,7.3-19.5,2.7C215.2,631.3,214,622.6,218.6,616.4L218.6,616.4z"
          />
          <path
            ref="t-shadow-43"
            className="t shadow hide"
            d="M232.8,638.4c4.6-4.1,7.4-10.9,4-16.8s-10.5-9.6-16.3-7.1c5.7-5.1,14.5-4.6,19.6,1.1c4.3,4.8,4.7,11.9,1,17.2C237.4,638,232.8,638.4,232.8,638.4z"
          />
          <path
            id="Stamm-43"
            ref="t-stem-43"
            data-seq="43"
            className="t stem hide"
            d="M245.6,601.9c-2.7,3.6-11.4,15-11.4,15l-8.8,2l2,1.5l4.7-0.6l-4.2,5.5l2.5,0.4l4.9-6.4l1.6,4.8l2.6-0.7l-1.1-5.8c0,0,7.3-9.5,10.4-13.7S248.3,598.4,245.6,601.9z"
          />
          <polygon
            ref="p-pot-43"
            className="p pot hide"
            points="243.6,619.8 232.1,608.5 240.4,604.2 247.6,611.2"
          />
          <path
            ref="p-shadow-43"
            className="p shadow hide"
            d="M239.1,614.4l-5.6-5.5l5.5-3.2c0,0-4.6,3.1-4,3.9L239.1,614.4z"
          />
          <path
            ref="p-leaf1-43"
            className="p leaf1 hide"
            d="M235.4,616c-1,1-2,1.8-3.6,1C232.6,616,234.1,615.5,235.4,616z"
          />
          <path
            ref="p-stem-43"
            className="p stem hide"
            d="M237.6,614c-1.5,1.1-4.2,2.2-4.3,6.3c0.6-2.6,2.3-4.7,4.7-5.9L237.6,614L237.6,614"
          />
          <path
            ref="p-leaf2-43"
            className="p leaf2 hide"
            d="M233.4,619.2c-1.2,1.8-3.1,2.9-5.3,2.9C229.9,619.8,231.8,618.8,233.4,619.2z"
          />
          <path
            ref="p-leaf3-43"
            className="p leaf3 hide"
            d="M233.4,619.2c-2.7,1-3.7,5.6-2.8,7.4C232.1,625.5,234.9,621.2,233.4,619.2z"
          />
          <path
            ref="t-crown-44"
            className="t crown hide"
            d="M290.4,671.3c2.7-7.2,10.7-10.9,17.9-8.2s10.9,10.7,8.2,17.9c-2.7,7.2-10.7,10.9-17.9,8.2C291.5,686.5,287.8,678.5,290.4,671.3L290.4,671.3z"
          />
          <path
            ref="t-shadow-44"
            className="t shadow hide"
            d="M310.3,688.2c3.2-5.3,4-12.6-1.1-17.3c-5-4.7-12.8-6.1-17.7-2c4-6.6,12.6-8.7,19.1-4.7c5.5,3.3,8,10,6,16.1C314.7,686.5,310.3,688.2,310.3,688.2z"
          />
          <path
            id="Stamm-44"
            ref="t-stem-44"
            data-seq="44"
            className="t stem hide"
            d="M311.9,649.6c-1.6,4.2-6.5,17.6-6.5,17.6l-7.8,4.5l2.3,0.9l4.3-2l-2.4,6.5l2.5-0.4l2.8-7.5l3,4.1l2.3-1.4l-2.7-5.2c0,0,4.2-11.2,5.9-16.1C317.3,645.6,313.5,645.4,311.9,649.6z"
          />
          <polygon
            ref="p-pot-44"
            className="p pot hide"
            points="315.5,667.6 301,660.7 307.5,653.9 316.6,658.2"
          />
          <path
            ref="p-shadow-44"
            className="p shadow hide"
            d="M309.6,663.9l-7.1-3.4l4.2-4.8c0,0-3.3,4.4-2.5,4.9L309.6,663.9z"
          />
          <path
            ref="p-leaf1-44"
            className="p leaf1 hide"
            d="M306.5,666.6c-0.6,1.2-1.4,2.3-3.1,2.1C303.9,667.4,305.2,666.6,306.5,666.6z"
          />
          <path
            ref="p-stem-44"
            className="p stem hide"
            d="M308,664c-1,1.5-3.3,3.4-2.1,7.4c-0.3-2.6,0.7-5.3,2.5-7.2L308,664L308,664"
          />
          <path
            ref="p-leaf2-44"
            className="p leaf2 hide"
            d="M305.8,670.3c-0.5,2.1-2.1,3.7-4.1,4.4C302.6,671.9,304.1,670.4,305.8,670.3z"
          />
          <path
            ref="p-leaf3-44"
            className="p leaf3 hide"
            d="M305.7,670.3c-2.3,1.8-1.7,6.5-0.3,7.9C306.6,676.7,307.7,671.6,305.7,670.3z"
          />
          <path
            ref="t-crown-45"
            className="t crown hide"
            d="M439.9,701.2c-0.7-7.7,4.9-14.4,12.5-15.2c7.7-0.7,14.4,4.9,15.2,12.5c0.7,7.7-4.9,14.4-12.5,15.2l0,0C447.4,714.4,440.6,708.8,439.9,701.2z"
          />
          <path
            ref="t-shadow-45"
            className="t shadow hide"
            d="M465.2,707.8c0.6-6.1-1.9-13-8.4-15.1c-6.6-2.1-14.3,0-16.9,5.8c0.7-7.7,7.4-13.3,15.1-12.6c6.5,0.6,11.8,5.7,12.6,12.2C468.3,704.4,465.2,707.8,465.2,707.8z"
          />
          <path
            id="Stamm-45"
            ref="t-stem-45"
            data-seq="45"
            className="t stem hide"
            d="M450,672.3c0.4,4.5,1.7,18.8,1.7,18.8l-5.1,7.4l2.5-0.2l3-3.6l0.6,6.9l2.1-1.4l-0.7-8l4.4,2.4l1.4-2.3l-4.7-3.5c0,0-1.1-11.9-1.6-17.1C453.1,666.4,449.5,667.8,450,672.3z"
          />
          <polygon
            ref="p-pot-45"
            className="p pot hide"
            points="461,688.9 445.1,690.3 447.1,681.2 457.2,680.3"
          />
          <path
            ref="p-shadow-45"
            className="p shadow hide"
            d="M454.1,688.7l-7.8,0.7l1.2-6.2c0,0-0.6,5.5,0.4,5.5H454.1L454.1,688.7z"
          />
          <path
            ref="p-leaf1-45"
            className="p leaf1 hide"
            d="M452.8,692.6c0.1,1.3,0,2.7-1.6,3.4C451,694.7,451.6,693.3,452.8,692.6z"
          />
          <path
            ref="p-stem-45"
            className="p stem hide"
            d="M452.7,689.6c-0.1,1.8-1,4.6,2,7.4c-1.6-2.1-2.1-4.9-1.5-7.5L452.7,689.6L452.7,689.6"
          />
          <path
            ref="p-leaf2-45"
            className="p leaf2 hide"
            d="M454.1,696.2c0.6,2,0.1,4.2-1.2,5.9C452.2,699.2,452.6,697.2,454.1,696.2z"
          />
          <path
            ref="p-leaf3-45"
            className="p leaf3 hide"
            d="M454,696.2c-1.1,2.7,1.9,6.4,3.8,6.9C458,701.3,456.5,696.3,454,696.2z"
          />
          <path
            ref="t-crown-46"
            className="t crown hide"
            d="M485.7,697.1c-2.4-7.3,1.6-15.2,8.9-17.6c7.3-2.4,15.2,1.6,17.6,8.9c2.4,7.3-1.6,15.1-8.9,17.5C496,708.4,488.1,704.4,485.7,697.1L485.7,697.1z"
          />
          <path
            ref="t-shadow-46"
            className="t shadow hide"
            d="M511.9,697.9c-0.8-6.1-4.7-12.3-11.6-12.8c-6.9-0.6-13.9,3.2-15.1,9.4c-1-7.6,4.4-14.6,12-15.6c6.4-0.8,12.5,2.9,14.8,8.9C514.2,693.9,511.9,697.9,511.9,697.9z"
          />
          <path
            id="Stamm-46"
            ref="t-stem-46"
            data-seq="46"
            className="t stem hide"
            d="M489.1,666.7c1.4,4.3,5.9,17.9,5.9,17.9l-3.4,8.4l2.4-0.8l2.1-4.2l2.2,6.5l1.7-1.9l-2.5-7.6l4.8,1.4l0.9-2.5l-5.4-2.4c0,0-3.7-11.4-5.4-16.3C490.8,660.3,487.6,662.4,489.1,666.7z"
          />
          <polygon
            ref="p-pot-46"
            className="p pot hide"
            points="503.3,679.6 487.9,683.9 488.3,674.5 498.1,671.8"
          />
          <path
            ref="p-shadow-46"
            className="p shadow hide"
            d="M496.4,680.7l-7.6,2.1v-6.3c0,0,0.4,5.5,1.3,5.4L496.4,680.7z"
          />
          <path
            ref="p-leaf1-46"
            className="p leaf1 hide"
            d="M495.9,684.8c0.3,1.3,0.5,2.6-1,3.6C494.5,687.1,494.8,685.7,495.9,684.8z"
          />
          <path
            ref="p-stem-46"
            className="p stem hide"
            d="M495.3,681.8c0.2,1.8-0.2,4.7,3.2,6.9c-1.9-1.8-2.9-4.4-2.7-7.1L495.3,681.8L495.3,681.8"
          />
          <path
            ref="p-leaf2-46"
            className="p leaf2 hide"
            d="M497.8,688.1c0.9,1.9,0.9,4.2-0.2,6C496.4,691.3,496.5,689.3,497.8,688.1z"
          />
          <path
            ref="p-leaf3-46"
            className="p leaf3 hide"
            d="M497.7,688.1c-0.6,2.9,3,6,4.9,6.2C502.5,692.4,500.1,687.8,497.7,688.1z"
          />
          <path
            ref="t-crown-47"
            className="t crown hide"
            d="M569.3,663.7c-4.8-6-3.8-14.8,2.2-19.6s14.8-3.8,19.6,2.2s3.8,14.7-2.2,19.6C582.8,670.7,574.1,669.8,569.3,663.7C569.3,663.8,569.3,663.7,569.3,663.7z"
          />
          <path
            ref="t-shadow-47"
            className="t shadow hide"
            d="M594,655.4c-2.9-5.4-8.7-9.9-15.4-8c-6.6,1.9-11.9,7.9-10.9,14.1c-3.6-6.8-1-15.2,5.9-18.8c5.7-3,12.7-1.7,16.9,3.2C594.8,650.8,594,655.4,594,655.4z"
          />
          <path
            id="Stamm-47"
            ref="t-stem-47"
            data-seq="47"
            className="t stem hide"
            d="M561.8,634.1c2.8,3.5,11.8,14.7,11.8,14.7l-0.2,9l2-1.6l0.5-4.7l4.3,5.4l1-2.4l-5.1-6.3l5-0.4v-2.7l-5.9-0.4c0,0-7.5-9.4-10.7-13.4S558.9,630.6,561.8,634.1z"
          />
          <polygon
            ref="p-pot-47"
            className="p pot hide"
            points="580.2,641.4 566.9,650.4 564.2,641.4 572.7,635.7"
          />
          <path
            ref="p-shadow-47"
            className="p shadow hide"
            d="M574,644.6l-6.5,4.4l-2-6c0,0,2.1,5.1,3,4.7L574,644.6z"
          />
          <path
            ref="p-leaf1-47"
            className="p leaf1 hide"
            d="M574.8,648.6c0.7,1.1,1.3,2.4,0.2,3.8C574.2,651.3,574.1,649.8,574.8,648.6z"
          />
          <path
            ref="p-stem-47"
            className="p stem hide"
            d="M573.2,646c0.8,1.7,1.3,4.6,5.3,5.5c-2.4-1.1-4.2-3.3-4.9-5.8L573.2,646L573.2,646"
          />
          <path
            ref="p-leaf2-47"
            className="p leaf2 hide"
            d="M577.6,651.2c1.5,1.5,2.1,3.7,1.7,5.7C577.4,654.7,576.8,652.7,577.6,651.2z"
          />
          <path
            ref="p-leaf3-47"
            className="p leaf3 hide"
            d="M577.5,651.2c0.4,2.9,4.7,4.7,6.7,4.2C583.5,653.7,579.7,650.2,577.5,651.2z"
          />
          <path
            ref="t-crown-48"
            className="t crown hide"
            d="M695.3,485.1c-7.6-1.1-12.8-8.2-11.7-15.8c1.1-7.6,8.2-12.8,15.8-11.7c7.6,1.1,12.8,8.2,11.7,15.8l0,0C710,481,702.9,486.2,695.3,485.1z"
          />
          <path
            ref="t-shadow-48"
            className="t shadow hide"
            d="M707.9,462.1c-5.8-2-13.1-1.3-16.7,4.5s-3.4,13.8,1.5,17.8c-7.2-2.6-11-10.6-8.4-17.8c2.2-6,8.2-9.8,14.6-9.1C705.3,458.2,707.9,462.1,707.9,462.1z"
          />
          <path
            id="Stamm-48"
            ref="t-stem-48"
            data-seq="48"
            className="t stem hide"
            d="M669.7,468.3l18.6,2.9l5.9,6.8l0.4-2.4l-2.8-3.8l6.8,1l-0.9-2.4l-7.9-1.2l3.4-3.7l-1.8-2l-4.6,3.7c0,0-11.9-1.8-17-2.6S665.2,467.6,669.7,468.3z"
          />
          <polygon
            ref="p-pot-48"
            className="p pot hide"
            points="688.4,461.5 685.8,477.4 677.4,473.1 679.1,463.1"
          />
          <path
            ref="p-shadow-48"
            className="p shadow hide"
            d="M686.4,468.2l-1.3,7.7l-5.7-2.7c0,0,5.2,2,5.4,1L686.4,468.2z"
          />
          <path
            ref="p-leaf1-48"
            className="p leaf1 hide"
            d="M689.9,470.4c1.3,0.2,2.6,0.7,2.9,2.4C691.5,472.7,690.3,471.7,689.9,470.4z"
          />
          <path
            ref="p-stem-48"
            className="p stem hide"
            d="M687,469.7c1.7,0.6,4.2,2.2,7.7,0c-2.5,1-5.2,0.8-7.6-0.5L687,469.7L687,469.7"
          />
          <path
            ref="p-leaf2-48"
            className="p leaf2 hide"
            d="M693.7,470.1c2.1,0,4.1,1,5.4,2.7C696.1,472.7,694.3,471.8,693.7,470.1z"
          />
          <path
            ref="p-leaf3-48"
            className="p leaf3 hide"
            d="M693.7,470.2c2.4,1.7,6.7-0.2,7.7-2C699.6,467.6,694.4,467.9,693.7,470.2z"
          />
          <path
            ref="t-crown-49"
            className="t crown hide"
            d="M698.3,391.4c-7.4,2-15-2.4-17-9.9c-2-7.4,2.4-15,9.9-17s15,2.4,17,9.9l0,0C710.1,381.8,705.7,389.4,698.3,391.4z"
          />
          <path
            ref="t-shadow-49"
            className="t shadow hide"
            d="M700.7,365.3c-6.1,0.4-12.6,4-13.5,10.8c-1,6.8,2.4,14.1,8.5,15.7c-7.7,0.5-14.3-5.3-14.8-13c-0.4-6.4,3.6-12.3,9.8-14.2C696.8,362.8,700.7,365.3,700.7,365.3z"
          />
          <path
            id="Stamm-49"
            ref="t-stem-49"
            data-seq="49"
            className="t stem hide"
            d="M668.1,386.2l18.2-4.8l8.2,3.8l-0.6-2.4l-4.1-2.4l6.7-1.7l-1.7-1.8l-7.7,2l1.7-4.7l-2.5-1l-2.7,5.2c0,0-11.6,3-16.6,4.4S663.8,387.3,668.1,386.2z"
          />
          <polygon
            ref="p-pot-49"
            className="p pot hide"
            points="685.5,371.9 688.5,387.7 679.2,386.6 677.3,376.6"
          />
          <path
            ref="p-shadow-49"
            className="p shadow hide"
            d="M686,378.9l1.5,7.7l-6.3-0.5c0,0,5.6,0,5.5-0.9L686,378.9z"
          />
          <path
            ref="p-leaf1-49"
            className="p leaf1 hide"
            d="M690,379.7c1.3-0.2,2.7-0.3,3.5,1.3C692.3,381.3,690.8,380.8,690,379.7z"
          />
          <path
            ref="p-stem-49"
            className="p stem hide"
            d="M687.1,380.1c1.8-0.1,4.7,0.6,7.2-2.7c-2,1.8-4.6,2.6-7.3,2.2L687.1,380.1L687.1,380.1"
          />
          <path
            ref="p-leaf2-49"
            className="p leaf2 hide"
            d="M693.5,378.1c2-0.8,4.2-0.5,5.9,0.6C696.6,379.7,694.6,379.5,693.5,378.1z"
          />
          <path
            ref="p-leaf3-49"
            className="p leaf3 hide"
            d="M693.5,378.2c2.8,0.8,6.2-2.5,6.5-4.5C698.1,373.7,693.4,375.8,693.5,378.2z"
          />
          <path
            ref="t-crown-50"
            className="t crown hide"
            d="M690.8,346.9c-7,3.1-15.2-0.2-18.3-7.2s0.2-15.2,7.2-18.3c7-3.1,15.2,0.2,18.3,7.2S697.8,343.8,690.8,346.9L690.8,346.9z"
          />
          <path
            ref="t-shadow-50"
            className="t shadow hide"
            d="M689.2,320.8c-6,1.4-11.8,5.9-11.7,12.7c0.1,6.9,4.5,13.5,10.8,14.2c-7.5,1.7-14.9-3.1-16.6-10.6c-1.4-6.3,1.7-12.7,7.5-15.5C684.9,318.8,689.2,320.8,689.2,320.8z"
          />
          <path
            id="Stamm-50"
            ref="t-stem-50"
            data-seq="50"
            className="t stem hide"
            d="M660.2,346.4l17.3-7.5l8.7,2.5l-1-2.3l-4.4-1.7l6.3-2.7l-2-1.6l-7.4,3.2l0.9-4.9l-2.6-0.7l-1.9,5.6c0,0-11,4.8-15.7,6.9S656,348.1,660.2,346.4z"
          />
          <polygon
            ref="p-pot-50"
            className="p pot hide"
            points="672.9,330.2 678.7,345.2 669.4,345.7 665.7,336.2"
          />
          <path
            ref="p-shadow-50"
            className="p shadow hide"
            d="M674.7,336.9l2.8,7.3l-6.3,0.6c0,0,5.5-1,5.2-1.9L674.7,336.9z"
          />
          <path
            ref="p-leaf1-50"
            className="p leaf1 hide"
            d="M678.8,337.1c1.3-0.5,2.6-0.8,3.7,0.6C681.2,338.2,679.8,338,678.8,337.1z"
          />
          <path
            ref="p-stem-50"
            className="p stem hide"
            d="M675.9,337.9c1.8-0.4,4.7-0.3,6.6-4c-1.6,2.1-4.1,3.4-6.8,3.4L675.9,337.9L675.9,337.9"
          />
          <path
            ref="p-leaf2-50"
            className="p leaf2 hide"
            d="M681.9,334.8c1.8-1.1,4-1.3,6-0.4C685.3,335.9,683.2,336,681.9,334.8z"
          />
          <path
            ref="p-leaf3-50"
            className="p leaf3 hide"
            d="M681.9,334.9c2.9,0.3,5.7-3.6,5.6-5.6C685.7,329.7,681.4,332.6,681.9,334.9z"
          />
          <path
            ref="t-crown-51"
            className="t crown hide"
            d="M650.9,265.4c-5.7,5.2-14.5,4.8-19.7-0.9c-5.2-5.7-4.8-14.5,0.9-19.7s14.5-4.8,19.7,0.9C657,251.4,656.6,260.2,650.9,265.4L650.9,265.4z"
          />
          <path
            ref="t-shadow-51"
            className="t shadow hide"
            d="M640.9,241.2c-5.2,3.3-9.3,9.4-7,15.8c2.3,6.4,8.6,11.4,14.8,9.9c-6.5,4-15.1,2-19.1-4.6c-3.4-5.5-2.5-12.6,2.1-17.2C636.3,240.8,640.9,241.2,640.9,241.2z"
          />
          <path
            id="Stamm-51"
            ref="t-stem-51"
            data-seq="51"
            className="t stem hide"
            d="M621.8,274.8c3.3-3,13.9-12.7,13.9-12.7l9-0.4l-1.7-1.8l-4.7-0.2l5.1-4.6l-2.4-0.8l-5.9,5.4l-0.7-4.9l-2.7,0.2v5.9c0,0-8.9,8.1-12.7,11.6C615.2,275.9,618.5,277.9,621.8,274.8z"
          />
          <polygon
            ref="p-pot-51"
            className="p pot hide"
            points="629.9,255.2 639.7,267.8 630.9,271 624.7,263"
          />
          <path
            ref="p-shadow-51"
            className="p shadow hide"
            d="M633.5,261.1l4.8,6.2l-5.9,2.4c0,0,4.9-2.5,4.4-3.3L633.5,261.1z"
          />
          <path
            ref="p-leaf1-51"
            className="p leaf1 hide"
            d="M637.5,260.1c1.1-0.8,2.3-1.5,3.7-0.5C640.2,260.5,638.7,260.7,637.5,260.1z"
          />
          <path
            ref="p-stem-51"
            className="p stem hide"
            d="M635,261.7c1.6-0.9,4.5-1.6,5.2-5.7c-1,2.5-3,4.4-5.5,5.3L635,261.7L635,261.7"
          />
          <path
            ref="p-leaf2-51"
            className="p leaf2 hide"
            d="M639.8,257c1.4-1.6,3.5-2.4,5.6-2.1C643.3,257,641.4,257.7,639.8,257z"
          />
          <path
            ref="p-leaf3-51"
            className="p leaf3 hide"
            d="M639.8,257.1c2.9-0.6,4.4-5.1,3.8-6.9C641.9,251,638.6,255,639.8,257.1z"
          />
        </g>
        <g ref="Baum_Groß">
          <path
            ref="t-crown-52"
            className="t crown hide"
            d="M571.9,182.7c-4.4,9.1-15.3,13-24.5,8.6c-9.1-4.4-13-15.3-8.6-24.5c4.4-9.1,15.3-13,24.5-8.7C572.4,162.6,576.2,173.5,571.9,182.7L571.9,182.7z"
          />
          <path
            ref="t-shadow-52"
            className="t shadow hide"
            d="M547.7,158c-4.8,6.5-6.7,16-0.7,22.8s16.2,9.6,23,4.9c-5.6,7.5-16,9.6-24.1,4.8c-8.2-4.7-11-15.2-7.5-23C541.9,159.8,547.7,158,547.7,158z"
          />
          <path
            id="Stamm-52"
            ref="t-stem-52"
            data-seq="52"
            className="t stem hide"
            d="M546,198.2l5.7-11.9l10.8-4.9l-3-1.4l-5.8,2.1l4-8.2l-3.4,0.2l-4.6,9.5l-3.3-5.7l-3.1,1.6l2.9,7.2c0,0-1.7,3.4-4.6,9.5C538.6,202.2,543.4,203.5,546,198.2z"
          />
          <polygon
            ref="p-pot-52"
            className="p pot hide"
            points="538.8,178.2 563,190.3 552,201.5 536.7,193.9"
          />
          <path
            ref="p-shadow-52"
            className="p shadow hide"
            d="M548.6,184.6l11.8,5.9l-7.2,7.9c0,0,5.8-7.4,4.3-8.2L548.6,184.6z"
          />
          <path
            ref="p-leaf1-52"
            className="p leaf1 hide"
            d="M553.9,180.1c1-2,2.4-3.9,5.3-3.4C558.3,178.8,556.2,180.1,553.9,180.1z"
          />
          <path
            ref="p-stem-52"
            className="p stem hide"
            d="M551.3,184.5c1.8-2.5,5.6-5.7,3.8-12.3c0.3,6.9-2.8,9.8-4.5,12L551.3,184.5L551.3,184.5"
          />
          <path
            ref="p-leaf2-52"
            className="p leaf2 hide"
            d="M555.3,173.8c0.8-3,3.6-6.5,7-7.3C560.7,171.3,558.3,173.8,555.3,173.8z"
          />
          <path
            ref="p-leaf3-52"
            className="p leaf3 hide"
            d="M555.4,173.9c4-3,3-10.9,0.7-13.3C554.1,163.1,552,171.6,555.4,173.9z"
          />
          <path
            ref="t-crown-53"
            className="t crown hide"
            d="M516.9,157.7c-2.3,9.9-12.2,16-22.1,13.6c-9.9-2.3-16-12.2-13.6-22.1c2.3-9.9,12.2-16,22.1-13.6l0,0C513.1,138,519.2,147.8,516.9,157.7z"
          />
          <path
            ref="t-shadow-53"
            className="t shadow hide"
            d="M488.1,138.7c-3.3,7.4-3.1,17.1,4.2,22.5s17.8,6,23.5-0.1c-3.9,8.6-13.6,12.8-22.5,9.8c-9-2.8-13.9-12.5-12.2-20.8C482.7,141.7,488.1,138.7,488.1,138.7z"
          />
          <path
            id="Stamm-53"
            ref="t-stem-53"
            data-seq="53"
            className="t stem hide"
            d="M494.9,178.3l3.1-12.8l9.5-7.1l-3.2-0.8l-5.3,3.2l2.1-8.8l-3.2,0.9l-2.4,10.3l-4.5-4.8l-2.7,2.2l4.4,6.4c0,0-0.9,3.6-2.5,10.3S493.5,184.1,494.9,178.3z"
          />
          <polygon
            ref="p-pot-53"
            className="p pot hide"
            points="483.6,160.3 509.8,166.9 501.4,180.3 484.8,176"
          />
          <path
            ref="p-shadow-53"
            className="p shadow hide"
            d="M494.5,164.4l12.8,3.3l-5.3,9.2c0,0,4.1-8.4,2.5-9L494.5,164.4z"
          />
          <path
            ref="p-leaf1-53"
            className="p leaf1 hide"
            d="M498.7,158.9c0.6-2.2,1.5-4.3,4.5-4.5C502.8,156.7,501,158.5,498.7,158.9z"
          />
          <path
            ref="p-stem-53"
            className="p stem hide"
            d="M497.2,163.7c1.2-2.8,4.3-6.8,1.1-12.8c1.8,6.7-0.6,10.2-1.9,12.6L497.2,163.7L497.2,163.7"
          />
          <path
            ref="p-leaf2-53"
            className="p leaf2 hide"
            d="M498.7,152.5c0.1-3,2.2-7.1,5.3-8.6C503.5,148.8,501.6,151.8,498.7,152.5z"
          />
          <path
            ref="p-leaf3-53"
            className="p leaf3 hide"
            d="M498.9,152.5c3.2-3.7,0.7-11.2-2.1-13.2C495.3,142.3,495.1,151,498.9,152.5z"
          />
          <path
            ref="t-crown-54"
            className="t crown hide"
            d="M447.5,142.3c0,10.1-8.2,18.4-18.3,18.4c-10.1,0-18.4-8.2-18.4-18.3S419,124,429.1,124l0,0C439.3,124,447.5,132.2,447.5,142.3z"
          />
          <path
            ref="t-shadow-54"
            className="t shadow hide"
            d="M415.1,130.5c-1.5,8,0.9,17.3,9.2,20.9c8.3,3.5,18.7,1.7,22.8-5.6c-1.8,9.2-10.3,15.6-19.6,14.7c-9.4-0.7-16.4-8.9-16.7-17.5C410.6,134.6,415.1,130.5,415.1,130.5z"
          />
          <path
            id="Stamm-54"
            ref="t-stem-54"
            data-seq="54"
            className="t stem hide"
            d="M430.8,167.5v-13.3l7.6-9.1h-3.3l-4.3,4.4v-9.1l-3,1.6v10.6l-5.5-3.7l-2.1,2.8l5.7,5.2c0,0-0.1,3.7,0,10.6S430.8,173.4,430.8,167.5z"
          />
          <polygon
            ref="p-pot-54"
            className="p pot hide"
            points="415.6,152.8 442.6,152.8 437.8,167.8 420.7,167.8"
          />
          <path
            ref="p-shadow-54"
            className="p shadow hide"
            d="M427.3,154.1h13.2l-2.9,10.3c0,0,1.8-9.2,0.2-9.3L427.3,154.1z"
          />
          <path
            ref="p-leaf1-54"
            className="p leaf1 hide"
            d="M430,147.7c0-2.2,0.4-4.5,3.2-5.5C433.3,144.6,432.1,146.8,430,147.7z"
          />
          <path
            ref="p-stem-54"
            className="p stem hide"
            d="M429.7,152.8c0.5-3,2.5-7.6-2.2-12.7c3.4,6,1.9,10,1.3,12.7H429.7"
          />
          <path
            ref="p-leaf2-54"
            className="p leaf2 hide"
            d="M428.4,141.5c-0.6-3,0.3-7.5,3-9.7C432.1,136.8,431,140.1,428.4,141.5z"
          />
          <path
            ref="p-leaf3-54"
            className="p leaf3 hide"
            d="M428.5,141.5c2.2-4.4-2.1-11.1-5.3-12.2C422.6,132.5,424.5,141,428.5,141.5z"
          />
          <path
            ref="t-crown-55"
            className="t crown hide"
            d="M346.1,152.3c3.8,9.4-0.6,20.1-10,23.9c-9.4,3.8-20.1-0.6-23.9-10s0.6-20.1,10-23.9l0,0C331.5,138.4,342.2,142.9,346.1,152.3z"
          />
          <path
            ref="t-shadow-55"
            className="t shadow hide"
            d="M311.6,153.6c1.7,7.9,7.4,15.7,16.5,15.8s18-5.5,19-13.8c1.9,9.2-3.6,18.4-12.6,21.1c-9,3-18.6-2-22.1-9.8C309,159.2,311.6,153.6,311.6,153.6z"
          />
          <path
            id="Stamm-55"
            ref="t-stem-55"
            data-seq="55"
            className="t stem hide"
            d="M340.2,181.9l-5-12.3l3.6-11.3l-3,1.2l-2.4,5.7l-3.4-8.4l-2.1,2.6l4,9.7l-6.5-1.4l-0.9,3.4l7.3,2.7c0,0,1.4,3.5,4,9.8C338.2,190,342.4,187.4,340.2,181.9z"
          />
          <polygon
            ref="p-pot-55"
            className="p pot hide"
            points="320,173.5 345.4,164.6 345.9,180.3 329.8,186"
          />
          <path
            ref="p-shadow-55"
            className="p shadow hide"
            d="M331.4,171l12.4-4.4l0.7,10.6c0,0-1.3-9.3-2.9-8.9L331.4,171z"
          />
          <path
            ref="p-leaf1-55"
            className="p leaf1 hide"
            d="M331.8,164c-0.7-2.1-1.1-4.4,1.2-6.2C333.9,159.9,333.5,162.4,331.8,164z"
          />
          <path
            ref="p-stem-55"
            className="p stem hide"
            d="M333.2,168.9c-0.6-3-0.2-8-6.3-11.3c5.2,4.6,5.1,8.8,5.5,11.6L333.2,168.9L333.2,168.9"
          />
          <path
            ref="p-leaf2-55"
            className="p leaf2 hide"
            d="M328.3,158.7c-1.6-2.6-2.1-7.2-0.4-10.1C330.2,153,330.3,156.5,328.3,158.7z"
          />
          <path
            ref="p-leaf3-55"
            className="p leaf3 hide"
            d="M328.4,158.7c0.6-4.9-5.7-9.7-9.1-9.8C319.8,152.1,324.4,159.5,328.4,158.7z"
          />
          <path
            ref="t-crown-56"
            className="t crown hide"
            d="M241.8,206.4c7.5,6.8,8,18.5,1.1,25.9c-6.8,7.5-18.5,8-25.9,1.1c-7.5-6.8-8-18.5-1.1-25.9l0,0C222.8,200.1,234.4,199.6,241.8,206.4z"
          />
          <path
            ref="t-shadow-56"
            className="t shadow hide"
            d="M211.3,222.3c4.9,6.5,13.4,11.1,21.6,7.3c8.3-3.7,13.9-12.6,11.3-20.6c5.6,7.6,4.6,18.1-2.4,24.4c-6.9,6.5-17.7,6.1-24.2,0.5S211.3,222.3,211.3,222.3z"
          />
          <path
            id="Stamm-56"
            ref="t-stem-56"
            data-seq="56"
            className="t stem hide"
            d="M249.1,235.7l-9.8-9l-1.6-11.8l-2.2,2.4l0.3,6.2l-6.7-6.1l-0.8,3.3l7.8,7.1l-6.4,1.5l0.6,3.5l7.7-0.7c0,0,2.7,2.6,7.8,7.2S253.5,239.7,249.1,235.7z"
          />
          <polygon
            ref="p-pot-56"
            className="p pot hide"
            points="227.8,236.5 247.7,218.2 254.2,232.4 241.7,244.1"
          />
          <path
            ref="p-shadow-56"
            className="p shadow hide"
            d="M237.2,229.5l9.7-8.9l4.8,9.5c0,0-4.9-8-6.2-7L237.2,229.5z"
          />
          <path
            ref="p-leaf1-56"
            className="p leaf1 hide"
            d="M234.9,223.1c-1.5-1.7-2.7-3.6-1.3-6.2C235.3,218.5,235.8,220.9,234.9,223.1z"
          />
          <path
            ref="p-stem-56"
            className="p stem hide"
            d="M238.1,226.9c-1.7-2.6-3.3-7.3-10.2-7.9c6.5,2.1,8.2,6.1,9.6,8.5L238.1,226.9L238.1,226.9"
          />
          <path
            ref="p-leaf2-56"
            className="p leaf2 hide"
            d="M229.6,219.5c-2.4-1.8-4.8-5.7-4.3-9.1C229.1,213.5,230.4,216.7,229.6,219.5z"
          />
          <path
            ref="p-leaf3-56"
            className="p leaf3 hide"
            d="M229.7,219.4c-1.4-4.7-9.1-6.7-12.2-5.3C219.1,216.8,226.3,221.8,229.7,219.4z"
          />
          <path
            ref="t-crown-57"
            className="t crown hide"
            d="M180.9,274.2c9.2,4.3,13.1,15.2,8.8,24.4c-4.3,9.2-15.2,13.1-24.4,8.8c-9.2-4.3-13.1-15.2-8.8-24.4l0,0C160.8,273.8,171.7,269.9,180.9,274.2z"
          />
          <path
            ref="t-shadow-57"
            className="t shadow hide"
            d="M156.4,298.5c6.6,4.7,16.1,6.6,22.8,0.6c6.8-6,9.5-16.2,4.7-23c7.6,5.6,9.7,15.9,4.9,24c-4.6,8.3-15.1,11.1-22.9,7.7C158.1,304.3,156.4,298.5,156.4,298.5z"
          />
          <path
            id="Stamm-57"
            ref="t-stem-57"
            data-seq="57"
            className="t stem hide"
            d="M206.5,304.6c-3.8-1.8-22-10.3-22-10.3l-5-10.8l-1.4,3l2.1,5.8l-8.2-3.9l0.2,3.4l9.6,4.5l-5.7,3.4l1.6,3.1l7.2-3c0,0,12.2,5.8,18.4,8.7C209.5,311.4,210.3,306.4,206.5,304.6z"
          />
          <polygon
            ref="p-pot-57"
            className="p pot hide"
            points="179,308.4 191.7,284.7 202.7,296 194.5,311.1"
          />
          <path
            ref="p-shadow-57"
            className="p shadow hide"
            d="M185.7,298.8l6.2-11.6l7.7,7.4c0,0-7.2-6-8.1-4.6L185.7,298.8z"
          />
          <path
            ref="p-leaf1-57"
            className="p leaf1 hide"
            d="M181.3,293.4c-2-1.1-3.8-2.5-3.2-5.4C180.2,288.9,181.4,291.1,181.3,293.4z"
          />
          <path
            ref="p-stem-57"
            className="p stem hide"
            d="M185.5,296.1c-2.4-1.9-5.5-5.8-12.2-4.2c6.9-0.1,9.7,3.1,11.8,4.9L185.5,296.1L185.5,296.1"
          />
          <path
            ref="p-leaf2-57"
            className="p leaf2 hide"
            d="M175.1,291.9c-3-0.9-6.4-3.9-7.1-7.2C172.6,286.3,175.1,288.9,175.1,291.9z"
          />
          <path
            ref="p-leaf3-57"
            className="p leaf3 hide"
            d="M175.2,291.7c-2.9-4.1-10.8-3.3-13.3-1.1C164.3,292.7,172.8,295,175.2,291.7z"
          />
          <path
            ref="t-crown-58"
            className="t crown hide"
            d="M150.2,340.8c9.9,2.2,16.1,12,13.9,21.9c-2.2,9.9-12,16.1-21.9,13.9s-16.1-12-13.9-21.9l0,0C130.5,344.8,140.3,338.6,150.2,340.8z"
          />
          <path
            ref="t-shadow-58"
            className="t shadow hide"
            d="M131.6,369.8c7.5,3.2,17.1,3,22.4-4.4c5.3-7.4,5.8-17.9-0.4-23.5c8.6,3.8,13,13.4,10.1,22.4c-2.7,9.1-12.3,14.1-20.7,12.5C134.6,375.1,131.6,369.8,131.6,369.8z"
          />
          <path
            id="Stamm-58"
            ref="t-stem-58"
            data-seq="58"
            className="t stem hide"
            d="M181.8,364.8c-4.1-0.9-23.7-5.2-23.7-5.2l-7.2-9.4l-0.7,3.2l3.3,5.2l-8.9-2l1,3.3l10.3,2.3l-4.8,4.5l2.3,2.7l6.3-4.4c0,0,13.2,3,19.9,4.4S185.9,365.8,181.8,364.8z"
          />
          <polygon
            ref="p-pot-58"
            className="p pot hide"
            points="157.6,374.5 163.5,348.2 177.1,356.2 173.3,372.9"
          />
          <path
            ref="p-shadow-58"
            className="p shadow hide"
            d="M161.5,363.5l2.9-12.8l9.4,5.1c0,0-8.5-3.8-9-2.3L161.5,363.5z"
          />
          <path
            ref="p-leaf1-58"
            className="p leaf1 hide"
            d="M155.8,359.4c-2.2-0.5-4.3-1.4-4.6-4.3C153.5,355.5,155.3,357.2,155.8,359.4z"
          />
          <path
            ref="p-stem-58"
            className="p stem hide"
            d="M160.6,360.9c-2.9-1.1-6.9-4.1-12.8-0.7c6.6-2,10.2,0.3,12.7,1.5L160.6,360.9L160.6,360.9"
          />
          <path
            ref="p-leaf2-58"
            className="p leaf2 hide"
            d="M149.4,359.6c-3-0.1-7.2-2-8.8-5C145.7,355,148.6,356.8,149.4,359.6z"
          />
          <path
            ref="p-leaf3-58"
            className="p leaf3 hide"
            d="M149.4,359.5c-3.8-3.1-11.3-0.3-13.1,2.5C139.3,363.3,148,363.3,149.4,359.5z"
          />
          <path
            ref="t-crown-59"
            className="t crown hide"
            d="M141.3,400.9c10.1,0,18.4,8.1,18.4,18.3c0,10.1-8.1,18.4-18.3,18.4c-10.1,0-18.4-8.1-18.4-18.3l0,0C123,409.2,131.1,400.9,141.3,400.9z"
          />
          <path
            ref="t-shadow-59"
            className="t shadow hide"
            d="M129.6,433.3c8,1.5,17.3-1,20.9-9.3c3.5-8.3,1.6-18.7-5.6-22.8c9.2,1.8,15.6,10.2,14.8,19.6c-0.6,9.4-8.9,16.5-17.4,16.8S129.6,433.3,129.6,433.3z"
          />
          <path
            id="Stamm-59"
            ref="t-stem-59"
            data-seq="59"
            className="t stem hide"
            d="M177.5,417.3c-4.2,0-24.3,0.2-24.3,0.2l-9.2-7.6v3.3l4.4,4.4h-9.1l1.6,3h10.6l-3.7,5.5l2.8,2.1l5.2-5.7c0,0,13.5,0,20.4-0.1C183.1,422.2,181.7,417.3,177.5,417.3z"
          />
          <polygon
            ref="p-pot-59"
            className="p pot hide"
            points="153.5,432.7 153.7,405.7 168.7,410.6 168.6,427.7"
          />
          <path
            ref="p-shadow-59"
            className="p shadow hide"
            d="M155,421.1l0.1-13.2l10.2,3c0,0-9.2-1.9-9.3-0.3L155,421.1z"
          />
          <path
            ref="p-leaf1-59"
            className="p leaf1 hide"
            d="M148.6,418.4c-2.2,0-4.5-0.4-5.4-3.3C145.5,415,147.6,416.3,148.6,418.4z"
          />
          <path
            ref="p-stem-59"
            className="p stem hide"
            d="M153.6,418.7c-3-0.5-7.6-2.5-12.7,2.1c6-3.3,10-1.8,12.7-1.2L153.6,418.7L153.6,418.7"
          />
          <path
            ref="p-leaf2-59"
            className="p leaf2 hide"
            d="M142.4,419.9c-3,0.6-7.5-0.4-9.6-3C137.7,416.2,141,417.3,142.4,419.9z"
          />
          <path
            ref="p-leaf3-59"
            className="p leaf3 hide"
            d="M142.4,419.8c-4.4-2.2-11.1,2.1-12.3,5.2C133.3,425.6,141.8,423.8,142.4,419.8z"
          />
          <path
            ref="t-crown-60"
            className="t crown hide"
            d="M143.2,469.7c10-1.7,19.5,4.9,21.2,14.9s-4.9,19.5-14.9,21.2s-19.5-4.9-21.2-14.9l0,0C126.5,481,133.2,471.5,143.2,469.7z"
          />
          <path
            ref="t-shadow-60"
            className="t shadow hide"
            d="M137.2,503.7c8.1,0.1,16.9-3.8,19-12.7c2.1-8.8-1.5-18.8-9.4-21.5c9.4,0.2,17.1,7.4,17.9,16.8c1,9.4-6,17.7-14.3,19.5C142,507.4,137.2,503.7,137.2,503.7z"
          />
          <path
            id="Stamm-60"
            ref="t-stem-60"
            data-seq="60"
            className="t stem hide"
            d="M181.7,479.8c-4.1,0.7-23.9,4.3-23.9,4.3l-10.3-5.9l0.6,3.2l5.1,3.6l-9,1.6l2.1,2.6l10.4-1.8l-2.7,6l3.1,1.6l4.2-6.5c0,0,13.3-2.3,20.1-3.5C188,483.7,185.8,479.1,181.7,479.8z"
          />
          <polygon
            ref="p-pot-60"
            className="p pot hide"
            points="162.7,499.1 157.1,472.7 172.8,474.3 176.3,491"
          />
          <path
            ref="p-shadow-60"
            className="p shadow hide"
            d="M161.6,487.5l-2.8-12.9l10.6,0.7c0,0-9.4,0.1-9.2,1.8L161.6,487.5z"
          />
          <path
            ref="p-leaf1-60"
            className="p leaf1 hide"
            d="M154.8,486.1c-2.2,0.4-4.5,0.6-6-2C151,483.5,153.4,484.3,154.8,486.1z"
          />
          <path
            ref="p-stem-60"
            className="p stem hide"
            d="M159.8,485.4c-3.1,0.2-7.9-0.9-12,4.8c5.2-4.5,9.4-4,12.2-4L159.8,485.4L159.8,485.4"
          />
          <path
            ref="p-leaf2-60"
            className="p leaf2 hide"
            d="M149,488.9c-2.8,1.2-7.4,1.2-10.1-0.9C143.6,486.4,147.1,486.8,149,488.9z"
          />
          <path
            ref="p-leaf3-60"
            className="p leaf3 hide"
            d="M149,488.8c-4.7-1.3-10.4,4.4-10.9,7.8C141.4,496.5,149.3,492.8,149,488.8z"
          />
          <path
            ref="t-crown-61"
            className="t crown hide"
            d="M171.8,558.3c8.5-5.5,19.9-3,25.4,5.5s3,19.9-5.5,25.4s-19.9,3-25.4-5.5l0,0C160.8,575.2,163.3,563.8,171.8,558.3z"
          />
          <path
            ref="t-shadow-61"
            className="t shadow hide"
            d="M179.5,592c7.5-3.1,14.1-10.1,12.6-19.1c-1.5-8.9-8.7-16.7-17-16.2c8.7-3.5,18.7,0.2,23,8.5c4.5,8.3,1.4,18.7-5.6,23.5C185.4,593.6,179.5,592,179.5,592z"
          />
          <path
            id="Stamm-61"
            ref="t-stem-61"
            data-seq="61"
            className="t stem hide"
            d="M211.2,552.7c-3.5,2.3-20.4,13.2-20.4,13.2l-11.8-1.5l1.8,2.8l6,1.3l-7.6,4.9l3,1.6l8.9-5.7L191,576l3.5,0.3l1.3-7.6c0,0,11.3-7.4,17.1-11.1C218.6,553.8,214.8,550.5,211.2,552.7z"
          />
          <polygon
            ref="p-pot-61"
            className="p pot hide"
            points="200,577.3 185.5,554.5 200.8,550.6 209.9,565"
          />
          <path
            ref="p-shadow-61"
            className="p shadow hide"
            d="M194.9,566.8l-7.1-11.2l10.2-3c0,0-8.7,3.3-8,4.8L194.9,566.8z"
          />
          <path
            ref="p-leaf1-61"
            className="p leaf1 hide"
            d="M188.1,567.9c-1.9,1.2-4,2.1-6.3,0.2C183.6,566.8,186.1,566.7,188.1,567.9z"
          />
          <path
            ref="p-stem-61"
            className="p stem hide"
            d="M192.5,565.5c-2.8,1.2-7.7,2-9.6,8.6c3.3-6.1,7.4-6.9,10-7.9L192.5,565.5L192.5,565.5"
          />
          <path
            ref="p-leaf2-61"
            className="p leaf2 hide"
            d="M183.6,572.6c-2.2,2.1-6.5,3.7-9.7,2.7C177.7,572,181.1,571.1,183.6,572.6z"
          />
          <path
            ref="p-leaf3-61"
            className="p leaf3 hide"
            d="M183.6,572.4c-4.9,0.5-8.2,7.7-7.5,11C179.1,582.3,185.2,576.1,183.6,572.4z"
          />
          <path
            ref="t-crown-62"
            className="t crown hide"
            d="M245.1,650.1c4.6-9,15.7-12.6,24.7-8s12.6,15.7,8,24.7s-15.7,12.6-24.7,8C244,670.2,240.5,659.1,245.1,650.1L245.1,650.1z"
          />
          <path
            ref="t-shadow-62"
            className="t shadow hide"
            d="M268.6,675.4c4.9-6.4,7.1-15.8,1.3-22.8c-5.8-7-15.9-10-22.9-5.5c5.8-7.4,16.3-9.2,24.2-4.2c8.1,4.9,10.6,15.5,6.9,23.2C274.5,673.8,268.6,675.4,268.6,675.4z"
          />
          <path
            id="Stamm-62"
            ref="t-stem-62"
            data-seq="62"
            className="t stem hide"
            d="M276.4,625.5c-1.9,3.7-11,21.6-11,21.6l-11,4.6l2.9,1.5l5.9-1.9l-4.1,8.1l3.4-0.1l4.8-9.4l3.2,5.8l3.2-1.5L271,647c0,0,6.2-12,9.3-18.1C283.3,622.8,278.3,621.8,276.4,625.5z"
          />
          <polygon
            ref="p-pot-62"
            className="p pot hide"
            points="278.2,654.6 256.5,638.6 269.2,629.3 283,639.5"
          />
          <path
            ref="p-shadow-62"
            className="p shadow hide"
            d="M269.7,646.6l-10.6-7.8l8.4-6.6c0,0-6.9,6.3-5.7,7.4L269.7,646.6z"
          />
          <path
            ref="p-leaf1-62"
            className="p leaf1 hide"
            d="M263.7,650.2c-1.4,1.8-3,3.4-5.8,2.5C259.1,650.7,261.4,649.7,263.7,650.2z"
          />
          <path
            ref="p-stem-62"
            className="p stem hide"
            d="M266.9,646.3c-2.2,2.2-6.5,4.7-5.8,11.5c0.8-6.8,4.4-9.2,6.5-11L266.9,646.3L266.9,646.3"
          />
          <path
            ref="p-leaf2-62"
            className="p leaf2 hide"
            d="M261.3,656.1c-1.3,2.8-4.7,5.8-8.1,6C255.5,657.7,258.3,655.6,261.3,656.1z"
          />
          <path
            ref="p-leaf3-62"
            className="p leaf3 hide"
            d="M261.2,656c-4.4,2.2-4.8,10.2-3,13C260.6,666.8,264.1,658.8,261.2,656z"
          />
          <path
            ref="t-crown-63"
            className="t crown hide"
            d="M324.5,693.6c2.6-9.8,12.7-15.6,22.5-13s15.6,12.7,13,22.5s-12.7,15.6-22.5,13l0,0C327.7,713.5,321.9,703.4,324.5,693.6z"
          />
          <path
            ref="t-shadow-63"
            className="t shadow hide"
            d="M352.7,713.4c3.5-7.3,3.6-17-3.5-22.6s-17.7-6.5-23.5-0.5c4.1-8.4,13.9-12.4,22.7-9.2c8.9,3.1,13.6,12.8,11.6,21.2S352.7,713.4,352.7,713.4z"
          />
          <path
            id="Stamm-63"
            ref="t-stem-63"
            data-seq="63"
            className="t stem hide"
            d="M349.8,663c-1.1,4-6.2,23.5-6.2,23.5l-9.7,6.9l3.2,0.8l5.4-3.1l-2.3,8.8l3.3-0.8l2.7-10.2l4.3,5l2.8-2.1l-4.2-6.5c0,0,3.5-13,5.2-19.7C356,658.8,350.9,658.9,349.8,663z"
          />
          <polygon
            ref="p-pot-63"
            className="p pot hide"
            points="358.5,688.6 332.8,680.6 341.9,667.7 358.2,672.8"
          />
          <path
            ref="p-shadow-63"
            className="p shadow hide"
            d="M347.8,683.9l-12.6-4l5.8-8.9c0,0-4.5,8.2-3,8.8L347.8,683.9z"
          />
          <path
            ref="p-leaf1-63"
            className="p leaf1 hide"
            d="M343.4,689.2c-0.7,2.1-1.7,4.2-4.7,4.2C339.2,691.1,341.1,689.5,343.4,689.2z"
          />
          <path
            ref="p-stem-63"
            className="p stem hide"
            d="M345.2,684.4c-1.4,2.8-4.6,6.5-1.7,12.8c-1.4-6.8,1.2-10.1,2.5-12.5L345.2,684.4L345.2,684.4"
          />
          <path
            ref="p-leaf2-63"
            className="p leaf2 hide"
            d="M343,695.5c-0.3,3-2.6,7-5.7,8.3C338.1,698.9,340.1,696.1,343,695.5z"
          />
          <path
            ref="p-leaf3-63"
            className="p leaf3 hide"
            d="M342.9,695.5c-3.4,3.5-1.3,11.2,1.4,13.3C345.8,705.9,346.5,697.2,342.9,695.5z"
          />
          <path
            ref="t-crown-64"
            className="t crown hide"
            d="M412.2,709.1c-0.3-10.1,7.7-18.6,17.8-18.9s18.6,7.7,18.9,17.8s-7.6,18.6-17.8,18.9C421,727.2,412.6,719.2,412.2,709.1L412.2,709.1z"
          />
          <path
            ref="t-shadow-64"
            className="t shadow hide"
            d="M445,719.8c1.2-8-1.4-17.3-9.9-20.6s-18.8-1.1-22.6,6.3c1.5-9.3,9.8-15.9,19.1-15.4c9.4,0.4,16.7,8.4,17.3,16.9C449.4,715.6,445,719.8,445,719.8z"
          />
          <path
            id="Stamm-64"
            ref="t-stem-64"
            data-seq="64"
            className="t stem hide"
            d="M427.7,672.4c0.1,4.2,0.9,24.3,0.9,24.3l-7.3,9.4l3.3-0.1l4.2-4.5l0.3,9.1l2.9-1.7l-0.3-10.6l5.6,3.5l2.1-2.9l-5.9-5c0,0-0.4-13.5-0.7-20.3C432.4,666.6,427.5,668.3,427.7,672.4z"
          />
          <polygon
            ref="p-pot-64"
            className="p pot hide"
            points="444.1,696.4 417.1,697.3 421.4,682.2 438.5,681.6"
          />
          <path
            ref="p-shadow-64"
            className="p shadow hide"
            d="M432.4,695.5l-13.2,0.4l2.6-10.3c0,0-1.6,9.2,0.1,9.3L432.4,695.5z"
          />
          <path
            ref="p-leaf1-64"
            className="p leaf1 hide"
            d="M429.9,701.9c0,2.2-0.2,4.5-3,5.6C426.6,705.2,427.8,703,429.9,701.9z"
          />
          <path
            ref="p-stem-64"
            className="p stem hide"
            d="M430.1,696.9c-0.4,3-2.2,7.7,2.6,12.6c-3.6-5.9-2.2-9.9-1.7-12.7L430.1,696.9L430.1,696.9"
          />
          <path
            ref="p-leaf2-64"
            className="p leaf2 hide"
            d="M431.7,708.1c0.7,3-0.1,7.5-2.7,9.7C428.2,712.9,429.1,709.6,431.7,708.1z"
          />
          <path
            ref="p-leaf3-64"
            className="p leaf3 hide"
            d="M431.5,708.1c-2.1,4.5,2.5,11,5.7,12C437.8,717,435.6,708.5,431.5,708.1z"
          />
          <path
            ref="t-crown-65"
            className="t crown hide"
            d="M527,693.1c-4.7-9-1.3-20.1,7.6-24.8c9-4.7,20.1-1.3,24.8,7.6s1.3,20.1-7.6,24.8l0,0C542.8,705.5,531.7,702,527,693.1z"
          />
          <path
            ref="t-shadow-65"
            className="t shadow hide"
            d="M561.1,688.4c-2.4-7.7-8.9-14.9-17.9-14.2c-9,0.8-17.4,7.2-17.6,15.6c-2.7-9,1.8-18.6,10.5-22.2c8.6-3.8,18.7,0.2,22.9,7.6S561.1,688.4,561.1,688.4z"
          />
          <path
            id="Stamm-65"
            ref="t-stem-65"
            data-seq="65"
            className="t stem hide"
            d="M524.7,653.4c2,3.7,11.4,21.4,11.4,21.4l-2.5,11.6l2.9-1.5l1.8-5.9l4.2,8l1.8-2.8l-4.9-9.3l6.6,0.7l0.6-3.5l-7.5-2c0,0-6.3-11.9-9.5-18C526.4,646.1,522.8,649.7,524.7,653.4z"
          />
          <polygon
            ref="p-pot-65"
            className="p pot hide"
            points="550.1,667.1 525.6,678.4 523.7,662.7 539.3,655.6"
          />
          <path
            ref="p-shadow-65"
            className="p shadow hide"
            d="M539,670.7l-12,5.5l-1.6-10.5c0,0,2.1,9.1,3.7,8.6L539,670.7z"
          />
          <path
            ref="p-leaf1-65"
            className="p leaf1 hide"
            d="M539.2,677.7c0.9,2.1,1.5,4.3-0.7,6.3C537.4,681.9,537.7,679.4,539.2,677.7z"
          />
          <path
            ref="p-stem-65"
            className="p stem hide"
            d="M537.4,673c0.8,3,0.9,7.9,7.2,10.7c-5.6-4.1-5.9-8.3-6.5-11L537.4,673L537.4,673"
          />
          <path
            ref="p-leaf2-65"
            className="p leaf2 hide"
            d="M543.2,682.7c1.8,2.5,2.8,6.9,1.3,10C541.8,688.5,541.5,685.1,543.2,682.7z"
          />
          <path
            ref="p-leaf3-65"
            className="p leaf3 hide"
            d="M543.1,682.7c-0.2,4.9,6.5,9.2,9.9,8.9C552.3,688.5,547,681.6,543.1,682.7z"
          />
          <path
            ref="t-crown-66"
            className="t crown hide"
            d="M607.7,645.1c-7.4-6.9-7.8-18.5-0.9-25.9c6.9-7.4,18.5-7.8,25.9-0.9c7.4,6.9,7.8,18.5,0.9,25.9l0,0C626.8,651.7,615.1,652.1,607.7,645.1z"
          />
          <path
            ref="t-shadow-66"
            className="t shadow hide"
            d="M638.5,629.5c-4.8-6.5-13.3-11.2-21.6-7.5s-14,12.5-11.5,20.5c-5.5-7.6-4.4-18.2,2.6-24.4c6.9-6.4,17.8-5.9,24.2-0.3C638.5,623.4,638.5,629.5,638.5,629.5z"
          />
          <path
            id="Stamm-66"
            ref="t-stem-66"
            data-seq="66"
            className="t stem hide"
            d="M592.6,608.3c3.1,2.9,17.8,16.5,17.8,16.5l1.5,11.8l2.2-2.4l-0.2-6.2l6.6,6.2l0.8-3.3l-7.7-7.2l6.5-1.5l-0.6-3.5l-7.7,0.6c0,0-9.9-9.2-14.9-13.9C591.9,600.9,589.6,605.5,592.6,608.3z"
          />
          <polygon
            ref="p-pot-66"
            className="p pot hide"
            points="621.2,613.3 601.8,632.1 594.8,618 607,606.1"
          />
          <path
            ref="p-shadow-66"
            className="p shadow hide"
            d="M611.9,620.5l-9.5,9.3l-5.1-9.4c0,0,5.1,7.9,6.4,6.8L611.9,620.5z"
          />
          <path
            ref="p-leaf1-66"
            className="p leaf1 hide"
            d="M614.4,626.9c1.5,1.6,2.9,3.5,1.5,6.2C614.2,631.5,613.6,629.1,614.4,626.9z"
          />
          <path
            ref="p-stem-66"
            className="p stem hide"
            d="M611.1,623.1c1.8,2.5,3.5,7.2,10.4,7.6c-6.6-2-8.3-5.8-9.8-8.2L611.1,623.1L611.1,623.1"
          />
          <path
            ref="p-leaf2-66"
            className="p leaf2 hide"
            d="M619.9,630.3c2.5,1.7,4.9,5.6,4.6,9C620.5,636.2,619,633.1,619.9,630.3z"
          />
          <path
            ref="p-leaf3-66"
            className="p leaf3 hide"
            d="M619.8,630.4c1.5,4.7,9.3,6.4,12.3,5.1C630.3,632.7,623,628,619.8,630.4z"
          />
          <path
            ref="t-crown-67"
            className="t crown hide"
            d="M658.6,591.4c-8.8-5-12-16.1-7-25c5-8.8,16.1-12,25-7c8.8,5,12,16.1,7,25l0,0C678.6,593.2,667.4,596.3,658.6,591.4z"
          />
          <path
            ref="t-shadow-67"
            className="t shadow hide"
            d="M684.8,568.9c-6.2-5.2-15.6-7.7-22.7-2.2c-7.2,5.5-10.7,15.5-6.3,22.6c-7.2-6.1-8.6-16.6-3.3-24.3c5.2-7.9,15.8-10,23.4-6C683.4,562.9,684.8,568.9,684.8,568.9z"
          />
          <path
            id="Stamm-67"
            ref="t-stem-67"
            data-seq="67"
            className="t stem hide"
            d="M635.2,559.2c3.6,2,21.2,11.8,21.2,11.8l4.2,11.1l1.6-2.9l-1.7-5.9l7.9,4.4v-3.4l-9.2-5.2l5.9-3l-1.4-3.2l-7.3,2.4c0,0-11.8-6.6-17.8-10C632.7,552.2,631.5,557.1,635.2,559.2z"
          />
          <polygon
            ref="p-pot-67"
            className="p pot hide"
            points="662.5,556.5 649.1,580 638.5,568.3 647,553.5"
          />
          <path
            ref="p-shadow-67"
            className="p shadow hide"
            d="M655.6,566l-6.6,11.5l-7.5-7.6c0,0,7,6.2,8,4.8L655.6,566z"
          />
          <path
            ref="p-leaf1-67"
            className="p leaf1 hide"
            d="M659.8,571.5c2,1.1,3.7,2.6,3.1,5.5C660.8,576,659.6,573.8,659.8,571.5z"
          />
          <path
            ref="p-stem-67"
            className="p stem hide"
            d="M655.5,568.7c2.4,1.9,5.4,5.9,12.1,4.5c-6.9-0.1-9.6-3.3-11.7-5.2L655.5,568.7L655.5,568.7"
          />
          <path
            ref="p-leaf2-67"
            className="p leaf2 hide"
            d="M665.9,573.2c2.9,1,6.3,4,6.9,7.4C668.2,578.7,665.8,576.2,665.9,573.2z"
          />
          <path
            ref="p-leaf3-67"
            className="p leaf3 hide"
            d="M665.9,573.3c2.7,4.1,10.7,3.6,13.3,1.5C676.7,572.7,668.3,570.1,665.9,573.3z"
          />
          <path
            ref="t-crown-68"
            className="t crown hide"
            d="M683.7,537.3c-9.5-3.5-14.5-14-11-23.5s14-14.5,23.5-11s14.5,14,11,23.5l0,0C703.8,535.8,693.2,540.7,683.7,537.3z"
          />
          <path
            ref="t-shadow-68"
            className="t shadow hide"
            d="M705.8,510.8c-7-4.1-16.6-5.1-22.7,1.6c-6.1,6.6-8,17-2.5,23.4c-8.1-4.8-11.2-15-7.2-23.5c3.8-8.6,14-12.4,22.1-9.8C703.6,505.2,705.8,510.8,705.8,510.8z"
          />
          <path
            id="Stamm-68"
            ref="t-stem-68"
            data-seq="68"
            className="t stem hide"
            d="M655.4,509.4c4,1.4,22.8,8.2,22.8,8.2l6,10.3l1.1-3.1l-2.6-5.6l8.5,3.1l-0.5-3.3l-9.9-3.6l5.4-3.9l-1.9-3l-6.9,3.6c0,0-12.7-4.6-19.1-6.9S651.4,507.9,655.4,509.4z"
          />
          <polygon
            ref="p-pot-68"
            className="p pot hide"
            points="684.8,504 675.2,529.3 662.9,519.5 668.9,503.5"
          />
          <path
            ref="p-shadow-68"
            className="p shadow hide"
            d="M679.4,514.4l-4.7,12.4l-8.6-6.3c0,0,7.9,4.9,8.6,3.5L679.4,514.4z"
          />
          <path
            ref="p-leaf1-68"
            className="p leaf1 hide"
            d="M684.4,519.2c2.1,0.8,4.1,2,4,4.9C686.2,523.5,684.6,521.5,684.4,519.2z"
          />
          <path
            ref="p-stem-68"
            className="p stem hide"
            d="M679.8,517.1c2.7,1.5,6.2,5,12.7,2.5c-6.8,1-10-1.7-12.4-3.3L679.8,517.1L679.8,517.1"
          />
          <path
            ref="p-leaf2-68"
            className="p leaf2 hide"
            d="M690.8,519.9c3,0.5,6.9,3,8,6.2C693.9,525,691.2,522.8,690.8,519.9z"
          />
          <path
            ref="p-leaf3-68"
            className="p leaf3 hide"
            d="M690.7,520c3.3,3.6,11.1,1.9,13.3-0.7C701.3,517.7,692.7,516.5,690.7,520z"
          />
          <path
            ref="t-crown-69"
            className="t crown hide"
            d="M704.6,470.9c-10-1.7-16.7-11.2-15-21.2s11.2-16.7,21.2-15s16.7,11.2,15,21.2l0,0C724.1,466,714.6,472.7,704.6,470.9z"
          />
          <path
            ref="t-shadow-69"
            className="t shadow hide"
            d="M721.8,441c-7.6-2.8-17.2-2.1-22.1,5.5c-4.9,7.6-4.9,18.2,1.6,23.5c-8.8-3.3-13.6-12.8-11.2-21.9c2.3-9.2,11.6-14.7,20-13.5S721.8,441,721.8,441z"
          />
          <path
            id="Stamm-69"
            ref="t-stem-69"
            data-seq="69"
            className="t stem hide"
            d="M671.8,448.4c4.1,0.7,23.9,4,23.9,4l7.7,9.1l0.6-3.2l-3.6-5.1l8.9,1.5l-1.1-3.2l-10.4-1.8l4.6-4.8l-2.4-2.6l-6.1,4.7c0,0-13.3-2.3-20.1-3.4C667.1,442.7,667.7,447.7,671.8,448.4z"
          />
          <polygon
            ref="p-pot-69"
            className="p pot hide"
            points="696.4,437.5 693.9,464.3 679.4,458.1 681,441.1"
          />
          <path
            ref="p-shadow-69"
            className="p shadow hide"
            d="M694,448.9l-1.3,13.1l-9.9-3.9c0,0,9,2.7,9.3,1.1L694,448.9z"
          />
          <path
            ref="p-leaf1-69"
            className="p leaf1 hide"
            d="M700.1,452.2c2.2,0.2,4.5,0.8,5.1,3.7C702.9,455.9,700.9,454.4,700.1,452.2z"
          />
          <path
            ref="p-stem-69"
            className="p stem hide"
            d="M695.1,451.4c3,0.8,7.3,3.2,12.8-0.9c-6.3,2.8-10.1,1-12.8,0.1V451.4L695.1,451.4"
          />
          <path
            ref="p-leaf2-69"
            className="p leaf2 hide"
            d="M706.4,451.2c3-0.3,7.4,1.1,9.3,3.9C710.7,455.4,707.6,454,706.4,451.2z"
          />
          <path
            ref="p-leaf3-69"
            className="p leaf3 hide"
            d="M706.4,451.4c4.2,2.6,11.2-1.1,12.7-4.1C716,446.3,707.3,447.4,706.4,451.4z"
          />
          <path
            ref="t-crown-70"
            className="t crown hide"
            d="M708.1,418.8c-10.1,1.1-19.1-6.1-20.3-16.2s6.1-19.1,16.2-20.3c10.1-1.1,19.1,6.1,20.3,16.2l0,0C725.4,408.7,718.1,417.7,708.1,418.8z"
          />
          <path
            ref="t-shadow-70"
            className="t shadow hide"
            d="M716.3,385.3c-8.1-0.6-17.1,2.7-19.8,11.4c-2.6,8.7,0.3,18.8,8,22.1c-9.4-0.8-16.6-8.5-16.8-17.9c-0.4-9.4,7.1-17.3,15.5-18.5C711.7,381.3,716.3,385.3,716.3,385.3z"
          />
          <path
            id="Stamm-70"
            ref="t-stem-70"
            data-seq="70"
            className="t stem hide"
            d="M670.3,406.2c4.2-0.5,24.1-2.7,24.1-2.7l9.9,6.6l-0.4-3.3l-4.8-3.9l9-1l-1.9-2.8l-10.5,1.2l3.1-5.8l-3-1.8l-4.6,6.3c0,0-13.5,1.4-20.3,2.2S666.2,406.7,670.3,406.2z"
          />
          <polygon
            ref="p-pot-70"
            className="p pot hide"
            points="694.6,388.5 697.2,415.4 681.8,412 680.2,395"
          />
          <path
            ref="p-shadow-70"
            className="p shadow hide"
            d="M694.4,400.2l1.2,13.1l-10.5-1.9c0,0,9.3,1,9.3-0.7V400.2z"
          />
          <path
            ref="p-leaf1-70"
            className="p leaf1 hide"
            d="M701,402.3c2.2-0.2,4.5,0,5.7,2.7C704.4,405.4,702.2,404.3,701,402.3z"
          />
          <path
            ref="p-stem-70"
            className="p stem hide"
            d="M695.9,402.5c3.1,0.2,7.8,1.7,12.5-3.3c-5.7,4-9.8,2.8-12.5,2.5V402.5L695.9,402.5"
          />
          <path
            ref="p-leaf2-70"
            className="p leaf2 hide"
            d="M707,400.2c3-0.9,7.5-0.3,9.9,2.1C712.1,403.4,708.7,402.6,707,400.2z"
          />
          <path
            ref="p-leaf3-70"
            className="p leaf3 hide"
            d="M707,400.3c4.6,1.8,10.8-3.2,11.7-6.4C715.5,393.5,707.2,396.3,707,400.3z"
          />
          <path
            ref="t-crown-71"
            className="t crown hide"
            d="M684.1,302.3c-7.9,6.3-19.5,5-25.8-2.9s-5-19.5,2.9-25.8s19.5-5,25.8,2.9l0,0C693.3,284.4,692,296,684.1,302.3z"
          />
          <path
            ref="t-shadow-71"
            className="t shadow hide"
            d="M673.1,269.6c-7.2,3.8-13,11.5-10.6,20.2s10.4,15.7,18.6,14.4c-8.3,4.4-18.6,1.7-23.8-6.1c-5.4-7.8-3.3-18.4,3.2-23.9C667,268.6,673.1,269.6,673.1,269.6z"
          />
          <path
            id="Stamm-71"
            ref="t-stem-71"
            data-seq="71"
            className="t stem hide"
            d="M645.5,311.9c3.3-2.6,18.9-15.2,18.9-15.2l11.9,0.3l-2-2.6l-6.2-0.7l7.1-5.7l-3.1-1.3l-8.3,6.6l-0.5-6.6l-3.5,0.1l-0.5,7.7c0,0-10.6,8.4-15.9,12.7S642.2,314.5,645.5,311.9z"
          />
          <polygon
            ref="p-pot-71"
            className="p pot hide"
            points="657.2,283.4 670.2,307 654.8,310 646.5,295.1"
          />
          <path
            ref="p-shadow-71"
            className="p shadow hide"
            d="M661.6,294.2l6.4,11.6l-10.4,2.4c0,0,8.9-2.8,8.3-4.3L661.6,294.2z"
          />
          <path
            ref="p-leaf1-71"
            className="p leaf1 hide"
            d="M668.5,293.5c2-1.1,4.1-1.9,6.3,0.2C672.9,294.9,670.4,294.9,668.5,293.5z"
          />
          <path
            ref="p-stem-71"
            className="p stem hide"
            d="M664,295.7c2.9-1.1,7.9-1.5,10.1-8c-3.6,5.9-7.8,6.5-10.5,7.3L664,295.7L664,295.7"
          />
          <path
            ref="p-leaf2-71"
            className="p leaf2 hide"
            d="M673.2,289.1c2.3-2,6.7-3.3,9.9-2.1C679.1,290.1,675.7,290.7,673.2,289.1z"
          />
          <path
            ref="p-leaf3-71"
            className="p leaf3 hide"
            d="M673.3,289.3c4.9-0.2,8.6-7.2,8.1-10.6C678.4,279.7,671.8,285.5,673.3,289.3z"
          />
          <path
            ref="t-crown-72"
            className="t crown hide"
            d="M630,228.6c-6.4,7.9-18,9-25.8,2.6c-7.9-6.4-9-18-2.6-25.8s18-9,25.8-2.6l0,0C635.3,209.2,636.5,220.8,630,228.6z"
          />
          <path
            ref="t-shadow-72"
            className="t shadow hide"
            d="M612.4,199c-6.2,5.2-10.3,14-6,22c4.2,8,13.4,13.2,21.2,10.1c-7.2,6-17.8,5.6-24.5-1c-6.9-6.5-7.1-17.3-1.9-24.1C606.3,199.3,612.4,199,612.4,199z"
          />
          <path
            id="Stamm-72"
            ref="t-stem-72"
            data-seq="72"
            className="t stem hide"
            d="M594.3,246.2c2.6-3.2,15.3-18.9,15.3-18.9l11.7-2.3l-2.5-2.1l-6.2,0.6l5.7-7L615,216l-6.7,8.2l-1.9-6.3l-3.4,0.8l1.1,7.7c0,0-8.5,10.5-12.8,15.8C587,247.5,591.7,249.4,594.3,246.2z"
          />
          <polygon
            ref="p-pot-72"
            className="p pot hide"
            points="598.6,216.3 619,234 605.5,242.1 592.6,230.9"
          />
          <path
            ref="p-shadow-72"
            className="p shadow hide"
            d="M606.5,224.9l10,8.7l-8.9,5.9c0,0,7.4-5.7,6.3-6.9L606.5,224.9z"
          />
          <path
            ref="p-leaf1-72"
            className="p leaf1 hide"
            d="M612.7,221.9c1.5-1.7,3.3-3.2,6-2C617.3,221.7,614.9,222.5,612.7,221.9z"
          />
          <path
            ref="p-stem-72"
            className="p stem hide"
            d="M609.2,225.5c2.3-2,6.9-4.1,6.7-11c-1.4,6.8-5.1,8.8-7.4,10.5L609.2,225.5L609.2,225.5"
          />
          <path
            ref="p-leaf2-72"
            className="p leaf2 hide"
            d="M615.6,216.2c1.5-2.6,5.2-5.4,8.6-5.3C621.5,215,618.5,216.8,615.6,216.2z"
          />
          <path
            ref="p-leaf3-72"
            className="p leaf3 hide"
            d="M615.7,216.2c4.5-1.9,5.6-9.8,4-12.7C617.2,205.5,613.1,213.2,615.7,216.2z"
          />
        </g>
        <circle className="openCircle" cx="425" cy="425" r="235" />
        <circle
          className="pot circle default"
          ref="pftpCirclePledge"
          cx="425"
          cy="425"
          r="235"
          strokeDasharray="0, 20000"
          transform="rotate(-90,425,425)"
        />
        <circle
          className="tree circle g2"
          ref="pftpCircleCommunity"
          cx="425"
          cy="425"
          r="235"
          strokeDasharray="0, 20000"
          transform="rotate(-90,425,425)"
        />
        <circle
          className="tree circle g1"
          ref="pftpCircleSelf"
          cx="425"
          cy="425"
          r="235"
          strokeDasharray="0, 20000"
          transform="rotate(-90,425,425)"
        />
      </svg>
    );
  }
}

SvgContainer.propTypes = {
  id: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  planted: PropTypes.number.isRequired,
  community: PropTypes.number.isRequired,
  personal: PropTypes.number.isRequired,
  targetYear: PropTypes.number,
  exposeMissing: PropTypes.bool
};

SvgContainer.defaultProps = {
  id: 1,
  target: 0,
  planted: 0,
  community: 0,
  personal: 0,
  exposeMissing: true,
  targetYear: 2020
};

const visibleOverflowStyle = { overflow: 'visible' };
