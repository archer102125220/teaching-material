// Copyright 2022, University of Colorado Boulder

/**
 * ArrowObject is the model for arrow objects.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import geometricOptics from '../../geometricOptics';
import OpticalObject, { type OpticalObjectOptions } from './OpticalObject';
import type TReadOnlyProperty from '../../../axon/TReadOnlyProperty';
import Vector2 from '../../../dot/Vector2';
import type PickRequired from '../../../phet-core/types/PickRequired';
import { type TColor } from '../../../scenery/imports';

type SelfOptions = {
  fill: TColor; // the fill color for the arrow
};

type ArrowObjectOptions = SelfOptions & PickRequired<OpticalObjectOptions, 'position' | 'tandem'>;

export default class ArrowObject extends OpticalObject {

  // fill for the arrow object
  public readonly fill: TColor;

  // See https://github.com/phetsims/geometric-optics/issues/429, in cm
  public static readonly MAX_MAGNITUDE = 80;

  /**
   * @param opticalObjectNumber - positive integer used when labeling this object
   * @param opticPositionProperty
   * @param providedOptions
   */
  public constructor(opticalObjectNumber: number, opticPositionProperty: TReadOnlyProperty<Vector2>, providedOptions: ArrowObjectOptions) {

    super(opticalObjectNumber, opticPositionProperty, providedOptions);

    this.fill = providedOptions.fill;
  }
}

geometricOptics.register('ArrowObject', ArrowObject);