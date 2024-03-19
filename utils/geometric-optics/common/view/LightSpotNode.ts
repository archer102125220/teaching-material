// Copyright 2021-2023, University of Colorado Boulder

/**
 * LightSpotNode is a light spot that is projected onto the projection screen.
 * It is responsible for creating the light spot's shape, and clipping it to the projection screen.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '@/utils/dot/Utils';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { Node, type NodeOptions, Path } from '@/utils/scenery/imports';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import LightSpot from '@/utils/geometric-optics/common/model/LightSpot';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import ProjectionScreen from '@/utils/geometric-optics/common/model/ProjectionScreen';
import GOQueryParameters from '@/utils/geometric-optics/common/GOQueryParameters';
import { Shape } from '@/utils/kite/imports';
import Multilink from '@/utils/axon/Multilink';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';

type SelfOptions = EmptySelfOptions;

type LightSpotNodeOptions = SelfOptions & PickRequired<NodeOptions, 'visibleProperty' | 'tandem'>;

export default class LightSpotNode extends Node {

  public constructor(lightSpot: LightSpot,
    projectionScreen: ProjectionScreen,
    modelViewTransform: ModelViewTransform2,
    providedOptions: LightSpotNodeOptions) {

    const options = optionize<LightSpotNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      isDisposable: false
    }, providedOptions);

    super(options);

    // Fill color of the spot
    const fillPath = new Path(null, {
      fill: GOColors.lightSpotFillProperty
    });

    // Dashed outline of the spot, so it's easier to see when intensity is low.
    // See https://github.com/phetsims/geometric-optics/issues/240
    const strokePath = new Path(null, {
      stroke: GOColors.lightSpotStrokeProperty,
      lineWidth: 0.75,
      lineDash: [4, 4]
    });

    const fillAndStrokeNode = new Node({
      children: [fillPath, strokePath]
    });
    this.addChild(fillAndStrokeNode);

    // Complete, un-clipped path, for debugging.
    let debugStrokePath: Path | null = null;
    if (GOQueryParameters.debugLightSpots) {
      debugStrokePath = new Path(null, {
        stroke: 'red'
      });
      this.addChild(debugStrokePath);
    }

    Multilink.multilink([lightSpot.positionProperty, lightSpot.diameterProperty],
      (position, diameter) => {

        // An ellipse with aspect ratio of 1:2, to give pseudo-3D perspective.
        const radiusX = diameter / 4;
        const radiusY = diameter / 2;
        const modelShape = Shape.ellipse(position.x, position.y, radiusX, radiusY, 2 * Math.PI);

        const viewShape = modelViewTransform.modelToViewShape(modelShape);
        fillPath.shape = viewShape;
        strokePath.shape = viewShape;
        debugStrokePath && (debugStrokePath.shape = viewShape);
      });

    lightSpot.intensityProperty.link(intensity => {

      // Opacity is equivalent to opacity.
      window.assert && window.assert(GOConstants.OPACITY_RANGE.equals(GOConstants.INTENSITY_RANGE));
      const opacity = intensity;

      // Intensity of light is the opacity of the spot color.
      fillPath.opacity = opacity;

      // Dashed outline is visible only for lower intensities [0,0.25], and becomes more visible as intensity decreases.
      // See https://github.com/phetsims/geometric-optics/issues/240
      strokePath.opacity = Utils.clamp(Utils.linear(0, 0.25, 1, 0, opacity), 0, 1);
    });

    // Clip the light spot to the projection screen.
    projectionScreen.positionProperty.link(projectionScreenPosition => {
      const projectionScreenShape = projectionScreen.getScreenShapeTranslated();
      fillAndStrokeNode.clipArea = modelViewTransform.modelToViewShape(projectionScreenShape);
    });

    this.addLinkedElement(lightSpot);
  }
}

geometricOptics.register('LightSpotNode', LightSpotNode);