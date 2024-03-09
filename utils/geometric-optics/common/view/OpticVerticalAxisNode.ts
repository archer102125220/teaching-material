// Copyright 2021-2023, University of Colorado Boulder

/**
 * OpticVerticalAxisNode is the vertical axis through the center of the optic. For a lens, it bisects the symmetrical
 * lens into halves. It is shown only in Principal rays mode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TReadOnlyProperty from '../../../axon/TReadOnlyProperty';
import ModelViewTransform2 from '../../../phetcommon/view/ModelViewTransform2';
import { Node, Path } from '../../../scenery/imports';
import geometricOptics from '../../geometricOptics';
import GOColors from '../GOColors';
import Optic from '../model/Optic';
import { type RaysType } from '../model/RaysType';

export default class OpticVerticalAxisNode extends Node {

  /**
   * @param optic - the optic model element
   * @param raysTypeProperty - representation used for rays
   * @param modelViewTransform
   */
  public constructor(optic: Optic,
    raysTypeProperty: TReadOnlyProperty<RaysType>,
    modelViewTransform: ModelViewTransform2) {

    super({
      isDisposable: false
    });

    // Create a vertical dashed line through the optic, indicating the crossing plane of Principal rays.
    // See https://github.com/phetsims/geometric-optics/issues/140 for decisions about the look of this axis.
    const lineNode = new Path(modelViewTransform.modelToViewShape(optic.getVerticalAxis()), {
      stroke: GOColors.verticalAxisStrokeProperty,
      lineWidth: 5,
      opacity: 0.4
    });
    this.addChild(lineNode);

    // Make lineNode visible when Rays mode is Principal
    raysTypeProperty.link(raysType => {
      lineNode.visible = (raysType === 'principal');
    });
  }
}

geometricOptics.register('OpticVerticalAxisNode', OpticVerticalAxisNode);