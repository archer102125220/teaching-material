// Copyright 2022-2023, University of Colorado Boulder

/**
 * OpticLabelNode is the label on the optic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/DerivedProperty';
import type TReadOnlyProperty from '../../../../axon/TReadOnlyProperty';
import { type EmptySelfOptions } from '../../../../phet-core/optionize';
import ModelViewTransform2 from '../../../../phetcommon/view/ModelViewTransform2';
import geometricOptics from '../../../geometricOptics';
import GeometricOpticsStrings from '../../../GeometricOpticsStrings';
import Lens from '../../../lens/model/Lens';
import Mirror from '../../../mirror/model/Mirror';
import Optic from '../../model/Optic';
import LabelNode, { type LabelNodeOptions } from './LabelNode';
import { type OpticSurfaceType } from '../../model/OpticSurfaceType';
import DerivedStringProperty from '../../../../axon/DerivedStringProperty';

type SelfOptions = EmptySelfOptions;

export type OpticLabelNodeOptions = SelfOptions & LabelNodeOptions;

export default class OpticLabelNode extends LabelNode {

  /**
   * @param optic - the optic to label
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param providedOptions
   */
  public constructor(optic: Optic,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    providedOptions: OpticLabelNodeOptions) {

    const opticLabelPositionProperty = new DerivedProperty(
      [optic.positionProperty, optic.diameterProperty],
      (position, diameter) => position.minusXY(0, diameter / 2)
    );

    const labelStringProperty = new DerivedStringProperty([
      optic.opticSurfaceTypeProperty,
      GeometricOpticsStrings.label.convexLensStringProperty,
      GeometricOpticsStrings.label.concaveLensStringProperty,
      GeometricOpticsStrings.label.convexMirrorStringProperty,
      GeometricOpticsStrings.label.concaveMirrorStringProperty,
      GeometricOpticsStrings.label.flatMirrorStringProperty
    ], (
      opticSurfaceType: OpticSurfaceType,
      convexLensString: string,
      concaveLensString: string,
      convexMirrorString: string,
      concaveMirrorString: string,
      flatMirrorString: string
    ) => {
      let text: string;
      if (optic instanceof Lens) {
        if (opticSurfaceType === 'convex') {
          text = convexLensString;
        }
        else if (opticSurfaceType === 'concave') {
          text = concaveLensString;
        }
        else {
          throw Error(`unsupported opticSurfaceType for lens: ${opticSurfaceType}`);
        }
      }
      else {
        // mirror
        assert && assert(optic instanceof Mirror); // eslint-disable-line no-simple-type-checking-assertions
        if (opticSurfaceType === 'convex') {
          text = convexMirrorString;
        }
        else if (opticSurfaceType === 'concave') {
          text = concaveMirrorString;
        }
        else if (opticSurfaceType === 'flat') {
          text = flatMirrorString;
        }
        else {
          throw Error(`unsupported opticSurfaceType for mirror: ${opticSurfaceType}`);
        }
      }
      return text;
    }, {
      tandem: providedOptions.tandem.createTandem('labelStringProperty')
    });

    super(labelStringProperty, opticLabelPositionProperty, zoomTransformProperty, providedOptions);
  }
}

geometricOptics.register('OpticLabelNode', OpticLabelNode);