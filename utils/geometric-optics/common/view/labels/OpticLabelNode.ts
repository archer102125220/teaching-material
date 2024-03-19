// Copyright 2022-2023, University of Colorado Boulder

/**
 * OpticLabelNode is the label on the optic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '@/utils/axon/DerivedProperty';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import Lens from '@/utils/geometric-optics/lens/model/Lens';
import Mirror from '@/utils/geometric-optics/mirror/model/Mirror';
import Optic from '@/utils/geometric-optics/common/model/Optic';
import LabelNode, { type LabelNodeOptions } from '@/utils/geometric-optics/common/view/labels/LabelNode';
import { type OpticSurfaceType } from '@/utils/geometric-optics/common/model/OpticSurfaceType';
import DerivedStringProperty from '@/utils/axon/DerivedStringProperty';

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
          throw new Error(`unsupported opticSurfaceType for lens: ${opticSurfaceType}`);
        }
      }
      else {
        // mirror
        window.assert && window.assert(optic instanceof Mirror);
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
          throw new Error(`unsupported opticSurfaceType for mirror: ${opticSurfaceType}`);
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