// Copyright 2022, University of Colorado Boulder

/**
 * A trait for subtypes of Node, used to prevent children being added/removed to that subtype of Node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { Node, scenery } from '../imports';
import memoize from '../../phet-core/memoize';
import type IntentionalAny from '../../phet-core/types/IntentionalAny';
import type Constructor from '../../phet-core/types/Constructor';

const Leaf = memoize(<SuperType extends Constructor<Node>>(type: SuperType) => {

  return class LeafMixin extends type {
    public constructor(...args: IntentionalAny[]) {
      super(...args);
    }

    public override insertChild(index: number, node: Node): this {
      throw new Error('Attempt to insert child into Leaf');
    }

    public override removeChildWithIndex(node: Node, indexOfChild: number): void {
      throw new Error('Attempt to remove child from Leaf');
    }
  };
});

scenery.register('Leaf', Leaf);

export default Leaf;
