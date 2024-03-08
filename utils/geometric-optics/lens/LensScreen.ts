// Copyright 2021-2023, University of Colorado Boulder

/**
 * LensScreen is the 'Lens' screen.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { type ScreenOptions } from '../../joist/Screen';
import ScreenIcon from '../../joist/ScreenIcon';
import GOColors from '../common/GOColors';
import geometricOptics from '../geometricOptics';
import GeometricOpticsStrings from '../GeometricOpticsStrings';
import LensModel from './model/LensModel';
import LensNode from './view/LensNode';
import LensScreenView from './view/LensScreenView';
import optionize from '../../phet-core/optionize';
import type PickRequired from '../../phet-core/types/PickRequired';
import { type GOSimOptions } from '../GOSim';

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