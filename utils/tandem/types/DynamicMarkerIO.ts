// Copyright 2021-2024, University of Colorado Boulder

/**
 * DynamicMarkerIO makes sure that the phetioID for the element is in state. This is necessary for the state engine
 * to then trigger object creation for DynamicElements (via their container).
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import _ from 'lodash';

import tandemNamespace from '@/utils/tandem/tandemNamespace';
import IOType from '@/utils/tandem/types/IOType';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';

const DynamicMarkerIO = new IOType<IntentionalAny, object>('DynamicMarkerIO', {
  supertype: IOType.ObjectIO,
  applyState: _.noop,
  toStateObject: () => {
    return {}; // empty object just as a placeholder
  },
  isValidValue: _.stubTrue, // accepts any type.
  documentation: 'PhET-iO Type used as a place holder for dynamic elements to be created when set for state.'
});

tandemNamespace.register('DynamicMarkerIO', DynamicMarkerIO);
export default DynamicMarkerIO;