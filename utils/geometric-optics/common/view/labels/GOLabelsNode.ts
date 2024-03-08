// Copyright 2021-2023, University of Colorado Boulder

/**
 * GOLabelsNode is the base class for labeling things in a scene, supporting the "Labels" feature.
 * It is responsible for labeling the optic, optical axis, and focal points (F, 2F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sarah Chang (Swarthmore College)
 */

import DerivedProperty from '../../../../axon/DerivedProperty';
import Vector2 from '../../../../dot/Vector2';
import { Node, type NodeOptions } from '../../../../scenery/imports';
import geometricOptics from '../../../geometricOptics';
import GeometricOpticsStrings from '../../../GeometricOpticsStrings';
import LabelNode from './LabelNode';
import ModelViewTransform2 from '../../../../phetcommon/view/ModelViewTransform2';
import Bounds2 from '../../../../dot/Bounds2';
import type TReadOnlyProperty from '../../../../axon/TReadOnlyProperty';
import OpticLabelNode from './OpticLabelNode';
import type PickRequired from '../../../../phet-core/types/PickRequired';
import GOSceneNode from '../GOSceneNode';
import optionize, { type EmptySelfOptions } from '../../../../phet-core/optionize';

const FOCAL_POINT_LABEL_Y_OFFSET = 7;

type SelfOptions = EmptySelfOptions;

export type GOSceneLabelsNodeOptions = SelfOptions & PickRequired<NodeOptions, 'visibleProperty' | 'tandem' | 'phetioDocumentation'>;

export default class GOLabelsNode extends Node {

  /**
   * @param sceneNode - the scene whose components we are labeling
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param modelVisibleBoundsProperty - ScreenView's visibleBounds in the model coordinate frame, with the zoom transform applied
   * @param providedOptions
   */
  protected constructor(sceneNode: GOSceneNode,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    modelVisibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    providedOptions: GOSceneLabelsNodeOptions) {

    const options = optionize<GOSceneLabelsNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      isDisposable: false
    }, providedOptions);

    super(options);

    const optic = sceneNode.scene.optic;

    // Optic label ------------------------------------------------------------------------------------

    const opticLabel = new OpticLabelNode(optic, zoomTransformProperty, {
      visibleProperty: sceneNode.opticNodeVisibleProperty,
      tandem: options.tandem.createTandem('opticLabel')
    });
    this.addChild(opticLabel);

    // Optical Axis label ------------------------------------------------------------------------------------

    // Under the optical axis, but at the far-left of the model bounds.
    const opticalAxisLabelPositionProperty = new DerivedProperty(
      [optic.positionProperty, modelVisibleBoundsProperty, zoomTransformProperty],
      (opticPosition, modelVisibleBounds, zoomTransform) => {
        const modelXOffset = zoomTransform.viewToModelDeltaX(10);
        return new Vector2(modelVisibleBounds.x + modelXOffset, opticPosition.y);
      });

    const opticalAxisLabel = new LabelNode(GeometricOpticsStrings.label.opticalAxisStringProperty,
      opticalAxisLabelPositionProperty, zoomTransformProperty, {
      xAlign: 'left',
      yOffset: 5,
      visibleProperty: sceneNode.opticalAxisNodeVisibleProperty,
      tandem: options.tandem.createTandem('opticalAxisLabel')
    });
    this.addChild(opticalAxisLabel);

    // Focal Point labels ------------------------------------------------------------------------------------

    const leftFocalPointLabel = new LabelNode(GeometricOpticsStrings.label.FStringProperty,
      optic.leftFocalPointProperty, zoomTransformProperty, {
      yOffset: FOCAL_POINT_LABEL_Y_OFFSET,
      visibleProperty: sceneNode.leftFocalPointNodeVisibleProperty,
      tandem: options.tandem.createTandem('leftFocalPointLabel')
    });
    this.addChild(leftFocalPointLabel);

    const rightFocalPointLabel = new LabelNode(GeometricOpticsStrings.label.FStringProperty,
      optic.rightFocalPointProperty, zoomTransformProperty, {
      yOffset: FOCAL_POINT_LABEL_Y_OFFSET,
      visibleProperty: sceneNode.rightFocalPointNodeVisibleProperty,
      tandem: options.tandem.createTandem('rightFocalPointLabel')
    });
    this.addChild(rightFocalPointLabel);

    // 2F Point labels ----------------------------------------------------------------------------------------

    const left2FPointLabel = new LabelNode(GeometricOpticsStrings.label.twoFStringProperty,
      optic.left2FProperty, zoomTransformProperty, {
      yOffset: FOCAL_POINT_LABEL_Y_OFFSET,
      visibleProperty: sceneNode.left2FPointNodeVisibleProperty,
      tandem: options.tandem.createTandem('left2FPointLabel')
    });
    this.addChild(left2FPointLabel);

    const right2FPointLabel = new LabelNode(GeometricOpticsStrings.label.twoFStringProperty,
      optic.right2FProperty, zoomTransformProperty, {
      yOffset: FOCAL_POINT_LABEL_Y_OFFSET,
      visibleProperty: sceneNode.right2FPointNodeVisibleProperty,
      tandem: options.tandem.createTandem('right2FPointLabel')
    });
    this.addChild(right2FPointLabel);
  }
}

geometricOptics.register('GOLabelsNode', GOLabelsNode);