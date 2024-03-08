// Copyright 2022, University of Colorado Boulder

/**
 * ArrowImage is the model of the optical image associated with an arrow object.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import geometricOptics from '../../geometricOptics';
import OpticalImage from './OpticalImage';
import Optic from './Optic';
import ArrowObject from './ArrowObject';
import type PickRequired from '../../../phet-core/types/PickRequired';
import { type TColor } from '../../../scenery/imports';

type ArrowImageOptions = PickRequired<OpticalImage, 'tandem' | 'phetioDocumentation'>;

export default class ArrowImage extends OpticalImage {

  // fill for the arrow image
  public readonly fill: TColor;

  /**
   * @param arrowObject - the optical object that this image is associated with
   * @param optic - the optic is responsible for forming the optical image
   * @param providedOptions
   */
  public constructor(arrowObject: ArrowObject, optic: Optic, providedOptions: ArrowImageOptions) {

    super(arrowObject, optic, providedOptions);

    this.fill = arrowObject.fill;
  }
}

geometricOptics.register('ArrowImage', ArrowImage);