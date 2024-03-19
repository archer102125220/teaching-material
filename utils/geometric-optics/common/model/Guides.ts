// Copyright 2022-2023, University of Colorado Boulder

/**
 * Guides is a pair of guides (top and bottom) associated with the same point-of-interest.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '@/utils/axon/Disposable';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import Vector2 from '@/utils/dot/Vector2';
import Optic from '@/utils/geometric-optics/common/model/Optic';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import Guide from '@/utils/geometric-optics/common/model/Guide';

export default class Guides {

  // the pair of guides
  public readonly topGuide: Guide;
  public readonly bottomGuide: Guide;

  /**
   * @param optic - the optic that these guides are associated with
   * @param opticalObjectPositionProperty - position of the optical object
   */
  public constructor(optic: Optic, opticalObjectPositionProperty: TReadOnlyProperty<Vector2>) {

    this.topGuide = new Guide(optic, opticalObjectPositionProperty, 'top');

    this.bottomGuide = new Guide(optic, opticalObjectPositionProperty, 'bottom');
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }
}

geometricOptics.register('Guides', Guides);
