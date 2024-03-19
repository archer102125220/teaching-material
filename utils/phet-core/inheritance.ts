// Copyright 2017-2023, University of Colorado Boulder

/**
 * Given inheritance using inherit, this will give the full prototype chain.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from '@/utils/phet-core/phetCore';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';

/*
 * @param type - Constructor for the type in question.
 * @returns - a list of the prototypes
 */
function inheritance(type: IntentionalAny): IntentionalAny[] {
  const types = [type];

  let proto = type.prototype;
  while (proto && (proto = Object.getPrototypeOf(proto))) {
    if (proto.constructor) {
      types.push(proto.constructor);
    }
  }
  return types;
}

phetCore.register('inheritance', inheritance);

export default inheritance;