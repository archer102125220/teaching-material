// Copyright 2021-2023, University of Colorado Boulder

/**
 * OpticSurfaceTypeRadioButtonGroup is the radio button group for controlling the surface type of the optic.
 *
 * @author Sarah Chang (Swarthmore College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RectangularRadioButtonGroup, { type RectangularRadioButtonGroupOptions } from '../../../sun/buttons/RectangularRadioButtonGroup';
import geometricOptics from '../../geometricOptics';
import GOColors from '../GOColors';
import Optic from '../model/Optic';
import { type OpticSurfaceType } from '../model/OpticSurfaceType';
import Lens from '../../lens/model/Lens';
import MirrorNode from '../../mirror/view/MirrorNode';
import LensNode from '../../lens/view/LensNode';
import type PickRequired from '../../../phet-core/types/PickRequired';
import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';
import { type NodeTranslationOptions } from '../../../scenery/imports';
import Tandem from '../../../tandem/Tandem';
import { type GOSimOptions } from '../../GOSim';

type SelfOptions = EmptySelfOptions;

type OpticShapeRadioButtonGroupOptions = SelfOptions &
  PickRequired<GOSimOptions, 'isBasicsVersion'> &
  PickRequired<RectangularRadioButtonGroupOptions, 'tandem'> &
  NodeTranslationOptions;

export default class OpticSurfaceTypeRadioButtonGroup extends RectangularRadioButtonGroup<OpticSurfaceType> {

  public constructor(optic: Optic, providedOptions: OpticShapeRadioButtonGroupOptions) {

    const options = optionize<OpticShapeRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()({

      // RectangularRadioButtonGroupOptions
      visible: !providedOptions.isBasicsVersion, // not visible in the Basics version
      orientation: 'horizontal',
      spacing: 10,
      touchAreaXDilation: 4,
      touchAreaYDilation: 5,
      radioButtonOptions: {
        baseColor: GOColors.curveRadioButtonFillProperty,
        cornerRadius: 3,
        xMargin: 14,
        yMargin: 5,
        buttonAppearanceStrategyOptions: {
          selectedStroke: GOColors.curveRadioButtonSelectedStrokeProperty,
          deselectedStroke: GOColors.curveRadioButtonDeselectedStrokeProperty,
          deselectedLineWidth: 2,
          selectedLineWidth: 2
        }
      }
    }, providedOptions);

    // A radio button for each shape supported by the optic
    window.assert && window.assert(optic.opticSurfaceTypeProperty.validValues); // {OpticSurfaceType[]|undefined}
    const validValues = optic.opticSurfaceTypeProperty.validValues!;

    const items = validValues.map(
      (opticSurfaceType: OpticSurfaceType) => {
        return {
          value: opticSurfaceType,
          createNode: (tandem: Tandem) => (optic instanceof Lens) ? LensNode.createIconNode(opticSurfaceType) : MirrorNode.createIconNode(opticSurfaceType),
          tandemName: `${opticSurfaceType}RadioButton`
        };
      });

    super(optic.opticSurfaceTypeProperty, items, options);
  }
}

geometricOptics.register('OpticSurfaceTypeRadioButtonGroup', OpticSurfaceTypeRadioButtonGroup);