// Copyright 2021-2022, University of Colorado Boulder

/**
 * FramedObject is the model for the "framed objects". These are objects in a picture frame, with 3D perspective.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import DerivedProperty from '@/utils/axon/DerivedProperty';
import Vector2 from '@/utils/dot/Vector2';
import geometricOptics from '@/utils/geometric-optics//geometricOptics';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import OpticalObjectChoice, { type ObjectHTMLImageElements } from '@/utils/geometric-optics/common/model/OpticalObjectChoice';
import EnumerationProperty from '@/utils/axon/EnumerationProperty';
import HTMLImageElementObject, { type HTMLImageElementObjectOptions } from '@/utils/geometric-optics/common/model/HTMLImageElementObject';
import type PickRequired from '@/utils/phet-core/types/PickRequired';

// x should be 1/2 of PNG file width. y should be the tip of the pencil. +x right, +y down.
const ORIGIN_OFFSET = new Vector2(68.5, 100);

// Scale that will be applied to .png files for all framed objects.
const SCALE_FACTOR = 0.25;

type FramedObjectOptions = PickRequired<HTMLImageElementObjectOptions, 'position' | 'tandem'>;

export default class FramedObject extends HTMLImageElementObject {

  // HTMLImageElements (PNG files) used to draw this framed object and its associated image
  public readonly objectHTMLImageElementsProperty: TReadOnlyProperty<ObjectHTMLImageElements>;

  /**
   * @param opticalObjectNumber - positive integer used when labeling this object
   * @param opticPositionProperty
   * @param opticalObjectChoiceProperty
   * @param providedOptions
   */
  public constructor(opticalObjectNumber: number,
    opticPositionProperty: TReadOnlyProperty<Vector2>,
    opticalObjectChoiceProperty: EnumerationProperty<OpticalObjectChoice>,
    providedOptions: FramedObjectOptions) {

    const objectHTMLImageElementsProperty = new DerivedProperty(
      [opticalObjectChoiceProperty], opticalObjectChoice => {
        let objectHTMLImageElements = opticalObjectChoice.objectHTMLImageElements;

        // If the object choice isn't a framed object, fallback to PENCIL.
        if (!objectHTMLImageElements) {
          window.assert && window.assert(OpticalObjectChoice.PENCIL.objectHTMLImageElements);
          objectHTMLImageElements = OpticalObjectChoice.PENCIL.objectHTMLImageElements!;
        }

        return objectHTMLImageElements;
      }
    );

    const htmlImageElementProperty = new DerivedProperty([objectHTMLImageElementsProperty],
      objectHTMLImageElements => objectHTMLImageElements.rightFacingUpright);

    super(opticalObjectNumber, opticPositionProperty, htmlImageElementProperty, ORIGIN_OFFSET, SCALE_FACTOR, providedOptions);

    this.objectHTMLImageElementsProperty = objectHTMLImageElementsProperty;
  }
}

geometricOptics.register('FramedObject', FramedObject);