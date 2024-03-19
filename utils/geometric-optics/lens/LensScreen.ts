// Copyright 2021-2023, University of Colorado Boulder

/**
 * LensScreen is the 'Lens' screen.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { type ScreenOptions } from '@/utils/joist/Screen';
import ScreenIcon from '@/utils/joist/ScreenIcon';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import LensModel from '@/utils/geometric-optics/lens/model/LensModel';
import LensNode from '@/utils/geometric-optics/lens/view/LensNode';
import LensScreenView from '@/utils/geometric-optics/lens/view/LensScreenView';
import optionize from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import { type GOSimOptions } from '@/utils/geometric-optics/GOSim';

type SelfOptions = PickRequired<GOSimOptions, 'isBasicsVersion'>;

type LensScreenOptions = SelfOptions & PickRequired<ScreenOptions, 'tandem' | 'createKeyboardHelpNode'>;

export default class LensScreen extends Screen<LensModel, LensScreenView> {

  public constructor(providedOptions: LensScreenOptions) {

    const options = optionize<LensScreenOptions, SelfOptions, ScreenOptions>()({

      // Screen options
      name: GeometricOpticsStrings.screen.lensStringProperty,
      homeScreenIcon: createScreenIcon(),
      backgroundColorProperty: GOColors.screenBackgroundColorProperty,
      isDisposable: false
    }, providedOptions);

    super(
      () => new LensModel({
        tandem: options.tandem.createTandem('model')
      }),
      model => new LensScreenView(model, {
        isBasicsVersion: options.isBasicsVersion,
        tandem: options.tandem.createTandem('view')
      }),
      options
    );
  }
}

function createScreenIcon(): ScreenIcon {
  return new ScreenIcon(LensNode.createIconNode('convex'), {
    fill: GOColors.screenBackgroundColorProperty
  });
}

geometricOptics.register('LensScreen', LensScreen);