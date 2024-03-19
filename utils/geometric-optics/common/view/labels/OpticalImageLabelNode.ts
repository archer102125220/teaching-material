// Copyright 2022-2023, University of Colorado Boulder

/**
 * OpticalImageLabelNode is the base class of labeling optical images, and distinguishes between real and virtual.
 * It can label them as simply 'Real Image', or it can number them like 'Real Image 1'.
 * Numbering is dynamic to support PhET-iO.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
import LabelNode, { type LabelNodeOptions } from '@/utils/geometric-optics/common/view/labels/LabelNode';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import StringUtils from '@/utils/phetcommon/util/StringUtils';
import BooleanProperty from '@/utils/axon/BooleanProperty';
import optionize from '@/utils/phet-core/optionize';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import Vector2 from '@/utils/dot/Vector2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import OpticalImage from '@/utils/geometric-optics/common/model/OpticalImage';
import DerivedStringProperty from '@/utils/axon/DerivedStringProperty';

type SelfOptions = {

  // Whether the object should be numbered, like 'Object 1'
  isNumberedProperty?: TReadOnlyProperty<boolean>;
};

export type OpticalImageLabelNodeOptions = SelfOptions & LabelNodeOptions;

export default class OpticalImageLabelNode extends LabelNode {

  /**
   * @param opticalImage - the optical image to label
   * @param labelPositionProperty - the position of the label
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param providedOptions
   */
  public constructor(opticalImage: OpticalImage,
    labelPositionProperty: TReadOnlyProperty<Vector2>,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    providedOptions: OpticalImageLabelNodeOptions) {

    const options = optionize<OpticalImageLabelNodeOptions, SelfOptions, LabelNodeOptions>()({
      isNumberedProperty: new BooleanProperty(true)
    }, providedOptions);

    const labelStringProperty = new DerivedStringProperty([
      opticalImage.opticalImageTypeProperty,
      options.isNumberedProperty,
      GeometricOpticsStrings.label.realImageStringProperty,
      GeometricOpticsStrings.label.realImageNStringProperty,
      GeometricOpticsStrings.label.virtualImageStringProperty,
      GeometricOpticsStrings.label.virtualImageNStringProperty
    ], (
      opticalImageType,
      isNumbered,
      realImageString,
      realImageNString,
      virtualImageString,
      virtualImageNString
    ) => {
      let text: string;
      if (isNumbered) {

        // Switch between 'Real Image N' and 'Virtual Image N'
        const stringPattern = (opticalImageType === 'real') ? realImageNString : virtualImageNString;
        text = StringUtils.fillIn(stringPattern, {
          imageNumber: opticalImage.opticalObject.opticalObjectNumber
        });
      }
      else {

        // Switch between 'Real Image' and 'Virtual Image'
        text = (opticalImageType === 'real') ? realImageString : virtualImageString;
      }
      return text;
    }, {
      tandem: options.tandem.createTandem('labelStringProperty')
    });

    super(labelStringProperty, labelPositionProperty, zoomTransformProperty, options);
  }
}

geometricOptics.register('OpticalImageLabelNode', OpticalImageLabelNode);