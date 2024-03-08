// Copyright 2021-2023, University of Colorado Boulder

/**
 * LensNode displays a lens.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ModelViewTransform2 from '../../../phetcommon/view/ModelViewTransform2';
import { Line, Node, type NodeOptions, Path } from '../../../scenery/imports';
import geometricOptics from '../../geometricOptics';
import GOColors from '../../common/GOColors';
import Lens from '../model/Lens';
import { type OpticSurfaceType } from '../../common/model/OpticSurfaceType';
import LensShapes from '../model/LensShapes';
import Matrix3 from '../../../dot/Matrix3';
import GOQueryParameters from '../../common/GOQueryParameters';
import OriginNode from '../../common/view/OriginNode';
import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';
import type PickRequired from '../../../phet-core/types/PickRequired';

// constants
const FILL_PROPERTY = GOColors.lensFillProperty;
const STROKE_PROPERTY = GOColors.lensStrokeProperty;
const LINE_WIDTH = 2;
const ICON_RADIUS_OF_CURVATURE_MAGNITUDE = 20;
const ICON_DIAMETER = 30;

type SelfOptions = EmptySelfOptions;

type LensNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class LensNode extends Node {

  public constructor(lens: Lens, modelViewTransform: ModelViewTransform2, providedOptions: LensNodeOptions) {

    const options = optionize<LensNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      isDisposable: false,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions);

    super(options);

    const fillNode = new Path(null, {
      fill: FILL_PROPERTY
    });

    // Separate Node for stroke, because we'll be changing fillNode opacity to match IOR.
    const strokeNode = new Path(null, {
      stroke: STROKE_PROPERTY,
      lineWidth: LINE_WIDTH
    });

    // Vertical axis for the lens, see https://github.com/phetsims/geometric-optics/issues/190
    const verticalCenterLine = new Line(0, 0, 0, 1, {
      stroke: GOColors.verticalAxisStrokeProperty,
      lineWidth: 2
    });

    const children: Node[] = [fillNode, verticalCenterLine, strokeNode];

    // Red dot at the origin
    if (GOQueryParameters.debugOrigins) {
      children.push(new OriginNode());
    }

    this.children = children;

    // Shapes are described in model coordinates. Scale them to view coordinates.
    // Translation is handled by lens.positionProperty listener.
    const scaleVector = modelViewTransform.getMatrix().getScaleVector();
    const scalingMatrix = Matrix3.scaling(scaleVector.x, scaleVector.y);
    lens.shapesProperty.link(shapes => {
      const shape = shapes.lensShape.transformed(scalingMatrix);
      fillNode.shape = shape;
      strokeNode.shape = shape;
    });

    lens.positionProperty.link(position => {
      this.translation = modelViewTransform.modelToViewPosition(position);
    });

    lens.diameterProperty.link(diameter => {
      const radiusView = modelViewTransform.modelToViewDeltaY(diameter / 2);
      verticalCenterLine.setLine(0, -radiusView, 0, radiusView);
    });

    lens.opacityProperty.linkAttribute(fillNode, 'opacity');

    this.addLinkedElement(lens);
  }

  /**
   * Creates an icon for a lens.
   */
  public static createIconNode(opticSurfaceType: OpticSurfaceType): Node {
    assert && assert(opticSurfaceType !== 'flat', 'flat lens is not supported');

    const radiusOfCurvature = (opticSurfaceType === 'convex') ? ICON_RADIUS_OF_CURVATURE_MAGNITUDE : -ICON_RADIUS_OF_CURVATURE_MAGNITUDE;

    const lensShapes = new LensShapes(radiusOfCurvature, ICON_DIAMETER, {
      isHollywooded: false
    });

    const fillNode = new Path(lensShapes.lensShape, {
      fill: GOColors.lensFillProperty
    });

    const strokeNode = new Path(lensShapes.lensShape, {
      stroke: GOColors.lensStrokeProperty
    });

    return new Node({
      children: [fillNode, strokeNode]
    });
  }
}

geometricOptics.register('LensNode', LensNode);