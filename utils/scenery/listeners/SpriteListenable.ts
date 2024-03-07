// Copyright 2022, University of Colorado Boulder

/**
 * A trait to be mixed into PressListeners for identifying which SpriteInstance of a given Sprites node was interacted
 * with, AND will prevent interactions that are NOT over any SpriteInstances.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import _ from 'lodash';

import inheritance from '../../phet-core/inheritance';
import memoize from '../../phet-core/memoize';
import type Constructor from '../../phet-core/types/Constructor';
import { PressListener, type PressListenerEvent, scenery, SpriteInstance, Sprites, Node } from '../imports';
import type IntentionalAny from '../../phet-core/types/IntentionalAny';

/**
 * @param type - Should be a PressListener-based type
 */
const SpriteListenable = memoize(<SuperType extends Constructor<PressListener>>(type: SuperType) => {
  assert && assert(_.includes(inheritance(type), PressListener), 'Only PressListener subtypes should mix SpriteListenable');

  return class extends type {

    public spriteInstance: SpriteInstance | null = null;

    public constructor(...args: IntentionalAny[]) {
      super(...args);
    }

    /**
     * @override - see PressListener
     */
    public override press(event: PressListenerEvent, targetNode?: Node, callback?: () => void): boolean {
      // If pressed, then the press would be exited later AND we wouldn't want to override our spriteInstance anyway.
      if ((this as unknown as PressListener).isPressed) { return false; }

      // Zero it out, so we only respond to Sprites instances.
      this.spriteInstance = null;

      if (event.currentTarget instanceof Sprites) {
        const sprites = event.currentTarget;

        this.spriteInstance = sprites.getSpriteInstanceFromPoint(sprites.globalToLocalPoint(event.pointer.point));
      }

      // If we have no instance, don't super-call (same behavior for never starting a press)
      if (this.spriteInstance) {
        return super.press(event, targetNode, callback);
      }
      else {
        return false;
      }
    }
  };
});

scenery.register('SpriteListenable', SpriteListenable);
export default SpriteListenable;