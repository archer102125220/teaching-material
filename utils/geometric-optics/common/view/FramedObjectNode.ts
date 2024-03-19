// Copyright 2021-2022, University of Colorado Boulder

/**
 * FramedObjectNode is the view of a framed object, an object in a picture frame, with 3D perspective.
 *
 * This class adds no additional functionality to its superclass, but is included for completeness and readability
 * of the type hierarchy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '@/utils/dot/Bounds2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import FramedObject from '@/utils/geometric-optics/common/model/FramedObject';
import Vector2 from '@/utils/dot/Vector2';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import HTMLImageElementObjectNode, { type HTMLImageElementObjectNodeOptions } from '@/utils/geometric-optics/common/view/HTMLImageElementObjectNode.js';
import { type ObjectDragMode } from '@/utils/geometric-optics/common/view/ObjectDragMode';
import type TProperty from '@/utils/axon/TProperty';

type FramedObjectNodeOptions = HTMLImageElementObjectNodeOptions;

export default class FramedObjectNode extends HTMLImageElementObjectNode {

  /**
   * @param framedObject - model element
   * @param sceneBoundsProperty - bounds for the scene, in model coordinates
   * @param opticPositionProperty - position of the optic
   * @param modelViewTransform
   * @param objectDragModeProperty - constrains how the object can be dragged
   * @param wasDraggedProperty - was this framed object dragged?
   * @param providedOptions
   */
  public constructor(framedObject: FramedObject,
    sceneBoundsProperty: TReadOnlyProperty<Bounds2>,
    opticPositionProperty: TReadOnlyProperty<Vector2>,
    modelViewTransform: ModelViewTransform2,
    objectDragModeProperty: TReadOnlyProperty<ObjectDragMode>,
    wasDraggedProperty: TProperty<boolean>,
    providedOptions: FramedObjectNodeOptions) {

    super(framedObject, sceneBoundsProperty, opticPositionProperty, modelViewTransform, objectDragModeProperty,
      wasDraggedProperty, providedOptions);
  }
}

geometricOptics.register('FramedObjectNode', FramedObjectNode);