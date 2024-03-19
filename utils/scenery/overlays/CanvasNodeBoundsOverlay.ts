// Copyright 2013-2022, University of Colorado Boulder

/**
 * Displays CanvasNode bounds.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { Shape } from '@/utils/kite/imports';
import { CanvasNode, Display, type TOverlay, Node, scenery, ShapeBasedOverlay, Trail } from '@/utils/scenery/imports';

export default class CanvasNodeBoundsOverlay extends ShapeBasedOverlay implements TOverlay {
  public constructor(display: Display, rootNode: Node) {
    super(display, rootNode, 'canvasNodeBoundsOverlay');
  }

  public addShapes(): void {
    new Trail(this.rootNode).eachTrailUnder(trail => {
      const node = trail.lastNode();
      if (!node.isVisible()) {
        // skip this subtree if the node is invisible
        return true;
      }
      if ((node instanceof CanvasNode) && trail.isVisible()) {
        const transform = trail.getTransform();

        this.addShape(transform.transformShape(Shape.bounds(node.selfBounds)), 'rgba(0,255,0,0.8)', true);
      }
      return false;
    });
  }
}

scenery.register('CanvasNodeBoundsOverlay', CanvasNodeBoundsOverlay);
