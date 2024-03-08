// Copyright 2022-2023, University of Colorado Boulder

/**
 * OpticalObjectLabelNode is the base class of labeling optical objects.
 * It can label them as simply 'Object', or it can number them like 'Object 1'.
 * Numbering is dynamic to support PhET-iO.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
import LabelNode, { type LabelNodeOptions } from './LabelNode';
import GeometricOpticsStrings from '../../../GeometricOpticsStrings';
import geometricOptics from '../../../geometricOptics';
import StringUtils from '../../../../phetcommon/util/StringUtils';
import BooleanProperty from '../../../../axon/BooleanProperty';
import optionize from '../../../../phet-core/optionize';
import type TReadOnlyProperty from '../../../../axon/TReadOnlyProperty';
import Vector2 from '../../../../dot/Vector2';
import ModelViewTransform2 from '../../../../phetcommon/view/ModelViewTransform2';
import DerivedStringProperty from '../../../../axon/DerivedStringProperty';

type SelfOptions = {

  // Whether the object should be numbered, like 'Object 1'
  isNumberedProperty?: TReadOnlyProperty<boolean>;
};

export type OpticalObjectLabelNodeOptions = SelfOptions & LabelNodeOptions;

export default class OpticalObjectLabelNode extends LabelNode {

  /**
   * @param objectNumber - each optical object has a unique integer, used to label it
   * @param labelPositionProperty - position of the label
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param providedOptions
   */
  public constructor(objectNumber: number,
    labelPositionProperty: TReadOnlyProperty<Vector2>,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    providedOptions: OpticalObjectLabelNodeOptions) {

    const options = optionize<OpticalObjectLabelNodeOptions, SelfOptions, LabelNodeOptions>()({
      isNumberedProperty: new BooleanProperty(true)
    }, providedOptions);

    const labelStringProperty = new DerivedStringProperty([
      options.isNumberedProperty,
      GeometricOpticsStrings.label.objectStringProperty,
      GeometricOpticsStrings.label.objectNStringProperty
    ], (
      isNumbered: boolean,
      objectString: string,
      objectNString: string
    ) => isNumbered ? StringUtils.fillIn(objectNString, { objectNumber }) : objectString, {
      tandem: options.tandem.createTandem('labelStringProperty')
    });

    super(labelStringProperty, labelPositionProperty, zoomTransformProperty, options);
  }
}

geometricOptics.register('OpticalObjectLabelNode', OpticalObjectLabelNode);