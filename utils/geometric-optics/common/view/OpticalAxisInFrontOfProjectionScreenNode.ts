// Copyright 2021-2023, University of Colorado Boulder

/**
 * OpticalAxisInFrontOfProjectionScreenNode is the part of the optical axis that is in front of the projection screen
 * in LightSceneNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import Bounds2 from '@/utils/dot/Bounds2';
import Vector2 from '@/utils/dot/Vector2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { Line, type LineOptions } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import GOQueryParameters from '@/utils/geometric-optics/common/GOQueryParameters';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import type PickOptional from '@/utils/phet-core/types/PickOptional';

type SelfOptions = EmptySelfOptions;

export type OpticalAxisInFrontOfProjectionScreenNodeOptions = SelfOptions &
  PickRequired<LineOptions, 'visibleProperty'> &
  PickOptional<LineOptions, 'stroke'>;

export default class OpticalAxisInFrontOfProjectionScreenNode extends Line {

  /**
   * @param opticPositionProperty
   * @param projectionScreenPositionProperty
   * @param modelVisibleBoundsProperty - ScreenView's visibleBounds in the model coordinate frame, with the zoom transform applied
   * @param modelViewTransform
   * @param providedOptions
   */
  public constructor(opticPositionProperty: TReadOnlyProperty<Vector2>,
    projectionScreenPositionProperty: TReadOnlyProperty<Vector2>,
    modelVisibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    modelViewTransform: ModelViewTransform2,
    providedOptions: OpticalAxisInFrontOfProjectionScreenNodeOptions) {

    const options = optionize<OpticalAxisInFrontOfProjectionScreenNodeOptions, SelfOptions, LineOptions>()({

      // LineOptions
      stroke: GOQueryParameters.debugOpticalAxis ? 'red' : GOColors.opticalAxisStrokeProperty,
      lineWidth: 2,
      lineDash: [8, 5],
      isDisposable: false
    }, providedOptions);

    // create optical axis line, with arbitrary length values.
    super(0, 0, 1, 0, options);

    // Set the left extent of the optical axis line.
    modelVisibleBoundsProperty.link(modelVisibleBounds => {
      this.setX1(modelViewTransform.modelToViewX(modelVisibleBounds.minX));
    });

    // Set the right extent of the optical axis line.
    projectionScreenPositionProperty.link(projectionScreenPosition => {
      this.setX2(modelViewTransform.modelToViewX(projectionScreenPosition.x));
    });

    // Set the y position of the optical axis line.
    opticPositionProperty.link(position => {
      const yView = modelViewTransform.modelToViewY(position.y);
      this.setY1(yView);
      this.setY2(yView);
    });
  }
}

geometricOptics.register('OpticalAxisInFrontOfProjectionScreenNode', OpticalAxisInFrontOfProjectionScreenNode);
