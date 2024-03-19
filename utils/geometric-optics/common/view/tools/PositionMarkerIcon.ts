// Copyright 2022-2023, University of Colorado Boulder

/**
 * PositionMarkerIcon is a position-marker icon that appears in the toolbox. It is associated with a specific
 * position-marker Node, and forwards events to that Node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import Vector2 from '@/utils/dot/Vector2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import PositionMarkerNode from '@/utils/geometric-optics/common/view/tools/PositionMarkerNode';
import MapMarkerNode from '@/utils/geometric-optics/common/view/MapMarkerNode';
import GOToolIcon from '@/utils/geometric-optics/common/view/tools/GOToolIcon';
import PositionMarker from '@/utils/geometric-optics/common/model/tools/PositionMarker';

export default class PositionMarkerIcon extends GOToolIcon {

  /**
   * @param positionMarker - model element
   * @param positionMarkerNode - view element
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   */
  public constructor(positionMarker: PositionMarker,
    positionMarkerNode: PositionMarkerNode,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>) {

    // GOToolIconOptions
    const options = {
      touchAreaDilationX: 5,
      touchAreaDilationY: 5,
      mouseAreaDilationX: 5,
      mouseAreaDilationY: 5
    };

    const contentNode = new MapMarkerNode({
      fill: positionMarker.fill,
      stroke: positionMarker.stroke,
      scale: 0.8 // slightly smaller for toolbox icon
    });

    const pointerPositionToToolPosition = (pointerPosition: Vector2) => {
      const zoomTransform = zoomTransformProperty.value;
      const viewPosition = positionMarkerNode.globalToParentPoint(pointerPosition);
      const x = viewPosition.x;
      const y = viewPosition.y - positionMarkerNode.height;
      return zoomTransform.viewToModelXY(x, y);
    };

    super(contentNode, positionMarker, positionMarkerNode, pointerPositionToToolPosition, options);
  }
}

geometricOptics.register('PositionMarkerIcon', PositionMarkerIcon);