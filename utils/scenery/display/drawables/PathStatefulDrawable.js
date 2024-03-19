// Copyright 2016-2022, University of Colorado Boulder

/**
 * A trait for drawables for Path that need to store state about what the current display is currently showing,
 * so that updates to the Path will only be made on attributes that specifically changed (and no change will be
 * necessary for an attribute that changed back to its original/currently-displayed value). Generally, this is used
 * for DOM and SVG drawables.
 *
 * This will mix in PaintableStatefulDrawable
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import _ from 'lodash';

import inheritance from '@/utils/phet-core/inheritance';
import memoize from '@/utils/phet-core/memoize';
import {
  PaintableStatefulDrawable,
  scenery,
  SelfDrawable
} from '@/utils/scenery/imports';

const PathStatefulDrawable = memoize((type) => {
  window.assert && window.assert(_.includes(inheritance(type), SelfDrawable));

  return class extends PaintableStatefulDrawable(type) {
    /**
     * @public
     * @override
     *
     * @param {number} renderer
     * @param {Instance} instance
     */
    initialize(renderer, instance, ...args) {
      super.initialize(renderer, instance, ...args);

      // @protected {boolean} - Flag marked as true if ANY of the drawable dirty flags are set (basically everything except for transforms, as we
      //                        need to accelerate the transform case.
      this.paintDirty = true;
      this.dirtyShape = true;
    }

    /**
     * A "catch-all" dirty method that directly marks the paintDirty flag and triggers propagation of dirty
     * information. This can be used by other mark* methods, or directly itself if the paintDirty flag is checked.
     * @public
     *
     * It should be fired (indirectly or directly) for anything besides transforms that needs to make a drawable
     * dirty.
     */
    markPaintDirty() {
      this.paintDirty = true;
      this.markDirty();
    }

    /**
     * @public
     */
    markDirtyShape() {
      this.dirtyShape = true;
      this.markPaintDirty();
    }

    /**
     * Clears all of the dirty flags (after they have been checked), so that future mark* methods will be able to flag them again.
     * @public
     */
    setToCleanState() {
      this.paintDirty = false;
      this.dirtyShape = false;
    }
  };
});

scenery.register('PathStatefulDrawable', PathStatefulDrawable);
export default PathStatefulDrawable;
