// Copyright 2021-2022, University of Colorado Boulder

/**
 * LightObjectNode is the view of a light object. It looks like a lamp with a bulb, pointing towards the right.
 *
 * This class adds no additional functionality to its superclass, but is included for completeness and readability
 * of the type hierarchy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '@/utils/dot/Bounds2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import Vector2 from '@/utils/dot/Vector2';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import LightObject from '@/utils/geometric-optics/common/model/LightObject';
import HTMLImageElementObjectNode, { type HTMLImageElementObjectNodeOptions } from '@/utils/geometric-optics/common/view/HTMLImageElementObjectNode';
import { type ObjectDragMode } from '@/utils/geometric-optics/common/view/ObjectDragMode';
import type TProperty from '@/utils/axon/TProperty';

type LightObjectNodeOptions = HTMLImageElementObjectNodeOptions;

export default class LightObjectNode extends HTMLImageElementObjectNode {

  /**
   * @param lightObject - model element
   * @param sceneBoundsProperty - bounds for the scene, in model coordinates
   * @param opticPositionProperty - position of the optic
   * @param modelViewTransform
   * @param objectDragModeProperty - constrains how the light can be dragged
   * @param wasDraggedProperty - was ANY LightObjectNode dragged?
   * @param providedOptions
   */
  public constructor(lightObject: LightObject,
    sceneBoundsProperty: TReadOnlyProperty<Bounds2>,
    opticPositionProperty: TReadOnlyProperty<Vector2>,
    modelViewTransform: ModelViewTransform2,
    objectDragModeProperty: TReadOnlyProperty<ObjectDragMode>,
    wasDraggedProperty: TProperty<boolean>,
    providedOptions: LightObjectNodeOptions) {

    super(lightObject, sceneBoundsProperty, opticPositionProperty, modelViewTransform, objectDragModeProperty,
      wasDraggedProperty, providedOptions);
  }
}

geometricOptics.register('LightObjectNode', LightObjectNode);