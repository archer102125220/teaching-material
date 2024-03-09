// Copyright 2015-2022, University of Colorado Boulder

/**
 * A Node meant to just take up certain bounds. It is never displayed, and cannot have children.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Bounds2 from '../../dot/Bounds2';
import { Leaf, Node, type NodeOptions, scenery } from '../imports';

export type SpacerOptions = NodeOptions;

export default class Spacer extends Leaf(Node) {
  /**
   * Creates a spacer taking up a rectangular area from x: [0,width] and y: [0,height]. Use x/y in options to control
   * its position.
   *
   * @param width - The width of the spacer
   * @param height - The height of the spacer
   * @param [options] - Passed to Node
   */
  public constructor(width: number, height: number, options?: SpacerOptions) {
    window.assert && window.assert(isFinite(width), 'width should be a finite number');
    window.assert && window.assert(isFinite(height), 'height should be a finite number');

    super();

    // override the local bounds to our area
    this.localBounds = new Bounds2(0, 0, width, height);

    this.mutate(options);
  }
}

scenery.register('Spacer', Spacer);
