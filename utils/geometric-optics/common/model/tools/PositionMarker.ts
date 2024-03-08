// Copyright 2022, University of Colorado Boulder

/**
 * PositionMarker is used to mark an arbitrary position.
 * See https://github.com/phetsims/geometric-optics/issues/355
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import geometricOptics from '../../../geometricOptics';
import type PickRequired from '../../../../phet-core/types/PickRequired';
import { type TColor } from '../../../../scenery/imports';
import GOTool, { type GOToolOptions } from './GOTool';

type SelfOptions = {
  fill: TColor;
  stroke: TColor;
};

type PositionMarkerOptions = SelfOptions & PickRequired<GOToolOptions, 'tandem'>;

export default class PositionMarker extends GOTool {

  // fill and stroke for the marker
  public readonly fill: TColor;
  public readonly stroke: TColor;

  public constructor(providedOptions: PositionMarkerOptions) {

    super(providedOptions);

    this.fill = providedOptions.fill;
    this.stroke = providedOptions.stroke;
  }
}

geometricOptics.register('PositionMarker', PositionMarker);