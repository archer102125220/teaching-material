// Copyright 2021-2023, University of Colorado Boulder

/**
 * MirrorScreen is the 'Mirror' screen.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { type ScreenOptions } from '../../joist/Screen';
import ScreenIcon from '../../joist/ScreenIcon';
import GOColors from '../common/GOColors';
import geometricOptics from '../geometricOptics';
import GeometricOpticsStrings from '../GeometricOpticsStrings';
import MirrorModel from './model/MirrorModel';
import MirrorNode from './view/MirrorNode';
import MirrorScreenView from './view/MirrorScreenView';
import { type OpticSurfaceType } from '../common/model/OpticSurfaceType';
import optionize from '../../phet-core/optionize';
import type PickRequired from '../../phet-core/types/PickRequired';
import { type GOSimOptions } from '../GOSim';

type SelfOptions = PickRequired<GOSimOptions, 'isBasicsVersion'>;

type MirrorScreenOptions = SelfOptions & PickRequired<ScreenOptions, 'tandem' | 'createKeyboardHelpNode'>;

export default class MirrorScreen extends Screen<MirrorModel, MirrorScreenView> {

  public constructor(providedOptions: MirrorScreenOptions) {

    const options = optionize<MirrorScreenOptions, SelfOptions, ScreenOptions>()({

      // Screen options
      name: GeometricOpticsStrings.screen.mirrorStringProperty,
      homeScreenIcon: createScreenIcon(providedOptions.isBasicsVersion ? 'flat' : 'concave'),
      backgroundColorProperty: GOColors.screenBackgroundColorProperty,
      isDisposable: false
    }, providedOptions);

    super(
      () => new MirrorModel({
        isBasicsVersion: providedOptions.isBasicsVersion,
        tandem: options.tandem.createTandem('model')
      }),
      model => new MirrorScreenView(model, {
        isBasicsVersion: providedOptions.isBasicsVersion,
        tandem: options.tandem.createTandem('view')
      }),
      options
    );
  }
}

function createScreenIcon(opticSurfaceType: OpticSurfaceType): ScreenIcon {
  return new ScreenIcon(MirrorNode.createIconNode(opticSurfaceType), {
    fill: GOColors.screenBackgroundColorProperty
  });
}

geometricOptics.register('MirrorScreen', MirrorScreen);