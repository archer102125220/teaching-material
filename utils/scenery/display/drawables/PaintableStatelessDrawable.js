// Copyright 2016-2023, University of Colorado Boulder

/**
 * A trait for drawables for Paintable nodes that does not store the fill/stroke state, as it just needs to track
 * dirtyness overall.
 *
 * Assumes existence of the markPaintDirty method.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import _ from 'lodash';

import inheritance from '@/utils/phet-core/inheritance';
import memoize from '@/utils/phet-core/memoize';
import { Color, PaintObserver, scenery, SelfDrawable } from '@/utils/scenery/imports';

const PaintableStatelessDrawable = memoize((type) => {
  window.assert && window.assert(_.includes(inheritance(type), SelfDrawable));

  return class extends type {
    /**
     * @public
     * @override
     *
     * @param {number} renderer
     * @param {Instance} instance
     */
    initialize(renderer, instance, ...args) {
      super.initialize(renderer, instance, ...args);

      // @private {function}
      this.fillCallback = this.fillCallback || this.markDirtyFill.bind(this);
      this.strokeCallback =
        this.strokeCallback || this.markDirtyStroke.bind(this);

      // @private {PaintObserver}
      this.fillObserver =
        this.fillObserver || new PaintObserver(this.fillCallback);
      this.strokeObserver =
        this.strokeObserver || new PaintObserver(this.strokeCallback);

      this.fillObserver.setPrimary(instance.node._fill);
      this.strokeObserver.setPrimary(instance.node._stroke);
    }

    /**
     * Releases references
     * @public
     * @override
     */
    dispose() {
      this.fillObserver.clean();
      this.strokeObserver.clean();

      super.dispose();
    }

    /**
     * @public
     */
    markDirtyFill() {
      assert && Color.checkPaint(this.instance.node._fill);

      this.markPaintDirty();
      this.fillObserver.setPrimary(this.instance.node._fill);
      // TODO: look into having the fillObserver be notified of Node changes as our source https://github.com/phetsims/scenery/issues/1581
    }

    /**
     * @public
     */
    markDirtyStroke() {
      assert && Color.checkPaint(this.instance.node._stroke);

      this.markPaintDirty();
      this.strokeObserver.setPrimary(this.instance.node._stroke);
      // TODO: look into having the strokeObserver be notified of Node changes as our source https://github.com/phetsims/scenery/issues/1581
    }

    /**
     * @public
     */
    markDirtyLineWidth() {
      this.markPaintDirty();
    }

    /**
     * @public
     */
    markDirtyLineOptions() {
      this.markPaintDirty();
    }

    /**
     * @public
     */
    markDirtyCachedPaints() {
      this.markPaintDirty();
    }
  };
});

scenery.register('PaintableStatelessDrawable', PaintableStatelessDrawable);
export default PaintableStatelessDrawable;
