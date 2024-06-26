// Copyright 2013-2021, University of Colorado Boulder

/**
 * Creates and references a stylesheet that can be built up while Scenery is loading.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { scenery } from '@/utils/scenery/imports';

const styleElement = document.createElement('style');
styleElement.type = 'text/css';
document.head.appendChild(styleElement);

const stylesheet = document.styleSheets[document.styleSheets.length - 1];
window.assert && window.assert(stylesheet.disabled === false);

const SceneryStyle = {
  stylesheet,
  styleElement,

  addRule(ruleString) {
    // using a this reference so it doesn't need to be a closure
    this.stylesheet.insertRule(ruleString, 0);
  }
};
scenery.register('SceneryStyle', SceneryStyle);
export default SceneryStyle;
