// Copyright 2018-2024, University of Colorado Boulder

/**
 * PhET-iO Type for LinkedElement
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import _ from 'lodash';

import Tandem from '@/utils/tandem/Tandem';
import tandemNamespace from '@/utils/tandem/tandemNamespace';
import IOType from '@/utils/tandem/types/IOType';
import StringIO from '@/utils/tandem/types/StringIO.js';

export type LinkedElementState = {
  elementID: string;
};

const LinkedElementIO = new IOType('LinkedElementIO', {
  isValidValue: () => true,
  documentation: 'A LinkedElement',
  toStateObject: linkedElement => {
    window.assert && Tandem.VALIDATION && window.assert(linkedElement.element.isPhetioInstrumented(), 'Linked elements must be instrumented');
    return { elementID: linkedElement.element.tandem.phetioID };
  },

  // Override the parent implementation as a no-op.  LinkedElement elementID appears in the state, but should not be set
  // back into a running simulation.
  applyState: _.noop,
  stateSchema: {
    elementID: StringIO
  }
});

tandemNamespace.register('LinkedElementIO', LinkedElementIO);
export default LinkedElementIO;