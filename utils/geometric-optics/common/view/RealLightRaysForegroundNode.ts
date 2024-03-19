// Copyright 2022, University of Colorado Boulder

/**
 * RealLightRaysForegroundNode is a subclass of RealLightRaysNode that (using clipArea) renders the parts of RealLightRaysNode
 * that are in front of a real framed image, which has 3D perspective. It is intended to be used in
 * FramedSceneNode, where it is layered in front of the real image Node in the scene graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RealLightRaysNode, { type RealLightRaysNodeOptions } from '@/utils/geometric-optics/common/view/RealLightRaysNode';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import LightRays from '@/utils/geometric-optics/common/model/LightRays';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import GOQueryParameters from '@/utils/geometric-optics/common/GOQueryParameters';
import Bounds2 from '@/utils/dot/Bounds2';
import Vector2 from '@/utils/dot/Vector2';
import { Shape } from '@/utils/kite/imports';
import { Path } from '@/utils/scenery/imports';
import { type OpticalImageType } from '@/utils/geometric-optics/common/model/OpticalImageType';
import { type EmptySelfOptions, optionize3 } from '@/utils/phet-core/optionize';

type SelfOptions = EmptySelfOptions;

type RealLightRaysForegroundNodeOptions = SelfOptions & RealLightRaysNodeOptions;

export default class RealLightRaysForegroundNode extends RealLightRaysNode {

  /**
   * @param lightRays - model element
   * @param modelViewTransform
   * @param modelVisibleBoundsProperty - ScreenView's visibleBounds in the model coordinate frame, with the zoom transform applied
   * @param opticPositionProperty - position of the optic
   * @param framedImagePositionProperty - position of the optical object
   * @param opticalImageTypeProperty - type of optical image (real or virtual)
   * @param providedOptions
   */
  public constructor(lightRays: LightRays,
    modelViewTransform: ModelViewTransform2,
    modelVisibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    opticPositionProperty: TReadOnlyProperty<Vector2>,
    framedImagePositionProperty: TReadOnlyProperty<Vector2>,
    opticalImageTypeProperty: TReadOnlyProperty<OpticalImageType>,
    providedOptions: RealLightRaysForegroundNodeOptions) {

    const options = optionize3<RealLightRaysForegroundNodeOptions, SelfOptions, RealLightRaysNodeOptions>()({},
      providedOptions, {
      stroke: (GOQueryParameters.debugRays) ? 'red' : providedOptions.stroke
    });

    super(lightRays, modelViewTransform, options);

    // Show the clipArea.
    let clipAreaNode: Path;
    if (GOQueryParameters.debugRays) {
      clipAreaNode = new Path(null, {
        stroke: 'red'
      });
      this.addChild(clipAreaNode);
    }

    // Update the clipArea, to make rays look like they pass through a real Image.
    // This shows only the parts of this Node that are in the foreground, i.e. not occluded by other things.
    // Run with ?debugRays to see the clipArea rendered as a rectangle.
    const updateClipArea = () => {
      let clipArea: Shape | null; // in view coordinates

      if (opticalImageTypeProperty.value === 'virtual') {

        // virtual image
        clipArea = null;
      }
      else {

        // real image
        const opticPosition = opticPositionProperty.value;
        const framedImagePosition = framedImagePositionProperty.value;
        const viewVisibleBounds = modelViewTransform.modelToViewBounds(modelVisibleBoundsProperty.value);

        let minX: number;
        let maxX: number;
        if (framedImagePosition.x > opticPosition.x) {

          // For a real Image to the right of the optic, the clipArea is everything to the left of the Image,
          // because the Image is facing left in perspective.
          minX = viewVisibleBounds.minX;
          maxX = modelViewTransform.modelToViewX(framedImagePosition.x);
        }
        else {

          // For a real Image to the left of the optic, the clipArea is everything to the right of the Image,
          // because the Image is facing right in perspective.
          minX = modelViewTransform.modelToViewX(framedImagePosition.x);
          maxX = viewVisibleBounds.maxX;
        }
        clipArea = Shape.rectangle(minX, viewVisibleBounds.minY, maxX - minX, viewVisibleBounds.height);
      }
      this.clipArea = clipArea;

      if (clipAreaNode) {
        clipAreaNode.shape = clipArea;
      }
    };

    lightRays.raysProcessedEmitter.addListener(() => {
      if (this.visible) {
        updateClipArea();
      }
    });

    this.visibleProperty.link(visible => {
      if (visible) {
        updateClipArea();
      }
    });
  }
}

geometricOptics.register('RealLightRaysForegroundNode', RealLightRaysForegroundNode);