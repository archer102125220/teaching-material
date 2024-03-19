// Copyright 2021-2022, University of Colorado Boulder

/**
 * LensScreenView is the view for the 'Lens' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '@/utils/dot/Bounds2';
import Vector2 from '@/utils/dot/Vector2';
import Tandem from '@/utils/tandem/Tandem';
import GOScreenView, { type GOScreenViewOptions } from '@/utils/geometric-optics/common/view/GOScreenView';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import LensModel from '@/utils/geometric-optics/lens/model/LensModel';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import LensNode from '@/utils/geometric-optics/lens/view/LensNode';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';

type SelfOptions = EmptySelfOptions;

type LensScreenViewOptions = SelfOptions & PickRequired<GOScreenViewOptions, 'isBasicsVersion' | 'tandem'>;

export default class LensScreenView extends GOScreenView {

  public constructor(model: LensModel, providedOptions: LensScreenViewOptions) {

    const options = optionize<LensScreenViewOptions, SelfOptions, GOScreenViewOptions>()({

      // GOScreenViewOptions

      // View origin is slightly above center of the layoutBounds.
      getViewOrigin: (layoutBounds: Bounds2) => new Vector2(layoutBounds.centerX, layoutBounds.centerY - 35),

      // Creates the Node for the lens
      createOpticNode: (modelViewTransform: ModelViewTransform2, parentTandem: Tandem) => {
        return new LensNode(model.lens, modelViewTransform, {
          tandem: parentTandem.createTandem('lensNode')
        });
      }
    }, providedOptions);

    super(model, options);
  }
}

geometricOptics.register('LensScreenView', LensScreenView);