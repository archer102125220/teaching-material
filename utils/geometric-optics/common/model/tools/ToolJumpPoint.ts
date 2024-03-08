// Copyright 2022, University of Colorado Boulder

/**
 * ToolJumpPoint describes an 'interesting' point to place a tool, which can be 'jumped' to via the 'J' hotkey.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TReadOnlyProperty from '../../../../axon/TReadOnlyProperty';
import Vector2 from '../../../../dot/Vector2';
import geometricOptics from '../../../geometricOptics';

export default class ToolJumpPoint {

  // a position that is interesting to put a tool, in model coordinates
  public readonly positionProperty: TReadOnlyProperty<Vector2>;

  // whether the thing at the position is currently visible
  public readonly visibleProperty: TReadOnlyProperty<boolean>;

  public constructor(positionProperty: TReadOnlyProperty<Vector2>, visibleProperty: TReadOnlyProperty<boolean>) {
    this.positionProperty = positionProperty;
    this.visibleProperty = visibleProperty;
  }
}

geometricOptics.register('ToolJumpPoint', ToolJumpPoint);